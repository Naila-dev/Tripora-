// backend/models/tourModel.js
const mongoose = require('mongoose');
// Tour schema
const tourSchema = new mongoose.Schema({
  title: { type: String, required: true },
  location: String,
  price: Number,
  duration: String,
  description: String,
  image: String
});

module.exports = mongoose.model('Tour', tourSchema);

