// backend/routes/complaintRoutes.js
import express from "express";
import multer from "multer";
import Complaint from "../models/Complaint.js";
const router = express.Router();

// Multer setup for file uploads
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/"); // save in uploads folder
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1E9);
    cb(null, uniqueSuffix + "-" + file.originalname);
  }
});
const upload = multer({ storage: storage });

// POST /api/complaints
router.post("/", upload.array("images", 5), async (req, res) => {
  try {
    const { residentId, title, description } = req.body;
    const images = req.files ? req.files.map(file => file.path) : [];

    const newComplaint = new Complaint({
      residentId,
      title,
      description,
      images
    });

    await newComplaint.save();
    res.status(201).json({ message: "Complaint submitted successfully", complaint: newComplaint });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// GET /api/complaints/:residentId
router.get("/:residentId", async (req, res) => {
  try {
    const { residentId } = req.params;
    const complaints = await Complaint.find({ residentId }).sort({ createdAt: -1 });
    res.status(200).json(complaints);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

// Get all complaints
router.get("/", async (req, res) => {
  try {
    const complaints = await Complaint.find().sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

export default router;
