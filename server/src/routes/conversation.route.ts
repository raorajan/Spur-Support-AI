import { Router } from "express";
import {
  getConversations,
  createConversation,
  deleteConversation,
} from "../controllers/conversation.controller";

const router = Router();

router.get("/", getConversations);
router.post("/", createConversation);
router.delete("/:id", deleteConversation);

export default router;
