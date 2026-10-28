import OpenAI from "openai";
import { z } from "zod";
import { EULER_SYSTEM_PROMPT } from "@/lib/euler/orchestrator";

export const runtime = "nodejs";

const MessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1).max(12000)
});
const RequestSchema = z.object({
  messages: z.array(MessageSchema).min(1).max(30)
});

export async function POST(request: Request) {
  try {
    const body = RequestSchema.parse(await request.json());
    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return Response.json(
        { error: "OpenAI is not configured. Add OPENAI_API_KEY to .env.local and restart the development server." },
        { status: 503 }
      );
    }

    const client = new OpenAI({ apiKey });
    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      instructions: EULER_SYSTEM_PROMPT,
      input: body.messages.map((message) => ({
        role: message.role,
        content: message.content
      }))
    });

    return Response.json({ reply: response.output_text || "EULER received the response, but no text was returned." });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return Response.json({ error: "Invalid chat request format." }, { status: 400 });
    }
    console.error("EULER chat route failed:", error);
    return Response.json({ error: "The EULER chat service encountered an error. Check server logs." }, { status: 500 });
  }
}
