const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');
const { auth, admin } = require('../middleware/auth');

/**
 * @swagger
 * /api/bookings:
 *   get:
 *     summary: Get all bookings (Admin)
 *     tags: [Bookings]
 */
router.get('/', auth, admin, async (req, res) => {
    try {
        const bookings = await Booking.find().sort({ createdAt: -1 });
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

/**
 * @swagger
 * /api/bookings:
 *   post:
 *     summary: Create a booking
 *     tags: [Bookings]
 */
router.post('/', async (req, res) => {
    try {
        const booking = await Booking.create(req.body);
        res.status(201).json(booking);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
