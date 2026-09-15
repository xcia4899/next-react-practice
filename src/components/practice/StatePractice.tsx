"use client";

import { useState } from "react";
import { CodeSample, SectionLabel } from "./PracticeCardParts";

const stateSnippet = `const [count, setCount] = useState(0);

setCount((current) => current + 1);`;

export function StatePractice() {
  const [count, setCount] = useState(0);

  return (
    <article className="rounded-[2rem] border border-line bg-panel/80 p-6 sm:p-8">
      <SectionLabel number="01">useState</SectionLabel>
      <h2 className="text-2xl font-semibold tracking-tight">記住元件裡的狀態</h2>
      <p className="mt-3 leading-7 text-muted">
        每次更新 state，React 都會重新渲染畫面，顯示最新的數值。
      </p>
      <div className="mt-8 flex items-center justify-between rounded-2xl bg-white/[0.045] p-4">
        <button
          type="button"
          onClick={() => setCount((current) => current - 1)}
          className="grid size-11 place-items-center rounded-xl border border-white/10 text-xl transition hover:border-accent/60 hover:text-accent"
          aria-label="數值減一"
        >
          −
        </button>
        <div className="text-center">
          <strong className="block font-mono text-4xl text-accent">{count}</strong>
          <span className="mt-1 block text-xs text-muted">目前 state</span>
        </div>
        <button
          type="button"
          onClick={() => setCount((current) => current + 1)}
          className="grid size-11 place-items-center rounded-xl bg-accent text-xl text-[#07110f] transition hover:bg-accent-soft"
          aria-label="數值加一"
        >
          +
        </button>
      </div>
      <CodeSample>{stateSnippet}</CodeSample>
    </article>
  );
}
