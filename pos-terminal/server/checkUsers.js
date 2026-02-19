const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config();

const User = require('./models/User');

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI || 'mongodb://localhost:27017/ethree_pos';

async function checkUsers() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to MongoDB');
        const users = await User.find({}, 'email role');
        console.log('Users in DB:');
        console.log(JSON.stringify(users, null, 2));
        process.exit(0);
    } catch (err) {
        console.error('Error:', err);
        process.exit(1);
    }
}

checkUsers();
