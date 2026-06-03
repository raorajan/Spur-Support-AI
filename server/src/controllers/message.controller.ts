import { Request, Response } from "express";
import { db } from "../config/database";
import { messages, conversations } from "../models";
import { eq, asc } from "drizzle-orm";
import OpenAI from "openai";

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

export const getMessages = async (req: Request, res: Response) => {
  try {
    const conversationId = req.params.conversationId as string;

    const result = await db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, conversationId))
      .orderBy(asc(messages.createdAt));

    res.json(result);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch messages" });
  }
};

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const conversationId = req.params.conversationId as string;
    const { content } = req.body;

    if (!content?.trim()) {
      res.status(400).json({ error: "Message content is required" });
      return;
    }

    const [userMsg] = await db
      .insert(messages)
      .values({
        conversationId,
        sender: "user",
        content: content.trim(),
      })
      .returning();

    const history = await db
      .select()
      .from(messages)
      .where(eq(messages.conversationId, conversationId))
      .orderBy(asc(messages.createdAt));

    const chatHistory = history.map((m) => ({
      role: m.sender === "user" ? "user" as const : "assistant" as const,
      content: m.content,
    }));

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: "You are a helpful customer support assistant for Spur, a SaaS company. Be concise, friendly, and professional.",
        },
        ...chatHistory,
      ],
    });

    const aiContent = completion.choices[0]?.message?.content || "Sorry, I could not generate a response.";

    const [aiMsg] = await db
      .insert(messages)
      .values({
        conversationId,
        sender: "ai",
        content: aiContent,
      })
      .returning();

    await db
      .update(conversations)
      .set({ updatedAt: new Date() })
      .where(eq(conversations.id, conversationId));

    res.status(201).json({ userMessage: userMsg, aiMessage: aiMsg });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to process message" });
  }
};
