// backend/models/Tour.js
const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  image: { type: String, required: true }, // store image URL or path
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Tour", tourSchema);

