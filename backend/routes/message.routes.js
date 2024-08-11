import express from "express";
import { getMessage } from "../controllers/message.controller.js";
import { sendMessage } from "../controllers/message.controller.js";
const router = express.Router();
import protectRoute from "../middleware/protectRoute.js";

router.get("/:id", protectRoute, getMessage)
router.post("/send/:id", protectRoute, sendMessage)

export default router;