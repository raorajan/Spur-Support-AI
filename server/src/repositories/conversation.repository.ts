import { db } from "../config/database";
import { conversations } from "../models";
import { desc, eq } from "drizzle-orm";

export class ConversationRepository {
  static async getAll() {
    return db
      .select()
      .from(conversations)
      .orderBy(desc(conversations.updatedAt));
  }

  static async create(title: string) {
    const [created] = await db
      .insert(conversations)
      .values({ title })
      .returning();
    return created;
  }

  static async delete(id: string) {
    const [deleted] = await db
      .delete(conversations)
      .where(eq(conversations.id, id))
      .returning();
    return deleted;
  }

  static async updateTimestamp(id: string) {
    return db
      .update(conversations)
      .set({ updatedAt: new Date() })
      .where(eq(conversations.id, id));
  }
}
