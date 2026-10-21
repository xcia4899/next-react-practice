"use client";

import { useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { BrandGeometry, type GeometryVariant } from "./BrandGeometry";
import styles from "./motion.module.css";

const services = ["brand", "web", "interface"] as const;

export function ServiceTabs() {
  const t = useTranslations("Services");
  const [active, setActive] = useState<GeometryVariant>("brand");
  const buttons = useRef<(HTMLButtonElement | null)[]>([]);

  return <div className="mt-14 grid gap-10 border-t border-line pt-8 md:grid-cols-[1fr_1.4fr]">
    <div role="tablist" aria-label={t("title")} aria-orientation="vertical" className="flex flex-col items-stretch self-start">
      {services.map((service, index) => <button key={service} ref={(element) => { buttons.current[index] = element; }} type="button" role="tab" id={`service-tab-${service}`} aria-controls={`service-panel-${service}`} aria-selected={active === service} tabIndex={active === service ? 0 : -1} className={`flex min-h-16 items-center gap-5 border-b border-line py-5 text-left text-lg ${active === service ? "border-l-2 border-l-accent pl-4 font-semibold text-foreground" : "pl-4 text-muted hover:text-foreground"}`} onClick={() => setActive(service)} onKeyDown={(event) => {
        let next = index;
        if (event.key === "ArrowDown" || event.key === "ArrowRight") next = (index + 1) % services.length;
        else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = (index + services.length - 1) % services.length;
        else if (event.key === "Home") next = 0;
        else if (event.key === "End") next = services.length - 1;
        else return;
        event.preventDefault(); setActive(services[next]); buttons.current[next]?.focus();
      }}><span className="text-xs text-accent">0{index + 1}</span>{t(`${service}Title`)}<span aria-hidden="true" className="ml-auto">{active === service ? "↗" : "+"}</span></button>)}
    </div>
    <div className="min-w-0">
      <div className="mx-auto max-w-lg"><BrandGeometry variant={active} /></div>
      {services.map((service) => <section key={service} role="tabpanel" id={`service-panel-${service}`} aria-labelledby={`service-tab-${service}`} tabIndex={0} hidden={active !== service} className="mt-8 border-t border-line pt-6">
        {active === service && <div className={styles.description}><h2 className="mb-4 text-2xl">{t(`${service}Title`)}</h2><p className="max-w-xl text-lg leading-relaxed text-muted">{t(`${service}Text`)}</p></div>}
      </section>)}
    </div>
  </div>;
}
