const mongoose = require('mongoose');

const RateSchema = new mongoose.Schema({
    spot: [{
        name: String,
        bid: Number,
        ask: Number,
        high: Number,
        low: Number
    }],
    rtgs: [{
        name: String,
        buy: String,
        sell: Number,
        stock: Boolean
    }],
    futures: [{
        name: String,
        bid: Number,
        ask: Number,
        high: Number,
        low: Number
    }],
    next: [{
        name: String,
        bid: Number,
        ask: Number,
        high: Number,
        low: Number
    }]
}, { timestamps: true });

module.exports = mongoose.model('Rate', RateSchema);
