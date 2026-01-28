import { createApp } from "./app.js";
import connectDB from "./config/db.js";
import startCronJobs from "./config/cron.js";
import { validateEnv } from "./config/env.js";
import "./workers/email.worker.js"; // start worker

async function boot() {
  validateEnv();

  if (process.env.USE_DUMMY_DB !== "true") {
    await connectDB();
  }

  const app = createApp();
  startCronJobs();

  const port = process.env.PORT || 5000;
  app.listen(port, () => console.log(`🚀 Server running on port ${port}`));
}

boot().catch(err => {
  console.error("❌ Boot failed:", err);
  process.exit(1);
});
