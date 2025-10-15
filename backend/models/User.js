// backend/models/User.js
import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
   phone: 
   { type: String 

   },
  address: { 
    type: String
  },
  role: {
    type: String,
    enum: ["resident", "worker", "admin"],
    required: true,
  },
  resetPasswordToken: String,
  resetPasswordExpire: Date,
});

// Export the model
const User = mongoose.model("User", userSchema);
export default User;
