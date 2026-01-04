import User from "../models/User.js";

/**
 * Login rate limiter — prevents brute force
 */
export const loginRateLimiter = async (req, res, next) => {
  const { email } = req.body;
  if (!email) return next();

  const user = await User.findOne({ email });
  if (!user) return next();

  if (user.lockUntil && user.lockUntil > Date.now()) {
    return res.status(403).json({ message: "Account locked due to too many failed attempts" });
  }

  next();
};
