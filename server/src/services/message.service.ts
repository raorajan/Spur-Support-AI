import { MessageRepository } from "../repositories/message.repository";
import { ConversationRepository } from "../repositories/conversation.repository";
import { AIService } from "./ai.service";
import { ApiError } from "../utils/ApiError";

export class MessageService {
  static async getByConversationId(conversationId: string) {
    return MessageRepository.getByConversationId(conversationId);
  }

  static async processNewMessage(conversationId: string, content: string) {
    if (!content?.trim()) {
      throw new ApiError(400, "Message content is required");
    }

    const trimmedContent = content.trim();

    const rawHistory = await MessageRepository.getByConversationId(conversationId);
    
    const history = rawHistory.map((m) => ({
      role: m.sender === "user" ? "user" as const : "assistant" as const,
      content: m.content,
    }));

    const userMsg = await MessageRepository.create(conversationId, "user", trimmedContent);

    const aiContent = await AIService.generateReply(history, trimmedContent);

    const aiMsg = await MessageRepository.create(conversationId, "ai", aiContent);

    await ConversationRepository.updateTimestamp(conversationId);

    return { userMessage: userMsg, aiMessage: aiMsg };
  }
}
