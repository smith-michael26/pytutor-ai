import { useQuiz } from "@/context/QuizContext";
import MCQQuestion from "./MCQQuestion";
import CodeQuestion from "./CodeQuestion";

export default function QuizActive() {
  const {
    questions,
    currentIndex,
    maxPoints,
    mcqAnswers,
    codeAnswers,
    hintsUsed,
    currentQuestion,
    setMcqAnswers,
    setCodeAnswers,
    setHintsUsed,
    handleNext,
    handlePrevious,
  } = useQuiz();

  if (!currentQuestion) return null;

  const isLastQuestion = currentIndex === questions.length - 1;
  return (
    <div>
      {/* Header: progress + total points */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-[11px] text-[#6B7280] font-medium">
          Question {currentIndex + 1} of {questions.length}
        </span>
        <span className="text-[11px] text-[#2E6DA4] font-semibold">
          Total: {maxPoints} pts
        </span>
      </div>
      <div className="h-1.5 bg-[#D6EAF8] rounded-full overflow-hidden mb-5">
        <div
          className="h-full bg-[#2E6DA4] rounded-full transition-all duration-300"
          style={{
            width: `${((currentIndex + 1) / questions.length) * 100}%`,
          }}
        />
      </div>

      {/* Question */}
      {currentQuestion.type === "mcq" ? (
        <MCQQuestion
          key={currentQuestion.id}
          question={currentQuestion}
          selectedIndex={mcqAnswers[currentQuestion.id] ?? null}
          onSelect={(index) =>
            setMcqAnswers((prev) => ({
              ...prev,
              [currentQuestion.id]: index,
            }))
          }
        />
      ) : (
        <CodeQuestion
          key={currentQuestion.id}
          question={currentQuestion}
          code={
            codeAnswers[currentQuestion.id]?.code ??
            currentQuestion.starter_code ??
            ""
          }
          output={codeAnswers[currentQuestion.id]?.output ?? ""}
          hintUsed={hintsUsed.has(currentQuestion.id)}
          onCodeChange={(code) =>
            setCodeAnswers((prev) => ({
              ...prev,
              [currentQuestion.id]: {
                code,
                output: prev[currentQuestion.id]?.output ?? "",
              },
            }))
          }
          onOutputChange={(output) =>
            setCodeAnswers((prev) => ({
              ...prev,
              [currentQuestion.id]: {
                code: prev[currentQuestion.id]?.code ?? "",
                output,
              },
            }))
          }
          onUseHint={() =>
            setHintsUsed((prev) => new Set(prev).add(currentQuestion.id))
          }
        />
      )}

      {/* Navigation */}
      <div className="flex items-center gap-2 mt-5">
        <button
          onClick={handlePrevious}
          disabled={currentIndex === 0}
          className="text-xs border border-gray-200 text-[#6B7280] px-4 py-2 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
        >
          ← Previous
        </button>
        <button
          onClick={handleNext}
          className="text-xs bg-[#2E6DA4] text-white px-5 py-2 rounded-lg hover:bg-[#1A3A5C] transition-colors cursor-pointer"
        >
          {isLastQuestion ? "Submit Quiz ✓" : "Next Question →"}
        </button>
      </div>
    </div>
  );
}
