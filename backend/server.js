const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const connectDB = require("./config/db");
// Load env vars
dotenv.config();
connectDB();
// Initialize app
const app = express();
app.use(express.json());
app.use(cors());

// Routes
app.use("/tripora/auth", require("./routes/auth"));
app.use("/tripora/tours", require("./routes/tours"));
app.use("/tripora/bookings", require("./routes/bookings"));
app.use("/tripora/payments", require("./routes/payments"));
// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
