import {
  pgTable,
  uuid,
  timestamp,
  varchar
} from "drizzle-orm/pg-core";

export const conversations = pgTable("conversations", {
  id: uuid("id")
    .defaultRandom()
    .primaryKey(),

  title: varchar("title", {
    length: 255,
  }).default("New Conversation"),

  createdAt: timestamp("created_at")
    .defaultNow()
    .notNull(),

  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull(),
});
