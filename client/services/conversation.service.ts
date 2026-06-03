import { api } from "../lib/api";
import { z } from "zod";
import { ConversationSchema, ApiConversation } from "../types/api.types";

export const conversationService = {
  getConversations: async (): Promise<ApiConversation[]> => {
    const response = await api.get("/conversations");
    return z.array(ConversationSchema).parse(response.data);
  },
  
  createConversation: async (title?: string): Promise<ApiConversation> => {
    const response = await api.post("/conversations", { title });
    return ConversationSchema.parse(response.data);
  },

  deleteConversation: async (id: string): Promise<void> => {
    await api.delete(`/conversations/${id}`);
  }
};
