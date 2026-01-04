import express from "express";
import { register, verifyEmail } from "../controllers/auth.controller.js";

const router = express.Router();

// Registration route
router.post("/register", register);

// Email OTP verification
router.post("/verify-email", verifyEmail);

export default router;
