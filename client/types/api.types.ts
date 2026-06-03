import { z } from "zod";

export const ConversationSchema = z.object({
  id: z.string().uuid(),
  title: z.string().nullable().optional(),
  createdAt: z.string().or(z.date()),
  updatedAt: z.string().or(z.date()),
});

export const MessageSchema = z.object({
  id: z.string().uuid(),
  conversationId: z.string().uuid(),
  sender: z.enum(["user", "ai"]),
  content: z.string(),
  createdAt: z.string().or(z.date()),
});

export const SendMessageResponseSchema = z.object({
  userMessage: MessageSchema,
  aiMessage: MessageSchema,
});

export type ApiConversation = z.infer<typeof ConversationSchema>;
export type ApiMessage = z.infer<typeof MessageSchema>;
export type ApiSendMessageResponse = z.infer<typeof SendMessageResponseSchema>;
