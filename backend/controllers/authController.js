import mongoose from "mongoose";
import dotenv from "dotenv";
import crypto from "crypto";
import nodemailer from "nodemailer";

dotenv.config();
// ---------------- LOGIN -----------------
export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body; // role will be "resident" | "worker" | "admin"

    if (!mongoose.connection.readyState) {
      await mongoose.connect(process.env.MONGO_URI);
    }

    // Map role -> collection name
    const roleToCollection = {
      resident: "residents",
      worker: "workers",
      admin: "admins"
    };

    const collection = roleToCollection[role];
    if (!collection) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Find user only in the chosen collection
    const user = await mongoose.connection.db.collection(collection).findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found in this role" });
    }

    // Plain password check (⚠️ replace with bcrypt later)
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Return role & user
    res.json({
      message: "Login successful",
      role,
      user
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error logging in" });
  }
};

// ---------------- REGISTER -----------------
export const register = async (req, res) => {
  try {
    const { role, email, password, ...rest } = req.body;

    if (!mongoose.connection.readyState) {
      await mongoose.connect(process.env.MONGO_URI);
    }

    // Map role -> collection name
    const roleToCollection = {
      resident: "residents",
      worker: "workers",
      admin: "admins",
    };

    const collection = roleToCollection[role];
    if (!collection) {
      return res.status(400).json({ message: "Invalid role" });
    }

    // Check if user already exists
    const existingUser = await mongoose.connection.db
      .collection(collection)
      .findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists with this email" });
    }

    // ⚠️ plain password now, but use bcrypt in future
    const newUser = {
      email,
      password,
      ...rest, // role-specific fields like name, address, zone etc.
      createdAt: new Date(),
    };

    const result = await mongoose.connection.db
      .collection(collection)
      .insertOne(newUser);

    res.status(201).json({
      message: "Registration successful",
      role,
      user: { id: result.insertedId, email, role },
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error registering user" });
  }
};

// ---------------- FORGOT PASSWORD -----------------
export const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;

    if (!mongoose.connection.readyState) {
      await mongoose.connect(process.env.MONGO_URI);
    }

    // Check all collections for the email
    let user = null;
    let collection = null;
    const collections = ["residents", "workers", "admins"];

    for (const col of collections) {
      user = await mongoose.connection.db.collection(col).findOne({ email });
      if (user) {
        collection = col;
        break;
      }
    }

    if (!user) return res.status(404).json({ message: "Email not found" });

    // Generate reset token
    const resetToken = crypto.randomBytes(32).toString("hex");
    const resetExpire = Date.now() + 10 * 60 * 1000; // 10 minutes

    // Save token in DB
    await mongoose.connection.db.collection(collection).updateOne(
      { email },
      { $set: { resetPasswordToken: resetToken, resetPasswordExpire: resetExpire } }
    );

    const resetUrl = `http://localhost:3000/reset-password/${resetToken}`;

    // ---------- Nodemailer transporter ----------
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD, // App password
      },
    });

    // Send email
    await transporter.sendMail({
      to: email,
      subject: "Password Reset Request",
      html: `<p>You requested a password reset.</p>
             <p><a href="${resetUrl}">Click here to reset your password</a></p>
             <p>This link will expire in 10 minutes.</p>`,
    });

    res.json({ message: "Reset link sent to your email" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error sending reset link" });
  }
};

// ---------------- RESET PASSWORD -----------------
export const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!mongoose.connection.readyState) {
      await mongoose.connect(process.env.MONGO_URI);
    }

    // Check all collections for the token
    let user = null;
    let collection = null;
    const collections = ["residents", "workers", "admins"];

    for (const col of collections) {
      user = await mongoose.connection.db.collection(col).findOne({
        resetPasswordToken: token,
        resetPasswordExpire: { $gt: Date.now() },
      });
      if (user) {
        collection = col;
        break;
      }
    }

    if (!user) return res.status(400).json({ message: "Invalid or expired token" });

    // Update password + clear reset fields
    await mongoose.connection.db.collection(collection).updateOne(
      { email: user.email },
      {
        $set: { password },
        $unset: { resetPasswordToken: "", resetPasswordExpire: "" },
      }
    );

    res.json({ message: "Password reset successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error resetting password" });
  }
};
