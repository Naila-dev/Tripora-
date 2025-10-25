const mongoose = require("mongoose");

const tourSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  image: { type: String }, // image URL
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Tour", tourSchema);
