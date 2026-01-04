// Notes:

// otp & otpExpiry used with Node Cron for automatic cleanup.

// loginAttempts & lockUntil for security and account lockout.




import mongoose from "mongoose";

// Schema definition
const userSchema = new mongoose.Schema(
  {
    name: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    isEmailVerified: { type: Boolean, default: false },
    otp: { type: String },
    otpExpiry: { type: Date },
    loginAttempts: { type: Number, default: 0 },
    lockUntil: { type: Date },
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
