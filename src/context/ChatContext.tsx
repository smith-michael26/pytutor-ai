"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Topic } from "@/lib/topics";
import { Message } from "@/lib/gemini";
import { createClient } from "@/lib/supabase/client";

const WELCOME_MESSAGE: Message = {
  role: "ai",
  content:
    "Hi! I'm PyTutor AI 👋 I'm here to help you learn Python. Select a topic from the sidebar and ask me anything!",
  timestamp: new Date(),
};

interface ChatContextType {
  messages: Message[];
  isLoading: boolean;
  isFetchingHistory: boolean;
  handleSend: (text: string) => Promise<void>;
  activeTopic: Topic | null;
}

const ChatContext = createContext<ChatContextType | undefined>(undefined);

export function ChatProvider({
  children,
  activeTopic,
  initialMessage,
}: {
  children: ReactNode;
  activeTopic: Topic | null;
  initialMessage?: string;
}) {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFetchingHistory, setIsFetchingHistory] = useState(false);

  const supabase = createClient();

  useEffect(() => {
    async function loadChatHistory() {
      if (!activeTopic) {
        setMessages([WELCOME_MESSAGE]);
        return;
      }

      setIsFetchingHistory(true);

      try {
        const { data, error } = await supabase
          .from("chat_messages")
          .select("*")
          .eq("topic_id", activeTopic.id)
          .order("created_at", { ascending: true });

        if (error) {
          console.error("Error loading history:", error);
        } else if (data && data.length > 0) {
          const history = data.map((msg) => ({
            role: msg.role as "user" | "ai",
            content: msg.content,
            timestamp: new Date(msg.created_at),
          }));
          setMessages(history);
        } else {
          setMessages([WELCOME_MESSAGE]);
        }
      } catch (err) {
        console.error("Hard error fetching history:", err);
      } finally {
        setIsFetchingHistory(false);
      }
    }

    loadChatHistory();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTopic]);

  const handleSend = async (text: string) => {
    if (!text.trim() || isLoading) return;

    const userMessage: Message = {
      role: "user",
      content: text,
      timestamp: new Date(),
    };

    const updatedMessages = [...messages, userMessage];
    setMessages(updatedMessages);
    setIsLoading(true);

    if (activeTopic) {
      const { error } = await supabase.from("chat_messages").insert({
        topic_id: activeTopic.id,
        role: "user",
        content: text,
      });
      if (error) console.error("Failed to save user message:", error.message);
    }

    const contextualText =
      activeTopic && messages.length <= 1
        ? `I am currently studying Module ${activeTopic.id}: ${activeTopic.title}. ${text}`
        : text;

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [
            ...updatedMessages.map((m) => ({
              role: m.role === "ai" ? "model" : "user",
              content: m.content,
            })),
            { role: "user", content: contextualText },
          ],
        }),
      });

      if (!response.ok) throw new Error("Failed to fetch from AI");

      const data = await response.json();

      const aiMessage: Message = {
        role: "ai",
        content: data.text,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, aiMessage]);

      if (activeTopic) {
        const { error } = await supabase.from("chat_messages").insert({
          topic_id: activeTopic.id,
          role: "ai",
          content: data.text,
        });
        if (error) console.error("Failed to save AI message:", error.message);
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [
        ...prev,
        {
          role: "ai",
          content: "Sorry, I'm having trouble connecting right now.",
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (initialMessage) {
      handleSend(initialMessage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [initialMessage]);

  return (
    <ChatContext.Provider
      value={{
        messages,
        isLoading,
        isFetchingHistory,
        handleSend,
        activeTopic,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}

export function useChat() {
  const context = useContext(ChatContext);
  if (context === undefined) {
    throw new Error("useChat must be used within a ChatProvider");
  }
  return context;
}
