import assert from "node:assert/strict";
import { existsSync, readFileSync } from "node:fs";
import { resolve, sep } from "node:path";

const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
assert(base === "" || /^\/[a-zA-Z0-9_-]+$/.test(base), "部署基底格式錯誤");
const root = resolve("out");
const routes = ["", "zh-TW", "zh-TW/services", "zh-TW/about", "en", "en/services", "en/about"];
const resources = new Set();

for (const route of routes) {
  const filename = resolve(root, route, "index.html");
  const html = readFileSync(filename, "utf8");
  assert(html.length > 0, `空白產物：${filename}`);
  assert.equal((html.match(/<html\b/g) || []).length, 1, `重複 html：${route}`);
  const locale = route.startsWith("en") ? "en" : "zh-TW";
  assert(html.includes(`lang="${locale}"`), `語言錯誤：${route}`);

  for (const [, href] of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
    if (!href.startsWith("/") || href.startsWith("//")) continue;
    assert(href.startsWith(`${base}/`), `資源缺少部署基底：${href}`);
    const pathname = decodeURIComponent(href.split(/[?#]/)[0].slice(base.length));
    const local = resolve(root, `.${pathname}`);
    assert(local === root || local.startsWith(`${root}${sep}`), `資源超出產物目錄：${href}`);
    const target = pathname.endsWith("/") ? resolve(local, "index.html") : local;
    assert(existsSync(target), `引用目標不存在：${href}`);
    assert(readFileSync(target).length > 0, `引用目標為空：${href}`);
    resources.add(href);
  }
  console.log(`HTML / lang / references OK: /${route}`);
}

const entry = readFileSync(resolve(root, "index.html"), "utf8");
assert(entry.includes(`href="${base}/zh-TW/"`), "缺少無 JS 中文備援");
assert(entry.includes(`href="${base}/en/"`), "缺少無 JS 英文備援");
const notFound = readFileSync(resolve(root, "404.html"), "utf8");
assert(notFound.includes("Page not found"), "404 缺少說明");
for (const path of ["fr", "en/unknown", "practice"]) {
  assert(!existsSync(resolve(root, path, "index.html")), `不應匯出：${path}`);
}
assert(resources.size > 0, "引用集合不得為空");
console.log(`Static artifact verified: ${routes.length} pages, 404, ${resources.size} nonempty references; base=${base || "/"}`);
