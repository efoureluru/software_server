/**
 * migrate_from_efour.js
 * 
 * Migrates ALL collections from the old "efour" MongoDB cluster
 * to the current "cluster0" (ethree_pos) cluster.
 * 
 * Source:  mongodb+srv://Vercel-Admin-EFOUR:...@efour.ojwn6t6.mongodb.net
 * Target:  mongodb+srv://efoureluru_db_user:...@cluster0.h9jkyka.mongodb.net
 * 
 * Run: node migrate_from_efour.js
 */

const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

// ── Connection strings ────────────────────────────────────────────────────────
const SOURCE_URI =
    'mongodb+srv://Vercel-Admin-EFOUR:52sxxM83PIPKobvk@efour.ojwn6t6.mongodb.net/?retryWrites=true&w=majority';

const TARGET_URI =
    process.env.MONGO_URI || process.env.MONGODB_URI;

// ── Batch size for insertMany (tune for memory vs speed) ─────────────────────
const BATCH_SIZE = 500;

// ── Flexible schema – copies every field as-is ───────────────────────────────
const flexSchema = new mongoose.Schema({}, { strict: false });

// ── Collections to migrate (Mongoose model name → MongoDB collection name) ───
// Add or remove entries here if needed.
const COLLECTIONS = [
    { model: 'Ticket', collection: 'tickets' },
    { model: 'Order', collection: 'orders' },
    { model: 'User', collection: 'users' },
    { model: 'Product', collection: 'products' },
    { model: 'Customer', collection: 'customers' },
    { model: 'Booking', collection: 'bookings' },
    { model: 'Rate', collection: 'rates' },
];

// ── Helpers ───────────────────────────────────────────────────────────────────
function sleep(ms) {
    return new Promise(r => setTimeout(r, ms));
}

async function migrateCollection(srcConn, tgtConn, { model, collection }) {
    console.log(`\n📦  [${collection}] Starting...`);

    const SrcModel = srcConn.model(model, flexSchema, collection);
    const TgtModel = tgtConn.model(model, flexSchema, collection);

    const total = await SrcModel.countDocuments();
    console.log(`    Found ${total.toLocaleString()} documents in source.`);

    if (total === 0) {
        console.log(`    ⚠️  Nothing to migrate.`);
        return { migrated: 0, skipped: 0, errors: 0 };
    }

    let migrated = 0, skipped = 0, errors = 0;
    let page = 0;

    while (true) {
        const docs = await SrcModel.find({})
            .skip(page * BATCH_SIZE)
            .limit(BATCH_SIZE)
            .lean();

        if (docs.length === 0) break;

        // Strip _id so MongoDB generates new ones in target; keeps originals if you prefer.
        // We KEEP _id so existing references (ObjectId refs) remain valid.
        const toInsert = [];
        for (const doc of docs) {
            toInsert.push(doc);
        }

        try {
            // ordered:false → continue on duplicate-key errors (already-migrated docs)
            const result = await TgtModel.insertMany(toInsert, {
                ordered: false,
                rawResult: true,
            });
            migrated += result.insertedCount || toInsert.length;
        } catch (err) {
            if (err.code === 11000 || err.writeErrors) {
                // Partial success – some were duplicates
                const inserted = err.result ? (err.result.nInserted || 0) : 0;
                const dups = toInsert.length - inserted;
                migrated += inserted;
                skipped += dups;
            } else {
                console.error(`    ❌ Batch error (page ${page}):`, err.message);
                errors += toInsert.length;
            }
        }

        page++;
        const done = Math.min((page * BATCH_SIZE), total);
        process.stdout.write(`\r    Progress: ${done.toLocaleString()} / ${total.toLocaleString()} (${Math.round(done / total * 100)}%)`);
    }

    console.log(`\n    ✅  Migrated: ${migrated.toLocaleString()}  |  Skipped (dup): ${skipped.toLocaleString()}  |  Errors: ${errors.toLocaleString()}`);
    return { migrated, skipped, errors };
}

// ── Main ──────────────────────────────────────────────────────────────────────
async function main() {
    if (!TARGET_URI) {
        console.error('❌  MONGO_URI not found in .env — aborting.');
        process.exit(1);
    }

    console.log('🚀  Migration: efour cluster → cluster0 (ethree_pos)');
    console.log('─'.repeat(60));

    let srcConn, tgtConn;

    try {
        console.log('\n🔌  Connecting to SOURCE (efour)...');
        srcConn = await mongoose.createConnection(SOURCE_URI, {
            serverSelectionTimeoutMS: 15000,
        }).asPromise();
        console.log('    ✅  Source connected.');

        console.log('🔌  Connecting to TARGET (cluster0)...');
        tgtConn = await mongoose.createConnection(TARGET_URI, {
            serverSelectionTimeoutMS: 15000,
        }).asPromise();
        console.log('    ✅  Target connected.');

        // ── List all collections in source for discovery ──────────────────────
        const srcDB = srcConn.db;
        const srcCollList = await srcDB.listCollections().toArray();
        const srcCollNames = srcCollList.map(c => c.name);
        console.log(`\n📋  Collections found in source: ${srcCollNames.join(', ')}`);

        // Filter COLLECTIONS list to only ones that exist in source
        const toMigrate = COLLECTIONS.filter(c => srcCollNames.includes(c.collection));

        // Also migrate any collections in source NOT in our predefined list
        for (const name of srcCollNames) {
            if (!toMigrate.find(c => c.collection === name)) {
                toMigrate.push({ model: `_extra_${name}`, collection: name });
                console.log(`    ➕  Extra collection discovered: ${name}`);
            }
        }

        // ── Migrate each collection ───────────────────────────────────────────
        const summary = {};
        for (const collDef of toMigrate) {
            summary[collDef.collection] = await migrateCollection(srcConn, tgtConn, collDef);
            await sleep(200); // small pause between collections
        }

        // ── Final summary ─────────────────────────────────────────────────────
        console.log('\n' + '═'.repeat(60));
        console.log('🎉  MIGRATION COMPLETE\n');
        console.log('Collection'.padEnd(20) + 'Migrated'.padEnd(12) + 'Skipped'.padEnd(12) + 'Errors');
        console.log('─'.repeat(56));
        let totalMigrated = 0, totalSkipped = 0, totalErrors = 0;
        for (const [coll, stats] of Object.entries(summary)) {
            totalMigrated += stats.migrated;
            totalSkipped += stats.skipped;
            totalErrors += stats.errors;
            console.log(
                coll.padEnd(20) +
                String(stats.migrated).padEnd(12) +
                String(stats.skipped).padEnd(12) +
                stats.errors
            );
        }
        console.log('─'.repeat(56));
        console.log(
            'TOTAL'.padEnd(20) +
            String(totalMigrated).padEnd(12) +
            String(totalSkipped).padEnd(12) +
            totalErrors
        );

    } catch (err) {
        console.error('\n❌  Fatal error:', err);
        process.exit(1);
    } finally {
        if (srcConn) await srcConn.close();
        if (tgtConn) await tgtConn.close();
        process.exit(0);
    }
}

main();
