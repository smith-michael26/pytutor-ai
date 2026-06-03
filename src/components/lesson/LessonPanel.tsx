"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Topic } from "@/lib/topics";
import { lessons } from "@/lib/lessons";
import HintBox from "./HintBox";
import CodeBlock from "./CodeBlock";

interface LessonPanelProps {
  topic: Topic | null;
  onTryInEditor?: (code: string) => void;
  onAskAI?: (question: string) => void;
}

export default function LessonPanel({
  topic,
  onTryInEditor,
  onAskAI,
}: LessonPanelProps) {
  if (!topic) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center px-8">
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

  const lesson = lessons[topic.id];

  if (!lesson) {
    return (
      <div className="flex-1 flex items-center justify-center text-sm text-[#6B7280]">
        Lesson content coming soon.
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col overflow-hidden bg-white">
      <Tabs
        defaultValue="lesson"
        className="flex flex-col flex-1 overflow-hidden"
      >
        <div className="border-b border-gray-100 px-4 pt-3 shrink-0">
          <TabsList className="bg-transparent p-0 gap-1 h-auto">
            {["lesson", "notes", "quiz"].map((tab) => (
              <TabsTrigger
                key={tab}
                value={tab}
                className="
                  capitalize text-xs px-4 py-2 rounded-none border-b-2 border-transparent
                  data-[state=active]:border-[#2E6DA4] data-[state=active]:text-[#2E6DA4]
                  data-[state=active]:bg-transparent data-[state=active]:shadow-none
                  text-[#6B7280] hover:text-[#1A3A5C] transition-colors cursor-pointer
                "
              >
                {tab}
              </TabsTrigger>
            ))}
          </TabsList>
        </div>

        <TabsContent value="lesson" className="flex-1 overflow-hidden mt-0">
          <ScrollArea className="h-full">
            <div className="px-5 py-4">
              <div className="mb-4">
                <div className="flex items-center gap-2 mb-1">
                  <h1 className="text-base font-semibold text-[#1A3A5C]">
                    Module {topic.id} — {lesson.title}
                  </h1>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    variant="outline"
                    className="text-[10px] text-[#2E6DA4] border-[#2E6DA4] px-2 py-0"
                  >
                    {lesson.level}
                  </Badge>
                  <span className="text-[11px] text-[#6B7280]">
                    · {lesson.duration}
                  </span>
                </div>
              </div>

              <div className="space-y-1">
                {lesson.sections.map((section, index) => {
                  if (section.type === "text") {
                    return (
                      <p
                        key={index}
                        className="text-sm text-[#374151] leading-relaxed"
                      >
                        {section.content}
                      </p>
                    );
                  }

                  if (section.type === "hint") {
                    return <HintBox key={index} content={section.content} />;
                  }

                  if (section.type === "code") {
                    return (
                      <CodeBlock
                        key={index}
                        code={section.content}
                        onTryInEditor={onTryInEditor}
                      />
                    );
                  }

                  return null;
                })}
              </div>

              <div className="flex gap-3 mt-6 pt-4 border-t border-gray-100">
                <button
                  onClick={() =>
                    onTryInEditor?.(
                      lesson.sections.find((s) => s.type === "code")?.content ||
                        "",
                    )
                  }
                  className="flex items-center gap-2 bg-[#2E6DA4] text-white text-xs px-4 py-2 rounded-lg hover:bg-[#1A3A5C] transition-colors"
                >
                  Try it in Editor →
                </button>
                <button
                  onClick={() =>
                    onAskAI?.(`Explain Module ${topic.id}: ${lesson.title}`)
                  }
                  className="flex items-center gap-2 border border-[#2E6DA4] text-[#2E6DA4] text-xs px-4 py-2 rounded-lg hover:bg-[#D6EAF8] transition-colors"
                >
                  Ask AI Tutor
                </button>
              </div>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="notes" className="flex-1 overflow-hidden mt-0">
          <ScrollArea className="h-full">
            <div className="px-5 py-4">
              <p className="text-sm font-medium text-[#1A3A5C] mb-3">
                Your Notes
              </p>
              <textarea
                placeholder="Write your notes for this topic here..."
                className="w-full h-64 text-sm text-[#374151] border border-gray-200 rounded-lg p-3 resize-none focus:outline-none focus:ring-2 focus:ring-[#4EA8DE] placeholder:text-[#9CA3AF]"
              />
              <button className="mt-2 text-xs bg-[#2E6DA4] text-white px-4 py-2 rounded-lg hover:bg-[#1A3A5C] transition-colors">
                Save Notes
              </button>
            </div>
          </ScrollArea>
        </TabsContent>

        <TabsContent value="quiz" className="flex-1 overflow-hidden mt-0">
          <ScrollArea className="h-full">
            <div className="px-5 py-4 flex flex-col items-center justify-center min-h-48 gap-3 text-center">
              <div className="w-12 h-12 rounded-full bg-[#7C5CBF]/10 flex items-center justify-center text-xl">
                🧠
              </div>
              <p className="text-sm font-medium text-[#1A3A5C]">
                Ready to test yourself?
              </p>
              <p className="text-xs text-[#6B7280] max-w-xs">
                The AI will generate quiz questions based on this lesson. Make
                sure you have read through the lesson first.
              </p>
              <button
                onClick={() =>
                  onAskAI?.(
                    `Quiz me on Module ${topic.id}: ${lesson.title}. Ask me 3 questions one at a time.`,
                  )
                }
                className="bg-[#7C5CBF] text-white text-xs px-5 py-2 rounded-lg hover:bg-[#6a4daa] transition-colors"
              >
                Start Quiz with AI →
              </button>
            </div>
          </ScrollArea>
        </TabsContent>
      </Tabs>
    </div>
  );
}
