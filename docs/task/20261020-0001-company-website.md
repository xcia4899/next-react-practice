---
id: TASK-20261020-0001
title: 公司形象網站分階段實作
status: implementing
created: 2026-10-20
updated: 2026-10-21
related_designs: [DESIGN-20261019-0001]
related_specs: [SPEC-20261019-0001]
---

# 公司形象網站分階段實作

## 1. 範圍與授權

依 [DESIGN](../design/20261019-0001-company-website.md) §8 分階段實作。使用者於 2026-10-20 明確指示「確認新版 DESIGN，開始實作」，並於詢問 TASK 後指示「繼續」，授權按設計拆解與執行。未授權 Commit／Push；樣稿風格確認仍按 DESIGN 執行，不以本次實作授權代替樣稿驗收。

## 2. 任務清單

T01～T07 保留為階段編號，不另維護父任務狀態；進度只記下列子任務。2026-10-20 依使用者要求細分，保留既有成果與驗證紀錄，不重編功能鍵或推算 REQ 完成率。

「依賴」指開始該項執行前須完成的子任務。既有部分檔案曾提前寫入，記為歷史半成品，不表示依賴已通過。尚未開始且等待依賴的工作用 todo；只有實際遇到外部阻礙才改 blocked 並記解除條件。先前拆分時仍暫停；使用者於 2026-10-20 明確指示「繼續執行 TASK-20261020-0001」，已恢復執行。

### T01 依賴與 pnpm 轉換

| 任務 | 依賴 | 狀態 | 交付與完成條件 | 現有證據／驗證 |
|------|------|------|----------------|----------------|
| T01.1 相容版本查證、轉換與安裝 | 無 | done | 記錄本機版本與 peerDependencies；pnpm import 及指定版本 next-intl 安裝成功 | §3：Node 22.18.0、pnpm 10.14.0、next-intl 4.14.9；兩命令 exit 0。不含固定安裝或建置通過 |
| T01.2 套件管理器定版與固定安裝 | T01.1 | done | packageManager 固定 pnpm 版本；pnpm-lock.yaml 為唯一依賴鎖檔；frozen-lockfile 安裝成功，記錄略過 scripts 的實際影響與必要處理 | 已固定 pnpm@10.14.0、刪除 npm 鎖檔；離線 frozen-lockfile 安裝 exit 0，378 套件全部使用快取；scripts 影響與建置證據見 §3 |

### T02 靜態雙語骨架

| 任務 | 依賴 | 狀態 | 交付與完成條件 | 現有證據／驗證 |
|------|------|------|----------------|----------------|
| T02.1 路由、入口與 404 | T01.2 | done | 六個語系路由可匯出；根入口導向中文且有無 JS 備援；非法語系、未知路徑及 /practice 為 404；各語系 HTML lang 正確，無巢狀 html | 子路徑靜態建置與 Playwright／Chrome 155 驗證通過：入口自動導向、六頁直接開啟／刷新、三種非法路徑 404、無 JS 中文備援；§3 有結果與重跑方式 |
| T02.2 翻譯與同頁語言切換 | T02.1 | done | 兩語訊息可解析、key 集合非空且一致、值與參數完整；三頁各雙向切換維持同頁，無原始鍵及混語 | 兩語 39 個非空葉節點 key／參數比對通過；三頁雙向切換維持 pathname，無 pageerror；最終內容與頁面檢查見 §3 |
| T02.3 六頁內容與共用導覽 | T02.2 | done | 六頁具實際中英文內容、metadata、頁尾示範標示、目前頁面與手機導覽；靜態骨架可閱讀，無無作用入口或橫向溢出 | 六頁內容、metadata、示範頁尾及手機導覽已完成；24 組（4 寬度 × 2 語 × 3 頁）內容／導覽／溢出檢查通過，桌面與手機截圖已檢視；不代表完整 V05 或動畫驗收 |

### T03 Pages 工作流程與最小部署

| 任務 | 依賴 | 狀態 | 交付與完成條件 | 現有證據／驗證 |
|------|------|------|----------------|----------------|
| T03.1 工作流程、產物與子路徑驗證 | T02.3 | done | 建立可審查 Actions；固定安裝、Lint、typegen、tsc、build 成功；out 含入口、六頁、404 與資源，以 /next-react-practice/ 純靜態環境驗證直接開啟、刷新及切換正常 | 已建立 Pages Actions 與 verify-static.mjs；固定安裝、Lint、typegen、tsc、build、本機產物與瀏覽器子路徑驗證通過；僅本機 Windows 結果，Actions 尚未執行 |
| T03.2 最小 Pages 發布驗證 | T03.1 | done | 查證 repository／分支／Pages 權限，取得必要 Commit／Push 授權後發布最小骨架；保留 workflow run、版本、HTTPS URL 及六頁／404／資源結果 | 2026-10-21 已授權並推送 bb97c49；run 39613244545 success，Pages HTTPS 六頁／404／資源及 Edge 操作通過，見 §3 |

### T04 動態樣稿

| 任務 | 依賴 | 狀態 | 交付與完成條件 | 現有證據／驗證 |
|------|------|------|----------------|----------------|
| T04.1 首頁主視覺樣稿 | T03.1 | done | 實作線條匯聚、主標層級與操作入口；中文／英文 × 390px／1440px 四組預覽及起始／中間／完成影格；動畫中可閱讀與操作，減少動態偏好立即生效 | 已完成線條匯聚與可讀文字進場；兩語 × 390／1440 四組及三時點影格、動畫中導覽、動態偏好切換通過，見 §3；風格確認屬 T05 |
| T04.2 業務切換樣稿與整合檢查 | T04.1 | done | 三項業務有同源幾何變形與說明切換；預設、滑鼠／觸控／鍵盤、快速連按、手機旋轉及 reduced-motion 正確；記錄可重開的預覽版本及代表錄影／影格 | 同源 SVG 路徑變形、tabs 與說明切換已完成；四組滑鼠／觸控／鍵盤、快速切換、旋轉、減少動態通過；本機十次回饋 <100ms，完整整站 V07 未完成 |

