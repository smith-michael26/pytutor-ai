import { useQuiz } from "@/context/QuizContext";
import { getMaxPoints, getPassThreshold } from "@/lib/quiz";

interface QuizResultsProps {
  onContinue: () => void;
}

export default function QuizResults({ onContinue }: QuizResultsProps) {
  const { questions, earnedPoints, setStatus } = useQuiz();

  // State setter functions from context - need to update status
  const maxPoints = getMaxPoints(questions);
  const totalEarned = Object.values(earnedPoints).reduce(
    (sum, p) => sum + p,
    0,
  );
  const percentage =
    maxPoints > 0 ? Math.round((totalEarned / maxPoints) * 100) : 0;
  const passThreshold = getPassThreshold(questions);
  const passed = totalEarned >= passThreshold;

  // We need to expose setStatus from context to allow transitioning to review/retake
  return (
    <div className="flex flex-col items-center justify-center text-center px-6 py-8 gap-4">
      <div
        className={`w-20 h-20 rounded-full flex items-center justify-center text-2xl font-bold ${
          passed ? "bg-[#D4F5E4] text-[#1DB870]" : "bg-[#FDE8E8] text-[#E84040]"
        }`}
      >
        {percentage}%
      </div>

      <div>
        <p className="text-base font-semibold text-[#1A3A5C]">
          {passed ? "Great job! You passed 🎉" : "You need 50% to pass"}
        </p>
        <p className="text-xs text-[#6B7280] mt-1">
          You scored {totalEarned} out of {maxPoints} points
        </p>
      </div>

      <div className="flex flex-col gap-2 w-full max-w-xs mt-2">
        <button
          onClick={() => setStatus("reviewing")}
          className="text-xs border border-[#2E6DA4] text-[#2E6DA4] px-4 py-2.5 rounded-lg hover:bg-[#D6EAF8] transition-colors cursor-pointer"
        >
          📋 Review My Answers
        </button>

        {passed && (
          <button
            onClick={onContinue}
            className="text-xs bg-[#1DB870] text-white px-4 py-2.5 rounded-lg hover:bg-[#17a362] transition-colors cursor-pointer"
          >
            ✓ Continue to Next Lesson
          </button>
        )}

        {!passed && (
          <button
            onClick={() => setStatus("intro")}
            className="text-xs bg-[#E84040] text-white px-4 py-2.5 rounded-lg hover:bg-red-600 transition-colors cursor-pointer"
          >
            ↻ Retake — Go Back to Lesson
          </button>
        )}
      </div>
    </div>
  );
}
