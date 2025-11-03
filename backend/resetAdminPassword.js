require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

// --- IMPORTANT ---
// 1. Set the new password you want to use below.
// 2. Make sure the user email is correct.
const USER_EMAIL = 'njambifaith001@gmail.com';
const NEW_PASSWORD = 'myNewSecurePassword123'; // Change this if you want to reset the password
const USER_PHONE = '0700000000'; // Add a phone number for the user
// -----------------

(async () => {
  if (NEW_PASSWORD === 'your_new_secure_password' || !USER_PHONE) {
    console.error("❌ Please change the NEW_PASSWORD in the script before running.");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected...');

    // Hash the password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(NEW_PASSWORD, salt);

    // Prepare the updates
    const updates = {
      password: hashedPassword,
      phone: USER_PHONE // Add the required phone number
      // You can also set the role here if needed, e.g., role: 'admin'
    };

    const result = await User.updateOne(
      { email: USER_EMAIL },
      { $set: updates }
    );

    if (result.matchedCount === 0) {
      console.log(`❌ User with email "${USER_EMAIL}" not found.`);
    } else {
      console.log(`✅ User "${USER_EMAIL}" has been updated successfully.`);
    }
  } catch (err) {
    console.error("An error occurred:", err);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected.');
  }
})();