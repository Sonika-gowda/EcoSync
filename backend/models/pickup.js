import mongoose from "mongoose";

const pickupSchema = new mongoose.Schema({
  residentId: { type: mongoose.Schema.Types.ObjectId, ref: "residents", required: true },
  wasteType: { type: String, required: true },
  quantity: { type: String, required: true },
  preferredDate: { type: Date },
  preferredTime: { type: String },
  notes: { type: String },
  address: { type: String },
  image: { type: String }, // base64 or path
  status: { type: String, default: "pending" },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model("pickups", pickupSchema);
