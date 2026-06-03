import { ConversationRepository } from "../repositories/conversation.repository";
import { ApiError } from "../utils/ApiError";

export class ConversationService {
  static async getAll() {
    return ConversationRepository.getAll();
  }

  static async create(title?: string) {
    const defaultTitle = title || "New Conversation";
    return ConversationRepository.create(defaultTitle);
  }

  static async delete(id: string) {
    const deleted = await ConversationRepository.delete(id);
    if (!deleted) {
      throw new ApiError(404, "Conversation not found");
    }
    return deleted;
  }
}
