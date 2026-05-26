"use client";

import { useRef, useEffect, useState } from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import Spinner from "./Spinner";
import { useChat } from "@/context/ChatContext";
import DeleteChatModal from "./DeleteChatModal";

export default function ChatPanel() {
  const {
    messages,
    isLoading,
    isFetchingHistory,
    handleSend,
    activeTopic,
    clearHistory,
  } = useChat();
  const bottomRef = useRef<HTMLDivElement>(null);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleConfirmDelete = async () => {
    if (clearHistory) {
      await clearHistory();
    }
    setShowDeleteConfirm(false);
  };

  return (
    <div className="flex flex-col h-full border-l border-gray-100 bg-white relative overflow-hidden">
      {showDeleteConfirm && (
        <DeleteChatModal
          setShowDeleteConfirm={setShowDeleteConfirm}
          handleConfirmDelete={handleConfirmDelete}
          activeTopic={activeTopic}
        />
      )}

      <div className="flex items-center gap-2 px-3 py-2.5 border-b border-gray-100 flex-shrink-0">
        <div className="w-2 h-2 rounded-full bg-[#1DB870] animate-pulse" />
        <p className="text-xs font-semibold text-[#1A3A5C]">AI Tutor</p>

        {activeTopic && (
          <span className="ml-auto text-[10px] bg-[#D6EAF8] text-[#2E6DA4] px-2 py-0.5 rounded-full">
            {activeTopic.title}
          </span>
        )}

        {messages.length > 0 && (
          <button
            onClick={() => setShowDeleteConfirm(true)}
            className="ml-2 text-gray-400 hover:text-red-500 hover:bg-red-100 cursor-pointer transition-colors p-1 rounded"
            title="Clear Conversation"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M3 6h18"></path>
              <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
              <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
            </svg>
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto min-h-0 px-3 py-3 relative">
        {isFetchingHistory ? (
          <Spinner />
        ) : (
          <div className="flex flex-col gap-3 min-h-full">
            {messages.length === 0 ? (
              <div className="flex flex-col items-center justify-center flex-1 text-center px-4 mt-20 opacity-80">
                <h2 className="text-xl font-bold text-[#1A3A5C] mb-1">
                  PyTutor AI
                </h2>
                <p className="text-sm text-gray-500">
                  Ask a question about{" "}
                  {activeTopic ? activeTopic.title.split("—")[0] : "Python"}
                </p>
              </div>
            ) : (
              <>
                {messages.map((msg, i) => (
                  <MessageBubble key={i} message={msg} />
                ))}
              </>
            )}

            {isLoading && <TypingIndicator />}

            <div ref={bottomRef} />
          </div>
        )}
      </div>

      <ChatInput onSend={handleSend} isLoading={isLoading} />
    </div>
  );
}
