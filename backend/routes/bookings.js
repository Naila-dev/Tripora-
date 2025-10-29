// backend/routes/bookings.js
const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");
const bookingController = require("../controllers/bookingController");

// User can book a tour
router.post("/", protect, bookingController.createBooking);

// Admin sees all bookings
router.get("/", protect, admin, bookingController.getBookings);

// User sees their bookings
router.get("/my", protect, bookingController.getMyBookings);

module.exports = router;
