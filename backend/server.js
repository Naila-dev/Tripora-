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

app.get("/", (req, res) => res.send("API is running"));


// ====== Connect DB ======
// MongoDB connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      // these options are default in Mongoose 6+, no need to set
      // useNewUrlParser: true,
      // useUnifiedTopology: true
    });
    console.log("MongoDB connected");
  } catch (err) {
    console.error("MongoDB connection error:", err.message);
    process.exit(1);
  }
};

// ====== Routes ======
app.use("/tripora/tours", require("./routes/tours"));
app.use("/tripora/bookings", require("./routes/bookings"));
app.use("/tripora/payments", require("./routes/payments"));
app.use("/tripora/auth", require("./routes/auth")); // All auth routes (login, register) are prefixed with /tripora/auth

// ====== Serve Frontend in Production ======
const buildPath = path.join(__dirname, "../frontend/build");
if (process.env.NODE_ENV === "production") {
  app.use("/tripora", express.static(buildPath));
  app.get("/tripora/*", (req, res) => {
    res.sendFile(path.join(buildPath, "index.html"));
  });
}

// ====== Start Server ======
const startServer = async () => {
  try {
    await connectDB(); // Wait for the database to connect
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  } catch (err) {
    console.error("Failed to start server:", err);
    process.exit(1);
  }
};

startServer();
