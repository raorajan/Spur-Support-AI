import { Request, Response } from "express";
import { MessageService } from "../services/message.service";
import { catchAsync } from "../utils/catchAsync";

export const getMessages = catchAsync(async (req: Request, res: Response) => {
  const conversationId = req.params.conversationId as string;
  const result = await MessageService.getByConversationId(conversationId);
  res.json(result);
});

export const sendMessage = catchAsync(async (req: Request, res: Response) => {
  const conversationId = req.params.conversationId as string;
  const { content } = req.body;
  
  const result = await MessageService.processNewMessage(conversationId, content);
  res.status(201).json(result);
});
