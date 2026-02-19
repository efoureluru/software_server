const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const Product = require('./models/Product');

dotenv.config();

const products = [
    // Food
    { id: '101', name: 'Chicken Mandi', category: 'food', price: 450, stall: 'Darbar Mandi', type: 'mandi', status: 'on', image: 'https://images.unsplash.com/photo-1633945274405-b6c8069047b0?auto=format&fit=crop&w=600&q=80' },
    { id: '102', name: 'Steamed Momo', category: 'food', price: 180, stall: 'Wow! Momo', type: 'momo', status: 'on', image: 'https://images.unsplash.com/photo-1534422298391-e4f8c172dddb?auto=format&fit=crop&w=600&q=80' },
    // Play
    { id: '103', name: 'Bumping Cars Ticket', category: 'play', price: 150, type: 'ride', status: 'on', image: 'https://images.unsplash.com/photo-1537633552985-df8429e8048b?auto=format&fit=crop&w=600&q=80' },
    { id: '104', name: 'Indoor Cricket Slot', category: 'play', price: 500, type: 'sports', status: 'on', image: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?auto=format&fit=crop&w=600&q=80' },
    // Events
    { id: '105', name: 'VIP Dining Suite', category: 'event', price: 2000, type: 'hall', status: 'on', image: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?auto=format&fit=crop&w=600&q=80' },
];

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ethree_pos');
        console.log('Connected to MongoDB');
    } catch (err) {
        console.error('MongoDB Connection Error:', err);
        process.exit(1);
    }
};

const seedDB = async () => {
    try {
        await connectDB();
        console.log('Seeding MongoDB...');

        // Clear existing products and seed new ones
        await Product.deleteMany({});
        await Product.insertMany(products);
        console.log('Products seeded');

        // Check and create Default Admin
        const adminEmail = 'admin@ethree.com';
        const adminExists = await User.findOne({ email: adminEmail });
        if (!adminExists) {
            await User.create({
                name: 'Ethree Admin',
                email: adminEmail,
                password: 'admin123', // Will be hashed by pre-save
                role: 'admin'
            });
            console.log('Admin user created');
        }

        // Check and create Default POS User
        const posEmail = 'pos@ethree.com';
        const posExists = await User.findOne({ email: posEmail });
        if (!posExists) {
            await User.create({
                name: 'POS Terminal 1',
                email: posEmail,
                password: 'pos123', // Will be hashed by pre-save
                role: 'pos'
            });
            console.log('POS user created');
        }

        console.log('MongoDB Seeded Successfully');
        process.exit();
    } catch (err) {
        console.error('Seeding Error:', err);
        process.exit(1);
    }
};

seedDB();
