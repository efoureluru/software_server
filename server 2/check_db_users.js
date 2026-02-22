const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');
dotenv.config();

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

async function checkUsers() {
    console.log('Connecting to:', MONGO_URI);
    await mongoose.connect(MONGO_URI);
    const users = await User.find({}, 'name email role');
    console.log('Seeded Users:');
    console.table(users.map(u => ({ name: u.name, email: u.email, role: u.role })));
    await mongoose.disconnect();
}

checkUsers().catch(console.error);
