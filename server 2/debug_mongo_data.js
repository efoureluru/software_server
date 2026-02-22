// Use native driver (installed via Mongoose dependency)
const { MongoClient } = require('mongodb');

const uri = "mongodb+srv://efoureluru_db_user:0yhiXcV0n38sBH64@cluster0.h9jkyka.mongodb.net/?retryWrites=true&w=majority";

async function run() {
    const client = new MongoClient(uri, {
        serverSelectionTimeoutMS: 5000,
        tls: true,
        tlsAllowInvalidCertificates: true
    });

    try {
        console.log("Connecting with native driver...");
        await client.connect();
        console.log("Connected successfully to server");

        const admin = client.db().admin();
        const dbs = await admin.listDatabases();

        console.log("Databases:");
        dbs.databases.forEach(db => console.log(` - ${db.name}`));

        // Check collections in 'admin' or 'test' or whatever

    } catch (e) {
        console.error("Connection Failed:", e);
    } finally {
        await client.close();
    }
}

run();
