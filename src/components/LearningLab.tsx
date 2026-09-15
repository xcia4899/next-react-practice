"use client";

import { useEffect, useState, type FormEvent } from "react";
import {
  LearningProvider,
  useLearning,
} from "@/context/LearningContext";

const lessons = ["useState", "useEffect", "useContext", "資料流"];

const snippets = {
  state: `const [count, setCount] = useState(0);

setCount((current) => current + 1);`,
  effect: `useEffect(() => {
  const timer = setInterval(tick, 1000);
  return () => clearInterval(timer);
}, [isRunning]);`,
  context: `const value = useContext(LearningContext);

<LearningContext.Provider value={value}>
  {children}
</LearningContext.Provider>`,
};

function CodeSample({ children }: { children: string }) {
  return (
    <pre className="code-scroll mt-5 overflow-x-auto rounded-2xl border border-white/8 bg-black/25 p-4 text-[12px] leading-6 text-emerald-100 sm:text-[13px]">
      <code>{children}</code>
    </pre>
  );
}

function SectionLabel({ number, children }: { number: string; children: string }) {
  return (
    <div className="mb-5 flex items-center gap-3">
      <span className="font-mono text-xs text-accent">{number}</span>
      <span className="h-px w-8 bg-accent/50" />
      <span className="text-xs font-semibold tracking-[0.18em] text-muted uppercase">
        {children}
      </span>
    </div>
  );
}

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

function StatePractice() {
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
      <CodeSample>{snippets.state}</CodeSample>
    </article>
  );
}

function EffectPractice() {
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
      <CodeSample>{snippets.effect}</CodeSample>
    </article>
  );
}

type PracticeTask = {
  id: number;
  title: string;
  done: boolean;
};

type TaskListProps = {
  tasks: PracticeTask[];
  onToggle: (id: number) => void;
};

function TaskList({ tasks, onToggle }: TaskListProps) {
  return (
    <ul className="space-y-2">
      {tasks.map((task) => (
        <li key={task.id}>
          <button
            type="button"
            onClick={() => onToggle(task.id)}
            className="flex w-full items-center gap-3 rounded-xl border border-white/8 bg-white/[0.035] px-4 py-3 text-left transition hover:border-white/20"
          >
            <span
              className={`grid size-5 place-items-center rounded-md border text-[10px] ${
                task.done
                  ? "border-accent bg-accent text-[#07110f]"
                  : "border-white/20 text-transparent"
              }`}
            >
              ✓
            </span>
            <span className={task.done ? "text-muted line-through" : "text-white"}>
              {task.title}
            </span>
          </button>
        </li>
      ))}
    </ul>
  );
}

function DataFlowPractice() {
  const [tasks, setTasks] = useState<PracticeTask[]>([
    { id: 1, title: "理解 props 向下傳遞", done: true },
    { id: 2, title: "用 callback 把事件傳回父層", done: false },
  ]);
  const [draft, setDraft] = useState("");

  const toggleTask = (id: number) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );
  };

  const addTask = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const title = draft.trim();
    if (!title) return;

    setTasks((current) => [
      ...current,
      { id: Date.now(), title, done: false },
    ]);
    setDraft("");
  };

  return (
    <article className="rounded-[2rem] border border-line bg-panel/80 p-6 sm:p-8 lg:col-span-2">
      <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <SectionLabel number="03">單向資料流</SectionLabel>
          <h2 className="text-2xl font-semibold tracking-tight">資料向下，事件向上</h2>
          <p className="mt-3 leading-7 text-muted">
            父元件擁有 tasks，透過 props 傳給子元件；子元件觸發 callback，請父元件更新資料。
          </p>
          <div className="mt-6 rounded-2xl border border-dashed border-accent/30 p-4 font-mono text-xs leading-6 text-emerald-100">
            Parent state → Child props
            <br />
            Child event → Parent callback
          </div>
        </div>
        <div>
          <form onSubmit={addTask} className="mb-4 flex gap-2">
            <label htmlFor="new-task" className="sr-only">
              新增練習項目
            </label>
            <input
              id="new-task"
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              placeholder="輸入新的練習項目"
              className="min-w-0 flex-1 rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm outline-none transition placeholder:text-muted/60 focus:border-accent/60"
            />
            <button
              type="submit"
              className="rounded-xl bg-white px-4 py-3 text-sm font-bold text-[#07110f] transition hover:bg-accent"
            >
              新增
            </button>
          </form>
          <TaskList tasks={tasks} onToggle={toggleTask} />
        </div>
      </div>
    </article>
  );
}

function ContextPractice() {
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
          <CodeSample>{snippets.context}</CodeSample>
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

function Dashboard() {
  return (
    <main className="mx-auto w-full max-w-6xl px-5 sm:px-8">
      <Header />
      <Hero />
      <section id="playground" className="scroll-mt-6 pb-20">
        <div className="mb-7 flex items-end justify-between gap-6">
          <div>
            <p className="font-mono text-xs text-accent">PLAYGROUND / 01—04</p>
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
        </div>
      </section>
      <footer className="flex flex-col gap-2 border-t border-white/8 py-8 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>為練習而寫，也為犯錯預留空間。</p>
        <p className="font-mono">EDIT → src/components/LearningLab.tsx</p>
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
