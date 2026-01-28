import AdminInvite from "../models/AdminInvite.js";
import crypto from "crypto";
import { enqueueEmail } from "../services/email.dispatch.js";

export const createAdminInvite = async (req, res) => {
  try {
    const { email } = req.body;
    const token = crypto.randomBytes(32).toString("hex");

    await AdminInvite.create({
      email,
      token,
      expiresAt: Date.now() + 24 * 60 * 60 * 1000,
    });

    await enqueueEmail({
      to: email,
      subject: "Admin Invite",
      text: `Use this token to create admin: ${token}`,
    });

    res.json({ message: "Admin invite sent" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error creating admin invite" });
  }
};
