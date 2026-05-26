"use client";

import { useState, useRef, KeyboardEvent, ChangeEvent } from "react";

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
  // 1. Create a ref to control the textarea's physical height
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // 2. Handle input changes and calculate new height
  const handleInput = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);

    if (textareaRef.current) {
      // Reset height to auto first to properly calculate shrinkage
      textareaRef.current.style.height = "auto";
      // Set the height to match the scrollHeight (the actual text size)
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  };

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    onSend(input.trim());
    setInput("");

    // 3. Reset the height back to 1 row after sending
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Send on Enter, allow new line on Shift+Enter
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-gray-100 p-2 flex flex-col gap-2 shrink-0">
      {/* Quick prompts */}
      <div className="flex flex-wrap gap-1">
        {QUICK_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            onClick={() => onSend(prompt)}
            disabled={isLoading}
            className="text-[11px] bg-[#D6EAF8] text-[#2E6DA4] px-2 py-1 rounded-full hover:bg-[#A8CFE8] transition-colors disabled:opacity-50"
          >
            {prompt}
          </button>
        ))}
      </div>

      <div className="flex items-end gap-2">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleInput}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question... (Enter to send)"
          rows={1} // Start with exactly 1 row
          disabled={isLoading}
          className="
            flex-1 text-[14px] border border-gray-200 rounded-xl px-3 py-2.5
            resize-none focus:outline-none focus:ring-2 focus:ring-[#4EA8DE]
            placeholder:text-[#9CA3AF] text-[#374151] disabled:opacity-50
            leading-relaxed max-h-32 overflow-y-auto
          "
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="
            w-8 h-8 rounded-xl bg-[#2E6DA4] text-white flex items-center justify-center
            hover:bg-[#1A3A5C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed
            shrink-0 mb-1
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
