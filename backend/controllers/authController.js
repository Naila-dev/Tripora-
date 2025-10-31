// backend/controllers/authController.js
const jwt = require('jsonwebtoken');

// generate JWT
const generateToken = (id, isAdmin) => {
  return jwt.sign({ id, isAdmin }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
};

// Example login route
exports.loginUser = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: 'Invalid credentials' });
  }

  // Only allow admin
  if (!user.isAdmin) {
    return res.status(403).json({ message: 'Not authorized' });
  }

  const token = generateToken(user._id, user.isAdmin);
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    isAdmin: user.isAdmin,
    token,
  });
};
