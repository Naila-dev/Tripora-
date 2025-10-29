// backend/routes/tours.js
const express = require("express");
const router = express.Router();
const { protect, admin } = require("../middleware/authMiddleware");
const tourController = require("../controllers/tourController");

// Public routes
router.get("/", tourController.getTours);
router.get("/:id", tourController.getTour);

// Admin routes
router.post("/", protect, admin, tourController.createTour);
router.put("/:id", protect, admin, tourController.updateTour);
router.delete("/:id", protect, admin, tourController.deleteTour);

module.exports = router;
