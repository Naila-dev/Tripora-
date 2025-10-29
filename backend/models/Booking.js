// backend/models/Booking.js
const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  tour: { type: mongoose.Schema.Types.ObjectId, ref: "Tour", required: true },
  bookedAt: { type: Date, default: Date.now },
  paymentStatus: { type: String, enum: ["pending", "processing", "completed", "failed"], default: "pending" },
  paymentError: {
    code: String,
    message: String,
    timestamp: Date
  }
});

module.exports = mongoose.model("Booking", bookingSchema);
