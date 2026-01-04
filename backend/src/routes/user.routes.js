import express from "express";
import { getAllUsers } from "../controllers/user.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/role.middleware.js";

const router = express.Router();

// Admin-only get all users
router.get("/", protect, adminOnly, getAllUsers);

export default router;
