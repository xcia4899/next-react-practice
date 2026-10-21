"use client";

import { useState } from "react";
import { useTranslations } from "next-intl";
import styles from "./motion.module.css";

const stages = ["start", "expand", "deepen"] as const;

export function CompanyHistory() {
  const t = useTranslations("About");
  const [expanded, setExpanded] = useState<string[]>([]);
  return <div className="ml-2 border-l border-line">
    {stages.map((stage, index) => {
      const open = expanded.includes(stage);
      return <article key={stage} className="relative border-b border-line pl-7 md:pl-10">
        <span aria-hidden="true" className="absolute top-8 -left-1.5 h-3 w-3 rounded-full border border-accent bg-background" />
        <h3><button type="button" id={`history-trigger-${stage}`} aria-expanded={open} aria-controls={`history-panel-${stage}`} className="flex min-h-20 w-full items-center gap-5 py-5 text-left text-xl" onClick={() => setExpanded((current) => current.includes(stage) ? current.filter((item) => item !== stage) : [...current, stage])}>
          <span className="text-sm text-accent">0{index + 1}</span>{t(`${stage}Title`)}<span aria-hidden="true" className={`${styles.historyIndicator} ml-auto text-accent`} data-open={open}>+</span>
        </button></h3>
        <div id={`history-panel-${stage}`} role="region" aria-labelledby={`history-trigger-${stage}`} aria-hidden={!open} inert={!open} className={styles.historyPanel} data-open={open}>
          <div><p className="mb-7 max-w-2xl text-lg leading-relaxed text-muted">{t(`${stage}Text`)}</p></div>
        </div>
      </article>;
    })}
  </div>;
}
