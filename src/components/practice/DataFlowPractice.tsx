"use client";

import { useState, type FormEvent } from "react";
import { CodeSample, SectionLabel } from "./PracticeCardParts";

type PracticeTask = {
  id: number;
  title: string;
  done: boolean;
};

type TaskListProps = {
  tasks: PracticeTask[];
  onToggle: (id: number) => void;
};

const dataFlowSnippet = `type Task = {
  id: number;
  title: string;
  done: boolean;
};

type TaskListProps = {
  tasks: Task[];
  onToggle: (id: number) => void;
};

// 子元件：接收資料與 callback，不直接修改父元件 state。
function TaskList({ tasks, onToggle }: TaskListProps) {
  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          <button onClick={() => onToggle(task.id)}>
            {task.done ? "已完成" : "待完成"}：{task.title}
          </button>
        </li>
      ))}
    </ul>
  );
}

// 父元件：擁有 state，並提供更新 state 的函式。
export function TaskBoard() {
  const [tasks, setTasks] = useState<Task[]>([
    { id: 1, title: "練習 props", done: false },
  ]);

  const toggleTask = (id: number) => {
    setTasks((current) =>
      current.map((task) =>
        task.id === id
          ? { ...task, done: !task.done }
          : task,
      ),
    );
  };

  return <TaskList tasks={tasks} onToggle={toggleTask} />;
}`;

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

export function DataFlowPractice() {
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
      <CodeSample title="完整的 Props 與 Callback 資料流">
        {dataFlowSnippet}
      </CodeSample>
    </article>
  );
}
