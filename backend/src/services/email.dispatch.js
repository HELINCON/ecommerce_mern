// src/services/email.dispatch.js
import { emailQueue } from "../queues/email.queue.js";

export const enqueueEmail = async ({ to, subject, text, html = null }) => {
  await emailQueue.add(
    "send-email",
    { to, subject, text, html },
    {
      attempts: 3,
      backoff: { type: "exponential", delay: 5000 },
      removeOnComplete: true,
      removeOnFail: false,
    }
  );
};
