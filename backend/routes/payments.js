// backend/routes/payments.js
const express = require('express');
const router = express.Router();
const axios = require('axios');
const protect = require('../middleware/authMiddleware');

router.post('/', protect, async (req, res) => {
    const { amount, phone } = req.body;

    try {
        // Example: call M-Pesa API (replace with actual credentials)
        const response = await axios.post('https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest', {
            // M-Pesa payload
        }, {
            headers: {
                Authorization: `Bearer ${process.env.MPESA_TOKEN}`
            }
        });

        res.json({ message: 'STK Push sent', data: response.data });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

module.exports = router;
