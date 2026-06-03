import { api } from "../lib/api";
import { z } from "zod";
import { MessageSchema, SendMessageResponseSchema, ApiMessage, ApiSendMessageResponse } from "../types/api.types";

export const chatService = {
  getMessages: async (conversationId: string): Promise<ApiMessage[]> => {
    const response = await api.get(`/messages/${conversationId}`);
    return z.array(MessageSchema).parse(response.data);
  },
  
  sendMessage: async (message: string, conversationId: string): Promise<ApiSendMessageResponse> => {
    const response = await api.post(`/messages/${conversationId}`, { content: message });
    return SendMessageResponseSchema.parse(response.data);
  }
};
