import { Request, Response } from "express";
import { db } from "../config/database";
import { conversations } from "../models";
import { desc, eq } from "drizzle-orm";

export const getConversations = async (req: Request, res: Response) => {
  try {
    const result = await db
      .select()
      .from(conversations)
      .orderBy(desc(conversations.updatedAt));

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch conversations" });
  }
};

export const createConversation = async (req: Request, res: Response) => {
  try {
    const { title } = req.body;

    const [created] = await db
      .insert(conversations)
      .values({ title: title || "New Conversation" })
      .returning();

    res.status(201).json(created);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to create conversation" });
  }
};

export const deleteConversation = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as string;

    const [deleted] = await db
      .delete(conversations)
      .where(eq(conversations.id, id))
      .returning();

    if (!deleted) {
      res.status(404).json({ error: "Conversation not found" });
      return;
    }

    res.json({ message: "Conversation deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to delete conversation" });
  }
};
