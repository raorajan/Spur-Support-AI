import { Request, Response } from "express";
import { ConversationService } from "../services/conversation.service";
import { MessageService } from "../services/message.service";
import { catchAsync } from "../utils/catchAsync";

export const handleChatMessage = catchAsync(async (req: Request, res: Response) => {
  const { message, sessionId } = req.body;
  
  let currentSessionId = sessionId;
  
  if (!currentSessionId) {
    const title = message.length > 30 ? `${message.substring(0, 30)}...` : message;
    const newConv = await ConversationService.create(title);
    currentSessionId = newConv.id;
  }
  
  const result = await MessageService.processNewMessage(currentSessionId, message);
  
  res.status(200).json({
    reply: result.aiMessage.content,
    sessionId: currentSessionId
  });
});
