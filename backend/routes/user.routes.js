import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import { getUserForSidebar } from "../controllers/user.controller.js";
const router = express.Router();

// get users for sidebar
router.get("/", protectRoute, getUserForSidebar);

export default router;