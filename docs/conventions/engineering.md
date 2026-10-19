# 工程規範

適用於所有程式碼修改；開發入口、分級與實作授權依根目錄 [AGENTS.md](../../AGENTS.md)；正式文件治理與文件核准依 [docs/AGENTS.md](../AGENTS.md)。本文集中共通工程規則、專案定位、操作細節與設定查證入口；先讀根目錄 [AGENTS.md](../../AGENTS.md) 的建置與執行、任務與規範入口。

## 1. 適用原則與版本查證

- 使用 pnpm 管理套件與指令；變更依賴時同步更新 `pnpm-lock.yaml`。
- 實作 Next.js 功能前，先確認已安裝版本及相關 `node_modules/next/dist/docs/` 文件；其他套件亦以實際安裝版本的型別與文件為準。
- 當規範與現有程式碼不一致時，先確認是舊實作、版本差異還是必要的專案慣例；不要逕自大規模改寫。
- 以當次需求、既有對外契約及可維護性為重點；不為了套用規範而增加無必要的架構。

## 2. 開發與修改原則

- 修改前先閱讀相關頁面、元件、型別、資料來源、呼叫端及現有共用工具。
- 優先以最小修改完成需求；不順手重構無關功能或批次重新命名。
- 優先擴充責任相符的現有檔案與元件，不建立功能高度重複的第二套實作。
- 不為單次、簡單的需求過度建立 Hook、Context、helper、wrapper、class 或抽象層。
- 保留既有功能、RWD、鍵盤操作、焦點樣式與其他可用性行為。

既有變更保護與操作授權依根目錄 [AGENTS.md](../../AGENTS.md)。

## 3. TypeScript 型別與命名

- 新增型別前先搜尋 `types/`、業務模型與元件 props，優先重用既有契約。
- 型別、介面採 `PascalCase`；變數、函式及一般物件欄位遵循現有命名慣例，不任意改動 API 欄位名稱。
- 型別名稱採「清楚表達業務對象與用途的最短名稱」；需要區分 Store、Seller、Admin 時保留對應前綴，不因追求短名而刪除有意義的 `Sales`、`Return` 等區別。
- 不加無必要的 `I`、`T`、`Type`、`Model` 前後綴；泛型參數 `T`、`TData` 等除外。
- `Status` 表示資料實際的業務狀態；`State` 表示需整體管理的 UI／流程狀態；使用 `useState()` 不代表型別一定以 `State` 結尾。
- `Filter` 表示可選篩選值；`Query` 表示包含狀態、關鍵字、日期等的一組查詢條件。`"all"` 可屬於篩選值，不應誤放入實際業務 `Status`。
- `Params` 表示函式／路由參數；`Payload` 表示送出的操作資料；`Response` 專指實際 API 回傳契約；`Result` 表示資料函式整理後的結果。
- 依需求使用 `Props`、`Option`、`Counts`、`Config` 等後綴，不要求每項功能建立整套型別。
- 限定選項或狀態優先用 literal union；不以寬泛 `string` 或 `any` 迴避明確的資料契約。
- 先以可讀性與語意為準，再考慮 `Pick`、`Omit`、`Partial`、`Record` 等 Utility Type；不為消除少量重複而過度巢狀組合。
- `type` 適合 union、tuple 及組合型別；一般物件可使用 `type` 或 `interface`，維持專案既有風格即可。
- 元件專用 Props 與輔助型別留在元件附近；跨檔案穩定共用的業務模型、API 或資料層契約放到 `types/<domain>/`。
- 純型別使用 `import type`；不濫用型別斷言，也不為消除錯誤而新增虛構欄位。
- React 事件型別依目前 `@types/react` 版本與用途選擇；優先使用事件推論，避免已標記 `@deprecated` 的型別或 API。
- 修改共用型別時，檢查所有受影響的匯入與呼叫端；不無故批次重新命名。

## 4. 程式碼品質

- 程式碼以簡單、可讀、好修改為優先；避免為了縮短行數而增加理解成本。
- 註解使用簡短、正式的繁體中文，說明「做什麼」及必要時「為什麼」；複雜背景應放入文件或拆成清楚段落。
- 僅在條件或分支意義不直觀時加入精簡註解；簡單三元運算不需逐行說明。
- 簡短的 `if`、條件與參數盡量維持緊湊，不為排版無故拆行。
- 不留下無用程式碼、重複邏輯或未說明的暫時性 workaround。

## 5. 安全、驗證與交付

