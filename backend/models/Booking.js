// backend/models/Booking.js
const mongoose = require('mongoose');
// Booking schema
const schema = new mongoose.Schema({
  // References to User and Tour
  user:{type: mongoose.Schema.Types.ObjectId, ref:'User'},
  tour:{type: mongoose.Schema.Types.ObjectId, ref:'Tour'},
  date:Date,
  guests:Number,
  paymentStatus:{type:String, default:'pending'}
});
module.exports = mongoose.model('Booking', schema);
