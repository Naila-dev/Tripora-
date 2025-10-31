// backend/routes/auth.js
const express = require("express");
const router = express.Router();

// ✅ Correct import path
const { registerUser, loginUser } = require("../controllers/authController");

// ✅ Define routes properly
router.post("/register", registerUser);
router.post("/login", loginUser);

module.exports = router;

