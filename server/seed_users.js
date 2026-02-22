/**
 * seed_users.js
 * Creates all standard operational users in the current DB.
 * Run: node seed_users.js
 */

const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

// ── Define all users to seed ──────────────────────────────────────────────────
const USERS = [
    // Admins
    { name: 'Admin User', email: 'admin@efour.com', password: 'admin123', role: 'admin' },
    { name: 'Admin Ethree', email: 'admin@ethree.com', password: 'admin123', role: 'admin' },

    // POS Terminals
    { name: 'POS Terminal 1', email: 'pos1@efour.com', password: 'pos1234', role: 'pos' },
    { name: 'POS Terminal 2', email: 'pos2@efour.com', password: 'pos1234', role: 'pos' },
    { name: 'POS Terminal 3', email: 'pos3@efour.com', password: 'pos1234', role: 'pos' },

    // Scanners
    { name: 'Scanner Point 1', email: 'scanner1@efour.com', password: 'scan1234', role: 'scanner' },
    { name: 'Scanner Point 2', email: 'scanner2@efour.com', password: 'scan1234', role: 'scanner' },
    { name: 'Scanner Ethree', email: 'scanner@ethree.com', password: 'scan1234', role: 'scanner' },

    // Stall Users
    { name: 'Stall User 1', email: 'stall1@efour.com', password: 'stall1234', role: 'stall' },
    { name: 'Stall User 2', email: 'stall2@efour.com', password: 'stall1234', role: 'stall' },

    // Cashier/Customer
    { name: 'Cashier User', email: 'user@ethree.com', password: 'user1234', role: 'customer' },
];

async function seedUsers() {
    if (!MONGO_URI) {
        console.error('❌  MONGO_URI not set in .env');
        process.exit(1);
    }

    console.log('🔌  Connecting to database...');
    await mongoose.connect(MONGO_URI, { serverSelectionTimeoutMS: 15000 });
    console.log('✅  Connected!\n');

    let created = 0, skipped = 0;

    for (const u of USERS) {
        const exists = await User.findOne({ email: u.email });
        if (exists) {
            console.log(`⏭️   SKIP  ${u.email.padEnd(30)} (already exists, role: ${exists.role})`);
            skipped++;
        } else {
            const user = new User(u);
            await user.save(); // triggers bcrypt hashing via pre-save hook
            console.log(`✅  CREATE ${u.email.padEnd(30)} | role: ${u.role.padEnd(8)} | pass: ${u.password}`);
            created++;
        }
    }

    console.log('\n' + '─'.repeat(55));
    console.log(`🎉  Done! Created: ${created}  |  Skipped: ${skipped}`);
    console.log('─'.repeat(55));
    console.log('\n📋  LOGIN CREDENTIALS SUMMARY:');
    console.log('─'.repeat(55));
    for (const u of USERS) {
        console.log(`  ${u.role.padEnd(9)} ${u.email.padEnd(30)} / ${u.password}`);
    }

    await mongoose.disconnect();
    process.exit(0);
}

seedUsers().catch(err => {
    console.error('❌  Error:', err.message);
    process.exit(1);
});
