require('dotenv').config();
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');

// --- IMPORTANT ---
// 1. Set the new password you want to use below.
// 2. Make sure the admin email is correct.
const ADMIN_EMAIL = 'admin@example.com';
const NEW_PASSWORD = 'myNewSecurePassword123'; // Change this!
// -----------------

(async () => {
  if (NEW_PASSWORD === 'qwerty' || NEW_PASSWORD === 'your_new_secure_password') {
    console.error("❌ Please change the NEW_PASSWORD in the script before running.");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB connected...');

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(NEW_PASSWORD, salt);

    const result = await User.updateOne({ email: ADMIN_EMAIL }, { $set: { password: hashedPassword } });

    if (result.matchedCount === 0) {
      console.log(`❌ Admin user with email "${ADMIN_EMAIL}" not found.`);
    } else {
      console.log(`✅ Password for "${ADMIN_EMAIL}" has been reset successfully.`);
    }
  } catch (err) {
    console.error("An error occurred:", err);
  } finally {
    await mongoose.disconnect();
    console.log('MongoDB disconnected.');
  }
})();