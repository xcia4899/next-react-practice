"use client";

import { useLearning } from "@/context/LearningContext";
import { lessons } from "@/data/lessons";
import { CodeSample, SectionLabel } from "./PracticeCardParts";

const contextSnippet = `const value = useContext(LearningContext);

<LearningContext.Provider value={value}>
  {children}
</LearningContext.Provider>`;

export function ContextPractice() {
  const { completedLessons, difficulty, setDifficulty, toggleLesson } =
    useLearning();

  return (
    <article className="rounded-[2rem] border border-line bg-panel/80 p-6 sm:p-8 lg:col-span-2">
      <div className="grid gap-8 lg:grid-cols-[1fr_1fr]">
        <div>
          <SectionLabel number="04">useContext</SectionLabel>
          <h2 className="text-2xl font-semibold tracking-tight">跨元件共享學習狀態</h2>
          <p className="mt-3 leading-7 text-muted">
            不需要逐層傳 props。切換下方狀態時，頁首的模式與完成數也會同步更新。
          </p>
          <div className="mt-6 flex gap-2">
            {(["入門", "進階"] as const).map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setDifficulty(item)}
                className={`rounded-full px-4 py-2 text-sm transition ${
                  difficulty === item
                    ? "bg-accent font-bold text-[#07110f]"
                    : "border border-white/10 text-muted hover:border-white/25"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <CodeSample>{contextSnippet}</CodeSample>
        </div>
        <div className="rounded-2xl bg-white/[0.04] p-5">
          <p className="mb-4 text-sm font-semibold">今天的學習進度</p>
          <div className="space-y-2">
            {lessons.map((lesson) => {
              const isComplete = completedLessons.includes(lesson);

              return (
                <button
                  key={lesson}
                  type="button"
                  onClick={() => toggleLesson(lesson)}
                  className="flex w-full items-center justify-between rounded-xl border border-white/8 px-4 py-3 text-left transition hover:border-accent/30"
                >
                  <span className={isComplete ? "text-white" : "text-muted"}>
                    {lesson}
                  </span>
                  <span
                    className={`rounded-full px-2.5 py-1 text-[11px] ${
                      isComplete
                        ? "bg-accent/15 text-accent"
                        : "bg-white/5 text-muted"
                    }`}
                  >
                    {isComplete ? "完成" : "待練習"}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </article>
  );
}
