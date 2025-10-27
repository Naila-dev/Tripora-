// backend/routes/payments.js
const express = require("express");
const axios = require("axios");
const router = express.Router();
const Booking = require("../models/Booking");
require("dotenv").config();

// Error types
const PaymentErrors = {
  INVALID_AMOUNT: 'INVALID_AMOUNT',
  INSUFFICIENT_FUNDS: 'INSUFFICIENT_FUNDS',
  PAYMENT_CANCELLED: 'PAYMENT_CANCELLED',
  NETWORK_ERROR: 'NETWORK_ERROR',
  INVALID_PHONE: 'INVALID_PHONE',
  TIMEOUT: 'TIMEOUT',
  SERVER_ERROR: 'SERVER_ERROR'
};

// M-Pesa credentials from env
const {
  MPESA_CONSUMER_KEY,
  MPESA_CONSUMER_SECRET,
  MPESA_SHORTCODE,
  MPESA_PASSKEY,
  MPESA_CALLBACK_URL,
} = process.env;

// Get access token
const getAccessToken = async () => {
  const auth = Buffer.from(`${MPESA_CONSUMER_KEY}:${MPESA_CONSUMER_SECRET}`).toString("base64");
  const response = await axios.get("https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials", {
    headers: { Authorization: `Basic ${auth}` },
  });
  return response.data.access_token;
};

// STK Push endpoint
router.post("/stkpush", async (req, res) => {
  try {
    const { phone, amount, bookingId } = req.body;

    // Validate inputs
    if (!phone || !amount || !bookingId) {
      return res.status(400).json({
        error: PaymentErrors.INVALID_PHONE,
        message: "Phone, amount, and booking ID are required"
      });
    }

    // Update booking status to processing
    await Booking.findByIdAndUpdate(bookingId, {
      paymentStatus: 'processing',
      'paymentError': null
    });

    const token = await getAccessToken();
    const timestamp = new Date()
      .toISOString()
      .replace(/[-T:\.Z]/g, "")
      .slice(0, 14);
// Generate password
    const password = Buffer.from(`${MPESA_SHORTCODE}${MPESA_PASSKEY}${timestamp}`).toString("base64");

    const payload = {
      BusinessShortCode: MPESA_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phone,
      PartyB: MPESA_SHORTCODE,
      PhoneNumber: phone,
      CallBackURL: MPESA_CALLBACK_URL,
      AccountReference: "TriporaBooking",
      TransactionDesc: "Tour booking payment",
    };

    const response = await axios.post("https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest", payload, {
      headers: { Authorization: `Bearer ${token}` },
    });

    res.status(200).json({
      message: "STK push initiated",
      data: response.data,
    });
  } catch (err) {
    console.error("M-Pesa STK Error:", err.response?.data || err.message);
    res.status(500).json({ error: "Failed to initiate STK push" });
  }
});

// Callback route
router.post("/mpesa-callback", async (req, res) => {
  try {
    const { Body: { stkCallback: { ResultCode, ResultDesc, CallbackMetadata } }, } = req.body;

    // Get the BookingId from your custom metadata
    const bookingId = req.body.Body.stkCallback.MerchantRequestID;

    if (ResultCode === 0) {
      // Payment successful
      await Booking.findByIdAndUpdate(bookingId, {
        paymentStatus: 'completed',
        paymentError: null
      });

      // Additional success processing here
      console.log("✅ Payment successful for booking:", bookingId);
    } else {
      // Payment failed
      const errorMapping = {
        1: PaymentErrors.INSUFFICIENT_FUNDS,
        2: PaymentErrors.INVALID_PHONE,
        3: PaymentErrors.PAYMENT_CANCELLED,
        // Add more error codes as needed
      };

      await Booking.findByIdAndUpdate(bookingId, {
        paymentStatus: 'failed',
        paymentError: {
          code: errorMapping[ResultCode] || PaymentErrors.SERVER_ERROR,
          message: ResultDesc,
          timestamp: new Date()
        }
      });

      console.error("❌ Payment failed:", ResultDesc);
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error("Error processing M-Pesa callback:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Check payment status endpoint
router.get("/status/:bookingId", async (req, res) => {
  try {
    const booking = await Booking.findById(req.params.bookingId)
      .select('paymentStatus paymentError');
    
    if (!booking) {
      return res.status(404).json({
        error: 'BOOKING_NOT_FOUND',
        message: 'Booking not found'
      });
    }

    res.json({
      status: booking.paymentStatus,
      error: booking.paymentError,
      timestamp: new Date()
    });
  } catch (error) {
    console.error("Error checking payment status:", error);
    res.status(500).json({
      error: PaymentErrors.SERVER_ERROR,
      message: "Failed to check payment status"
    });
  }
});

module.exports = router;

