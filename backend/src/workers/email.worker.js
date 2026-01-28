// src/workers/email.worker.js
import { Worker } from "bullmq";
import { emailQueue } from "../queues/email.queue.js";
import { sendMail } from "../services/mail.service.js";
import { config } from "../config/env.js";

const worker = new Worker(
  "email-queue",
  async (job) => {
    const { to, subject, text, html } = job.data;
    await sendMail(to, subject, text, html);
    console.log(`✅ Email sent to ${to}`);
  },
  {
    connection: {
      host: config.redis.host,
      port: config.redis.port,
      password: config.redis.password,
    },
  }
);

worker.on("failed", (job, err) => {
  console.error(`❌ Email job failed for ${job.id}:`, err);
});

console.log("📬 Email worker running...");
