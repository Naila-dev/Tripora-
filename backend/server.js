// backend/server.js
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Routes
const authRoutes = require("./routes/auth");
const tourRoutes = require("./routes/tours");

app.use("/tripora/auth", authRoutes);
app.use("/tripora/tours", tourRoutes);

app.get("/", (req, res) => {
  res.send("Tripora API Running...");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