T03.2 成功後照順序進行樣稿；若 T03.2 已明確因外部條件 blocked，允許依 DESIGN §8 獨立執行 T04，但必須註明尚無線上驗證。不得直接跳過未嘗試的最小部署，也不得在本機驗證未過時進入樣稿。

### T05 樣稿風格確認

| 任務 | 依賴 | 狀態 | 交付與完成條件 | 現有證據／驗證 |
|------|------|------|----------------|----------------|
| T05.1 使用者確認樣稿版本 | T04.2 | done | 使用者可檢視中英／手機／桌面樣稿，明確確認版本、風格與延伸範圍；有修改意見則修訂、重驗受影響案例，再取得確認 | 2026-10-21 使用者對樣稿確認問題回覆「可以繼續」，確認 a25XLtR6MTR-CqOMgJHLF 風格可延伸整站；不含發布授權 |

### T06 整站延伸與整合

| 任務 | 依賴 | 狀態 | 交付與完成條件 | 現有證據／驗證 |
|------|------|------|----------------|----------------|
| T06.1 三頁動態延伸及經歷互動 | T05.1 | done | 確認過的視覺語言延伸至剩餘區塊；經歷全收合初態、多項展開、快速收合、焦點與隱藏內容均正確 | 三頁線條進場與經歷展開完成；兩語／一般及減少動態的全收合、多展開、快速收合、焦點、inert 與旋轉測試通過；整站風格仍待 T07.1 |
| T06.2 整站手機、雙語與可用性整合 | T06.1 | done | 四種 DESIGN 尺寸、兩語三頁、200% 縮放、鍵盤與觸控皆可完成操作；減少動態與尺寸變更不破壞狀態，實測回饋、長工作及對比符合 V07 | 48 組尺寸／語系／頁面／動態偏好及原生200%六頁操作通過；四組 Performance trace 回饋 <100ms、測量期間無 longtask；文字對比最低4.69:1 |
| T06.3 舊練習清理與正式產物檢查 | T06.2 | done | 先查引用再清理練習專用程式、舊 metadata／品牌；保留共用檔與使用者變更；最終 Lint、typegen、tsc、build 通過，六頁及資源產物完整 | 清理前已查引用／diff；刪除9份練習與舊favicon，新增品牌icon；最終固定安裝、Lint、typegen、tsc、build及22引用檢查通過，新增靜態 start 已驗證 |

### T07 驗收與交付

| 任務 | 依賴 | 狀態 | 交付與完成條件 | 現有證據／驗證 |
|------|------|------|----------------|----------------|
| T07.1 整站功能與風格驗收 | T06.3 | in_progress | 對照最終版本彙整 V01～V08、V10 證據，補驗差異；使用者確認整站風格，不以局部樣稿確認替代 | 本機整站技術證據已彙整，版本 a3FLpkU9DVo8aiJkWMDTJ；整站審查入口 http://127.0.0.1:3052/integrated.html ，等待使用者確認完整整站風格 |
| T07.2 線上版本發布與驗收 | T03.2、T07.1 | todo | 必要授權具備後發布確認版本；記錄 Pages URL、版本與 run，另一瀏覽器／手機驗證六頁、刷新、切換、資源及 404，滿足 V09 | V09 線上技術已驗證，證據見 §3；仍等待 T07.1 整站風格確認，尚不判正式交付 done |
| T07.3 文件同步與逐功能完成判定 | T07.2 | todo | F01～F04 各對照完整驗收及證據；更新 REQ、DESIGN、TASK、索引與已驗證指南，連結／Metadata／diff 檢查通過，不補造歷史紀錄 | not_run；僅有全部必要驗收證據才完成；REQ 分母固定 3／4 |

子任務共 16 項；T01.1、T01.2、T02.1～T02.3、T03.1、T03.2、T04.1、T04.2、T05.1、T06.1～T06.3 為 done，不代表網站完成。每項執行後在 §3 以子任務 ID、日期、環境、指令／步驟、實際結果及證據位置記錄；本表列出的 V 編號為驗證目標，不是已通過結果。

## 3. 測試與驗證紀錄

2026-10-20，Windows／PowerShell、Node 22.18.0、pnpm 10.14.0：

- git remote -v：origin 為 https://github.com/xcia4899/next-react-practice.git；目前未推送。
- registry 查得 next-intl 4.14.9，其 peerDependencies 涵蓋 Next 16 與 React 19；僅為相容宣告，不代表專案已通過建置。
- pnpm import：沙箱內 registry 連線 EACCES，已停止重試；提高權限後轉換成功並產生 pnpm-lock.yaml。
- pnpm.cmd add next-intl@4.14.9 --save-exact：exit 0，已更新 package.json、pnpm-lock.yaml 與 node_modules；套件管理器提示略過 @parcel/watcher、@swc/core、unrs-resolver 的安裝 scripts，尚未確認是否影響檢查。不因安裝完成而宣稱建置通過。
- 尚無網站功能、瀏覽器或公開 Pages 驗證結果；V01～V10 not_run。

### 2026-10-20 恢復後驗證（T01.2、T02.1）

【實測】Windows／PowerShell、Node 22.18.0、pnpm 10.14.0，部署基底 `/next-react-practice`：

