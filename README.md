# 澄岳數位設計

虛構公司示範網站，以 Next.js、React、TypeScript、Tailwind CSS v4 與 next-intl 建立繁體中文／英文三頁。已發布於 [GitHub Pages](https://xcia4899.github.io/next-react-practice/)，整站風格與最終驗收仍進行中。

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

.github/workflows/pages.yml 已準備 main 分支的 Pages 建置／部署流程，已依授權發布；[Actions run 39613244545](https://github.com/xcia4899/next-react-practice/actions/runs/39613244545) 成功，公開 HTTPS 的六頁、刷新、語言切換、互動及404已驗證。整站風格仍待確認，部署成功不等於所有功能已完成驗收。

進度及驗證正本見 [TASK-20261020-0001](docs/task/20261020-0001-company-website.md) 與 [文件索引](docs/AGENTS.md#10-索引)。大量截圖與 Performance trace 僅存本機暫存，不入版控。
