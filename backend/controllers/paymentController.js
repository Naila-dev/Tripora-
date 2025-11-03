// backend/controllers/paymentController.js
const axios = require("axios");
const Booking = require("../models/Booking");
const Payment = require("../models/Payment");
require("dotenv").config();

// Helper: Get M-Pesa access token dynamically
const getAccessToken = async () => {
  const auth = Buffer.from(
    `${process.env.MPESA_CONSUMER_KEY}:${process.env.MPESA_CONSUMER_SECRET}`
  ).toString("base64");

  const response = await axios.get(
    "https://sandbox.safaricom.co.ke/oauth/v1/generate?grant_type=client_credentials",
    { headers: { Authorization: `Basic ${auth}` } }
  );

  return response.data.access_token;
};

// Helper: Format phone number to 254...
const formatPhoneNumber = (phone) => {
  if (phone.startsWith('0')) {
    return `254${phone.substring(1)}`;
  }
  if (phone.startsWith('+254')) {
    return phone.substring(1);
  }
  // Assume it's already in the correct format if none of the above
  return phone;
};

// Initiate STK Push
exports.stkPush = async (req, res) => {
  try {
    const { phone, amount, bookingId } = req.body;

    if (!phone || !amount || !bookingId) {
      return res.status(400).json({ message: "Phone, amount, and booking ID are required" });
    }

    const formattedPhone = formatPhoneNumber(phone);

    // Verify booking exists
    const booking = await Booking.findById(bookingId);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    // Create payment record
    const payment = await Payment.create({
      booking: bookingId,
      amount,
      status: "processing",
    });

    const token = await getAccessToken();
    const timestamp = new Date().toISOString().replace(/[-T:\.Z]/g, "").slice(0, 14);
    const password = Buffer.from(
      `${process.env.MPESA_SHORTCODE}${process.env.MPESA_PASSKEY}${timestamp}`
    ).toString("base64");

    const payload = {
      BusinessShortCode: process.env.MPESA_SHORTCODE,
      Password: password,
      Timestamp: timestamp,
      TransactionType: "CustomerPayBillOnline",
      Amount: amount,
      PartyA: formattedPhone,
      PartyB: process.env.MPESA_SHORTCODE,
      PhoneNumber: formattedPhone,
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
  console.error("STK push error:", err.response?.data || err.message || err);
  res.status(500).json({
    message: "Failed to initiate STK push",
    error: err.response?.data || err.message || err,
  });
}

};

// Handle M-Pesa STK Push confirmation callback
exports.confirmPayment = async (req, res) => {
  console.log("Full M-Pesa callback body:", JSON.stringify(req.body, null, 2));

  try {
    const { Body } = req.body;
    if (!Body || !Body.stkCallback) {
      return res.status(400).json({ error: "Invalid callback payload" });
    }

    const { MerchantRequestID, CheckoutRequestID, ResultCode, ResultDesc, CallbackMetadata } = Body.stkCallback;

    // Find the payment record using the CheckoutRequestID
    const payment = await Payment.findOne({ checkoutRequestId: CheckoutRequestID });

    if (!payment) {
      console.error(`Payment not found for CheckoutRequestID: ${CheckoutRequestID}`);
      // Respond to Safaricom but don't throw an error that crashes the server
      return res.status(404).json({ message: "Payment record not found" });
    }

    if (ResultCode === 0) {
      // Payment was successful
      const metadata = CallbackMetadata.Item.reduce((acc, item) => {
        acc[item.Name] = item.Value;
        return acc;
      }, {});

      payment.status = "completed";
      payment.mpesaReceiptNumber = metadata.MpesaReceiptNumber;
      payment.paidAt = new Date(); // Or parse from metadata.TransactionDate
      
      // Update the corresponding booking status
      await Booking.findByIdAndUpdate(payment.booking, { status: "paid" });

    } else {
      // Payment failed or was cancelled
      payment.status = "failed";
      payment.error = {
        code: ResultCode,
        message: ResultDesc,
      };
    }

    await payment.save();

    // Acknowledge receipt of the callback to Safaricom
    res.status(200).json({ message: "Callback received successfully" });

  } catch (error) {
    console.error("Failed to process callback:", error);
    res.status(500).json({ error: "Failed to process callback" });
  }
};

// M-Pesa callback
exports.mpesaCallback = async (req, res) => {
  try {
    const callback = req.body.Body.stkCallback;
    const { MerchantRequestID, ResultCode, ResultDesc, CallbackMetadata } = callback;

    // Find payment using MerchantRequestID
    const payment = await Payment.findOne({ _id: MerchantRequestID }); // You may want to store MerchantRequestID when creating payment
    if (!payment) return res.status(404).send();

    if (ResultCode === 0) {
      payment.status = "completed";
      payment.paidAt = new Date();
      await payment.save();

      // Update booking status
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

// Get payment status
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
