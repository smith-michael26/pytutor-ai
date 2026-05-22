"use client";

import { useState, useRef, useEffect } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Message, sendToGemini } from "@/lib/gemini";
import { Topic } from "@/lib/topics";
import MessageBubble from "./MessageBubble";
import ChatInput from "./ChatInput";

interface ChatPanelProps {
  activeTopic: Topic | null;
  initialMessage?: string;
}

const WELCOME_MESSAGE: Message = {
  role: "ai",
  content:
    "Hi! I'm PyTutor AI 👋 I'm here to help you learn Python. Select a topic from the sidebar and ask me anything — I'll explain concepts, review your code, and quiz you!",
  timestamp: new Date(),
};

export default function ChatPanel({
  activeTopic,
  initialMessage,
}: ChatPanelProps) {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  // Get API key from environment
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || "";

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    // When LessonPanel triggers "Ask AI Tutor" button
    useEffect(() => {
      if (initialMessage) {
        handleSend(initialMessage);
      }
    }, [initialMessage]);

    // Add context about the active topic to first message
    const contextualText =
      activeTopic && messages.length === 1
        ? `I am currently studying Module ${activeTopic.id}: ${activeTopic.title}. ${text}`
        : text;

    const userMessage: Message = {
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    try {
      const aiResponse = await sendToGemini(
        [
          ...messages,
          { role: "user", content: contextualText, timestamp: new Date() },
        ],
        apiKey,
      );

      const aiMessage: Message = {
        role: "ai",
        content: aiResponse,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);
    } catch (error) {
      const errorMessage: Message = {
        role: "ai",
        content:
          "Sorry, I couldn't connect to the AI right now. Please check your API key in the .env.local file and try again.",
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full border-l border-gray-100 bg-white overflow-hidden">
      {/* Chat header */}
      <div className="flex items-center gap-2 px-3 py-2.5 border-b border-gray-100 flex-shrink-0">
        <div className="w-2 h-2 rounded-full bg-[#1DB870] animate-pulse" />
        <p className="text-xs font-semibold text-[#1A3A5C]">AI Tutor</p>
        {activeTopic && (
          <span className="ml-auto text-[10px] bg-[#D6EAF8] text-[#2E6DA4] px-2 py-0.5 rounded-full">
            {activeTopic.title}
          </span>
        )}
      </div>

      {/* Messages */}
      <ScrollArea className="flex-1 px-3 py-3">
        <div className="flex flex-col gap-3">
          {messages.map((msg, i) => (
            <MessageBubble key={i} message={msg} />
          ))}

          {/* Typing indicator */}
          {isLoading && (
            <div className="flex items-start gap-2">
              <div className="bg-[#7C5CBF] rounded-2xl rounded-tl-sm px-3 py-2">
                <div className="flex gap-1 items-center h-4">
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:0ms]" />
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:150ms]" />
                  <span className="w-1.5 h-1.5 bg-white rounded-full animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>
      </ScrollArea>

      {/* Input */}
      <ChatInput onSend={handleSend} isLoading={isLoading} />
    </div>
  );
}
