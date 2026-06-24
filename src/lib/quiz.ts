import { createClient } from "@/lib/supabase/client";

export type QuestionType = "mcq" | "code";

export interface QuizQuestion {
  id: number;
  topic_id: number;
  type: QuestionType;
  question: string;
  options: string[] | null;
  correct_answer: string;
  explanation: string | null;
  hint: string | null;
  starter_code: string | null;
  order: number;
  points: number;
}

const CACHE_PREFIX = "pytutor_quiz_";
const CACHE_EXPIRY_HOURS = 24;

export async function fetchQuizQuestions(
  topicId: number,
): Promise<QuizQuestion[]> {
  const cacheKey = `${CACHE_PREFIX}${topicId}`;

  if (typeof window !== "undefined") {
    try {
      const cached = localStorage.getItem(cacheKey);
      if (cached) {
        const { data, timestamp } = JSON.parse(cached);
        const ageHours = (Date.now() - timestamp) / (1000 * 60 * 60);
        if (ageHours < CACHE_EXPIRY_HOURS) {
          return data as QuizQuestion[];
        }
      }
    } catch {}
  }

  const supabase = createClient();

  const { data, error } = await supabase
    .from("quiz_questions")
    .select("*")
    .eq("topic_id", topicId)
    .order("order", { ascending: true });

  if (error) {
    console.error("Error fetching quiz questions:", error.message);
    return [];
  }

  const questions = data as QuizQuestion[];

  if (typeof window !== "undefined") {
    try {
      localStorage.setItem(
        cacheKey,
        JSON.stringify({ data: questions, timestamp: Date.now() }),
      );
    } catch {}
  }

  return questions;
}

export function getMaxPoints(questions: QuizQuestion[]): number {
  return questions.reduce((sum, q) => sum + q.points, 0);
}

export function getPassThreshold(questions: QuizQuestion[]): number {
  return Math.ceil(getMaxPoints(questions) * 0.6);
}
