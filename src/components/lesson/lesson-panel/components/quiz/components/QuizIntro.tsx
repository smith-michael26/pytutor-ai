import { Lesson } from "@/lib/lessons";

interface QuizIntroProps {
  lesson: Lesson;
  startQuiz: () => void;
}

export default function QuizIntro({ lesson, startQuiz }: QuizIntroProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-48 gap-3 text-center">
      <div className="w-12 h-12 rounded-full bg-[#7C5CBF]/10 flex items-center justify-center text-xl">
        🧠
      </div>
      <p className="text-sm font-medium text-[#1A3A5C]">
        Ready to test yourself?
      </p>
      <p className="text-xs text-[#6B7280] max-w-xs">
        Answer the questions below to test your understanding of {lesson.title}.
        You need at least 50% to unlock the next topic.
      </p>
      <button
        onClick={startQuiz}
        className="bg-[#7C5CBF] text-white text-xs px-5 py-2 rounded-lg hover:bg-[#6a4daa] transition-colors cursor-pointer"
      >
        Start Quiz →
      </button>
    </div>
  );
}