- `pnpm.cmd install --frozen-lockfile` 最初只顯示互動確認，未完成安裝；`CI=true` 後沙箱內長時間停在重建 node_modules。未將該次計為成功；終止 PID 2996 後，沙箱外 `pnpm.cmd install --frozen-lockfile --offline` exit 0，378 個套件全部重用快取，耗時 2m 28.5s。packageManager 固定為 pnpm@10.14.0，移除 package-lock.json，保留唯一 pnpm-lock.yaml。
- 安裝仍略過 @parcel/watcher、@swc/core、unrs-resolver scripts，未批次開放。`pnpm.cmd exec eslint --version` 回 v9.39.5；Next SWC `loadBindings()` 成功。完整建置另發現 next-intl 使用的 @swc/core 必須建立安全的使用者快取，沙箱內出現 ERR_SWC_NATIVE_CACHE；沙箱外相同建置可載入，無需開放 scripts。這只證明本次 Lint／typegen／tsc／build 可完成，不外推 watcher 其他能力。
- 首次建置編譯成功但被 `.next/dev/types/validator.ts` 中舊根頁與 layout 引用擋住。確認 `.next/dev/types` 位於專案生成目錄後，僅移除該過期生成資料。沙箱外設定 `NEXT_PUBLIC_BASE_PATH=/next-react-practice`，依序 `pnpm.cmd exec next typegen`、`pnpm.cmd exec tsc --noEmit`、`pnpm.cmd build` 全部 exit 0；產出入口、兩語各三頁與全域 404。最後 `pnpm.cmd lint` exit 0，包含新增檔案。
- 以已安裝 Next 16.3.5 的 `node_modules/next/dist/docs/01-app/03-api-reference/03-file-conventions/{layout,not-found}.md` 及 `01-app/02-guides/static-exports.md` 查證多 root layout／global-not-found。入口使用 `(entry)/layout.tsx`，語系使用 `[locale]/layout.tsx`，404 使用 global-not-found；沒有新增外層根 layout。此為 DESIGN §6.4 規劃結構的落實調整，避免巢狀 html；保留原設計行為。
- `EntryRedirect.tsx` 在 useEffect 以 location.replace 導向含 basePath 的中文首頁，入口保留兩語真實連結。`[locale]` 以 generateStaticParams 列出 zh-TW／en，dynamicParams=false；各頁設定 setRequestLocale。新增 messages 目前僅有 Common.brand 的兩語最小值，供路由骨架建置，不代表 T02.2 翻譯完成；頁面目前僅有頁名，不代表 T02.3 內容完成。
- 純靜態預覽：暫存腳本 `%TEMP%/chengyue-static-preview.py` 以 Python ThreadingHTTPServer 掛載 `out/` 至 `http://127.0.0.1:3051/next-react-practice/`，未知檔案回傳實際 404.html 及 HTTP 404，不使用 SPA fallback。Node fetch 逐一讀取入口及六頁：7 筆 HTTP 200、非空 HTML、各僅一組 html，入口／中文 lang=zh-TW、英文 lang=en；根入口具有無 JS 中文連結。另驗 `/fr/`、`/en/unknown/`、`/practice/` 三筆均 HTTP 404 並含自訂 404 文案。從七份 HTML 收集引用的 _next 資源，先確認非空集合，共 9 個，逐一 HTTP 200 且內容非空。這是 HTTP／產物驗證，不替代瀏覽器導向、刷新或畫面驗證。
- 瀏覽器工具：`cua.createBrowserTab('iab', ...)` 回報 Browser is not available；`cua.getState()` 回報 apps=[]、browsers=[]。無可用瀏覽器，入口 JavaScript 自動導向、瀏覽器刷新及關閉 JS 操作均 not_run，因此 T02.1 blocked，不開始依賴它的 T02.2～T07。未執行 Commit／Push／部署；REQ 完成率維持 0%。

### 2026-10-20 Playwright 授權與 T02 完成驗證

使用者明確回覆「允許」，授權以 Playwright 執行本機瀏覽器測試及必要安裝。`npm.cmd install --prefix %TEMP%/chengyue-playwright --no-audit --no-fund --ignore-scripts playwright@1.56.1` exit 0，工具僅位於暫存區，不變更專案依賴；使用已安裝 Chrome，沒有另下載瀏覽器。pnpm dlx 加 --version 僅回 pnpm 10.14.0，未誤記為 Playwright 安裝成功。

【實測】Windows、Node 22.18.0、pnpm 10.14.0、Playwright 1.56.1、Chrome 155.0.8059.80，headless，純靜態網址 `http://127.0.0.1:3051/next-react-practice/`，未節流：

- T02.1：`node %TEMP%/chengyue-playwright/routes.cjs` exit 0。入口導向 zh-TW；zh-TW／en 各首頁、services、about 六頁直接開啟及 reload 後 lang 正確；fr、en/unknown、practice 三筆回 HTTP 404；新建 javaScriptEnabled=false context 點中文備援可進中文首頁。最終內容版本再次執行也通過。
- T02.2：`node %TEMP%/chengyue-playwright/language.cjs` exit 0。解析兩份 JSON，先確認葉節點集合非空，共 39 個；key 集合一致，值均非空、插值參數一致。三頁逐一 zh-TW→en→zh-TW 保持同頁 pathname，無 pageerror。翻譯 namespace 為 Common／Home／Services／About／Metadata，含品牌、正文、導覽、操作、示範標示與 metadata。
- T02.3：六頁改為實際中英文內容，首頁有品牌主標、摘要、三業務及公司介紹，業務頁列出三項說明，公司頁有簡介、示範地址及三項經歷；目前經歷為靜態內容，tabs 與經歷展開依 T04／T06 進行。SiteHeader 使用 locale-aware Link、目前頁面識別、非模態手機選單與 LanguageSwitch；頁尾明示虛構示範。主題採已確認暖白、深藍與青綠，靜態骨架不宣稱動畫或風格樣稿完成。
- `node %TEMP%/chengyue-playwright/skeleton.cjs` exit 0：360／390／768／1440 × 900 CSS px，各兩語三頁共 24 組，逐案確認單一 h1、對應語系 title、示範頁尾、目前頁面標示與 document 無橫向溢出。手機各頁開啟、Escape 收合及焦點返回、切換語言關閉選單均通過；另驗點選 Services 關閉選單、390→1440→390 清除開啟狀態、鍵盤 Tab／Enter 使用 skip link。720×450 英文 About 亦無橫向溢出，僅為窄視窗重排，不冒稱實際瀏覽器 200% zoom 測試。以上是 V05 骨架部分，完整鍵盤／觸控／200% 縮放及整站互動仍待後續。
- 首次 skeleton 測試以可變按鈕名稱定位，開啟後 locator 逾時，修正為 aria-controls 固定定位；重驗另抓到 trailingSlash 導致 services／about 的 aria-current 缺失，已正規化 usePathname 尾斜線後重建，最終 24 組均通過。不將這兩次失敗計為驗收通過。
- 最終 Lint、next typegen、獨立 tsc --noEmit、子路徑 build 均 exit 0。最終 BUILD_ID：Dx1RwCToYFdlKAGvhlEsB；此為本機未提交版本，未部署。routes.cjs 與 language.cjs 已於最終 build 後重跑通過。
- 截圖 `%TEMP%/chengyue-desktop.png`（en／1440）、`%TEMP%/chengyue-mobile.png`（zh-TW／390）已直接檢視，正文可讀、無裁切；SHA256 分別為 536891D865ACF13ECD4AAA7DC9DEC2B5BA0B7E9119E8BE68EA1BBEB9EBB1F5D3、9B84B62BCA2B828779398ACBBCCDD5DBF0D13330348BE1635D577B112F7601C5。截圖及測試腳本為本機暫存證據，未入版控；暫存清除後須依上列案例重建，不宣稱永久保存。

