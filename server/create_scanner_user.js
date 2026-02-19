const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI || "mongodb+srv://Vercel-Admin-EFOUR:52sxxM83PIPKobvk@efour.ojwn6t6.mongodb.net/?retryWrites=true&w=majority";

const createScannerUser = async () => {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('Connected to DB');

        const scannerUser = await User.findOne({ email: 'scanner_test@ethree.com' });
        if (!scannerUser) {
            console.log('Creating scanner user...');
            const newUser = new User({
                name: 'Scanner Point 1',
                email: 'scanner_test@ethree.com',
                password: 'scanner123',
                role: 'scanner'
            });
            await newUser.save();
            console.log('Scanner user created: scanner@efour.com / scanner123');
        } else {
            console.log('Scanner user already exists.');
        }

        mongoose.disconnect();
    } catch (err) {
        console.error(err);
    }
};

createScannerUser();
