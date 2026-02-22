const mongoose = require('mongoose');
const User = require('./models/User');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');

dotenv.config();

const MONGO_URI = process.env.MONGO_URI || process.env.MONGODB_URI;

async function diagnose() {
    console.log('--- DB DIAGNOSTIC ---');
    console.log('Connection URI:', MONGO_URI.replace(/:([^@]+)@/, ':****@')); // Hide password

    try {
        await mongoose.connect(MONGO_URI);
        console.log('✅ Connected to MongoDB');
        console.log('Database Name:', mongoose.connection.name);

        const email = 'admin@ethree.com';
        const user = await User.findOne({ email: email.toLowerCase() });

        if (!user) {
            console.log('❌ User NOT FOUND:', email);
            console.log('Creating user now...');
            await User.create({
                name: 'Ethree Admin',
                email: email,
                password: 'admin123',
                role: 'admin'
            });
            console.log('✅ User CREATED with password: admin123');
        } else {
            console.log('✅ User FOUND:', user.email);
            console.log('Resetting password to: admin123');
            user.password = 'admin123';
            await user.save();
            console.log('✅ Password RESET successfully');
        }

    } catch (err) {
        console.error('❌ Error during diagnosis:', err.message);
    } finally {
        await mongoose.disconnect();
        console.log('--- END DIAGNOSTIC ---');
    }
}

diagnose();
