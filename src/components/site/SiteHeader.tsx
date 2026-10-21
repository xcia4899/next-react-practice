"use client";

import { useEffect, useRef, useState } from "react";
import { useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitch } from "./LanguageSwitch";

export function SiteHeader() {
  const t = useTranslations("Common");
  const pathname = usePathname().replace(/\/$/, "") || "/";
  const [open, setOpen] = useState(false);
  const toggle = useRef<HTMLButtonElement>(null);
  const links = [
    { href: "/", label: "home" },
    { href: "/services", label: "services" },
    { href: "/about", label: "about" },
  ] as const;

  useEffect(() => {
    const query = window.matchMedia("(min-width: 768px)");
    const close = () => setOpen(false);
    query.addEventListener("change", close);
    return () => query.removeEventListener("change", close);
  }, []);

  return (
    <header
      className="border-b border-line"
      onKeyDown={(event) => {
        if (event.key === "Escape" && open) {
          setOpen(false);
          toggle.current?.focus();
        }
      }}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:block focus:p-4"
      >
        {t("skip")}
      </a>
      <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 px-6 py-5 md:px-10">
        <Link
          href="/"
          className="max-w-64 text-lg font-semibold tracking-tight"
          onClick={() => setOpen(false)}
        >
          {t("brand")}
          <span className="mt-1 block text-xs font-normal tracking-widest text-muted">
            CHENGYUE / DESIGN
          </span>
        </Link>
        <button
          ref={toggle}
          type="button"
          aria-expanded={open}
          aria-controls="site-navigation"
          onClick={() => setOpen(!open)}
          className="min-h-11 border border-line px-4 md:hidden"
        >
          {t(open ? "closeMenu" : "menu")}
        </button>
        <nav
          id="site-navigation"
          aria-label={t("menu")}
          className={`${open ? "flex" : "hidden"} w-full flex-col gap-2 border-t border-line pt-4 md:flex md:w-auto md:flex-row md:items-center md:border-0 md:pt-0`}
        >
          {links.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              aria-current={pathname === href ? "page" : undefined}
              onClick={() => setOpen(false)}
              className={`inline-flex min-h-11 items-center px-3 ${pathname === href ? "font-semibold underline decoration-accent decoration-2 underline-offset-8" : "text-muted hover:text-foreground"}`}
            >
              {t(label)}
            </Link>
          ))}
          <LanguageSwitch />
        </nav>
      </div>
    </header>
  );
}
