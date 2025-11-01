// backend/models/Tour.js

const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    location: { type: String, required: true },
    price: { type: Number, required: true },
    duration: { type: String, required: true },
    image: { type: String },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Tour', tourSchema);
