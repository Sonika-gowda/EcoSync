import mongoose from "mongoose";

const workerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phone: String,
  assignedRoute: String,
  profileImage: { type: String, default: null }
}, { timestamps: true });

const Worker = mongoose.model("Worker", workerSchema);
export default Worker;
