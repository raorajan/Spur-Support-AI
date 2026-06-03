import { db } from "../config/database";
import { messages } from "../models";
import { eq, asc } from "drizzle-orm";

export class MessageRepository {
  static async getByConversationId(conversationId: string) {
    return db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, conversationId))
      .orderBy(asc(messages.createdAt));
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
    return created;
  }
}
