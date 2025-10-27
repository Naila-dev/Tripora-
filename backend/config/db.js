// backend/config/db.js
const mongoose = require("mongoose");
// Load env vars
const dotenv = require("dotenv");
dotenv.config();
const connectDB = async () => {
  // Connect to MongoDB
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ Database connection error:", err.message);
    process.exit(1);
  }
};

module.exports = connectDB;
