import { Router } from "express";
import {
  getConversations,
  createConversation,
  deleteConversation,
} from "../controllers/conversation.controller";
import { validate } from "../middleware/validate.middleware";
import { createConversationSchema, deleteConversationSchema } from "../validators/conversation.validator";

const router = Router();

router.get("/", getConversations);
router.post("/", validate(createConversationSchema), createConversation);
router.delete("/:id", validate(deleteConversationSchema), deleteConversation);

export default router;
