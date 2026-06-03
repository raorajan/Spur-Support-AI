import { openai } from "../config/openai";
import { SYSTEM_PROMPT } from "../constants/prompts";

export class AIService {
  static async generateReply(history: { role: "user" | "assistant"; content: string }[], userMessage: string) {
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        {
          role: "system",
          content: SYSTEM_PROMPT,
        },
        ...history,
        {
          role: "user",
          content: userMessage,
        }
      ],
    });

    return completion.choices[0]?.message?.content || "Sorry, I could not generate a response.";
  }
}
