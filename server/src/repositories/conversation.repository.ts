import { db } from "../config/database";
import { conversations } from "../models";
import { desc, eq } from "drizzle-orm";
import { CacheService } from "../services/cache.service";

const CACHE_KEY_ALL = "conversations:all";

export class ConversationRepository {
  static async getAll() {
    const cached = await CacheService.get<any[]>(CACHE_KEY_ALL);
    if (cached) return cached;

    const result = await db
      .select()
      .from(conversations)
      .orderBy(desc(conversations.updatedAt));

    await CacheService.set(CACHE_KEY_ALL, result);
    return result;
  }

  static async create(title: string) {
    const [created] = await db
      .insert(conversations)
      .values({ title })
      .returning();

    await CacheService.invalidate(CACHE_KEY_ALL);
    return created;
  }

  static async delete(id: string) {
    const [deleted] = await db
      .delete(conversations)
      .where(eq(conversations.id, id))
      .returning();

    await CacheService.invalidate(CACHE_KEY_ALL);
    await CacheService.invalidate(`messages:${id}`);
    return deleted;
  }

  static async updateTimestamp(id: string) {
    await db
      .update(conversations)
      .set({ updatedAt: new Date() })
      .where(eq(conversations.id, id));

    await CacheService.invalidate(CACHE_KEY_ALL);
  }
}
