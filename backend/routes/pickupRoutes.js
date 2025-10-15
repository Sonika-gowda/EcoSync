import express from "express";
import Pickup from "../models/pickup.js";

const router = express.Router();

// Create a new pickup request
router.post("/", async (req, res) => {
  try {
    const { residentId, wasteType, quantity, preferredDate, preferredTime, notes, address, image } = req.body;

    if (!residentId || !wasteType || !quantity) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const newPickup = new Pickup({
      residentId,
      wasteType,
      quantity,
      preferredDate,
      preferredTime,
      notes,
      address,
      image,
    });

    await newPickup.save();
    res.status(201).json({ message: "Pickup request submitted", pickup: newPickup });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
});

// Get all pickups for a resident
router.get("/:residentId", async (req, res) => {
  try {
    const pickups = await Pickup.find({ residentId: req.params.residentId }).sort({ createdAt: -1 });
    res.json(pickups);
  } catch (err) {
    res.status(500).json({ message: "Server error" });
  }
});

export default router;
