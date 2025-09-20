import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export const login = async (req, res) => {
  const { email, password, role } = req.body;

  try {
    if (!mongoose.connection.readyState) {
      await mongoose.connect(process.env.MONGO_URI);
    }

    let user = null;
    if (role === "resident") {
      user = await mongoose.connection.db.collection("residents").findOne({ email });
    } else if (role === "worker") {
      user = await mongoose.connection.db.collection("workers").findOne({ email });
    } else if (role === "admin") {
      user = await mongoose.connection.db.collection("admins").findOne({ email });
    } else {
      return res.status(400).json({ message: "Invalid role" });
    }

    if (!user) return res.status(400).json({ message: "User not found" });
    if (user.password !== password) return res.status(400).json({ message: "Incorrect password" });

    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: role
    });

  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
