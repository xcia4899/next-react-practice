# 澄岳數位設計

虛構公司示範網站，以 Next.js、React、TypeScript、Tailwind CSS v4 與 next-intl 建立繁體中文／英文三頁。網站仍在開發與驗收，尚無已驗證的 Pages 公開網址。

## 開發

使用 Node 22.18.0、pnpm 10.14.0（packageManager 已固定）。

```sh
pnpm install --frozen-lockfile
pnpm dev
```

開發網址依啟動輸出。入口預設繁體中文；/zh-TW/、/en/ 各有首頁、services/、about/。

## 檢查與靜態預覽

```sh
pnpm lint
pnpm exec next typegen
pnpm exec tsc --noEmit
pnpm build
node scripts/verify-static.mjs
pnpm start
```

`pnpm start` 以純靜態伺服器提供 out/，預設 http://127.0.0.1:3051/，不使用 next start；必須先建置，未知路徑回 HTTP 404。

專案 Pages 子路徑預覽（PowerShell）：

```powershell
$env:NEXT_PUBLIC_BASE_PATH = "/next-react-practice"
pnpm build
node scripts/verify-static.mjs
pnpm start
```

開啟 http://127.0.0.1:3051/next-react-practice/。建置、檢查與預覽須使用相同 NEXT_PUBLIC_BASE_PATH；需要其他埠號時設定 PORT。改回根路徑須先清除該環境變數並重新建置。

## 發布與進度

.github/workflows/pages.yml 已準備 main 分支的 Pages 建置／部署流程，已取得本次 Commit／Push／Pages 設定授權，部署執行中；尚未驗證 Actions 與公開 HTTPS 網址。本機通過不代表公開交付完成。

進度及驗證正本見 [TASK-20261020-0001](docs/task/20261020-0001-company-website.md) 與 [文件索引](docs/AGENTS.md#10-索引)。大量截圖與 Performance trace 僅存本機暫存，不入版控。
