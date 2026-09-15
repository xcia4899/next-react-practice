export function CodeSample({
  children,
  title = "核心程式碼",
}: {
  children: string;
  title?: string;
}) {
  return (
    <div className="mt-5 overflow-hidden rounded-2xl border border-white/8 bg-black/25">
      <div className="flex items-center justify-between border-b border-white/8 px-4 py-3 text-[11px] tracking-[0.12em] text-muted uppercase">
        <span>{title}</span>
        <span className="font-mono text-accent">TSX</span>
      </div>
      <pre className="code-scroll max-h-[34rem] overflow-auto p-4 text-[12px] leading-6 text-emerald-100 sm:text-[13px]">
        <code>{children}</code>
      </pre>
    </div>
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
