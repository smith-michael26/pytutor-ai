import { Message } from "@/lib/types";
import ReactMarkdown from "react-markdown";

interface MessageBubbleProps {
  message: Message;
}

function formatTime(date: Date) {
  return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isAI = message.role === "ai";

  return (
    <div
      className={`flex flex-col gap-1 ${isAI ? "items-start" : "items-end"}`}
    >
      <span
        className="text-[10px] text-[#6B7280] px-1"
        suppressHydrationWarning
      >
        {isAI ? "PyTutor AI" : "You"} · {formatTime(message.timestamp)}
      </span>

      <div
        className={`
          max-w-[90%] rounded-2xl px-4 py-3 text-xs leading-relaxed
          ${
            isAI
              ? "bg-[#7C5CBF] text-white rounded-tl-sm"
              : "bg-[#D6EAF8] text-[#1A3A5C] rounded-tr-sm"
          }
        `}
      >
        {isAI ? (
          <div className="flex flex-col gap-2">
            <ReactMarkdown
              components={{
                p: ({ children }) => <p className="m-0">{children}</p>,

                strong: ({ children }) => (
                  <strong className="font-bold text-white">{children}</strong>
                ),

                h3: ({ children }) => (
                  <h3 className="text-sm font-bold mt-2 mb-1">{children}</h3>
                ),
                h2: ({ children }) => (
                  <h2 className="text-base font-bold mt-2 mb-1">{children}</h2>
                ),

                ul: ({ children }) => (
                  <ul className="list-disc pl-4 my-1 space-y-1">{children}</ul>
                ),

                code({ inline, children, ...props }: any) {
                  return !inline ? (
                    <div className="mt-2 bg-[#1F2937] rounded-lg px-3 py-2 overflow-x-auto">
                      <pre className="text-xs font-mono text-[#F1F5F9] whitespace-pre-wrap">
                        <code {...props}>{children}</code>
                      </pre>
                    </div>
                  ) : (
                    <code
                      className="bg-[#5e4396] px-1 py-0.5 rounded font-mono text-[11px]"
                      {...props}
                    >
                      {children}
                    </code>
                  );
                },
              }}
            >
              {message.content}
            </ReactMarkdown>
          </div>
        ) : (
          <span className="whitespace-pre-wrap">{message.content}</span>
        )}
      </div>
    </div>
  );
}
