// backend/models/Complaint.js
import mongoose from "mongoose";

const complaintSchema = new mongoose.Schema({
  residentId: { type: mongoose.Schema.Types.ObjectId, ref: "Resident", required: true },
  title: { type: String, required: true },          // keep title
  description: { type: String, required: true },    // complaint description
  images: [{ type: String }],                       // array of image file paths
  status: { type: String, default: "pending" },    // pending / in-progress / resolved
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date }
});

export default mongoose.model("Complaint", complaintSchema);
