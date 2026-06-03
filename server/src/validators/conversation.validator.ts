import { z } from "zod";

export const createConversationSchema = z.object({
  body: z.object({
    title: z.string().max(255).optional(),
  }),
});

export const deleteConversationSchema = z.object({
  params: z.object({
    id: z.string().uuid("Invalid conversation ID format"),
  }),
});
