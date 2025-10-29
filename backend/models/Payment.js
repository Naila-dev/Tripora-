// backend/routes/payments.js
const express = require("express");
const router = express.Router();
const protect = require("../middleware/authMiddleware");
const paymentController = require("../controllers/paymentController");

router.post("/stkpush", protect, paymentController.stkPush);
router.post("/mpesa-callback", paymentController.mpesaCallback);
router.get("/status/:bookingId", protect, paymentController.getStatus);

module.exports = router;
