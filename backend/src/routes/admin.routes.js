import express from "express";
import { createAdminInvite } from "../controllers/admin.controller.js";
import { protect } from "../middlewares/auth.middleware.js";
import { adminOnly } from "../middlewares/role.middleware.js";

const router = express.Router();

// Admin-only invite
router.post("/invite", protect, adminOnly, createAdminInvite);

export default router;
