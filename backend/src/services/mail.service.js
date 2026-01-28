// src/services/mail.service.js
import nodemailer from "nodemailer";
import { config } from "../config/env.js";

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: config.mail.user,
    pass: config.mail.pass,
  },
});

/**
 * Send email — supports OTP and Admin Invite
 */
export const sendMail = async (to, subject, text, html = null) => {
  const mailOptions = {
    from: config.mail.from,
    to,
    subject,
    text,
  };

  if (html) mailOptions.html = html;

  return transporter.sendMail(mailOptions);
};
