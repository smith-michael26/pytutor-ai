import { Message } from "@/lib/gemini";

interface MessageBubbleProps {
  message: Message;
}

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

// Render markdown-style code blocks in AI responses
function renderContent(content: string) {
  const parts = content.split(/(```[\s\S]*?```)/g);

  return parts.map((part, i) => {
    if (part.startsWith("```")) {
      const code = part.replace(/```python\n?|```\n?/g, "").trim();
      return (
        <div
          key={i}
          className="mt-2 bg-[#1F2937] rounded-lg px-3 py-2 overflow-x-auto"
        >
          <pre className="text-xs font-mono text-[#F1F5F9] leading-relaxed whitespace-pre-wrap">
            {code}
          </pre>
        </div>
      );
    }
    return (
      <span key={i} className="whitespace-pre-wrap">
        {part}
      </span>
    );
  });
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isAI = message.role === "ai";

  return (
    <div
      className={`flex flex-col gap-1 ${isAI ? "items-start" : "items-end"}`}
    >
      {/* Sender label */}
      <span className="text-[10px] text-[#6B7280] px-1">
        {isAI ? "PyTutor AI" : "You"} · {formatTime(message.timestamp)}
      </span>

      {/* Bubble */}
      <div
        className={`
          max-w-[90%] rounded-2xl px-3 py-2 text-xs leading-relaxed
          ${
            isAI
              ? "bg-[#7C5CBF] text-white rounded-tl-sm"
              : "bg-[#D6EAF8] text-[#1A3A5C] rounded-tr-sm"
          }
        `}
      >
        {renderContent(message.content)}
      </div>
    </div>
  );
}
