// backend/routes/tours.js
const express = require('express');
const Tour = require('../models/Tour');
const protect = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware'); // ✅ Corrected import
const multer = require('multer');
const path = require('path');

const router = express.Router();

// ✅ Ensure the uploads folder exists
const fs = require('fs');
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// ✅ Configure multer for image upload
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  }
});

const upload = multer({ storage });

// ✅ Create a new tour (admin only)
router.post('/', protect, admin, upload.single('image'), async (req, res) => {
  try {
    const tourData = { ...req.body };

    if (req.file) {
      // Attach image URL with full path
      tourData.image = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }

    const tour = await Tour.create(tourData);
    res.status(201).json(tour);
  } catch (err) {
    console.error('Error creating tour:', err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get all tours
router.get('/', async (req, res) => {
  try {
    const tours = await Tour.find();
    res.json(tours);
  } catch (err) {
    console.error('Error fetching tours:', err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ Get a single tour by ID
router.get('/:id', async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }
    res.json(tour);
  } catch (err) {
    console.error('Error fetching tour:', err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ Update tour (admin only)
router.put('/:id', protect, admin, upload.single('image'), async (req, res) => {
  try {
    const updateData = { ...req.body };

    if (req.file) {
      updateData.image = `${req.protocol}://${req.get('host')}/uploads/${req.file.filename}`;
    }

    const tour = await Tour.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    res.json(tour);
  } catch (err) {
    console.error('Error updating tour:', err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ Delete tour (admin only)
router.delete('/:id', protect, admin, async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    if (!tour) {
      return res.status(404).json({ message: 'Tour not found' });
    }

    res.json({ message: 'Tour deleted successfully' });
  } catch (err) {
    console.error('Error deleting tour:', err);
    res.status(500).json({ message: err.message });
  }
});

// ✅ Test route to verify admin access
router.get('/admin/test', protect, admin, (req, res) => {
  res.json({ message: `✅ Admin verified: ${req.user?.email || 'Unknown user'}` });
});

module.exports = router;
