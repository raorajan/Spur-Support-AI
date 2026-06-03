import { Request, Response } from "express";
import { ConversationService } from "../services/conversation.service";
import { catchAsync } from "../utils/catchAsync";

export const getConversations = catchAsync(async (req: Request, res: Response) => {
  const result = await ConversationService.getAll();
  res.json(result);
});

export const createConversation = catchAsync(async (req: Request, res: Response) => {
  const { title } = req.body;
  const created = await ConversationService.create(title);
  res.status(201).json(created);
});

export const deleteConversation = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  await ConversationService.delete(id);
  res.json({ message: "Conversation deleted" });
});
