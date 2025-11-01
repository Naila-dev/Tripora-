// backend/routes/tours.js
const express = require('express');
const Tour = require('../models/Tour');
const protect = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');
const router = express.Router();

// Create tour
router.post('/', protect, admin, async (req, res) => {
    try {
        const tour = await Tour.create(req.body);
        res.status(201).json(tour);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get all tours
router.get('/', async (req, res) => {
    try {
        const tours = await Tour.find();
        res.json(tours);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Get single tour
router.get('/:id', async (req, res) => {
    try {
        const tour = await Tour.findById(req.params.id);
        if (!tour) return res.status(404).json({ message: 'Tour not found' });
        res.json(tour);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Update tour
router.put('/:id', protect, admin, async (req, res) => {
    try {
        const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true });
        res.json(tour);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Delete tour
router.delete('/:id', protect, admin, async (req, res) => {
    try {
        await Tour.findByIdAndDelete(req.params.id);
        res.json({ message: 'Tour deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;






