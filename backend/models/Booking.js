const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  user:{type: mongoose.Schema.Types.ObjectId, ref:'User'},
  tour:{type: mongoose.Schema.Types.ObjectId, ref:'Tour'},
  date:Date,
  guests:Number,
  paymentStatus:{type:String, default:'pending'}
});
module.exports = mongoose.model('Booking', schema);
