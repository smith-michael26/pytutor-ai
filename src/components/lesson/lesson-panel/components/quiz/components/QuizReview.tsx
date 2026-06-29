import { useQuiz } from "@/context/QuizContext";

export default function QuizReview() {
  const { questions, mcqAnswers, codeAnswers, earnedPoints, setStatus } =
    useQuiz();
  return (
    <div>
      <button
        onClick={() => setStatus("submitted")}
        className="text-xs text-[#2E6DA4] hover:underline mb-4"
      >
        ← Back to Results
      </button>

      <div className="flex flex-col gap-5">
        {questions.map((q, idx) => {
          const earned = earnedPoints[q.id] || 0;
          const isCorrect = earned > 0;

          return (
            <div
              key={q.id}
              className={`p-4 rounded-lg border-2 ${
                isCorrect
                  ? "border-[#1DB870] bg-[#D4F5E4]/30"
                  : "border-[#E84040] bg-[#FDE8E8]/30"
              }`}
            >
              <div className="flex items-center justify-between mb-2">
                <span className="text-[11px] font-medium text-[#6B7280]">
                  Question {idx + 1}
                </span>
                <span
                  className={`text-[11px] font-semibold ${isCorrect ? "text-[#1DB870]" : "text-[#E84040]"}`}
                >
                  {isCorrect ? `✓ +${earned} pt` : "✗ 0 pt"}
                </span>
              </div>

              <p className="text-sm text-[#1A3A5C] font-medium mb-2 whitespace-pre-line">
                {q.question}
              </p>

              {q.type === "mcq" && q.options && (
                <div className="flex flex-col gap-1.5 mt-2">
                  {q.options.map((opt, i) => {
                    const correctIndex = parseInt(q.correct_answer, 10);
                    const selectedIndex = mcqAnswers[q.id];
                    const isThisCorrect = i === correctIndex;
                    const isThisSelected = i === selectedIndex;

                    let style = "border-gray-200 text-[#6B7280]";
                    if (isThisCorrect)
                      style = "border-[#1DB870] bg-[#D4F5E4] text-[#0a4a2c]";
                    else if (isThisSelected)
                      style = "border-[#E84040] bg-[#FDE8E8] text-[#7A1010]";

                    return (
                      <div
                        key={i}
                        className={`text-xs px-3 py-2 rounded-md border font-medium ${style}`}
                      >
                        {opt}
                        {isThisSelected && !isThisCorrect && " (your answer)"}
                        {isThisCorrect && " ✓"}
                      </div>
                    );
                  })}
                </div>
              )}

              {q.type === "code" && (
                <div className="mt-2 text-xs">
                  <p className="text-[#6B7280] mb-1">Your output:</p>
                  <pre className="bg-[#0D1E30] text-[#4EA8DE] p-2 rounded-md font-mono mb-2 whitespace-pre-wrap">
                    {codeAnswers[q.id]?.output || "(no output)"}
                  </pre>
                  {!isCorrect && (
                    <>
                      <p className="text-[#6B7280] mb-1">Expected output:</p>
                      <pre className="bg-[#0D1E30] text-[#1DB870] p-2 rounded-md font-mono whitespace-pre-wrap">
                        {q.correct_answer}
                      </pre>
                    </>
                  )}
                </div>
              )}

              {q.explanation && (
                <div className="mt-3 p-2 bg-white/60 border border-gray-200 rounded-md">
                  <p className="text-[11px] text-[#374151]">
                    💡 {q.explanation}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
