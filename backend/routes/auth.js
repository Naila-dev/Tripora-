// backend/routes/auth.js
const express = require('express');
const router = express.Router();
const { registerUser, loginUser, refreshToken, logoutUser } = require('../controllers/authController');
const protect = require('../middleware/authMiddleware');
const admin = require('../middleware/adminMiddleware');

// Register
router.post('/register', registerUser);

// Login
router.post('/login', loginUser);


// Refresh Token
router.post('/refresh', refreshToken);

// Logout (revokes refresh token)
router.post('/logout', protect, logoutUser);



module.exports = router;
