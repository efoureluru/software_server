const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config({ path: path.join(__dirname, '.env') });

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

async function resetPassword() {
    console.log('--- RESET SCANNER_TEST PASSWORD ---');
    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB');

        const email = 'scanner_test@ethree.com';
        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            console.log('❌ User NOT FOUND:', email);
        } else {
            console.log('✅ User FOUND:', user.email);
            console.log('Resetting password to: scanner123');
            user.password = 'scanner123';
            await user.save();
            console.log('✅ Password RESET successfully');
        }

    } catch (err) {
        console.error('❌ Error:', err.message);
    } finally {
        await mongoose.disconnect();
        console.log('--- END ---');
    }
}

resetPassword();
