import AdminInvite from "../models/AdminInvite.js";
import crypto from "crypto";
import { sendMail } from "../services/mail.service.js";

/**
 * Create admin invite
 */
export const createAdminInvite = async (req, res) => {
  try {
    const { email } = req.body;
    const token = crypto.randomBytes(32).toString("hex");

    const invite = await AdminInvite.create({
      email,
      token,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000, // 24 hours
    });

    await sendMail(email, "Admin Invite", `Use this token to create admin: ${token}`);
    res.json({ message: "Admin invite sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating admin invite" });
  }
};
