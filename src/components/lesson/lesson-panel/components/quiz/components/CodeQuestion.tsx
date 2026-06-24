"use client";

import { useState } from "react";
import { QuizQuestion } from "@/lib/quiz";
import { usePyodide } from "@/hooks/usePyodide";
import CodeEditor from "@/components/editor/CodeEditor";

interface CodeQuestionProps {
  question: QuizQuestion;
  code: string;
  output: string;
  hintUsed: boolean;
  onCodeChange: (code: string) => void;
  onOutputChange: (output: string) => void;
  onUseHint: () => void;
}

export default function CodeQuestion({
  question,
  code,
  output,
  hintUsed,
  onCodeChange,
  onOutputChange,
  onUseHint,
}: CodeQuestionProps) {
  const [isRunning, setIsRunning] = useState(false);
  const [runError, setRunError] = useState<string | null>(null);
  const { runCode, loading: pyodideLoading } = usePyodide();

  const handleRun = async () => {
    setIsRunning(true);
    const result = await runCode(code);
    setRunError(result.error);
    onOutputChange(result.error ? "" : result.output);
    setIsRunning(false);
  };

  return (
    <div>
      <p className="text-sm font-medium text-[#1A3A5C] mb-1 leading-relaxed whitespace-pre-line">
        {question.question}
      </p>
      {hintUsed && (
        <p className="text-[10px] text-[#F4A030] mb-3">
          ⚠ Hint used — max score for this question is 1 point.
        </p>
      )}

      <div
        className="rounded-lg overflow-hidden border border-[#2E3A4A] mb-2"
        style={{ height: "140px" }}
      >
        <CodeEditor value={code} onChange={onCodeChange} />
      </div>

      <div className="flex items-center gap-2 mb-3">
        <button
          onClick={handleRun}
          disabled={isRunning || pyodideLoading}
          className="text-xs bg-[#1DB870] text-white px-3 py-1.5 rounded-md hover:bg-[#17a362] transition-colors disabled:opacity-50"
        >
          {isRunning || pyodideLoading ? "Running..." : "▶ Run"}
        </button>

        {question.hint && !hintUsed && (
          <button
            onClick={onUseHint}
            className="text-xs text-[#F4A030] hover:underline"
          >
            💡 Show hint (−1 point)
          </button>
        )}
      </div>

      {hintUsed && question.hint && (
        <div className="mb-3 p-3 bg-[#FEF3DC] border border-[#F4A030] rounded-lg">
          <p className="text-xs text-[#7A4F00] leading-relaxed">
            💡 {question.hint}
          </p>
        </div>
      )}

      <div className="bg-[#0D1E30] rounded-lg p-3">
        <p className="text-[10px] text-[#4EA8DE] font-mono mb-1">Output</p>
        {runError ? (
          <p className="text-xs text-[#E84040] font-mono whitespace-pre-wrap">
            {runError}
          </p>
        ) : output ? (
          <p className="text-xs text-[#1DB870] font-mono whitespace-pre-wrap">
            {output}
          </p>
        ) : (
          <p className="text-xs text-[#4B5563] font-mono">
            {/* // Click Run to see output */}
          </p>
        )}
      </div>
    </div>
  );
}
