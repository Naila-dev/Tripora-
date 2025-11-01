const express = require('express');
const router = express.Router();
const { stkPush, mpesaCallback, getStatus } = require('../controllers/paymentController');
const protect = require('../middleware/authMiddleware');

// Initiate payment
router.post('/', protect, stkPush);

// M-Pesa callback
router.post('/mpesa-callback', mpesaCallback);

// Check payment status
router.get('/:bookingId', getStatus);

module.exports = router;

