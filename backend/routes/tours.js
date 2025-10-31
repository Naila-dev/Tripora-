// backend/routes/tours.js
const express = require("express");
const router = express.Router();
const {
  createTour,
  getTours,
  getTourById,
  updateTour,
  deleteTour,
} = require("../controllers/tourController");

// ✅ Public routes (no admin or auth restrictions)
router.get("/", getTours);
router.get("/:id", getTourById);
router.post("/", createTour);
router.put("/:id", updateTour);
router.delete("/:id", deleteTour);

module.exports = router;





