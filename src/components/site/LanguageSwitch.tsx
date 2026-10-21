"use client";

import { useLocale } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";

export function LanguageSwitch() {
  const locale = useLocale();
  const pathname = usePathname();
  const target = locale === "en" ? "zh-TW" : "en";
  return <Link href={pathname} locale={target} hrefLang={target} lang={target} className="inline-flex min-h-11 items-center px-3 underline underline-offset-4">{target === "en" ? "English" : "繁體中文"}</Link>;
}
