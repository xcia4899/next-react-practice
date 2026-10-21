import "./globals.css";

export const metadata = { title: "404 · Chengyue", robots: { index: false, follow: false } };

export default function GlobalNotFound() {
  const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
  return <html lang="zh-TW"><body><main className="mx-auto max-w-5xl px-6 py-24"><p>404</p><h1>找不到頁面 · Page not found</h1><p>此頁面不存在。 This page does not exist.</p><a href={`${base}/zh-TW/`}>繁體中文首頁</a><br /><a href={`${base}/en/`}>English home</a></main></body></html>;
}
