import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.js"; // note the .js

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use("/api/auth", authRoutes);
//--------------forgot password-----------

app.post('/api/forgot-password', (req, res) => {
  const { email } = req.body;

  // Check if user exists
  const query = 'SELECT * FROM users WHERE email = ?';
  db.query(query, [email], (err, results) => {
    if (err) {
      console.error("❌ Forgot password error:", err);
      return res.status(500).json({ message: 'Server error' });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: 'Email not found' });
    }

    // Here you would generate a reset token & send an email
    console.log(`✅ Password reset requested for: ${email}`);
    return res.json({ message: 'If this email is registered, a reset link has been sent.' });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
