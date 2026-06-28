"use client";

import { createClient } from "@/lib/supabase/client";
import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Topic, buildTopicsFromLessons } from "@/lib/topics";
import { Lesson, fetchAllLessons } from "@/lib/lessons";

interface CurriculumContextType {
  topics: Topic[];
  allLessons: Lesson[];
  activeTopic: Topic | null;
  activeLesson: Lesson | null;
  loading: boolean;
  handleTopicSelect: (topic: Topic) => void;
  continueToNextTopic: () => void; // 👈 new
}

const CurriculumContext = createContext<CurriculumContextType | null>(null);

export function CurriculumProvider({ children }: { children: ReactNode }) {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [allLessons, setAllLessons] = useState<Lesson[]>([]);
  const [activeTopic, setActiveTopic] = useState<Topic | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);

  const [completedIds, setCompletedIds] = useState<number[]>([]);

  useEffect(() => {
    const load = async () => {
      const supabase = createClient();

      const [lessons, progressResult] = await Promise.all([
        fetchAllLessons(),
        supabase
          .from("user_progress")
          .select("topic_id")
          .order("topic_id", { ascending: true }),
      ]);

      const completed = progressResult.data?.map((r) => r.topic_id) ?? [];

      setAllLessons(lessons);
      setCompletedIds(completed);

      const activeId = completed.length > 0 ? Math.max(...completed) + 1 : 1;

      const builtTopics = buildTopicsFromLessons(lessons, completed, activeId);
      setTopics(builtTopics);

      const firstActive = builtTopics.find((t) => t.status === "active");
      if (firstActive) {
        setActiveTopic(firstActive);
        const lesson = lessons.find((l) => l.topic_id === firstActive.id);
        setActiveLesson(lesson || null);
      }

      setLoading(false);
    };

    load();
  }, []);

  const handleTopicSelect = (topic: Topic) => {
    setActiveTopic(topic);
    const lesson = allLessons.find((l) => l.topic_id === topic.id);
    setActiveLesson(lesson || null);
  };

  const continueToNextTopic = async () => {
    if (!activeTopic) return;

    const newCompleted = [...completedIds, activeTopic.id];
    setCompletedIds(newCompleted);

    const supabase = createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user) {
      const { error } = await supabase.from("user_progress").upsert(
        {
          user_id: user.id,
          topic_id: activeTopic.id,
        },
        { onConflict: "user_id,topic_id" },
      );
      if (error) console.error("Failed to save progress:", error.message);
    }

    const nextId = activeTopic.id + 1;
    const nextLesson = allLessons.find((l) => l.topic_id === nextId);

    const newTopics = buildTopicsFromLessons(allLessons, newCompleted, nextId);
    setTopics(newTopics);

    if (nextLesson) {
      const nextTopic = newTopics.find((t) => t.id === nextId) || null;
      setActiveTopic(nextTopic);
      setActiveLesson(nextLesson);
    }
  };

  return (
    <CurriculumContext.Provider
      value={{
        topics,
        allLessons,
        activeTopic,
        activeLesson,
        loading,
        handleTopicSelect,
        continueToNextTopic,
      }}
    >
      {children}
    </CurriculumContext.Provider>
  );
}

export function useCurriculum() {
  const context = useContext(CurriculumContext);
  if (!context)
    throw new Error("useCurriculum must be used inside CurriculumProvider");
  return context;
}
