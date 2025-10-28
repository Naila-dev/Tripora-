// backend/models/tourModel.js
const mongoose = require("mongoose");

const destinationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String, required: true },
  coordinates: {
    lat: { type: Number },
    lng: { type: Number },
  },
  createdAt: { type: Date, default: Date.now },
});

const tourSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: String, required: true },
    description: { type: String, required: true },
    image: { type: String, required: true },
    destinations: [destinationSchema],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Tour", tourSchema);


