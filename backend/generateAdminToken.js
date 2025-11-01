require('dotenv').config();
const jwt = require('jsonwebtoken');
const mongoose = require('mongoose');
const User = require('./models/User');

(async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGO_URI);

    // Find your admin user
    const adminUser = await User.findOne({ email: 'admin@example.com' });
    if (!adminUser) {
      console.log("Admin user not found!");
      process.exit();
    }

    // Generate fresh JWT token
    const token = jwt.sign(
      { id: adminUser._id, role: adminUser.role },
      process.env.JWT_SECRET,
      { expiresIn: '15m' }
    );

    console.log("✅ Admin token:", token);

  } catch (err) {
    console.error(err);
  } finally {
    process.exit();
  }
})();



