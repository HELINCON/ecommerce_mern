// Notes:

// Expired invites will be removed by Node Cron.

import mongoose from "mongoose";

// Admin invitation schema
const adminInviteSchema = new mongoose.Schema({
  email: { type: String, required: true },
  token: { type: String, required: true },
  expiresAt: { type: Date, required: true },
  used: { type: Boolean, default: false },
});

export default mongoose.model("AdminInvite", adminInviteSchema);
