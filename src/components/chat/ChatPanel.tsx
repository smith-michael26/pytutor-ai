"use client";

import { useRef, useEffect } from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import Spinner from "./Spinner";
import { useChat } from "@/context/ChatContext";

export default function ChatPanel() {
  const { messages, isLoading, isFetchingHistory, handleSend, activeTopic } =
    useChat();
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-col h-full border-l border-gray-100 bg-white overflow-hidden">
      <div className="flex items-center gap-2 px-3 py-2.5 border-b border-gray-100 flex-shrink-0">
        <div className="w-2 h-2 rounded-full bg-[#1DB870] animate-pulse" />
        <p className="text-xs font-semibold text-[#1A3A5C]">AI Tutor</p>
        {activeTopic && (
          <span className="ml-auto text-[10px] bg-[#D6EAF8] text-[#2E6DA4] px-2 py-0.5 rounded-full">
            {activeTopic.title}
          </span>
        )}
      </div>

      <div className="flex-1 overflow-y-auto min-h-0 px-3 py-3 relative">
        {isFetchingHistory && <Spinner />}

        {!isFetchingHistory && (
          <div className="flex flex-col gap-3">
            {messages.map((msg, i) => (
              <MessageBubble key={i} message={msg} />
            ))}

            {isLoading && <TypingIndicator />}

            <div ref={bottomRef} />
          </div>
        )}
      </div>

      <ChatInput onSend={handleSend} isLoading={isLoading} />
    </div>
  );
}
