// ✅ Used in auth registration verification and admin invites.


import nodemailer from "nodemailer";

/**
 * Create Nodemailer transporter
 */
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

/**
 * Send email
 */
export const sendMail = (to, subject, text) =>
  transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
  });
