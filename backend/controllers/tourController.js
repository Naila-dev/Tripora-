// backend/controllers/tourController.js
const Tour = require("../models/Tour");

// Admin: Create a tour
exports.createTour = async (req, res) => {
  try {
    const { title, description, price, image } = req.body;
    const tour = await Tour.create({ title, description, price, image });
    res.status(201).json(tour);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create tour" });
  }
};

// Get all tours (public)
exports.getTours = async (req, res) => {
  try {
    const tours = await Tour.find();
    res.json(tours);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch tours" });
  }
};

// Get single tour (public)
exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ message: "Tour not found" });
    res.json(tour);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to fetch tour" });
  }
};

// Admin: Update tour
exports.updateTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!tour) return res.status(404).json({ message: "Tour not found" });
    res.json(tour);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update tour" });
  }
};

// Admin: Delete tour
exports.deleteTour = async (req, res) => {
  try {
    const tour = await Tour.findByIdAndDelete(req.params.id);
    if (!tour) return res.status(404).json({ message: "Tour not found" });
    res.json({ message: "Tour deleted" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete tour" });
  }
};

// Admin: Delete tours not in frontend
exports.cleanupTours = async (req, res) => {
  try {
    const { validIds } = req.body;

    if (!Array.isArray(validIds)) {
      return res.status(400).json({ message: "validIds must be an array" });
    }

    // Delete all tours whose IDs are not in validIds
    const result = await Tour.deleteMany({ _id: { $nin: validIds } });

    res.json({
      message: "Old tours removed successfully",
      deletedCount: result.deletedCount,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to clean up tours" });
  }
};