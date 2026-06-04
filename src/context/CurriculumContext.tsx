"use client";

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
}

const CurriculumContext = createContext<CurriculumContextType | null>(null);

export function CurriculumProvider({ children }: { children: ReactNode }) {
  const [topics, setTopics] = useState<Topic[]>([]);
  const [allLessons, setAllLessons] = useState<Lesson[]>([]);
  const [activeTopic, setActiveTopic] = useState<Topic | null>(null);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadLessons = async () => {
      const lessons = await fetchAllLessons();
      setAllLessons(lessons);

      const builtTopics = buildTopicsFromLessons(lessons, [], 1);
      setTopics(builtTopics);

      const firstActive = builtTopics.find((t) => t.status === "active");
      if (firstActive) {
        setActiveTopic(firstActive);
        const lesson = lessons.find((l) => l.topic_id === firstActive.id);
        setActiveLesson(lesson || null);
      }

      setLoading(false);
    };

    loadLessons();
  }, []);

  const handleTopicSelect = (topic: Topic) => {
    setActiveTopic(topic);
    const lesson = allLessons.find((l) => l.topic_id === topic.id);
    setActiveLesson(lesson || null);
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
      }}
    >
      {children}
    </CurriculumContext.Provider>
  );
}

export function useCurriculum() {
  const context = useContext(CurriculumContext);
  if (!context) {
    throw new Error("useCurriculum must be used inside CurriculumProvider");
  }
  return context;
}
