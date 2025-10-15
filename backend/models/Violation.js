import mongoose from "mongoose";

const violationSchema = new mongoose.Schema({
  residentId: { type: mongoose.Schema.Types.ObjectId, ref: "Resident", required: true },
  workerId: { type: mongoose.Schema.Types.ObjectId, ref: "Worker", required: true },
  type: { type: String, required: true }, // e.g., "Not separating wet/dry waste"
  fine: { type: Number, required: true },
  status: { type: String, enum: ["unpaid", "paid"], default: "unpaid" },
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model("Violation", violationSchema);
