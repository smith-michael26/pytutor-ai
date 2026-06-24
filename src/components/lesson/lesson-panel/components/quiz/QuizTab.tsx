"use client";

import { Lesson } from "@/lib/lessons";
import { Topic } from "@/lib/topics";
import { TabsContent } from "@/components/ui/tabs";
import { QuizProvider, useQuiz } from "@/context/QuizContext";
import QuizActive from "./components/QuizActive";
import QuizResults from "./components/QuizResults";
import QuizReview from "./components/QuizReview";
import QuizIntro from "./components/QuizIntro";

interface QuizTabProps {
  topic: Topic;
  lesson: Lesson;
  onQuizActiveChange?: (active: boolean) => void;
  onContinueToNext?: () => void;
}

function QuizTabContent({
  lesson,
  onContinueToNext,
}: Omit<QuizTabProps, "topic">) {
  const { status, startQuiz } = useQuiz();

  return (
    <TabsContent value="quiz" className="flex-1 overflow-hidden mt-0">
      <div className="h-full">
        <div className="px-5 py-4">
          {/* INTRO */}
          {status === "intro" && (
            <QuizIntro lesson={lesson} startQuiz={startQuiz} />
          )}

          {/* LOADING */}
          {status === "loading" && (
            <div className="flex flex-col items-center justify-center min-h-48 gap-3">
              <div className="w-6 h-6 border-2 border-[#2E6DA4] border-t-transparent rounded-full animate-spin" />
              <p className="text-xs text-[#6B7280]">Loading questions...</p>
            </div>
          )}

          {/* ACTIVE QUIZ */}
          {status === "active" && <QuizActive />}

          {/* RESULTS */}
          {status === "submitted" && (
            <QuizResults onContinue={() => onContinueToNext?.()} />
          )}

          {/* REVIEW */}
          {status === "reviewing" && (
            <div className="overflow-y-auto">
              <QuizReview />
            </div>
          )}
        </div>
      </div>
    </TabsContent>
  );
}

export default function QuizTab({
  topic,
  lesson,
  onQuizActiveChange,
  onContinueToNext,
}: QuizTabProps) {
  return (
    <QuizProvider
      topic={topic}
      lesson={lesson}
      onQuizActiveChange={onQuizActiveChange}
    >
      <QuizTabContent lesson={lesson} onContinueToNext={onContinueToNext} />
    </QuizProvider>
  );
}
