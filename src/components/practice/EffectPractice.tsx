"use client";

import { useEffect, useState } from "react";
import { CodeSample, SectionLabel } from "./PracticeCardParts";

const effectSnippet = `useEffect(() => {
  const timer = setInterval(tick, 1000);
  return () => clearInterval(timer);
}, [isRunning]);`;

export function EffectPractice() {
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(true);

  useEffect(() => {
    if (!isRunning) return;

    const timer = window.setInterval(() => {
      setSeconds((current) => current + 1);
    }, 1000);

    // 元件卸載或依賴改變前，先清除舊計時器。
    return () => window.clearInterval(timer);
  }, [isRunning]);

  return (
    <article className="rounded-[2rem] border border-line bg-panel/80 p-6 sm:p-8">
      <SectionLabel number="02">useEffect</SectionLabel>
      <h2 className="text-2xl font-semibold tracking-tight">同步畫面外的行為</h2>
      <p className="mt-3 leading-7 text-muted">
        Effect 建立計時器，並在狀態改變或元件離開時執行 cleanup。
      </p>
      <div className="mt-8 flex items-center justify-between rounded-2xl bg-white/[0.045] p-4">
        <div>
          <strong className="font-mono text-4xl text-accent">{seconds}s</strong>
          <span className="ml-3 text-xs text-muted">已經過時間</span>
        </div>
        <button
          type="button"
          onClick={() => setIsRunning((current) => !current)}
          className="rounded-xl border border-white/12 px-4 py-2 text-sm font-semibold transition hover:border-accent/60 hover:text-accent"
        >
          {isRunning ? "暫停" : "繼續"}
        </button>
      </div>
      <CodeSample>{effectSnippet}</CodeSample>
    </article>
  );
}
