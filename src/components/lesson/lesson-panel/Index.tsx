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
  topic: Topic | null;
  lesson: Lesson | null;
  onTryInEditor?: (code: string) => void;
  onAskAI?: (question: string) => void;
  onContinueToNext?: () => void;
}

export default function LessonPanel({
  topic,
  onTryInEditor,
  onAskAI,
  lesson,
  onContinueToNext,
}: LessonPanelProps) {
  const [quizActive, setQuizActive] = useState(false);

  if (!topic || !lesson) {
    return (
      <div className="flex h-full flex-col items-center justify-center gap-3 text-center px-8">
        <div className="w-14 h-14 rounded-full bg-[#D6EAF8] flex items-center justify-center text-2xl">
          📚
        </div>
        <p className="text-sm font-medium text-[#1A3A5C]">
          Select a topic to start learning
        </p>
        <p className="text-xs text-[#6B7280]">
          Choose any module from the sidebar to begin
        </p>
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
