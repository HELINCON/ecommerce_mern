import cron from "node-cron";
import Token from "../models/Token.js";
import User from "../models/User.js";
import AdminInvite from "../models/AdminInvite.js";

/**
 * Runs cron jobs every hour:
 * 1. Remove expired refresh tokens
 * 2. Remove expired OTPs in users
 * 3. Remove expired admin invites
 */
const startCronJobs = () => {
  cron.schedule("0 * * * *", async () => {
    console.log("Running hourly cleanup cron job...");

    try {
      // 1️⃣ Remove expired refresh tokens
      const tokenResult = await Token.deleteMany({ expiresAt: { $lte: new Date() } });
      console.log(`Removed ${tokenResult.deletedCount} expired tokens`);

      // 2️⃣ Remove expired OTPs in users
      const userResult = await User.updateMany(
        { otpExpiry: { $lte: new Date() } },
        { $set: { otp: null, otpExpiry: null } }
      );
      console.log(`Cleared OTPs for ${userResult.modifiedCount} users`);

      // 3️⃣ Remove expired admin invites
      const inviteResult = await AdminInvite.deleteMany({ expiresAt: { $lte: new Date() } });
      console.log(`Removed ${inviteResult.deletedCount} expired admin invites`);
    } catch (err) {
      console.error("Error running cron jobs:", err);
    }
  });
};

export default startCronJobs;
