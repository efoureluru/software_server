const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI || "mongodb+srv://Vercel-Admin-EFOUR:52sxxM83PIPKobvk@efour.ojwn6t6.mongodb.net/?retryWrites=true&w=majority";

const resetAdminPassword = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to DB');

        const email = 'admin@ethree.com';
        const user = await User.findOne({ email });

        if (user) {
            console.log(`Found admin user: ${user.email}`);
            user.password = 'admin123'; // Pre-save hook will hash this
            await user.save();
            console.log('Password reset to: admin123');
        } else {
            console.log('Admin user not found!');
        }

        mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
};

resetAdminPassword();
