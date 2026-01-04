// ✅ Node Cron will automatically remove expired OTPs.





/**
 * Generate 6-digit OTP
 */
export const generateOTP = () => Math.floor(100000 + Math.random() * 900000).toString();
