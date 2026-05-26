import { NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GENERATIVE_AI_API_KEY!);

export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const lastMessage = messages[messages.length - 1].content;

    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: `You are PyTutor AI, an expert, encouraging Python programming tutor for secondary school students.
      Your goal is to help the student learn, not to do the work for them.
      1. NEVER give the complete direct answer or write the full code for them immediately.
      2. Use the Socratic method: ask guiding questions.
      3. Break complex Python concepts into simple analogies.
      4. Always format code snippets clearly using markdown.`,
    });

    const result = await model.generateContent(lastMessage);
    const text = result.response.text();

    return NextResponse.json({ text });
  } catch (error) {
    console.error("AI Error:", error);
    return NextResponse.json(
      { error: "Failed to connect to PyTutor AI." },
      { status: 500 },
    );
  }
}
