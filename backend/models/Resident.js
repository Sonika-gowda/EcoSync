import mongoose from "mongoose";

const residentSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  address: String,
  phone: String,
  houseNumber: String,
  profileImage: { type: String, default: null }
}, { timestamps: true });

const Resident = mongoose.model("Resident", residentSchema);
export default Resident;
