// backend/routes/payments.js
const express = require("express");
const axios = require("axios");
const router = express.Router();
require("dotenv").config();

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
    const { phone, amount } = req.body;
    const token = await getAccessToken();

    const timestamp = new Date()
      .toISOString()
      .replace(/[-T:\.Z]/g, "")
      .slice(0, 14);

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
router.post("/mpesa-callback", (req, res) => {
  console.log("✅ M-Pesa Callback received:", req.body);
  res.sendStatus(200);
});

module.exports = router;

