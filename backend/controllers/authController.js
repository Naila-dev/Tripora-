// backend/controllers/authController.js
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const User = require("../models/User");

// 🔐 Helper: Generate a JWT
const generateAccessToken = (user) => {
  return jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (user) => {
  return jwt.sign({ id: user._id }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
};


// 🧾 Register User
exports.registerUser = async (req, res) => {
  try {
    const { name, email, phone, password, role } = req.body;

    // Check if email or phone already exists
    const existingUser = await User.findOne({ $or: [{ email }, { phone }] });
    if (existingUser) {
      return res.status(400).json({ message: "Email or phone already in use" });
    }

    // Create new user
    const user = await User.create({
      name,
      email,
      phone,
      password,
      role: role || "user",
    });

    // Generate tokens
    const token = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    res.status(201).json({
      message: "User registered successfully", 
      token, // ✅ Include JWT token
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      refreshToken
    });
  } catch (error) {
    res.status(500).json({
      message: "Error registering user",
      error: error.message,
    });
  }
};

// 🔑 Login User
exports.loginUser = async (req, res) => {
  try {
    console.log("1. Admin login request received.");
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
      console.log("Login failed: User not found.");
      return res.status(400).json({ message: "Invalid credentials" });
    }
    console.log("2. User found in database:", user.email, "Role:", user.role);

    // Check password
    const isMatch = await user.matchPassword(password);
    if (!isMatch) return res.status(400).json({ message: "Invalid credentials" });
    console.log("3. Password matches.");

    // Generate tokens
    console.log("4. Generating tokens. JWT_SECRET:", process.env.JWT_SECRET ? "Loaded" : "MISSING!");
    const token = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    res.json({
      
      message: "Login successful", 
      token, // ✅ Include JWT token
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
      },
      refreshToken
    });
  } catch (error) {
    console.error("❌ 5. ERROR during login:", error);
    res.status(500).json({
      message: "Login failed",
      error: error.message,
    });
  }
};

// 🔄 Refresh Token
exports.refreshToken = async (req, res) => {
  const { refreshToken } = req.body;
  if (!refreshToken) return res.status(401).json({ message: 'No refresh token provided' });

  try {
    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);
    const user = await User.findById(decoded.id);

    // Check if the token from the request matches the one in the DB
    if (!user || user.refreshToken !== refreshToken) {
      return res.status(403).json({ message: 'Invalid refresh token' });
    }

    const newAccessToken = generateAccessToken(user);
    return res.json({ token: newAccessToken });

  } catch (err) {
    return res.status(403).json({ message: 'Refresh token invalid or expired' });
  }
};

// 🚪 Logout User
exports.logoutUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user) {
      user.refreshToken = undefined; // or null
      await user.save();
    }
    res.status(200).json({ message: 'Logout successful' });
  } catch (error) {
    res.status(500).json({ message: 'Server error during logout' });
  }
};
