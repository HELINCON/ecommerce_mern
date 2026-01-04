import app from "./app.js";
import connectDB from "./config/db.js";
import startCronJobs from "./config/cron.js";

if (process.env.USE_DUMMY_DB === "false") {
  connectDB();
}

// Start cron jobs regardless of DB type
startCronJobs();

app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT}`);
});
