// backend/controllers/paymentController.js
const axios = require("axios");
const Booking = require("../models/Booking");
const Payment = require("../models/Payment");

require("dotenv").config();

// Helper: M-Pesa access token
const getAccessToken = async () => {
  const auth = Buffer.from(`${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`).toString("base64");
  const response = await axios.get(
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    { headers: { Authorization: `Basic ${auth}` } }
  );
  return response.data.access_token;
};

// Initiate STK Push
exports.stkPush = async (req, res) => {
  try {
    const { phone, amount, bookingId } = req.body;

    if (!phone || !amount || !bookingId) {
      return res.status(400).json({ message: "Phone, amount, and booking ID are required" });
    }

    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // Create a Payment record
    const payment = await Payment.create({
      booking: bookingId,
      amount,
      status: "processing"
    });

    const token = await getAccessToken();
    const timestamp = new Date().toISOString().replace(/[-T:\.Z]/g, "").slice(0, 14);
    const password = Buffer.from(`${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`).toString("base64");

    const payload = {
      BusinessShortCode: process.env.MPESA_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: phone,
      PartyB: process.env.MPESA_SHORTCODE,
      PhoneNumber: phone,
      CallBackURL: process.env.MPESA_CALLBACK_URL,
      AccountReference: "TriporaBooking",
      TransactionDesc: "Tour booking payment",
    };

    const response = await axios.post(
      "https://sandbox.safaricom.co.ke/mpesa/stkpush/v1/processrequest",
      payload,
      { headers: { Authorization: `Bearer ${token}` } }
    );

    res.status(200).json({ message: "STK push initiated", payment, data: response.data });
  } catch (err) {
    console.error("STK push error:", err.response?.data || err.message);
    res.status(500).json({ message: "Failed to initiate STK push" });
  }
};

// M-Pesa callback
exports.mpesaCallback = async (req, res) => {
  try {
    const callback = req.body.Body.stkCallback;
    const { MerchantRequestID, ResultCode, ResultDesc, CallbackMetadata } = callback;

    const payment = await Payment.findOne({ _id: MerchantRequestID }); // or map MerchantRequestID -> Payment record
    if (!payment) return res.status(404).send();

    if (ResultCode === 0) {
      payment.status = "completed";
      payment.paidAt = new Date();
      await payment.save();

      // Update booking
      await Booking.findByIdAndUpdate(payment.booking, { paymentStatus: "completed" });
    } else {
      payment.status = "failed";
      payment.error = { code: ResultCode, message: ResultDesc };
      await payment.save();

      await Booking.findByIdAndUpdate(payment.booking, { paymentStatus: "failed" });
    }

    res.status(200).json({ received: true });
  } catch (error) {
    console.error("Callback error:", error);
    res.status(500).json({ message: "Callback processing failed" });
  }
};

// Payment status
exports.getStatus = async (req, res) => {
  try {
    const payment = await Payment.findOne({ booking: req.params.bookingId });
    if (!payment) return res.status(404).json({ message: "Payment not found" });

    res.json({
      status: payment.status,
      error: payment.error,
      timestamp: new Date(),
    });
  } catch (error) {
    console.error("Payment status error:", error);
    res.status(500).json({ message: "Failed to check payment status" });
  }
};
