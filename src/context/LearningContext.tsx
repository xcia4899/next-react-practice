"use client";

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

type Difficulty = "入門" | "進階";

type LearningContextValue = {
  completedLessons: string[];
  difficulty: Difficulty;
  setDifficulty: (difficulty: Difficulty) => void;
  toggleLesson: (lesson: string) => void;
};

const LearningContext = createContext<LearningContextValue | null>(null);

export function LearningProvider({ children }: { children: ReactNode }) {
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [difficulty, setDifficulty] = useState<Difficulty>("入門");

  // 使用函式型更新，確保每次都根據最新狀態計算。
  const toggleLesson = (lesson: string) => {
    setCompletedLessons((current) =>
      current.includes(lesson)
        ? current.filter((item) => item !== lesson)
        : [...current, lesson],
    );
  };

  const value = useMemo(
    () => ({ completedLessons, difficulty, setDifficulty, toggleLesson }),
    [completedLessons, difficulty],
  );

  return (
    <LearningContext.Provider value={value}>
      {children}
    </LearningContext.Provider>
  );
}

export function useLearning() {
  const context = useContext(LearningContext);

  if (!context) {
    throw new Error("useLearning 必須在 LearningProvider 內使用");
  }

  return context;
}
