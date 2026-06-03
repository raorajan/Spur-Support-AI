import { z } from "zod";

export const messageSchema = z.object({
  body: z.object({
    content: z.string()
    .min(1, "Message cannot be empty")
    .max(1000, "Message cannot exceed 1000 characters"),
  }),
  params: z.object({
    conversationId: z.string().uuid("Invalid conversation ID format"),
  }),
});
