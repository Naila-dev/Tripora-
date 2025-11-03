const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

const authRoutes = require('./routes/auth');
const tourRoutes = require('./routes/tours');
const bookingRoutes = require('./routes/bookings');
const paymentRoutes = require('./routes/payments');


const app = express();

// Middleware
app.use(cors({
    origin: 'http://localhost:3000' // Allow requests from your React frontend
}));
app.use(express.json());

// Serve static files from the 'uploads' directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// Simple test route for /tripora
app.get('/tripora', (req, res) => {
    res.send('✅ Tripora API is running!');
});


// Routes
app.use('/tripora/auth', authRoutes);
app.use('/tripora/tours', tourRoutes);
app.use('/tripora/bookings', bookingRoutes);
app.use('/tripora/payments', paymentRoutes);

// DB connection
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
