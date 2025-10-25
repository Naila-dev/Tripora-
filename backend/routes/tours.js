const express = require("express");
const router = express.Router();
const Tour = require("../models/Tour");

// GET /api/tours  → all tours
router.get("/", async (req, res) => {
  try {
    const tours = await Tour.find();
    res.json(tours);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/tours/:id  → single tour
router.get("/:id", async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    if (!tour) return res.status(404).json({ message: "Tour not found" });
    res.json(tour);
  } catch {
    res.status(500).json({ message: "Server error" });
  }
});

// POST /api/tours  → admin create (simplified)
router.post("/", async (req, res) => {
  const { title, location, price, description, image } = req.body;
  try {
    const tour = new Tour({ title, location, price, description, image });
    await tour.save();
    res.status(201).json(tour);
  } catch {
    res.status(400).json({ message: "Invalid data" });
  }
});

// PUT /api/tours/:id  → update
router.put("/:id", async (req, res) => {
  try {
    const tour = await Tour.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(tour);
  } catch {
    res.status(400).json({ message: "Update failed" });
  }
});

// DELETE /api/tours/:id
router.delete("/:id", async (req, res) => {
  try {
    await Tour.findByIdAndDelete(req.params.id);
    res.json({ message: "Tour deleted" });
  } catch {
    res.status(500).json({ message: "Delete failed" });
  }
});

module.exports = router;
