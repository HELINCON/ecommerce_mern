import bcrypt from "bcrypt";
import User from "../models/User.js";
import { generateOTP } from "../services/otp.service.js";
import { sendMail } from "../services/mail.service.js";

/**
 * User registration
 */
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Generate OTP
    const otp = generateOTP();

    // Create user with OTP
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpiry: Date.now() + 10 * 60 * 1000, // 10 min
    });

    // Send verification email
    await sendMail(email, "Verify Your Email", `Your OTP is: ${otp}`);

    res.status(201).json({ message: "Registration successful. Please verify your email." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during registration" });
  }
};

/**
 * Verify email OTP
 */
export const verifyEmail = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid email" });
    if (user.isEmailVerified) return res.status(400).json({ message: "Email already verified" });
    if (user.otp !== otp || user.otpExpiry < Date.now())
      return res.status(400).json({ message: "Invalid or expired OTP" });

    user.isEmailVerified = true;
    user.otp = null;
    user.otpExpiry = null;
    await user.save();

    res.json({ message: "Email verified successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during verification" });
  }
};
