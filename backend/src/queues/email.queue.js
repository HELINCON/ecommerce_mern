// src/queues/email.queue.js
import { Queue } from "bullmq";
import { config } from "../config/env.js";

export const emailQueue = new Queue("email-queue", {
  connection: {
    host: config.redis.host,
    port: config.redis.port,
    password: config.redis.password,
  },
});
