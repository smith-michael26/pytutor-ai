"use client";

import { useState, KeyboardEvent } from "react";

interface ChatInputProps {
  onSend: (message: string) => void;
  isLoading: boolean;
}

const QUICK_PROMPTS = [
  "Explain with an example",
  "Quiz me on this topic",
  "Why is this not working?",
  "Simplify this for me",
];

export default function ChatInput({ onSend, isLoading }: ChatInputProps) {
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    onSend(input.trim());
    setInput("");
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Send on Enter, new line on Shift+Enter
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-gray-100 p-2 flex flex-col gap-2 flex-shrink-0">
      {/* Quick prompts */}
      <div className="flex flex-wrap gap-1">
        {QUICK_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            onClick={() => onSend(prompt)}
            disabled={isLoading}
            className="text-[9px] bg-[#D6EAF8] text-[#2E6DA4] px-2 py-1 rounded-full hover:bg-[#A8CFE8] transition-colors disabled:opacity-50"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Input row */}
      <div className="flex items-end gap-2">
        <textarea
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question... (Enter to send)"
          rows={2}
          disabled={isLoading}
          className="
            flex-1 text-xs border border-gray-200 rounded-xl px-3 py-2
            resize-none focus:outline-none focus:ring-2 focus:ring-[#4EA8DE]
            placeholder:text-[#9CA3AF] text-[#374151] disabled:opacity-50
            leading-relaxed
          "
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="
            w-8 h-8 rounded-xl bg-[#2E6DA4] text-white flex items-center justify-center
            hover:bg-[#1A3A5C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed
            flex-shrink-0
          "
        >
          {isLoading ? (
            <svg
              className="animate-spin w-3 h-3"
              viewBox="0 0 24 24"
              fill="none"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              />
            </svg>
          ) : (
            <svg viewBox="0 0 24 24" fill="none" className="w-3.5 h-3.5">
              <path
                d="M22 2L11 13"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M22 2L15 22L11 13L2 9L22 2Z"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          )}
        </button>
      </div>
    </div>
  );
}
