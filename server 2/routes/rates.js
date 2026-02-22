const express = require('express');
const router = express.Router();
const Rate = require('../models/Rate');

const seedRates = async () => {
    try {
        await Rate.deleteMany({});
        const initialRates = {
            spot: [
                { name: 'GOLD', bid: 4911.45, ask: 4912.20, high: 5000.35, low: 4865.20 },
                { name: 'SILVER', bid: 74.83, ask: 74.89, high: 76.95, low: 72.84 },
                { name: 'INR', bid: 90.773, ask: 90.783, high: 90.808, low: 90.660 },
            ],
            rtgs: [
                { name: "SILVER-30 KG'S RTGS ONLY-", buy: '-', sell: 243937, stock: true },
                { name: 'SILVER MINI- -CASH', buy: '-', sell: 244437, stock: true },
                { name: 'GOLD RTGS', buy: '-', sell: 156495, stock: true },
            ],
            futures: [
                { name: 'GOLD FUTURE', bid: 152624, ask: 152695, high: 154935, low: 151311 },
                { name: 'SILVER FUTURE', bid: 234613, ask: 234837, high: 240449, low: 229802 },
            ],
            next: [
                { name: 'SILVER NEXT', bid: 234613, ask: 234837, high: 240449, low: 229802 },
                { name: 'GOLD NEXT', bid: 152624, ask: 152695, high: 154935, low: 151311 },
            ],
        };
        await Rate.create(initialRates);
        console.log('✅ Rates seeded successfully');
    } catch (err) {
        console.error('❌ Failed to seed rates:', err);
    }
};

router.get('/', async (req, res) => {
    try {
        let rates = await Rate.findOne();
        if (!rates) {
            await seedRates();
            rates = await Rate.findOne();
        }
        res.json(rates);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post('/update', async (req, res) => {
    try {
        let rates = await Rate.findOne();
        if (!rates) {
            rates = await Rate.create(req.body);
        } else {
            Object.assign(rates, req.body);
            await rates.save();
        }
        res.json(rates);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
