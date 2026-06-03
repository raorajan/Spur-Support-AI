import { Router } from "express";
import {
  getMessages,
  sendMessage,
} from "../controllers/message.controller";

const router = Router();

router.get("/:conversationId", getMessages);
router.post("/:conversationId", sendMessage);

export default router;
