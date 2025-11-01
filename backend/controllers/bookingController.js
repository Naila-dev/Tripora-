// backend/controllers/bookingController.js
const Booking = require("../models/Booking");

// Create a booking (user only)
exports.createBooking = async (req, res) => {
  try {
    const { tourId } = req.body;
    const booking = new Booking({
      user: req.user._id, // user id from auth middleware
      tour: tourId
    });

    await booking.save();
    res.status(201).json({ message: "Booking created", booking });
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get all bookings (admin)
exports.getBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "name email")
      .populate("tour", "title price");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};

// Get bookings for logged-in user
exports.getMyBookings = async (req, res) => {
  try {
    const bookings = await Booking.find({ user: req.user.id })
      .populate("tour", "title price");
    res.json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
};
