import mongoose from "mongoose";
import { config } from "./env.js"; // <- use centralized config

const connectDB = async () => {
  try {
    await mongoose.connect(config.mongoUri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    process.exit(1);
  }
};

export default connectDB;
