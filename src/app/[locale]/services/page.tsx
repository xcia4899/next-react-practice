import { getTranslations, setRequestLocale } from "next-intl/server";
import { Reveal } from "@/components/site/Reveal";
import { ServiceTabs } from "@/components/site/ServiceTabs";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return { title: t("services"), description: t("description") };
}

export default async function ServicesPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Services");
  const c = await getTranslations("Common");
  return <main id="main" className="mx-auto max-w-7xl px-6 py-20 md:px-10"><Reveal><p className="mb-7 text-sm tracking-widest text-accent">02 / {c("services")}</p><h1 className="max-w-4xl text-4xl leading-tight font-medium tracking-tight md:text-6xl">{t("title")}</h1><p className="mt-8 max-w-2xl text-lg leading-relaxed text-muted">{t("intro")}</p></Reveal><Reveal><ServiceTabs /></Reveal></main>;
}
