"use client";

import { QuizQuestion } from "@/lib/quiz";

interface MCQQuestionProps {
  question: QuizQuestion;
  selectedIndex: number | null;
  onSelect: (index: number) => void;
}

export default function MCQQuestion({
  question,
  selectedIndex,
  onSelect,
}: MCQQuestionProps) {
  return (
    <div>
      <p className="text-sm font-medium text-[#1A3A5C] mb-4 leading-relaxed whitespace-pre-line">
        {question.question}
      </p>

      <div className="flex flex-col gap-2">
        {question.options?.map((opt, i) => {
          const isSelected = i === selectedIndex;

          return (
            <button
              key={i}
              onClick={() => onSelect(i)}
              className={`text-left text-sm font-medium px-4 py-3 rounded-lg border-2 transition-all cursor-pointer
                ${
                  isSelected
                    ? "border-[#2E6DA4] bg-[#D6EAF8] text-[#1A3A5C]"
                    : "border-gray-200 bg-white text-[#374151] hover:border-[#4EA8DE] hover:bg-[#F0F7FC]"
                }`}
            >
              {opt}
            </button>
          );
        })}
      </div>
    </div>
  );
}
