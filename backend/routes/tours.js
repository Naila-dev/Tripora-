const express = require("express");
const Tour = require('../models/tourModel.js');
const protect = require("../middleware/authMiddleware");

const admin = require("../middleware/adminMiddleware");
const router = express.Router();

// GET all tours
router.get("/", async (req, res) => {
  try {
    const tours = await Tour.find().sort({ createdAt: -1 });
    res.json(tours);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// GET single tour by ID
router.get("/:id", async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ message: "Tour not found" });
    res.json(tour);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// CREATE new tour (admin only)
router.post("/", protect, admin, async (req, res) => {
  try {
    const { title, description, price, location, image, duration } = req.body;

    if (!title || !description || !price || !location || !image || !duration) {
      return res.status(400).json({ message: "Please provide all required fields." });
    }

    const tour = new Tour({
      title,
      description,
      price,
      location,
      image,
      duration,
      createdBy: req.user._id,
    });

    const savedTour = await tour.save();
    res.status(201).json(savedTour);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// UPDATE tour (admin only)
router.put("/:id", protect, admin, async (req, res) => {
  try {
    const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedTour) return res.status(404).json({ message: "Tour not found" });

    res.json(updatedTour);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

// DELETE tour (admin only)
router.delete("/:id", protect, admin, async (req, res) => {
  try {
    const deletedTour = await Tour.findByIdAndDelete(req.params.id);
    if (!deletedTour) return res.status(404).json({ message: "Tour not found" });

    res.json({ message: "Tour deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
