import express from "express";
import { login, register, forgotPassword, resetPassword } from "../controllers/authController.js";

const router = express.Router();

// Existing login route
router.post("/login", login);
router.post("/register", register);
// New routes
router.post("/forgot-password", forgotPassword);
router.post("/reset-password/:token", resetPassword);

export default router;
