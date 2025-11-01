const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const dotenv = require('dotenv');

dotenv.config();

const authRoutes = require('./routes/auth');
const tourRoutes = require('./routes/tours');
const bookingRoutes = require('./routes/bookings');
const paymentRoutes = require('./routes/payments');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Routes
app.use('/tripora/auth', authRoutes);
app.use('/tripora/tours', tourRoutes);
app.use('/tripora/bookings', bookingRoutes);
app.use('/tripora/payments', paymentRoutes);

// DB connection
mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
