import { Lesson } from "@/lib/lessons";
import { Topic } from "@/lib/topics";
import { TabsContent } from "@/components/ui/tabs";
import { ScrollArea } from "@/components/ui/scroll-area";

interface QuizTabProps {
  topic: Topic;
  lesson: Lesson;
  onAskAI?: (question: string) => void;
}

export default function QuizTab({ topic, lesson, onAskAI }: QuizTabProps) {
  return (
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
            The AI will quiz you on {lesson.title}. Make sure you have read
            through the lesson first.
          </p>
          <button
            onClick={() =>
              onAskAI?.(
                `Quiz me on Module ${topic.id}: ${lesson.title}. Ask me 3 questions one at a time and wait for my answer before asking the next.`,
              )
            }
            className="bg-[#7C5CBF] text-white text-xs px-5 py-2 rounded-lg hover:bg-[#6a4daa] transition-colors"
          >
            Start Quiz with AI →
          </button>
        </div>
      </ScrollArea>
    </TabsContent>
  );
}
