import express from "express";
import Violation from "../models/Violation.js";

const router = express.Router();

// Get all violations for a resident
router.get("/:residentId", async (req, res) => {
  try {
    const residentId = req.params.residentId;
    const violations = await Violation.find({ residentId }).sort({ createdAt: -1 }).lean();
    res.json(violations);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error fetching violations" });
  }
});

export default router;
