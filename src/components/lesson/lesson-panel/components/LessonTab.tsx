import { Lesson } from "@/lib/lessons";
import { Topic } from "@/lib/topics";
import { TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import HintBox from "../../HintBox";
import CodeBlock from "../../CodeBlock";

interface LessonTabProps {
  topic: Topic;
  lesson: Lesson;
  onTryInEditor?: (code: string) => void;
  onAskAI?: (question: string) => void;
}

export default function LessonTab({
  topic,
  lesson,
  onTryInEditor,
  onAskAI,
}: LessonTabProps) {
  return (
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
  );
}
