import bcrypt from "bcrypt";
import User from "../models/User.js";
import Token from "../models/Token.js";
import { generateAccessToken, generateRefreshToken } from "../services/token.service.js";

/**
 * User login
 */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

    // Check account lockout
    if (user.lockUntil && user.lockUntil > Date.now()){
      return res.status(403).json({ message: "Account locked due to failed attempts" })
    };

    // Password verification
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      user.loginAttempts += 1;
      if (user.loginAttempts >= 5) user.lockUntil = Date.now() + 30 * 60 * 1000; // 30 min lock
      await user.save();
      return res.status(400).json({ message: "Invalid credentials" });
    }

    // Reset login attempts
    user.loginAttempts = 0;
    user.lockUntil = null;
    await user.save();

    // Generate tokens
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    // Store refresh token in DB
    await Token.create({
      userId: user._id,
      token: refreshToken,
      ip: req.ip,
      userAgent: req.headers["user-agent"],
      expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    });

    res
      .cookie("accessToken", accessToken, { httpOnly: true })
      .cookie("refreshToken", refreshToken, { httpOnly: true })
      .json({ message: "Login successful" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error during login" });
  }
};
