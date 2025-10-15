import express from "express";
import Resident from "../models/Resident.js";
import Admin from "../models/Admin.js";
import Worker from "../models/Worker.js";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Multer storage setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, "../uploads")); // make sure uploads/ exists
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ===== GET profile by role + email =====
router.get("/:role/:email", async (req, res) => {
  try {
    const { role, email } = req.params;
    let user;

    if (role === "resident") user = await Resident.findOne({ email });
    else if (role === "admin") user = await Admin.findOne({ email });
    else if (role === "worker") user = await Worker.findOne({ email });
    else return res.status(400).json({ error: "Invalid role" });

    if (!user) return res.status(404).json({ error: "User not found" });

    res.json(user);
  } catch (err) {
    console.error("Error fetching profile:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ===== PUT route to update profile =====
router.put("/:role/:email", upload.single("profileImage"), async (req, res) => {
  try {
    const { role, email } = req.params;
    let Model;

    if (role === "resident") Model = Resident;
    else if (role === "worker") Model = Worker;
    else if (role === "admin") Model = Admin;
    else return res.status(400).json({ error: "Invalid role" });

    const updateData = { ...req.body };

    if (req.file) {
      updateData.profileImage = `/uploads/${req.file.filename}`;
    }

    const updatedUser = await Model.findOneAndUpdate(
      { email },
      updateData,
      { new: true }
    );

    if (!updatedUser) return res.status(404).json({ error: "User not found" });

    res.json(updatedUser);
  } catch (err) {
    console.error("Error updating profile:", err);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

export default router;
