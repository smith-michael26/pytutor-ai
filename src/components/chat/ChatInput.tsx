"use client";

import { useState, useRef, KeyboardEvent, ChangeEvent } from "react";
import SendIcon from "../ui/icons/send";
import LoadingIcon from "../ui/icons/loading";

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
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const adjustHeight = () => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    }
  };

  const handleChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setInput(e.target.value);
    adjustHeight();
  };

  const handleSend = () => {
    if (!input.trim() || isLoading) return;
    onSend(input.trim());
    setInput("");

    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-gray-100 p-2 flex flex-col gap-2 shrink-0">
      <div className="flex flex-wrap gap-1">
        {QUICK_PROMPTS.map((prompt) => (
          <button
            key={prompt}
            onClick={() => setInput(prompt)}
            disabled={isLoading}
            className="text-[11px] bg-[#D6EAF8] text-[#2E6DA4] px-2 py-1 rounded-full hover:bg-[#A8CFE8] transition-colors disabled:opacity-50 cursor-pointer"
          >
            {prompt}
          </button>
        ))}
      </div>

      <div className="flex items-end gap-2">
        <textarea
          ref={textareaRef}
          value={input}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          placeholder="Ask a question... (Enter to send)"
          rows={1}
          disabled={isLoading}
          className="
            flex-1 text-xs border border-gray-200 rounded-xl px-3 py-2
            resize-none overflow-y-auto focus:outline-none focus:ring-2
            focus:ring-[#4EA8DE] placeholder:text-[#9CA3AF] text-[#374151]
            disabled:opacity-50 leading-relaxed max-h-32
          "
        />
        <button
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className="
            w-8 h-8 rounded-xl bg-[#2E6DA4] text-white flex items-center justify-center
            hover:bg-[#1A3A5C] transition-colors disabled:opacity-50 disabled:cursor-not-allowed
            shrink-0
          "
        >
          {isLoading ? <LoadingIcon /> : <SendIcon className="size-3.5" />}
        </button>
      </div>
    </div>
  );
}
