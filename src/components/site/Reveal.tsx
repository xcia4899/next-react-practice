"use client";

import { useEffect, useRef } from "react";
import styles from "./motion.module.css";

export function Reveal({ children }: { children: React.ReactNode }) {
  const element = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const node = element.current;
    if (!node) return;
    if (!("IntersectionObserver" in window)) { node.dataset.revealed = "true"; return; }
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { node.dataset.revealed = "true"; observer.disconnect(); }
    }, { threshold: 0.08 });
    observer.observe(node);
    return () => observer.disconnect();
  }, []);
  return <div ref={element} className={styles.reveal} data-revealed="false">{children}</div>;
}
