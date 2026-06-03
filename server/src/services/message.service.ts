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

    // 1. Get history before saving new message
    const rawHistory = await MessageRepository.getByConversationId(conversationId);
    
    // 2. Format history for OpenAI
    const history = rawHistory.map((m) => ({
      role: m.sender === "user" ? "user" as const : "assistant" as const,
      content: m.content,
    }));

    // 3. Save user message to DB
    const userMsg = await MessageRepository.create(conversationId, "user", trimmedContent);

    // 4. Generate AI reply
    const aiContent = await AIService.generateReply(history, trimmedContent);

    // 5. Save AI message to DB
    const aiMsg = await MessageRepository.create(conversationId, "ai", aiContent);

    // 6. Update conversation timestamp
    await ConversationRepository.updateTimestamp(conversationId);

    return { userMessage: userMsg, aiMessage: aiMsg };
  }
}
