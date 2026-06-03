import { Router } from "express";
import {
  getMessages,
  sendMessage,
} from "../controllers/message.controller";
import { validate } from "../middleware/validate.middleware";
import { messageSchema } from "../validators/message.validator";

const router = Router();

router.get("/:conversationId", getMessages);
router.post("/:conversationId", validate(messageSchema), sendMessage);

export default router;
