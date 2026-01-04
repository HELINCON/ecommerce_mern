// Notes:

// Used for refresh token rotation.

// expiresAt allows Node Cron cleanup of expired tokens.




import mongoose from "mongoose";

// Refresh token storage
const tokenSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  token: { type: String, required: true },
  ip: { type: String },
  userAgent: { type: String },
  expiresAt: { type: Date, required: true },
});

export default mongoose.model("Token", tokenSchema);
