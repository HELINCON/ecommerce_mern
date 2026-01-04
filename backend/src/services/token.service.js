// ✅ Fully compatible with MongoDB & dummy DB (user object structure identical).

import jwt from "jsonwebtoken";

/**
 * Generate JWT access token
 */
export const generateAccessToken = (user) =>
  jwt.sign({ id: user._id, role: user.role }, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: process.env.ACCESS_TOKEN_EXPIRES,
  });

/**
 * Generate JWT refresh token
 */
export const generateRefreshToken = (user) =>
  jwt.sign({ id: user._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRES,
  });
