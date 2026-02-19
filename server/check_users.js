const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI || "mongodb+srv://Vercel-Admin-EFOUR:52sxxM83PIPKobvk@efour.ojwn6t6.mongodb.net/?retryWrites=true&w=majority";

const checkUsers = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to DB');

        const users = await User.find({});
        console.log('Existing Users:', users.map(u => ({ email: u.email, role: u.role, name: u.name, id: u._id })));

        const admin = users.find(u => u.role === 'admin');
        if (!admin) {
            console.log('No admin found. Creating default admin...');
            const newAdmin = new User({
                name: 'Admin User',
                email: 'admin@efour.com',
                password: 'admin', // Will be hashed
                role: 'admin'
            });
            await newAdmin.save();
            console.log('Default admin created: admin@efour.com / admin');
        } else {
            console.log('Admin already exists.');
        }

        mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
};

checkUsers();
