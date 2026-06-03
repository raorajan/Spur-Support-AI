import { Router } from "express";
import { handleChatMessage } from "../controllers/chat.controller";
import { validate } from "../middleware/validate.middleware";
import { chatMessageSchema } from "../validators/chat.validator";

const router = Router();

router.post("/message", validate(chatMessageSchema), handleChatMessage);

export default router;
