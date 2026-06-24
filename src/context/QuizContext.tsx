"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Lesson } from "@/lib/lessons";
import { Topic } from "@/lib/topics";
import { QuizQuestion, fetchQuizQuestions, getMaxPoints } from "@/lib/quiz";
import { compareOutputs } from "@/lib/quizUtils";

type QuizStatus = "intro" | "loading" | "active" | "submitted" | "reviewing";

interface CodeAnswer {
  code: string;
  output: string;
}

interface QuizContextType {
  status: QuizStatus;
  questions: QuizQuestion[];
  currentIndex: number;
  maxPoints: number;
  currentQuestion: QuizQuestion | undefined;
  mcqAnswers: Record<number, number>;
  codeAnswers: Record<number, CodeAnswer>;
  hintsUsed: Set<number>;
  earnedPoints: Record<number, number>;

  startQuiz: () => Promise<void>;
  handlePrevious: () => void;
  handleNext: () => void;
  setStatus: React.Dispatch<React.SetStateAction<QuizStatus>>;
  setMcqAnswers: React.Dispatch<React.SetStateAction<Record<number, number>>>;
  setCodeAnswers: React.Dispatch<
    React.SetStateAction<Record<number, CodeAnswer>>
  >;
  setHintsUsed: React.Dispatch<React.SetStateAction<Set<number>>>;
}

const QuizContext = createContext<QuizContextType | undefined>(undefined);

interface QuizProviderProps {
  children: ReactNode;
  topic: Topic;
  lesson: Lesson;
  onQuizActiveChange?: (active: boolean) => void;
}

export function QuizProvider({
  children,
  topic,
  lesson,
  onQuizActiveChange,
}: QuizProviderProps) {
  const [status, setStatus] = useState<QuizStatus>("intro");
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [mcqAnswers, setMcqAnswers] = useState<Record<number, number>>({});
  const [codeAnswers, setCodeAnswers] = useState<Record<number, CodeAnswer>>(
    {},
  );
  const [hintsUsed, setHintsUsed] = useState<Set<number>>(new Set());
  const [earnedPoints, setEarnedPoints] = useState<Record<number, number>>({});

  const maxPoints = getMaxPoints(questions);
  const currentQuestion = questions[currentIndex];

  useEffect(() => {
    onQuizActiveChange?.(status === "active");
  }, [status, onQuizActiveChange]);

  const startQuiz = async () => {
    setStatus("loading");
    const data = await fetchQuizQuestions(topic.id);

    if (data.length === 0) {
      setStatus("intro");
      return;
    }

    setQuestions(data);
    setCurrentIndex(0);
    setMcqAnswers({});
    setCodeAnswers({});
    setHintsUsed(new Set());
    setEarnedPoints({});
    setStatus("active");
  };

  const handlePrevious = () => {
    if (currentIndex > 0) setCurrentIndex((i) => i - 1);
  };

  const gradeAndSubmit = () => {
    const earned: Record<number, number> = {};
    for (const q of questions) {
      if (q.type === "mcq") {
        const selected = mcqAnswers[q.id];
        const correctIndex = parseInt(q.correct_answer, 10);
        earned[q.id] = selected === correctIndex ? q.points : 0;
      } else {
        const ans = codeAnswers[q.id];
        const maxP = hintsUsed.has(q.id) ? 1 : q.points;
        const correct = !!ans && compareOutputs(ans.output, q.correct_answer);
        earned[q.id] = correct ? maxP : 0;
      }
    }
    setEarnedPoints(earned);
    setStatus("submitted");
  };

  const handleNext = () => {
    if (currentIndex + 1 < questions.length) {
      setCurrentIndex((i) => i + 1);
    } else {
      gradeAndSubmit();
    }
  };

  const value: QuizContextType = {
    status,
    questions,
    currentIndex,
    maxPoints,
    currentQuestion,
    mcqAnswers,
    codeAnswers,
    hintsUsed,
    earnedPoints,
    startQuiz,
    handlePrevious,
    handleNext,
    setStatus,
    setMcqAnswers,
    setCodeAnswers,
    setHintsUsed,
  };

  return <QuizContext.Provider value={value}>{children}</QuizContext.Provider>;
}

export function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined) {
    throw new Error("useQuiz must be used within a QuizProvider");
  }
  return context;
}
