const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");
const connectDB = require("./config/db");
// Load env vars
dotenv.config();
connectDB();
// Initialize app
const app = express();
app.use(express.json());
app.use(cors());

    // Serve frontend build static assets (images, css, js) under /tripora
const publicPath = path.join(__dirname, "..", "frontend", "public");
const buildPath = path.join(__dirname, "..", "frontend", "build");
// Serve images at /tripora/images/*
app.use('/tripora/images', express.static(path.join(publicPath, 'images')));
// Serve other static assets (js/css)
app.use('/tripora/static', express.static(path.join(buildPath, 'static')));

// Routes
app.use("/tripora/auth", require("./routes/auth"));
app.use("/tripora/tours", require("./routes/tours"));
app.use("/tripora/bookings", require("./routes/bookings"));
app.use("/tripora/payments", require("./routes/payments"));

// Serve React app for all other routes
app.get(/.*/, (req, res) => {
  res.sendFile(path.join(buildPath, 'index.html'));
});
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
