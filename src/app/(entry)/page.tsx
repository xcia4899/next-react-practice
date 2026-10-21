import { EntryRedirect } from "@/components/site/EntryRedirect";

export const metadata = { title: "澄岳數位設計 · Chengyue Digital Design" };

export default function EntryPage() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return (
    <main className="entry-page">
      <p className="eyebrow">CHENGYUE DIGITAL DESIGN</p>
      <h1>
        由線成形，
        <br />
        讓想法被看見。
      </h1>
      <p>請選擇語言 · Choose your language</p>
      <div className="entry-links">
        <a href={`${base}/zh-TW/`}>繁體中文 ↗</a>
        <a href={`${base}/en/`}>English ↗</a>
      </div>
      <EntryRedirect />
    </main>
  );
}
