// ✅ Used by Node Cron in src/config/cron.js.






import Token from "../models/Token.js";
import User from "../models/User.js";
import AdminInvite from "../models/AdminInvite.js";

/**
 * Cleanup expired refresh tokens, OTPs, and admin invites
 */
export const cleanupExpiredData = async () => {
  try {
    // Remove expired refresh tokens
    const tokensDeleted = await Token.deleteMany({ expiresAt: { $lte: new Date() } });

    // Remove expired OTPs
    const otpCleared = await User.updateMany(
      { otpExpiry: { $lte: new Date() } },
      { $set: { otp: null, otpExpiry: null } }
    );

    // Remove expired admin invites
    const invitesDeleted = await AdminInvite.deleteMany({ expiresAt: { $lte: new Date() } });

    console.log(
      `Cleanup Done: ${tokensDeleted.deletedCount} tokens, ${otpCleared.modifiedCount} OTPs, ${invitesDeleted.deletedCount} invites`
    );
  } catch (err) {
    console.error("Error during cleanup service:", err);
  }
};
