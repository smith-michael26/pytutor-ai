const GEMINI_API_URL =
  "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent";

export interface Message {
  role: "user" | "ai";
  content: string;
  timestamp: Date;
}

export async function sendToGemini(
  messages: Message[],
  apiKey: string,
): Promise<string> {
  // Build conversation history for Gemini
  const history = messages.map((msg) => ({
    role: msg.role === "ai" ? "model" : "user",
    parts: [{ text: msg.content }],
  }));

  const response = await fetch(`${GEMINI_API_URL}?key=${apiKey}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      system_instruction: {
        parts: [
          {
            text: `You are PyTutor AI, a friendly and patient Python programming tutor for undergraduate students at the University of Ilorin. 

Your role:
- Teach Python clearly using simple language a beginner can understand
- Always give short code examples to illustrate concepts
- When a student makes a mistake, explain what went wrong kindly
- When asked to quiz, ask ONE question at a time and wait for the answer
- Keep responses concise — no long walls of text
- Use encouraging language to motivate students
- Format code examples using markdown code blocks with python syntax`,
          },
        ],
      },
      contents: history,
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 1024,
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Gemini API error: ${response.statusText}`);
  }

  const data = await response.json();
  return (
    data.candidates?.[0]?.content?.parts?.[0]?.text || "No response from AI."
  );
}
