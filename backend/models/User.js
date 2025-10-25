const mongoose = require('mongoose');
const schema = new mongoose.Schema({
  name:String,
   email:{type:String,unique:true},
    password:String, 
    role:{type:String,default:'user'}
});
module.exports = mongoose.model('User', schema);