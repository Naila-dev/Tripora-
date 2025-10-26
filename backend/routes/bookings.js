const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const Booking = require("../models/Booking");

// A test route to ensure the file is working
router.get("/test", (req, res) => {
  res.send("Bookings route is now working!");
});

module.exports = router;