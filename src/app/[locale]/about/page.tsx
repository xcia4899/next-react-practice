import { CompanyHistory } from "@/components/site/CompanyHistory";
import { Reveal } from "@/components/site/Reveal";
import { getTranslations, setRequestLocale } from "next-intl/server";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return { title: t("about"), description: t("description") };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("About");
  const c = await getTranslations("Common");
  return <main id="main" className="mx-auto max-w-7xl px-6 py-20 md:px-10">
    <Reveal><p className="mb-7 text-sm tracking-widest text-accent">03 / {c("about")}</p><h1 className="max-w-4xl text-4xl leading-tight font-medium tracking-tight md:text-6xl">{t("title")}</h1><div className="mt-12 grid gap-8 md:grid-cols-2"><p className="max-w-2xl text-lg leading-relaxed text-muted">{t("intro")}</p><section className="border-l border-accent pl-6"><h2 className="mb-3 text-sm text-muted">{t("addressLabel")}</h2><p>{t("address")}</p></section></div></Reveal>
    <Reveal><section className="mt-20 border-t border-line pt-10"><h2 className="mb-10 text-3xl">{t("history")}</h2><CompanyHistory /></section></Reveal>
  </main>;
}
