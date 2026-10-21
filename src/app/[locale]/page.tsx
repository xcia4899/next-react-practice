import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Reveal } from "@/components/site/Reveal";
import { BrandGeometry } from "@/components/site/BrandGeometry";
import styles from "@/components/site/motion.module.css";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: "Metadata" });
  return { title: t("home"), description: t("description") };
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);
  const t = await getTranslations("Home");
  const s = await getTranslations("Services");
  return <main id="main" className="mx-auto max-w-7xl px-6 md:px-10">
    <section className="grid items-center gap-12 py-16 md:grid-cols-[1.3fr_1fr] md:py-24">
      <div className={styles.copy}>
        <p className="mb-7 text-sm tracking-widest text-accent">01 / CHENGYUE DIGITAL DESIGN</p>
        <h1 className="max-w-4xl text-4xl leading-tight font-medium tracking-tight md:text-6xl">{t("title")}</h1>
        <div className="mt-8"><p className="max-w-xl text-lg leading-relaxed text-muted">{t("intro")}</p><div className="mt-8 flex flex-wrap gap-4"><Link href="/services" className="inline-flex min-h-11 items-center bg-foreground px-5 py-3 text-background hover:bg-accent">{t("servicesLink")} ↗</Link><Link href="/about" className="inline-flex min-h-11 items-center border border-line px-5 py-3">{t("aboutLink")} ↗</Link></div></div>
      </div>
      <div className="mx-auto w-full max-w-lg"><BrandGeometry entrance /></div>
    </section>
    <Reveal><section className="border-t border-line py-14"><h2 className="max-w-2xl text-3xl leading-snug">{t("servicesTitle")}</h2><div className="mt-10 grid gap-8 md:grid-cols-3">{["brand", "web", "interface"].map((key, index) => <article key={key} className="border-t border-line pt-6"><p className="text-sm text-accent">0{index + 1}</p><h3 className="my-4 text-xl">{s(`${key}Title`)}</h3><p className="leading-relaxed text-muted">{s(`${key}Text`)}</p></article>)}</div></section></Reveal>
    <Reveal><section className="grid gap-6 border-t border-line py-16 md:grid-cols-2"><h2 className="text-3xl">{t("aboutTitle")}</h2><div><p className="leading-relaxed text-muted">{t("aboutText")}</p><Link href="/about" className="mt-5 inline-flex min-h-11 items-center underline underline-offset-4">{t("aboutLink")} ↗</Link></div></section></Reveal>
  </main>;
}
