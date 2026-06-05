"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Topic } from "@/lib/topics";
import { createClient } from "@/lib/supabase/client";

interface NotesContextType {
  content: string;
  isLoading: boolean;
  isSaving: boolean;
  isDirty: boolean;
  saveMessage: string;
  handleTextChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  saveNotes: () => Promise<void>;
}

const NotesContext = createContext<NotesContextType | undefined>(undefined);

export function NotesProvider({
  children,
  activeTopic,
}: {
  children: ReactNode;
  activeTopic: Topic | null;
}) {
  const [content, setContent] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isDirty, setIsDirty] = useState(false);
  const [saveMessage, setSaveMessage] = useState("");

  const supabase = createClient();

  useEffect(() => {
    async function loadNotes() {
      if (!activeTopic) return;

      setIsLoading(true);
      setSaveMessage("");
      setIsDirty(false);

      const { data: userData } = await supabase.auth.getUser();
      if (!userData.user) {
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("notes")
        .select("content")
        .eq("topic_id", activeTopic.id)
        .eq("user_id", userData.user.id)
        .single();

      if (data) {
        setContent(data.content || "");
      } else {
        setContent("");
      }

      setIsLoading(false);
    }

    loadNotes();
  }, [activeTopic]);

  const handleTextChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setIsDirty(true);
    setSaveMessage("");
  };

  const saveNotes = async () => {
    if (!activeTopic) return;

    setIsSaving(true);
    setSaveMessage("");

    const { data: userData } = await supabase.auth.getUser();
    if (!userData.user) return;

    const { error } = await supabase.from("notes").upsert(
      {
        user_id: userData.user.id,
        topic_id: activeTopic.id,
        content: content,
        updated_at: new Date().toISOString(),
      },
      {
        onConflict: "user_id, topic_id",
      },
    );

    setIsSaving(false);

    if (error) {
      console.error("Error saving notes:", error);
      setSaveMessage("❌ Failed to save");
    } else {
      setIsDirty(false);
      setSaveMessage("Noted Saved ✅");
      setTimeout(() => setSaveMessage(""), 6000);
    }
  };

  return (
    <NotesContext.Provider
      value={{
        content,
        isLoading,
        isSaving,
        isDirty,
        saveMessage,
        handleTextChange,
        saveNotes,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
}

export function useNotes() {
  const context = useContext(NotesContext);
  if (context === undefined) {
    throw new Error("useNotes must be used within a NotesProvider");
  }
  return context;
}
