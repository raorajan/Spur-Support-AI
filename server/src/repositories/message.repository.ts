import { db } from "../config/database";
import { messages } from "../models";
import { eq, asc } from "drizzle-orm";
import { CacheService } from "../services/cache.service";

export class MessageRepository {
  static async getByConversationId(conversationId: string) {
    const cacheKey = `messages:${conversationId}`;
    const cached = await CacheService.get<any[]>(cacheKey);
    if (cached) return cached;

    const result = await db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, conversationId))
      .orderBy(asc(messages.createdAt));

    await CacheService.set(cacheKey, result);
    return result;
  }

  static async create(conversationId: string, sender: "user" | "ai", content: string) {
    const [created] = await db
      .insert(messages)
      .values({
        conversationId,
        sender,
        content,
      })
      .returning();

    // Invalidate cache so next fetch gets fresh data
    await CacheService.invalidate(`messages:${conversationId}`);
    return created;
  }
}
