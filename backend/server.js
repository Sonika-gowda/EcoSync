import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import mongoose from "mongoose";
import path from "path";
import userRoutes from "./routes/user.js";
import authRoutes from "./routes/authRoutes.js";       // your existing auth routes
import complaintRoutes from "./routes/complaintRoutes.js"; // new complaint routes
import profileRoutes from "./routes/profile.js";
import { fileURLToPath } from "url";
import violationRoutes from "./routes/violationRoutes.js";
import pickupRoutes from "./routes/pickupRoutes.js";

dotenv.config();
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(path.resolve(), "uploads"))); // serve uploaded images
app.use("/api/profile", profileRoutes);

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/complaints", complaintRoutes);
app.use("/api/pickups", pickupRoutes);
app.use("/api/violations", violationRoutes);
// ✅ Add this line for profile routes
app.use("/api/users", userRoutes); 

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("MongoDB connected");
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀Server running on port ${PORT}`));
  })
  .catch((err) => console.error("MongoDB connection error:", err));
