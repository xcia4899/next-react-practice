export function CodeSample({ children }: { children: string }) {
  return (
    <pre className="code-scroll mt-5 overflow-x-auto rounded-2xl border border-white/8 bg-black/25 p-4 text-[12px] leading-6 text-emerald-100 sm:text-[13px]">
      <code>{children}</code>
    </pre>
  );
}

export function SectionLabel({
  number,
  children,
}: {
  number: string;
  children: string;
}) {
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
