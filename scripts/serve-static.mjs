import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, resolve, sep } from "node:path";

const root = resolve("out");
const base = process.env.NEXT_PUBLIC_BASE_PATH || "";
const port = Number(process.env.PORT || 3051);
if (!Number.isInteger(port) || port < 1 || port > 65535) throw new Error("PORT 必須是有效埠號");
const mime = { ".html": "text/html; charset=utf-8", ".css": "text/css", ".js": "text/javascript", ".json": "application/json", ".svg": "image/svg+xml", ".ico": "image/x-icon", ".png": "image/png", ".txt": "text/plain; charset=utf-8" };

createServer(async (request, response) => {
  try {
    const url = new URL(request.url, "http://localhost");
    const pathname = decodeURIComponent(url.pathname);
    if (pathname !== base && !pathname.startsWith(`${base}/`)) throw new Error("not found");
    const local = resolve(root, `.${pathname.slice(base.length) || "/"}`);
    if (local !== root && !local.startsWith(`${root}${sep}`)) throw new Error("not found");
    const directory = (await stat(local)).isDirectory();
    if (directory && !pathname.endsWith("/")) {
      response.writeHead(308, { Location: `${url.pathname}/${url.search}` }); response.end(); return;
    }
    const filename = directory ? resolve(local, "index.html") : local;
    const content = await readFile(filename);
    response.writeHead(200, { "Content-Type": mime[extname(filename)] || "application/octet-stream", "Content-Length": content.length });
    response.end(request.method === "HEAD" ? undefined : content);
  } catch {
    const content = await readFile(resolve(root, "404.html")).catch(() => Buffer.from("404 - build the static site first"));
    response.writeHead(404, { "Content-Type": "text/html; charset=utf-8" });
    response.end(request.method === "HEAD" ? undefined : content);
  }
}).listen(port, "127.0.0.1", () => console.log(`Static preview: http://127.0.0.1:${port}${base}/`));
