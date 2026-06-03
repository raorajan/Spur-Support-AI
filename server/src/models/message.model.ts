import {
  pgTable,
  uuid,
  text,
  timestamp,
  pgEnum
} from "drizzle-orm/pg-core";

import { conversations } from "./conversation.model";

export const senderEnum = pgEnum(
  "sender_type",
  ["user", "ai"]
);

export const messages = pgTable("messages", {
  id: uuid("id")
    .defaultRandom()
    .primaryKey(),

  conversationId: uuid("conversation_id")
    .references(() => conversations.id, {
      onDelete: "cascade",
    })
    .notNull(),

  sender: senderEnum("sender")
    .notNull(),

  content: text("content")
    .notNull(),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),
});
