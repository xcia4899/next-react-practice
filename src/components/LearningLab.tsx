"use client";

import {
  LearningProvider,
  useLearning,
} from "@/context/LearningContext";
import { lessons } from "@/data/lessons";
import { CartPractice } from "./practice/CartPractice";
import { ContextPractice } from "./practice/ContextPractice";
import { DataFlowPractice } from "./practice/DataFlowPractice";
import { EffectPractice } from "./practice/EffectPractice";
import { StatePractice } from "./practice/StatePractice";

function Header() {
  const { completedLessons, difficulty } = useLearning();

  return (
    <header className="flex items-center justify-between border-b border-white/8 py-5">
      <a href="#top" className="flex items-center gap-3" aria-label="回到頁首">
        <span className="grid size-9 place-items-center rounded-xl bg-accent font-mono text-sm font-black text-[#07110f]">
          R_
        </span>
        <span className="font-semibold tracking-tight">React 練習室</span>
      </a>
      <div className="flex items-center gap-2 text-xs">
        <span className="hidden rounded-full border border-white/10 px-3 py-2 text-muted sm:inline">
          {difficulty}模式
        </span>
        <span className="rounded-full bg-white/8 px-3 py-2 text-emerald-100">
          {completedLessons.length} / {lessons.length} 完成
        </span>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section id="top" className="grid gap-10 py-16 lg:grid-cols-[1fr_20rem] lg:py-24">
      <div>
        <p className="mb-5 font-mono text-sm text-accent">LEARN BY CHANGING THINGS</p>
        <h1 className="max-w-4xl text-5xl leading-[1.02] font-bold tracking-[-0.055em] sm:text-7xl lg:text-[5.5rem]">
          不只讀語法，
          <span className="text-accent">親手改變資料。</span>
        </h1>
        <p className="mt-7 max-w-2xl text-base leading-8 text-muted sm:text-lg">
          一個以 React Hooks 與元件溝通為核心的互動首頁。按按鈕、觀察畫面，
          再回到程式碼對照每一次資料變化。
        </p>
        <div className="mt-9 flex flex-wrap gap-3">
          <a
            href="#playground"
            className="rounded-full bg-accent px-6 py-3 text-sm font-bold text-[#07110f] transition hover:bg-accent-soft"
          >
            開始練習 →
          </a>
          <span className="rounded-full border border-white/10 px-6 py-3 font-mono text-sm text-muted">
            Next.js · React · TypeScript · Tailwind v4
          </span>
        </div>
      </div>

      <aside className="self-end rounded-[2rem] border border-white/10 bg-white/[0.035] p-6 backdrop-blur-sm">
        <p className="text-xs tracking-[0.18em] text-muted uppercase">學習路線</p>
        <ol className="mt-5 space-y-4">
          {lessons.map((lesson, index) => (
            <li key={lesson} className="flex items-center gap-4 text-sm">
              <span className="grid size-7 place-items-center rounded-full border border-white/12 font-mono text-[11px] text-accent">
                {index + 1}
              </span>
              {lesson}
            </li>
          ))}
        </ol>
      </aside>
    </section>
  );
}

function Dashboard() {
  return (
    <main className="mx-auto w-full max-w-6xl px-5 sm:px-8">
      <Header />
      <Hero />
      <section id="playground" className="scroll-mt-6 pb-20">
        <div className="mb-7 flex items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs text-accent">PLAYGROUND / 01—05</p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">互動練習區</h2>
          </div>
          <p className="hidden max-w-xs text-right text-sm leading-6 text-muted sm:block">
            開啟 DevTools 搭配 React Developer Tools，觀察每次 render 與 state 變化。
          </p>
        </div>
        <div className="grid gap-4 lg:grid-cols-2">
          <StatePractice />
          <EffectPractice />
          <DataFlowPractice />
          <ContextPractice />
          <CartPractice />
        </div>
      </section>
      <footer className="flex flex-col gap-2 border-t border-white/8 py-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>為練習而寫，也為犯錯預留空間。</p>
        <p className="font-mono">EDIT → src/components/practice/</p>
      </footer>
    </main>
  );
}

export function LearningLab() {
  return (
    <LearningProvider>
      <Dashboard />
    </LearningProvider>
  );
}
