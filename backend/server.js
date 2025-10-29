// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const path = require("path");

dotenv.config();
const app = express();

// ====== Middleware ======
app.use(express.json());

// Allow frontend localhost
app.use(cors({ origin: ["http://localhost:3000"], credentials: true }));

// ====== Connect DB ======
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// ====== Models ======
const Tour = require("./models/Tour");
const Booking = require("./models/Booking");
const User = require("./models/User");

// ====== Routes ======
app.use("/tripora/tours", require("./routes/tours"));
app.use("/tripora/bookings", require("./routes/bookings"));
app.use("/tripora/payments", require("./routes/payments"));
app.use("/tripora/auth", require("./routes/auth"));

// ====== Serve Frontend in Production ======
const buildPath = path.join(__dirname, "../frontend/build");
if (process.env.NODE_ENV === "production") {
  app.use("/tripora", express.static(buildPath));
  app.get("/tripora/*", (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
  });
}

// ====== Start Server ======
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
