// src/config/env.js

/**
 * validateEnv - ensures all required environment variables exist
 * Throws error and exits process if any variable is missing
 */
export function validateEnv() {
  const requiredVars = [
    "PORT",
    "MAIL_USER",
    "MAIL_PASS",
    "MAIL_FROM",
    "MONGO_URI",
    "ACCESS_TOKEN_SECRET",
    "REFRESH_TOKEN_SECRET",
    "CLIENT_URL",
    "REDIS_HOST",
    "REDIS_PORT"
  ];

  for (const key of requiredVars) {
    if (!process.env[key]) {
      console.error(`❌ Missing required environment variable: ${key}`);
      process.exit(1);
    }
  }

  console.log("✅ All required environment variables are set");
}

/**
 * config - centralized object to access environment variables
 */
export const config = {
  port: process.env.PORT || 5000,
  clientUrl: process.env.CLIENT_URL || "http://localhost:3000",
  mail: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
    from: process.env.MAIL_FROM,
  },
  mongoUri: process.env.MONGO_URI,
  tokens: {
    accessSecret: process.env.ACCESS_TOKEN_SECRET,
    refreshSecret: process.env.REFRESH_TOKEN_SECRET,
    accessExpires: process.env.ACCESS_TOKEN_EXPIRES || "15m",
    refreshExpires: process.env.REFRESH_TOKEN_EXPIRES || "7d",
  },
  redis: {
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: parseInt(process.env.REDIS_PORT || "6379"),
    password: process.env.REDIS_PASSWORD || undefined,
  },
};
