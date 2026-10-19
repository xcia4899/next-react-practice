# AI 代理工作入口

本檔為 Codex 的專案工作入口。開始前讀本檔與目標路徑適用的 `AGENTS.md`，確認授權及 Git 工作區；先查實際檔案，再選讀必要規範。**本檔是 AI 開發入口、L0～L3、實作授權、測試及停止規則的正本**；正式文件分類、ID、狀態、生命週期、文件核准、追溯與索引以 [docs/AGENTS.md](docs/AGENTS.md) 為準。

## 專案概述

- 前端以 Next.js App Router、React、TypeScript、Tailwind CSS 與 `next-intl` 為主；實際版本及指令以目前 `package.json`、鎖檔與現有程式為準。
- 目前的資料／API Mock、LocalStorage 與對接方式以程式碼和 [資料存取規範](docs/conventions/data-access.md) 查證，不能宣稱正式後端已完成。
- **未來後端方向為 Node.js**；目前僅為規劃，語言／框架／資料庫／ORM／授權／部署未決，見 [後端規劃](docs/conventions/backend.md)。未經確認不得預設後端實作細節。

## AI 開發流程（Flexible Spec-Driven Development）

本章定義開發入口、L0～L3、核准與實作測試原則，並與 [docs/AGENTS.md §8](docs/AGENTS.md#8-文件生命週期ai-agent-與開發人員皆適用) 的文件生命週期共同使用。**開發入口與修改等級獨立判斷。**

### 開發前

- 閱讀 [docs/AGENTS.md §10 索引](docs/AGENTS.md#10-索引)、相關 REQ／SPEC／DESIGN／TASK／ADR（包含 `proposed` ADR）與實際程式碼；確認工作區與現有變更。
- 選定入口與等級，按需求查相應工程規範。只讀任務必要文件。

### 開發入口

| 入口 | 適用 | 流程 |
| --- | --- | --- |
| Requirement First | 老闆／PM／客戶新需求、需要保留原始完成率 | `REQ → SPEC → DESIGN → TASK（必要時）→ IMPLEMENT → VERIFY → SYNC` |
| Spec First | 明確功能需求、API 契約調整、既有功能擴充 | `SPEC → DESIGN → TASK（必要時）→ IMPLEMENT → VERIFY → SYNC` |
| Design First | 重構、效能、架構、技術問題修復 | `DESIGN → TASK（必要時）→ IMPLEMENT → VERIFY → SYNC` |

不強制所有工作從 REQ 開始。Design First 影響正式行為時按 [docs/AGENTS.md §8](docs/AGENTS.md#8-文件生命週期ai-agent-與開發人員皆適用) 補齊 SPEC；安全、資料隔離、重大相容性及已核准行為變更，先核准相關 SPEC 才能實作。

### 修改等級（L0～L3）

| 等級 | 適用 | 最低流程 |
| --- | --- | --- |
| L0 | 錯字、格式、註解、純文件調整 | 直接修改、必要檢查 |
| L1 | 低風險小型 Bug、局部重構、測試補強 | 分析、修改、測試、必要文件同步 |
| L2 | 新功能、主要行為調整、跨模組變更 | 正式規格或設計確認、實作、驗收；視需要建 TASK |
| L3 | 大型模組、重大架構、高風險資料與安全變更 | 完整規劃、原則上 TASK 拆解、實作驗收 |

判級依行為、資料安全、隔離、相容性、依賴與影響範圍，不依程式碼行數。L0／L1 不強制新建 REQ／SPEC／DESIGN／TASK，但不得省略相關測試與文件同步。

### 人工確認與核准

- AI 可以撰寫草稿、修改已獲授權的程式、測試與同步證據，但不能自行核准 REQ／SPEC、重大 DESIGN，或把 ADR 改為 `accepted`。
- L0／L1 在使用者已要求直接執行且不涉及高風險及已核准內容的行為變更時，可以直接修改與測試，不需再次請求同一授權。
- L2／L3 需要核准的 SPEC／DESIGN 未核准前，不實作依賴它們的行為；一則明確授權可以涵蓋多份文件與實作範圍，不機械式要求重複批准。
- 安全、資料隔離、重大相容性等高風險事項一律至少 L2；使用者要求先分析／規劃時，無論等級都不可提前修改程式。

### 程式修改與測試原則

- 已核准 SPEC 定義預期，程式與測試證明目前。衝突須回報與分析，不得倒過來修改 SPEC 使其符合程式。
- 測試依 DESIGN 驗收策略，結果與證據記在 TASK；沒有 TASK 時在 DESIGN 簡記。未驗證不得宣稱通過。
- 未授權不得 Commit／Push／Merge／Rebase、破壞性清理或覆蓋使用者變更。

### 開發完成後的文件同步

依 [docs/AGENTS.md §18](docs/AGENTS.md#18-文件同步規則) 更新受影響的狀態、驗證證據、索引與 GUIDE；不補造過往 TASK 或核准紀錄，不把規劃中的 Node.js 後端描述為已實作。

### 驗證與停止條件補充

#### 來源與驗證可信度

本節適用於需要佐證的技術結論，例如框架／API 行為、相容性、環境限制與測試結果。Spec 的需求與 AC 依已確認來源及核准紀錄管理；一般格式規則、操作步驟不強制逐句標記。標記定義只在本節維護，不在每章重複說明。

| 標記 | 適用情況 | 必要依據 |
| --- | --- | --- |
| `【官方】` | 官方文件可查證的技術事實 | 官方連結，必要時註明版本 |
| `【實測】` | 已在指定環境實際執行並取得結果 | 日期、環境、指令／步驟、實際結果及驗證範圍 |
| `【推論】` | 合理推斷，但尚未驗證 | 說明不確定之處；影響決策時列待驗證條件 |
| `【團隊】` | 團隊已確認的規則或決策 | 引用既有規範；須核准者附確認來源 |

- 未執行不得標記 `【實測】`；僅列出指令、引用官方文件或生成測試程式，都不代表驗證通過。實測應保留可重跑的方式及可核對的結果，未執行則依 TASK 記錄 `not_run`／`blocked` 與原因。
- 實測結論僅適用於已記錄的專案、版本、環境及驗證範圍；跨專案引用時註明原驗證條件，不得宣稱其他環境已通過。必要時可使用 `【實測:專案名】` 識別來源。
- 官方說明不代表專案已實現。官方文件、程式與實測不一致時，先核對版本、設定、環境及結果；不得以實測行為直接改寫已核准 Spec。
- 直接查閱程式或設定所得的事實可附實際來源路徑，不必另加標記；但聲稱檔案／目錄存在或不存在前須查證（例如 `rg --files`、`ls`）。判定不存在時，說明搜尋範圍；若結論影響修改決策，保留查詢方式與結果。
- 執行清單比對或自動驗證前，先確認資料來源、輸入內容及筆數有效，排除解析失敗或非預期空集合造成的假通過。若空集合符合預期，須先確認此條件再判定結果。


#### 停止條件與交付檢查

| 停止條件 | 動作 |
| --- | --- |
| 需求／驗收不明、指示／文件／實作衝突 | 停受影響部分，列差異、影響、選項，確認改哪份正本；仍可整理待確認草案 |
| 改核准需求／決策或未授權重大架構 | 提判準、選項、建議；確認前不建立依賴決策的骨架；專案限制引用已採用正本的路徑／章節 |
| 相同目的的操作，因相同已知原因連續失敗兩次 | 停止原樣重試並記錄嘗試、錯誤與原因；可繼續唯讀診斷、有新依據的替代方式及不受影響工作。不同原因不合併計次，原因不明先診斷；僅需人員決策或額外授權的部分等待確認 |
| 破壞性操作或越權 | 說明範圍、影響、替代方案，獲明確授權再做 |

交付前檢查 Metadata／章節／日期／ID、核准範圍、關聯與連結、需求追溯及真實證據；用 `rg` 搜受影響引用（含程式、JSON、YAML、腳本），檢查 diff 保留既有變更。UTF-8 回讀實檔確認中文、換行、表格及佔位值，排除亂碼與非預期字面 `\n`。回報改動、實際驗證與未解事項，不捏造完成。

可重現的大量輸出不入版控。

驗證依當次變更、需求／DESIGN 驗收條件、風險及完成條件選擇。制度變更依本檔「人工確認與核准」及 docs/AGENTS.md §17 取得授權。

- **重跑一致性**：固定輸入、來源版本、核准內容、日期／時區與 ID 起點，再決定重跑次數與比較項目，記錄差異及證據。僅一份產出不得宣稱重跑一致，同代理重跑不得宣稱跨代理驗收。
- **一致判準**：文件類型、判級、必要核准、狀態、需求／驗收覆蓋、關聯及停止判斷一致，結論無矛盾；措辭與不影響語意的排序可不同。
- **對抗性測試**：先列案例輸入與預期判定，逐案記錄規則依據及結果。同一案例仍有兩種合理解讀即不通過，修訂後重驗；未驗不稱通過。

## 任務與規範入口

| 工作 | 讀取 |
| --- | --- |
| 需求／SPEC／DESIGN／TASK／ADR／SDD | [docs/AGENTS.md](docs/AGENTS.md) 、所屬目錄 `README.md` 與已存在文件 |
| 修改任何程式碼 | [工程規範](docs/conventions/engineering.md) |
| UI、路由、元件、樣式、語系 | [前端規範](docs/conventions/frontend.md) |
| 資料模型、API、Mock 與資料存取 | [資料存取規範](docs/conventions/data-access.md) |
| 未來後端任務 | [後端規劃](docs/conventions/backend.md)；未確認項先提出設計而非直接落實 |
| Git | [Git 規範](docs/conventions/git.md) |

一項任務符合多個條件時，讀所有相關規範。優先查現有資料，不載入全部參考文件；已讀相同版本不重讀。

## 建置與執行

| 用途 | 指令 | 說明 |
| --- | --- | --- |
| 固定安裝 | `pnpm install --frozen-lockfile` | 需要安裝既有套件時 |
| 開發 | `pnpm dev` | 實際埠號依目前設定查證 |
| Lint | `pnpm lint` | 需檢查修改程式碼時 |
| TypeScript | `pnpm exec tsc --noEmit` | 型別檢查；先依工程規範確認路由型別 |
| Build | `pnpm build` | 影響路由、設定或 Server／Client 邊界時 |
| Production | `pnpm start` | 已建置且需驗證正式執行時 |

指令是否存在以 `package.json` 為準，依變更選擇測試，純文件修改不必一律執行建置。未明確授權不 Commit／Push／Merge／Rebase，不覆蓋使用者既有變更。完成後回報實際異動、執行的驗證及未解問題。

## 架構結構

以下為現有專案的程式目錄分工，依 [專案現況參考](docs/references/project-status.md#42-主要目錄) 與 [工程規範](docs/conventions/engineering.md#6-專案定位) 整理；參考文件可能早於實際程式，**執行時先確認路徑存在，不據此宣稱功能已完成**。

| 目錄 | 主要責任 |
| --- | --- |
| `app/` | Next.js App Router、Layout、頁面與 Route Handler；依現有 `[locale]` 及 route group 定位 |
| `components/store/` | 顧客端、商品、購物車、結帳與會員畫面 |
| `components/seller/` | 賣家中心頁面與功能元件 |
| `components/ui/` | 不依賴特定業務的共用 UI |
| `contexts/`、`hooks/` | 跨元件狀態、共用互動與表單邏輯 |
| `types/` | 跨檔案共用的業務型別、API 與資料契約 |
| `data/` | 既有資料入口、Mock／Demo 查詢、篩選與統計 |
| `lib/api/`、`app/api/` | HTTP client／API 呼叫，以及確有需要的伺服器 Route Handler |
| `lib/storage/`、`mock/` | 本機儲存封裝與模擬 API |
| `i18n/`、`messages/` | 語系路由設定、翻譯檔 |
| `public/` | 靜態資源 |
| `docs/` | 文件治理、規格、設計、執行紀錄與參考資料 |

- 修改路由先核對 `app/` 下已存在的 route group、動態參數與實際 URL，避免不同 route group 造成重複路徑。
- 不因上表列有目錄就自動建立；找不到時先查實際結構與最近變更。後端 Node.js 的模組與服務目錄尚未定案，不預建 `server/`、`services/` 或資料庫層。
- `docs/` 的正式目錄及規則以 [docs/AGENTS.md 第 3 節](docs/AGENTS.md#3-目錄結構) 為準，各類文件格式由對應 `README.md` 說明。

## 命名慣例（必須遵循）

**先搜尋相同業務或同層既有名稱，再採用既有慣例，不另創一套命名。** 詳細型別規則見 [工程規範第 3 節](docs/conventions/engineering.md#3-typescript-型別與命名)，元件與資料責任分別見 [前端規範](docs/conventions/frontend.md) 與 [資料存取規範](docs/conventions/data-access.md)。

| 情境 | 優先方式 | 說明 |
| --- | --- | --- |
| React 元件、TypeScript 型別 | `PascalCase` | 名稱需表達業務與責任；沿用相同模組既有寫法 |
| 變數、函式、Hook | 沿用現有 `camelCase` 用法 | Hook 依 React 規則使用 `useXxx` |
| TS／TSX 檔案 | 沿用相鄰檔案命名 | 不為單次功能混用新的檔案命名規則 |
| 元件 Props | `{Component}Props` | 僅元件內使用的型別留在元件附近 |
| 業務狀態與 UI 狀態 | `Status`／`State` | 前者是業務資料狀態，後者是畫面或流程狀態 |
| 查詢與篩選 | `Query`／`Filter` | 前者包含一組查詢條件，後者是單項可選條件 |
| 資料與 API 契約 | `Params`、`Payload`、`Response`、`Result` | 依實際用途命名，保留外部 API 契約的原始欄位 |

- 新增共用型別、元件或公開資料函式前，先搜尋有無可重用的實作；不為符合命名表而大量重新命名。
- API 欄位及既有公開呼叫契約不能只因命名偏好而任意修改；跨層變動先確認使用端與 SPEC。
- 正式文件 ID、Metadata、檔名由 `docs/AGENTS.md` 與該目錄的 `README.md` 決定，不套用程式碼檔名慣例。

## 關鍵設計慣例

- **Server／Client**：Next.js 預設 Server Component；需要瀏覽器狀態、事件或 Client hooks 時才建立 Client boundary。詳見 [前端規範第 3 節](docs/conventions/frontend.md#3-server--client-component-與多語系)。
- **路由與多語系**：使用既有 `next-intl` 設定與 `@/i18n/navigation`；`[locale]` 下的 route group 不形成 URL 路徑。
- **資料存取**：UI 經既有資料函式取值；預期串接 API 的函式維持非同步契約，正式串接時優先替換資料邊界內部實作。詳見 [資料存取規範第 1 節](docs/conventions/data-access.md#1-非同步契約)。
- **Mock 與授權**：`localStorage`／Mock 可供演示，不視為正式身分驗證或可信賴的授權機制；敏感操作以未來經確認的伺服器驗證為準。
- **共用 UI**：優先擴充現有元件與語意化 Tailwind 主題，不為單一功能新增重複抽象；維持 RWD、焦點與錯誤狀態。
- **Node.js**：僅為未來後端方向，框架、資料庫、ORM、路由與部署規劃尚未核准；技術選型先走 DESIGN／必要 ADR，勿寫成現況。

## 維護本入口

根目錄維護專案現況、建置指令、AI 開發入口、分級與執行規則；正式文件治理的異動才修改 `docs/AGENTS.md`；實際存在且已採用的工具或 Skill 才加入導航。保留下方由 Next.js 維護的自動規範區塊。

<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->
