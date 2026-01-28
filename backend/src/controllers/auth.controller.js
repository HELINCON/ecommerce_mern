import bcrypt from "bcrypt";
import User from "../models/User.js";
import { generateOTP } from "../services/otp.service.js";
import { enqueueEmail } from "../services/email.dispatch.js";

export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: "Email already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOTP();

    await User.create({
      name,
      email,
      password: hashedPassword,
      otp,
      otpExpiry: Date.now() + 10 * 60 * 1000,
    });

    await enqueueEmail({
      to: email,
      subject: "Verify Your Email",
      text: `Your OTP is: ${otp}`,
    });

    res.status(201).json({ message: "Registration successful. Please verify your email." });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during registration" });
  }
};