### 2026-10-20 T03.1 工作流程與產物驗證

使用者再次要求繼續 TASK，並指定 token 低於 40% 時先存檔停止；解除前次段落暫停，沿用原核准範圍，仍不包含 Commit／Push。既有 Git 變更均保留。

- 實際查詢 `git branch --show-current` 為 main；origin 為 https://github.com/xcia4899/next-react-practice.git。環境未安裝 gh，未重試同一缺少工具命令；改用 GitHub Connector get_repo，查得 default_branch=main、visibility=public、permissions.admin=true、permissions.push=true。權限存在不代表使用者已授權本次推送。
- 唯讀請求 `https://api.github.com/repos/xcia4899/next-react-practice/pages`，未帶驗證身分，實際回 HTTP 404；不能據此斷定 Pages 未啟用。現有 Connector 未提供 Pages 設定專用工具，尚未修改任何 GitHub 設定或外部檔案。
- 新增 `.github/workflows/pages.yml`：main push／workflow_dispatch；Node 22.18.0、pnpm 由 packageManager 固定 10.14.0；固定安裝、Lint、typegen、tsc、build、產物檢查後上傳 out；部署 job 依賴 build、使用 github-pages environment，pages:write／id-token:write 僅限部署 job，整體 contents:read，pages 併發不取消執行中部署。basePath 固定已確認儲存庫的 `/next-react-practice`。工作流程尚未推送，沒有 GitHub Actions 成功證據。
- 【官方】查閱 [GitHub Pages custom workflows](https://docs.github.com/en/pages/getting-started-with-github-pages/using-custom-workflows-with-github-pages)、[setup-node](https://github.com/actions/setup-node)、[pnpm/action-setup](https://github.com/pnpm/action-setup)。採 checkout@v6、pnpm/action-setup@v6、setup-node@v7、configure-pages@v5、upload-pages-artifact@v4、deploy-pages@v4。configure-pages 放在 deploy job，建置不依賴 Pages 已設定，部署時仍須先確認 Pages source 與 environment 設定；未設定時不以 fallback 掩蓋錯誤。
- 新增 `scripts/verify-static.mjs`，以 Node 內建模組檢查 out：七份 HTML（入口＋六頁）非空、單一 html、lang、帶正確基底的本機 href／src、引用目標存在且非空、兩語無 JS 入口連結、404 文案，且 fr／en/unknown／practice 不應有匯出頁。先確認引用集合非空再判通過。可重跑：設定 NEXT_PUBLIC_BASE_PATH=/next-react-practice，執行 `node scripts/verify-static.mjs`。
- 【實測】2026-10-20，Windows／PowerShell、Node 22.18.0、pnpm 10.14.0，CI=true，NEXT_PUBLIC_BASE_PATH=/next-react-practice：`pnpm.cmd install --frozen-lockfile --offline` exit 0（777ms、Already up to date；沿用本機快取，不代表 Linux 網路安裝已驗）；`pnpm.cmd lint`、`pnpm.cmd exec next typegen`、`pnpm.cmd exec tsc --noEmit`、`pnpm.cmd build`、`node scripts/verify-static.mjs` 依序 exit 0，產物為七頁、404、18 個非空引用。既有略過 scripts 警告仍在，未另開放 scripts。
- 使用已安裝 js-yaml 4.3.2 解析非空 YAML 並斷言 main trigger／workflow_dispatch、build dependency、environment、權限與 basePath，exit 0；Python yaml 未安裝，改用既有 Node 套件，沒有為 YAML 檢查新增依賴。`pnpm.cmd exec eslint scripts/verify-static.mjs` 另行 exit 0；`git diff --check` 通過。
- 【實測】沿用純靜態 preview 127.0.0.1:3051，Playwright 1.56.1／Chrome 155.0.8059.80，`node %TEMP%/chengyue-playwright/routes.cjs`、`node %TEMP%/chengyue-playwright/language.cjs` 均 exit 0：入口自動導向、六頁直接開啟／刷新及 lang、三種非法路徑 404、無 JS 備援、三頁雙向同頁切換、39 個翻譯葉節點比對通過。這些為本機驗證，不替代 Pages HTTPS 或 Linux runner 驗收。

### 2026-10-21 T04 動態樣稿及 T05 審查準備

使用者要求繼續並依序進行到 token 低於 30% 前存檔。T03.2 仍沒有明確 Commit／Push／Pages 設定授權，維持 blocked；依 DESIGN §8／本 TASK §2 外部 blocked 例外執行獨立 T04，未宣稱有 Pages 線上驗證。

- 實作新增 `src/components/site/BrandGeometry.tsx`、`ServiceTabs.tsx`、`motion.module.css`；首頁保留 Server Component，主視覺採原生 SVG／CSS 匯聚，業務 tabs 是局部 Client boundary。幾何三種輪廓使用相同指令結構，以 CSS d transition 320ms 插值，快速切換直接採最新狀態，不排隊。文字進場只位移，全程維持完整不透明度；手機取消文字錯開、縮短線條位移，prefers-reduced-motion 取消動畫與 transition。
- ServiceTabs 預設品牌，tab／tabpanel 關聯、aria-selected、roving tabindex、方向鍵循環、Home／End、Tab 離開至面板均已實作；未選面板 hidden，說明依語系完整顯示。切換尺寸不重設目前項目，切換語系依頁面掛載回預設。尚未將此動態風格延伸至其餘區塊，經歷仍為靜態，留 T06。
- 【實測】2026-10-21，Windows／PowerShell、Node 22.18.0、pnpm 10.14.0，NEXT_PUBLIC_BASE_PATH=/next-react-practice：Lint、next typegen、獨立 tsc --noEmit、build 均 exit 0。為維持文字對比移除 settle 透明度變化後再 build 成功；`node scripts/verify-static.mjs` 確認七份 HTML、404、20 個非空引用。最終 BUILD_ID：a25XLtR6MTR-CqOMgJHLF，未提交／未推送／未部署。
- 【實測】Playwright 1.56.1、已安裝 Chrome **156.0.8078.47**（與先前 T02／T03 的 155 不同，不套用舊瀏覽器結果）、headless、未節流。重啟純靜態 preview 127.0.0.1:3051。`node %TEMP%/chengyue-playwright/motion.cjs` exit 0：zh-TW／en × 390×900／1440×900 四組；首頁起始0ms／中間425ms／完成1100ms，以 Web Animations API 暫停動畫時間軸截圖；h1 始終可見，無橫向溢出，動態偏好在頁面存續中切換即取消動畫。業務三項在390以 tap、1440以 click 切換，選取／面板關聯正確；ArrowUp 循環、Home、ArrowRight、End、ArrowDown、Tab 至面板正確；30次同回合快速 click 後最後選取 web；390→844→390 及1440→1200→1440 保留選取且無溢出。reduced-motion 下 transitionDuration=0s，切換仍正常，四組無 pageerror。
- 【實測】`node %TEMP%/chengyue-playwright/motion-performance.cjs` exit 0：1440×900 英文業務頁，取 d transition 中間160ms，確認初始／中間／結束 path 三者不同，證明有插值而非只改靜態圖。十次操作至 aria-selected 更新耗時為 51.9、5.3、6.1、6.4、6.1、6.2、6.2、6.1、6.2、6.0ms，全部 <100ms；PerformanceObserver 於此測量區間未觀察到 longtask。另驗首頁動畫尚可進行時操作入口能進業務頁。這是單一桌面環境的樣稿局部觀察，非完整 DevTools trace／整站 V07，也不外推未測裝置或經歷互動。
- 最終版再次執行 routes.cjs、language.cjs，exit 0：六頁直接開啟／刷新／lang、入口自動導向、三種非法路徑404、無JS中文備援、三頁雙向語系切換及39個非空翻譯葉節點一致通過。
- 審查資料 `%TEMP%/chengyue-motion-preview/` 共28張 PNG：四組各首頁3影格、業務3狀態及減少動態1張。已檢視中英首頁與業務代表影格，正文可讀、手機可向下閱讀完整構圖；代理視覺檢查不代表使用者風格驗收。index.html 提供四組縮圖／原尺寸影格與實際操作頁連結；manifest.json 記錄 BUILD_ID、五個受影響 source SHA256 與28張影格 SHA256。大量產物只存本機暫存，不入版控，暫存消失時依腳本重跑並重新識別版本。
- 審查入口 `http://127.0.0.1:3052/` 以 Python http.server 僅綁127.0.0.1，HTTP 200；網站操作入口 `http://127.0.0.1:3051/next-react-practice/`。兩者皆本機，沒有公開網址。下次若服務已停：分別執行 `%TEMP%/chengyue-static-preview.py` 與 `python -m http.server 3052 --bind 127.0.0.1 --directory %TEMP%/chengyue-motion-preview`。

### 2026-10-21 T05 確認及 T06 整站實作驗證

使用者對已呈現的樣稿與延伸範圍確認問題回覆「可以繼續，依舊是低於30%就停止」，據此確認樣稿 a25XLtR6MTR-CqOMgJHLF，T05.1 done；未推定為整站最終風格或 Commit／Push 授權。

- T06.1：新增 Reveal 與 CompanyHistory；IntersectionObserver 每次掛載只觸發一次、隨後 disconnect，初態內容保持可見。線條延伸與手機簡化沿用樣稿，reduce 偏好立即取消動畫。經歷全收合初態，可多項展開，grid rows／指示符以240ms切換；收合立即 aria-hidden／inert，焦點留在按鈕。非選面板仍不可聚焦，不固定文字高度。
- 【實測】Windows、Node22.18.0、pnpm10.14.0、Playwright1.56.1、Chrome156.0.8078.47、未節流。`node %TEMP%/chengyue-playwright/history.cjs` exit0：兩語×一般／減少動態四組；三項預設關閉、Enter／Space、觸控、多項展開、30次快速收合、焦點、aria-hidden／inert、390→844保留狀態、動態偏好即時取消transition及一次性reveal通過。
- T06.2：`node %TEMP%/chengyue-playwright/integration.cjs` 最終 exit0。360×800、390×844、768×1024、1440×900 ×兩語三頁×一般／減少動態共48組，無橫向溢出，lang正確，tabs鍵盤／觸控、經歷Enter／Space、多項展開、Shift+Tab、導覽Enter／Escape／焦點及同頁語系切換皆通過。另用獨立暫存一般Chrome profile 的 chrome://settings/appearance → 原生200% zoom，實測DPR1→2、innerWidth1424→712，再驗兩語六頁無溢出且操作正常。沒有修改使用者平常Chrome設定；先前無痕設定頁關閉及快捷鍵未改DPR的嘗試未記為通過。
- 首輪對比檢查發現 #087f78／#f6f3ec 僅4.39:1；依 DESIGN§6.1允許的實測微調，將accent改為#087a73。重建並重驗後 foreground13.54:1、muted5.74:1、accent4.69:1，均達一般文字4.5:1。不是改寫SPEC迴避失敗。
- `node %TEMP%/chengyue-playwright/site-performance.cjs` exit0：390／1440×一般／減少動態四組，英文業務與經歷各10次操作。四組共80次回饋皆<100ms，最大66.2ms；PerformanceObserver測量區間無longtask。透過CDP Tracing錄製非空trace（20903／20024／24240／21398 events），存 `%TEMP%/chengyue-trace-{390,1440}-{no-preference,reduce}.json`。此為本機headless Chrome、非節流環境；不外推真實手機硬體或其他瀏覽器。
- T06.3：先以rg查全專案引用、git diff確認舊檔無使用者修改；引用僅在舊練習子樹。逐檔刪除 LearningLab、practice 六檔、LearningContext、lessons 共9份TS／TSX及舊favicon.ico，沒有遞迴清空src。新增同源幾何icon.svg，移除已無引用的code-scroll樣式。沙箱刪除失敗後改用已列出的確切檔名提權刪除，未重跑大範圍清理。`rg -n 'LearningLab|LearningContext|React 語法練習室|code-scroll' src scripts README.md package.json` 最終無命中；正式文件的歷史敘述保留。
- 新增scripts/serve-static.mjs，package start改為純靜態out預覽；預設127.0.0.1:3051，PORT及NEXT_PUBLIC_BASE_PATH可設定，無SPA fallback。已實測七頁、icon、三種404、目錄308與HEAD正確；替換暫存Python網站伺服器後，再以routes.cjs／language.cjs確認六頁直接開啟／刷新、入口、404、無JS中文備援與三頁雙向語系切換通過。README與工程規範同步實際指令；UTF8回讀修正README經舊PowerShell管線造成的問號，最終中文正常。
- 最終 Lint、next typegen、獨立tsc、build、verify-static均exit0；靜態產物七頁／404／22個非空引用，包含品牌icon。最終package腳本更新後 `pnpm install --frozen-lockfile --offline` exit0（Already up to date，1.1s，未改依賴）；仍有既有略過scripts提示，未另開放。最終BUILD_ID：a3FLpkU9DVo8aiJkWMDTJ。清理版重跑integration.cjs、history.cjs、language.cjs、routes.cjs全數exit0，固定輸入與範圍如上。
- T07.1本機技術證據：V01本機路由、V02兩語39鍵及切換、V03 tabs、V04經歷、V05尺寸／鍵盤／觸控／200%、V07本機trace／對比、V08固定安裝／最終產物／清理均有本節與既有證據。V06／V10的樣稿確認已取得，整站風格仍須使用者確認；V01／V06之Pages部分及V09線上皆未驗，不以本機結果替代。
- 整站預覽已保存十二張全頁截圖（兩語×390／1440×三頁，About示範前兩項展開），已檢視中英代表頁。審查入口 `http://127.0.0.1:3052/integrated.html`，實際操作 `http://127.0.0.1:3051/next-react-practice/`，皆已HTTP200。`%TEMP%/chengyue-motion-preview/final-manifest.json` 記錄最終BUILD_ID、source／十二張圖片／四份trace的SHA256；大量暫存不入版控，刪除後需重跑重建。

### 2026-10-21 Pages 發布及 HTTPS 驗證

【實測】使用者已明確授權 Commit／Push main 與設定 Pages，實際完成：

- 主提交 `bb97c493432d0d66cd7a9e979418fee642a74348`（feat: 建立澄岳雙語形象網站與 Pages 部署），54個網站與相關文件檔案，正常push main：40dd5cb→bb97c49。未Merge／Rebase／force push；先前獨立的docs/specs/.gitkeep刪除仍留工作區，未提交。Pages REST API已建立build_type=workflow，https_enforced=true。
- 推送初期 GitHub workflows／runs清單為0，手動filename dispatch回404；唯讀確認workflow在main、Actions enabled、版本tags存在、儲存庫非fork／disabled／archived，沒有原樣持續重試。後續workflow註冊為active，ID391777272；依新註冊ID dispatch成功。原push run39613244545已開始，另有同提交pending手動run39613320530；取消重複pending，保留原push run。未更改workflow來掩蓋平台延遲。
- 原push run [39613244545](https://github.com/xcia4899/next-react-practice/actions/runs/39613244545) 最終completed／success。build job119267421750：checkout、pnpm／Node設定、frozen-lockfile安裝、Lint、typegen、tsc、build、verify-static及artifact上傳均success；deploy job119267793106最終隨run成功。此次是真正ubuntu-latest雲端runner結果，與先前Windows本機證據分開。
- Artifact：github-pages，ID12350972159，241940bytes，digest `sha256:45a8fc58eb831197d6b115a43d0566c2a8acea06822bc0d285c3a1b0fcb1ab40`。公開網址由Pages API回傳且已實測HTTP200：**https://xcia4899.github.io/next-react-practice/** 。主頁含瀏覽器中文導向，非伺服器redirect。
- 【實測】Windows、Playwright1.56.1，另一瀏覽器 **Microsoft Edge155.0.4283.62** headless、未節流。測試副本 `%TEMP%/chengyue-playwright/online-{routes,language,history,integration,motion}.cjs` 將base改為實際Pages HTTPS，未修改原本本機測試。routes：六頁直接開啟／reload及lang、入口導向、fr／en/unknown／practice三筆HTTP404、關閉JS中文備援全部通過。language：三頁雙向保持同頁、39個非空翻譯鍵與參數一致。history：兩語×一般／減少動態的初態、多展開、快速收合、焦點、inert、旋轉均通過。
- integration：公開網址的360×800／390×844／768×1024／1440×900 ×兩語三頁×一般／減少動態共48組，無溢出，鍵盤／觸控與語言切換通過；隔離Chrome profile的原生200%縮放亦在Pages URL通過六頁，DPR1→2、innerWidth1424→712。配色對比仍為13.54／5.74／4.69:1。
- motion：公開網址四組（兩語×390／1440）首頁三時點、三業務切換、快速操作、旋轉、動態偏好均通過，28張影格另存 `%TEMP%/chengyue-pages-evidence/`，不覆蓋本機樣稿。這些是另一桌面瀏覽器與觸控模擬，不冒稱實體手機已測。
- 另以Node fetch逐頁解析實際七份HTML，確認引用集合非空，共22個帶正確儲存庫基底的href／src目標，逐一HTTPS200且內容非空，包含icon與CSS／JS。不是只檢查首頁。
- V09線上技術證據已具備，T03.2 done；T07.1整站風格仍待使用者明確確認，故T07.2正式交付及T07.3逐功能完成判定仍未done，REQ完成率維持0%。
- 本次僅同步發布結果的文件後續提交使用 `[skip ci]` 避免重複部署相同網站程式；【官方】[GitHub skip workflow runs](https://docs.github.com/en/actions/how-tos/manage-workflow-runs/skip-workflow-runs)。網站部署來源維持bb97c49，文件提交不改網站程式。

## 4. 阻礙事項

T02.1 瀏覽器阻礙已解除：使用者明確允許改用 Playwright 及必要安裝，已以暫存 Playwright 與本機 Chrome 驗證通過。先前無瀏覽器紀錄為歷史狀態。

T03.2 發布阻礙已解除：使用者已授權，已正常推送並設定 Pages workflow；Actions 與公開 HTTPS 實測通過。先前缺授權與未註冊 workflow 的狀態均為歷史。

目前尚待 T07.1 的整站風格確認；發布為使用者明確授權的開發示範版，未以部署成功取代整站風格驗收。

## 5. 完成摘要

2026-10-20 依使用者因時間因素要求暫停，僅完成下列狀態盤點與交接紀錄，停止後續實作。制度未定義 paused 狀態，因此文件維持 implementing，以本節記錄暫停；不改為 completed 或 cancelled。

### 暫停位置

- T01 尚未完成：pnpm 鎖檔已產生、next-intl 已安裝；尚未固定 packageManager、清理 npm 鎖檔或執行 frozen-lockfile 驗證，目前兩種鎖檔暫存並存。
- T02 部分寫入：next.config.ts 已改靜態匯出、trailingSlash、環境 basePath 與 next-intl plugin；src/i18n 下已有 routing.ts、navigation.ts、request.ts；src/app/(entry) 下已有 layout.tsx、page.tsx。
- 大批檔案 patch 中途因 src/components/site 建立權限失敗而停止；之後以提高權限建立該目錄成功。patch 非原子操作，前段檔案已落地，後段沒有完成，不可整批原樣重跑。
- src/app/page.tsx、src/app/layout.tsx 已由本次部分修改刪除，改由 (entry) 規劃接手；舊 LearningLab 與練習元件仍在，未清理。
- **目前為不可視為可執行的半成品**：入口匯入的 src/components/site/EntryRedirect.tsx 尚不存在；messages/ 與 site/ 目錄尚無實作檔，尚無 [locale] 六頁、404 或 Pages workflow。不能啟動後就當成完成網站。
- 本機版本為 Node 22.18.0、pnpm 10.14.0、next-intl 4.14.9。origin 已查明；未執行 Commit／Push／部署，未啟動預覽伺服器。
- Lint、typegen、TypeScript、build、瀏覽器與線上驗收均 not_run；REQ 完成率仍為 0%，不更新功能為 completed。

### 下次接續順序

1. 先讀本 TASK、DESIGN 及 git status／diff，確認使用者後續變更；不要覆蓋目前既有文件移動、刪除或實作半成品。
2. 從 T01.2 固定 pnpm 版本、處理鎖檔正本與固定安裝；依實際錯誤決定是否需允許個別安裝 scripts，不批次開啟。T01.1 不需無故重做。
3. 依序接續 T02.1～T02.3 的缺少檔案與驗證。多 root layout 加 global-not-found 的方案需依已安裝 Next 文件及實際 build 驗證；experimental 設定目前僅寫入，未證明可行。
4. 依 T03.1、T03.2 完成最小靜態驗證及發布準備，再按 §2 的條件推進 T04～T07。公開推送仍需相應 Git 授權。

未完成整站、部署或驗收。既有使用者文件移動與刪除保留，不覆蓋。

### 任務拆分修訂

2026-10-20：使用者要求「應該再拆分得更細節一點」，保留 T01～T07 階段，新增 16 項子任務及逐項依賴、成果、驗證目標與現況。原 T02 的提前部分寫入如實保留，明定先完成 T01.2 才續作；沒有重新執行程式、安裝、測試或部署。使用者先前要求的實作暫停仍有效。

### 2026-10-20 恢復執行

使用者明確要求繼續本 TASK，解除先前暫停；維持原核准範圍與依賴順序，不含 Commit／Push 授權。已重新查核 Git 工作區，保留既有文件搬移、刪除及骨架半成品。package.json 已固定 packageManager 為 pnpm@10.14.0；固定安裝及相關檢查已通過；T02.1 已補最小骨架並完成 HTTP／產物檢查，因瀏覽器不可用而 blocked，詳細證據見 §3～§4。先前暫停位置為歷史，不代表目前仍缺相同檔案。

### 本次段落交接：T02 完成後暫停

使用者要求「如果 token 已經不到 30% 到一個段落就先暫停」。本次停在 T02.1～T02.3 完成並驗證的邊界；維持 implementing，未改為 completed。早期暫停位置與 browser blocked 紀錄均為歷史，現況以本節及任務表為準。

下次先查 Git 現況與本 TASK，再從 T03.1 開始：讀 Git 規範、查真實分支／origin 與 GitHub Pages 設定，建立可審查 Actions，完成固定安裝／品質檢查與子路徑最終產物驗證。T03.2 發布仍需明確 Commit／Push 授權；尚未嘗試發布，不可直接跳到 T04。動畫樣稿及整站延伸未開始，舊練習清理仍按 T06.3，沒有提前刪除。REQ 仍未驗收，完成率維持 0%。

本機靜態預覽伺服器維持 127.0.0.1:3051，使用 out 產物；若已停止，先以既有暫存 chengyue-static-preview.py 重啟或依 §3 重建純靜態掛載。不以本機預覽當成 Pages 公開交付。
### 最新交接：T03.1 已完成，T03.2 等待發布授權

本次成果已存檔。T03.1 done，T03.2 因缺少明確 Commit／Push／Pages 設定授權 blocked；維持文件 implementing。尚未取得實際剩餘 token 百分比，不捏造已觸及 40% 門檻；本次在發布授權邊界停止，不推送既有工作區變更。

可審查發布檔案：next.config.ts、package.json、pnpm-lock.yaml、package-lock.json 刪除、src/app 既有入口替換與新增語系頁／404／globals.css、src/i18n、src/components/site、messages、.github/workflows/pages.yml、scripts/verify-static.mjs。正式文件與其他既有變更須在 Commit 前逐項核對，不因本次發布授權自動混入無關修改。

接續先確認發布授權範圍與工作區，取得後查 Pages／github-pages environment、Commit／Push 網站骨架並保留 run／artifact／版本／HTTPS 結果。若使用者尚不授權發布，按 DESIGN §8 的外部 blocked 例外可續做獨立 T04 樣稿，但不能宣稱最小 Pages 已驗證。未進行 T04～T07；整站功能與風格尚未驗收，REQ 完成率仍為 0%。
### 最新交接：2026-10-21 T04 完成，等待 T05.1 風格確認

成果與驗證已存檔。T04.1／T04.2 done，T05.1 in_progress，等待使用者檢視樣稿 **a25XLtR6MTR-CqOMgJHLF** 後明確確認首頁線條匯聚、三業務幾何變形及中英／手機視覺方向。依 DESIGN §8，未確認前不執行 T06；不以「繼續任務」或先前 DESIGN 核准代替具體樣稿驗收。這次在實際風格確認邊界停止，未聲稱已量得 token 低於30%。

接續先查工作區與樣稿版本；使用者若提出修改，修訂並重驗受影響四組案例後再確認；若明確確認此版本與延伸範圍，記錄來源後再做 T06.1。T03.2 公開部署仍待明確 Commit／Push／設定授權，使用者確認樣稿亦不自動授權 Git 操作。REQ 完成率仍0%，整站、公開部署及驗收均未完成。
### 最新交接：2026-10-21 T06 完成，T07.1 等待整站確認

T05.1確認已記錄，T06.1～T06.3完成並存檔。T07.1技術證據已彙整，請使用者檢視最終整站 a3FLpkU9DVo8aiJkWMDTJ 的三頁與經歷展開後確認整站風格；局部樣稿確認不能代替此步。此處因整站人工驗收邊界停止，不聲稱已讀得實際token百分比。

下次先查Git與本紀錄。若使用者明確確認整站，記錄T07.1結果；公開部署仍需要明確Commit／Push至main及Pages設定授權，T03.2維持blocked、T07.2／T07.3未開始，不因「繼續」自行推送或部署。REQ功能仍implementing且完成率0%，待公開與全部必要驗收才逐功能完成。

目前以專案 `NEXT_PUBLIC_BASE_PATH=/next-react-practice pnpm start` 在3051預覽；3052仍提供暫存審查資料，預覽停止時依README及既有暫存目錄重啟。舊Python3051與測試Node3053已停止；Stop-Process環境錯誤後以唯讀查得的本次helper PID 16792／2652 taskkill成功，沒有終止其他工作程序。
### 2026-10-21 明確發布授權與部署執行

使用者明確授權「Commit／Push 至 main，以及設定 Pages 發布」。依此提交目前網站與對應文件，發布開發示範版；不將發布授權解讀為T07.1整站風格確認，T07.2正式驗收依賴仍保留。

已使用既有Git credential helper在記憶體內驗證，沒有輸出或寫入憑證。Pages原先經驗證身分查詢404，已依授權POST建立build_type=workflow，預期網址由API回傳 https://xcia4899.github.io/next-react-practice/ 。此刻尚未證明公開網址可用。

Git fetch查證遠端main=40dd5cb524feaf5470dfde21f769b88e57b1c33e，為本機HEAD祖先；本機既有文件提交領先遠端，可正常快轉推送，不Merge／Rebase／force push。既有待提交變更逐項盤點：網站程式、依賴轉換、靜態部署腳本、README與工程啟動指令、正式REQ／SPEC／DESIGN／TASK及對應索引與需求來源文件均與網站有關。舊docs/specs/.gitkeep刪除屬先前獨立目錄清理，不納入本次網站提交，保留工作區狀態。
### 最新交接：Pages 已上線，仍待整站風格驗收

使用者此次只明確授權發布，已完成Commit／Push與Pages設定及HTTPS驗證。可直接檢視 https://xcia4899.github.io/next-react-practice/ 。T03.2 done，T07.1 in_progress等待整站風格確認；T07.2與T07.3不得僅因網站已上線而自動done。

下次若使用者明確確認公開整站版本的風格，記錄確認來源後可依已具備的線上證據完成相關交付判定；若提出修改，修正並重驗差異，必要時依本次發布授權提交／更新Pages。保留使用者獨立的docs/specs/.gitkeep刪除，不作破壞性清理。各功能尚不標completed。