- Demo 使用的 `localStorage` 身分或資料不等於正式認證／授權；正式權限判定與敏感操作須由可信賴的伺服器驗證。
- 不將私密金鑰、Token、敏感憑證放入 `NEXT_PUBLIC_` 環境變數或提交至版本控制。
- 執行驗證前先確認 `package.json` 內的 scripts；Next.js 16 已移除 `next lint`，不得假設它可用。
- 修改 TypeScript 時，依專案設定執行型別檢查（例如 `pnpm exec tsc --noEmit`）。
- 修改程式碼後執行適用範圍的 Lint；路由、設定、Server/Client 邊界或其他可能影響建置的變更，適時執行 `pnpm build`。
- `pnpm build` 不能取代獨立 Lint；若檢查失敗，辨別是否與本次修改有關，不任意改動無關程式碼。
- 完成任務時簡要交代變更內容、影響範圍、已執行的驗證、結果及未驗證事項；未執行不可聲稱通過。

## 6. 專案定位

- 使用 Next.js App Router、React、TypeScript、Tailwind CSS v4 與 `next-intl`。
- 語系與路由以 `i18n/routing.ts` 及現有 navigation 設定為準。

### 程式目錄用途

- `types/<domain>/`：跨檔案共用的業務模型、API／資料層契約。
- `data/<domain>/`：靜態及 Demo 資料、Mock-backed 查詢函式、可重用的篩選與統計。
- `lib/api/`：HTTP client、請求設定、正式 API 呼叫。
- `app/api/`：確有 HTTP 邊界需求時使用 Route Handler。
- `components/`：畫面呈現與互動。
- `app/`：路由頁面、Layout 與資料組合。

## 7. 操作細節

常用指令統一列於根目錄 [AGENTS.md：建置與執行](../../AGENTS.md#建置與執行)，執行位置為專案根目錄；實際 script 以 [package.json](../../package.json) 為準。

| 操作 | 前置條件與注意事項 |
| --- | --- |
| 安裝依賴 | 初次安裝或授權變更依賴時使用 `pnpm install`，可能更新 lockfile；重現既有依賴使用 `pnpm install --frozen-lockfile`，宣告不一致時失敗 |
| 開發伺服器 | 監聽位址與埠號以 dev script 為準，不假設與正式模式相同 |
| 指定檔案 Lint | 使用 `pnpm exec eslint <檔案路徑>`，以實際受 ESLint 管理的檔案取代佔位值；不加自動修正參數 |
| 路由型別 | 初次安裝或路由異動後，先執行 `pnpm exec next typegen`，再做獨立型別檢查 |
| 正式建置 | 不能取代獨立 Lint；須記錄實際結果 |
| 正式模式啟動 | 須先成功建置；未指定 PORT 時預設為 3000；需使用 3051 時執行 `pnpm start -p 3051`，避免與其他程序衝突 |

目前 `package.json` 未提供 test script，不執行不存在的測試指令。登入／註冊環境變數參考 [專案現況參考](../references/project-status.md)，實際使用須核對相關程式；不得將真實憑證寫入文件。

## 8. 設定正本與查證紀錄

| 資訊 | 正本／查證來源 |
| --- | --- |
| 套件宣告、套件管理器及 scripts | [package.json](../../package.json) |
| 解析後依賴版本 | [pnpm-lock.yaml](../../pnpm-lock.yaml)；實際執行版本另核對已安裝套件 |
| 型別檢查範圍與選項 | [tsconfig.json](../../tsconfig.json) |
| Lint 規則與忽略範圍 | [eslint.config.mjs](../../eslint.config.mjs) |
| 語系與預設語系 | [routing.ts](../../i18n/routing.ts) |
| Next.js 設定 | [next.config.ts](../../next.config.ts) |
| Tailwind 編譯與主題值 | [postcss.config.mjs](../../postcss.config.mjs)、[globals.css](../../app/globals.css) |

【實測】2026-10-19（Asia/Taipei）：`pnpm --version` 為 `12.2.1`，`pnpm exec tsc --version` 為 `5.9.3`，`pnpm exec eslint --version` 為 `v9.39.5`。已靜態比對 scripts、lockfile、語系、TypeScript、ESLint、Next.js、PostCSS 與主題設定；Next.js CLI 行為另核對已安裝套件的 `node_modules/next/dist/docs/01-app/03-api-reference/06-cli/next.md`。本次未執行安裝、伺服器啟動、路由型別產生、完整型別檢查、Lint 或建置，以上指令不代表專案檢查已通過。

既有技術文件的功能完成度、路由與資料模型屬較早的靜態整理，本次未全面重新驗證，不作為已核准 Spec 或實測證據。
