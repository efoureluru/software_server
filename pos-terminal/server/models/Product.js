const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: { type: String, required: true, unique: true }, // Added explicit ID for syncing
    name: { type: String, required: true },
    category: { type: String, required: true }, // 'food', 'play', 'event'
    price: { type: Number, required: true },
    description: { type: String },
    image: { type: String },
    stall: { type: String }, // For food
    status: { type: String, enum: ['on', 'off'], default: 'on' },
    type: { type: String } // e.g., 'mandi', 'momo', 'ride', 'hall'
});

module.exports = mongoose.model('Product', productSchema);
