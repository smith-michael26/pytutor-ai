import { createClient } from "@/lib/supabase/client";

export interface LessonSection {
  type: "text" | "code" | "hint" | "quiz_trigger";
  content: string;
}

export interface Lesson {
  id: number;
  topic_id: number;
  title: string;
  duration: string;
  level: "Beginner" | "Intermediate";
  order: number;
  sections: LessonSection[];
}

const CACHE_KEY = "pytutor_lessons";
const CACHE_EXPIRY_HOURS = 24;

export async function fetchLesson(topicId: number): Promise<Lesson | null> {
  const supabase = createClient();

  const { data, error } = await supabase
    .from("lessons")
    .select("*")
    .eq("topic_id", topicId)
    .single();

  if (error) {
    console.error("Error fetching lesson:", error.message);
    return null;
  }

  return data as Lesson;
}

export async function fetchAllLessons(): Promise<Lesson[]> {
  if (typeof window !== "undefined") {
    try {
      const cached = localStorage.getItem(CACHE_KEY);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        const ageHours = (Date.now() - timestamp) / (1000 * 60 * 60);
        if (ageHours < CACHE_EXPIRY_HOURS) {
          return data as Lesson[];
        }
      }
    } catch {}
  }

  const supabase = createClient();

  const { data, error } = await supabase
    .from("lessons")
    .select("*")
    .order("order", { ascending: true });

  if (error) {
    console.error("Error fetching lessons:", error.message);
    return [];
  }

  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(
        CACHE_KEY,
        JSON.stringify({ data, timestamp: Date.now() }),
      );
    } catch {}
  }

  return data as Lesson[];
}
