"use client";

import { useState } from "react";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Topic } from "@/lib/topics";
import { Lesson } from "@/lib/lessons";
import LessonTab from "./components/LessonTab";
import NoteTab from "./components/NoteTab";
import QuizTab from "./components/quiz/QuizTab";
import { NotesProvider } from "@/context/NoteContext";

interface LessonPanelProps {
  topics: Topic[];
  topic: Topic | null;
  lesson: Lesson | null;
  onTryInEditor?: (code: string) => void;
  onAskAI?: (question: string) => void;
  onContinueToNext?: () => void;
  onResetCourse?: () => Promise<void>;
}

export default function LessonPanel({
  topic,
  onTryInEditor,
  onAskAI,
  lesson,
  onContinueToNext,
  topics,
  onResetCourse,
}: LessonPanelProps) {
  const [quizActive, setQuizActive] = useState(false);

  // Update the empty state check
  if (!topic || !lesson) {
    const allDone =
      topics.length > 0 && topics.every((t) => t.status === "done");

    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 text-center px-8">
        {allDone ? (
          <>
            <div className="w-16 h-16 rounded-full bg-[#D4F5E4] flex items-center justify-center text-3xl">
              🎓
            </div>
            <p className="text-lg font-bold text-[#1A3A5C]">Congratulations!</p>
            <p className="text-sm text-[#6B7280] max-w-xs">
              You have completed all 20 Python modules. You are now a Python
              programmer! 🐍
            </p>
            <div className="mt-2 px-4 py-2 bg-[#D6EAF8] border border-[#A8CFE8] rounded-lg">
              <p className="text-xs text-[#2E6DA4] font-medium">
                Your progress has been saved. Keep practising!
              </p>
            </div>

            <button
              onClick={async () => {
                const confirmed = window.confirm(
                  "Are you sure you want to restart the course from the beginning? All your progress will be reset.",
                );
                if (confirmed) await onResetCourse?.();
              }}
              className="mt-2 text-xs border text-white px-4 py-2 rounded-lg bg-[#1DB870] hover:bg-[#17a362] transition-colors cursor-pointer"
            >
              ↻ Retake Entire Course
            </button>
          </>
        ) : (
          <>
            <div className="w-14 h-14 rounded-full bg-[#D6EAF8] flex items-center justify-center text-2xl">
              📚
            </div>
            <p className="text-sm font-medium text-[#1A3A5C]">
              Select a topic to start learning
            </p>
            <p className="text-xs text-[#6B7280]">
              Choose any module from the sidebar to begin
            </p>
          </>
        )}
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-white">
      <Tabs
        key={topic.id}
        defaultValue="lesson"
        className="flex flex-col flex-1 overflow-hidden"
      >
        <div className="border-b border-gray-100 px-4 pt-3 shrink-0">
          <TabsList className="bg-transparent p-0 gap-1 h-auto">
            {["lesson", "notes", "quiz"].map((tab) => {
              const isLocked = quizActive && tab !== "quiz";
              return (
                <TabsTrigger
                  key={tab}
                  value={tab}
                  disabled={isLocked}
                  className={`
                    capitalize text-xs px-4 py-2 rounded-none border-b-2 border-transparent
                    data-[state=active]:border-[#2E6DA4] data-[state=active]:text-[#2E6DA4] text-[#6B7280] hover:text-[#1A3A5C]!
                    data-[state=active]:bg-transparent data-[state=active]:shadow-none
                    hover:bg-[#D6EAF8]/60 transition-all
                    ${
                      isLocked
                        ? "text-gray-300 cursor-not-allowed opacity-50"
                        : "text-[#6B7280] hover:text-[#1A3A5C] cursor-pointer"
                    }
                  `}
                >
                  {tab}
                  {isLocked && <span className="ml-1 text-[9px]">🔒</span>}
                </TabsTrigger>
              );
            })}
          </TabsList>
          {quizActive && (
            <p className="text-[10px] text-[#F4A030] pb-1.5">
              ⚠ Finish the quiz before switching tabs
            </p>
          )}
        </div>

        <LessonTab
          topic={topic}
          lesson={lesson}
          onTryInEditor={onTryInEditor}
          onAskAI={onAskAI}
        />

        <NotesProvider activeTopic={topic}>
          <NoteTab />
        </NotesProvider>

        <QuizTab
          topic={topic}
          lesson={lesson}
          onQuizActiveChange={setQuizActive}
          onContinueToNext={onContinueToNext}
        />
      </Tabs>
    </div>
  );
}
