// scripts/cleanupTours.js
require("dotenv").config();
const mongoose = require("mongoose");
const axios = require("axios");
const Tour = require("../models/Tour");

const FRONTEND_TOURS_API = "https://localhost:3000/api/tours"; 
// Replace with the actual frontend or backend public API endpoint returning tours (e.g. https://tripora-backend.onrender.com/api/tours)

(async () => {
  try {
    // Connect to MongoDB
await mongoose.connect(process.env.MONGO_URI, {
  directConnection: true,
  tls: false,
});

    console.log("Connected to MongoDB for cleanup.");

    // Fetch current valid tours from frontend/backend API
    const { data } = await axios.get(FRONTEND_TOURS_API);
    const validIds = data.map(t => t._id);
    console.log(`Fetched ${validIds.length} valid tours from API.`);

    // Delete tours not matching valid IDs
    const result = await Tour.deleteMany({ _id: { $nin: validIds } });
    console.log(`Deleted ${result.deletedCount} outdated tours.`);

  } catch (err) {
    console.error("Cleanup failed:", err.message);
  } finally {
    mongoose.connection.close();
  }
})();
