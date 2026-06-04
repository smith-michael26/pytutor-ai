"use client";

import { useRef, useEffect, useState } from "react";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";
import TypingIndicator from "./TypingIndicator";
import Spinner from "./Spinner";
import { useChat } from "@/context/ChatContext";
import DeleteModal from "./DeleteModal";
import TrashIcon from "../ui/icons/trash";

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
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleConfirmDelete = async () => {
    await clearHistory();
    setShowDeleteModal(false);
  };

  return (
    <div className="flex flex-col h-full border-l border-gray-100 bg-white overflow-hidden relative">
      {showDeleteModal && (
        <DeleteModal
          activeTopic={activeTopic}
          onSetShowDeleteModal={setShowDeleteModal}
          onConfirmDelete={handleConfirmDelete}
        />
      )}

      <div className="flex items-center gap-2 px-3 py-3 border-b border-gray-100 shrink-0">
        <div className="w-2 h-2 rounded-full bg-[#1DB870] animate-pulse" />
        <p className="text-[1rem] font-semibold text-[#1A3A5C]">AI Tutor</p>

        {activeTopic && (
          <span className="ml-auto text-[0.7rem] bg-[#D6EAF8] text-[#2E6DA4] px-2 py-0.5 rounded-full">
            {activeTopic.title}
          </span>
        )}

        {!isFetchingHistory && messages.length > 0 && (
          <button
            onClick={() => setShowDeleteModal(true)}
            className="ml-2 text-gray-400 hover:text-red-500 hover:bg-red-50 p-1.5 rounded transition-colors"
            title="Clear conversation"
          >
            <TrashIcon className="size-4 cursor-pointer" />
          </button>
        )}
      </div>

      <div className="flex-1 overflow-y-auto min-h-0 px-3 py-3 relative">
        {isFetchingHistory ? (
          <Spinner />
        ) : messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center px-4">
            <h2 className="text-xl font-bold text-[#1A3A5C] mb-1">
              PyTutor AI
            </h2>
            <p className="text-sm text-[#6B7280]">
              Ask a question about{" "}
              {activeTopic ? activeTopic.title.split("—")[0].trim() : "Python"}
            </p>
          </div>
        ) : (
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
