// // backend/models/Payment.js
const mongoose = require("mongoose");

const paymentSchema = new mongoose.Schema({
  booking: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Booking",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  status: {
    type: String,
    enum: ["processing", "completed", "failed"],
    default: "processing",
  },
  mpesaReceiptNumber: { type: String },
  checkoutRequestId: { type: String, index: true }, // For finding the payment on callback
  merchantRequestId: { type: String, index: true },
  paidAt: {
    type: Date,
  },
  error: {
    code: { type: Number },
    message: { type: String },
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Payment", paymentSchema);
