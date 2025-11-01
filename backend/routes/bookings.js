// backend/routes/bookings.js
const express = require('express');
const Booking = require('../models/Booking');
const protect = require('../middleware/authMIddleware');
const router = express.Router();

// Create booking
router.post('/', protect, async (req, res) => {
    try {
        const { tour } = req.body;
        const booking = await Booking.create({ user: req.user._id, tour });
        res.status(201).json(booking);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get user bookings
router.get('/', protect, async (req, res) => {
    try {
        const bookings = await Booking.find({ user: req.user._id }).populate('tour');
        res.json(bookings);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;

