const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const Booking = require("../models/Booking");
const Tour = require("../models/tourModel");

// Get all bookings for a user
router.get("/my-bookings", protect, async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user._id })
      .populate('tour')
      .sort('-date');
    res.json(bookings);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Create a new booking
router.post("/", protect, async (req, res) => {
  try {
    const { tourId, date, numberOfPeople } = req.body;
    
    // Verify tour exists and get its price
    const tour = await Tour.findById(tourId);
    if (!tour) {
      return res.status(404).json({ message: "Tour not found" });
    }

    // Calculate total amount
    const totalAmount = tour.price * numberOfPeople;

    // Create booking with pending status
    const booking = await Booking.create({
      user: req.user._id,
      tour: tourId,
      date: new Date(date),
      guests: numberOfPeople,
      paymentStatus: 'pending'
    });

    res.status(201).json({
      message: "Booking created successfully",
      bookingId: booking._id,
      totalAmount
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update booking status after payment
router.patch("/:bookingId/payment-status", protect, async (req, res) => {
  try {
    const { status } = req.body;
    const booking = await Booking.findByIdAndUpdate(
      req.params.bookingId,
      { paymentStatus: status },
      { new: true }
    );
    res.json(booking);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;