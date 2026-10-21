import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SiteHeader } from "@/components/site/SiteHeader";
import "../globals.css";

export const dynamicParams = false;

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({ children, params }: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("Common");
  return <html lang={locale}><body><NextIntlClientProvider><SiteHeader />{children}<footer className="border-t border-line px-6 py-10 md:px-10"><div className="mx-auto flex max-w-7xl flex-col justify-between gap-4 md:flex-row"><p>{t("footer")}</p><p className="text-sm text-muted">{t("demo")}</p></div></footer></NextIntlClientProvider></body></html>;
}
