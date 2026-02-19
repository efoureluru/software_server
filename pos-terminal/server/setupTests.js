const mongoose = require('mongoose');
const User = require('./models/User');
const MONGO_URI = 'mongodb+srv://efoureluru_db_user:0yhiXcV0n38sBH64@cluster0.h9jkyka.mongodb.net/ethree_pos?retryWrites=true&w=majority';

async function setup() {
    try {
        await mongoose.connect(MONGO_URI);
        console.log('CONNECTED');
        const users = await User.find({}, 'email role');
        console.log('USERS:', JSON.stringify(users, null, 2));

        const testUsers = [
            { name: 'Scanner Test', email: 'scanner_test@ethree.com', password: 'scanner123', role: 'scanner' },
            { name: 'POS User 1', email: 'pos1@efour.com', password: '123456', role: 'pos' }
        ];

        for (const u of testUsers) {
            let user = await User.findOne({ email: u.email });
            if (!user) {
                console.log(`Creating ${u.email}...`);
                await User.create(u);
            } else {
                console.log(`${u.email} exists with role ${user.role}`);
                if (user.role !== u.role) {
                    user.role = u.role;
                    await user.save();
                    console.log(`Updated ${u.email} role to ${u.role}`);
                }
            }
        }
        process.exit(0);
    } catch (err) {
        console.error(err);
        process.exit(1);
    }
}
setup();
