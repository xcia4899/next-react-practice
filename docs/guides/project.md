# 專案目標與開發工具基礎

本文件記錄形象網站的基本目標、範圍、現況與工具需求，不是實作計畫，也不構成網站製作或套件安裝授權。SDD 格式、判級及核准規則以 [docs/SDD.md](../SDD.md) 為正本。

責任分工：本文件回答「這個專案要做什麼、目前具備什麼」；SDD 規範回答「如何進行與記錄工作」，不保存本站的頁面或工具選擇。後續建立正式 Spec 時，具體需求與驗收條件以對應 Spec 為正本，本文件保留背景摘要及引用。

來源約定：【團隊】為本次使用者明確提出的要求；【實測】為本次本機查證結果；【推論】為尚待確認的建議。查證日期：2026-10-18（Asia/Taipei）。

## 專案目標與範圍

【團隊】建立公司形象網站，提供首頁、公司介紹、關於公司三個頁面，不需要管理後台。本階段只建立專案基本文件與工具需求。

| 頁面 | 已確認範圍 | 待確認內容 |
| --- | --- | --- |
| 首頁 | 形象網站入口 | 品牌主視覺、摘要、導覽及主要行動按鈕 |
| 公司介紹 | 獨立頁面 | 是否聚焦公司背景、服務與專業能力 |
| 關於公司 | 獨立頁面 | 是否聚焦理念、沿革、團隊及聯絡資訊；如何與公司介紹區分 |

【推論】初步方向為以靜態內容呈現公司資訊。內容由專案檔案維護可作為候選方式；尚未決定是否使用 Markdown、MDX 或其他內容格式。無後台不等於已選定 Next.js static export，部署方式仍待確認。

目前未納入已確認範圍：會員、購物車、資料庫、CMS、管理介面、聯絡表單寄信、多語系及流量追蹤。若後續需要，另確認需求。

## 儲存庫現況

【實測】查證 `package.json`、`README.md`、`src/app/page.tsx`、`tsconfig.json`、`next.config.ts`、`postcss.config.mjs`、`eslint.config.mjs` 及檔案清單：

- 現有首頁載入 `LearningLab`，README 描述 React 語法練習室；形象網站尚未製作。
- 專案使用 Next.js App Router、React、TypeScript 與 Tailwind CSS。
- 已設定 TypeScript strict、`@/*` 路徑別名、Next.js TypeScript 外掛與 ESLint。
- 存在 `package-lock.json`，尚無 `pnpm-lock.yaml`，`package.json` 未宣告 `packageManager`。
- 目前未設定 static export。不能將現有專案視為已完成形象網站或 pnpm 遷移。

## 執行環境與套件管理

【實測】本機以 `node --version`、`npm.cmd --version`、`pnpm.cmd --version` 查得下列版本；這些是現況快照，不宣稱為最新版本或正式部署版本。

| 工具 | 本機版本 | 用途與狀態 |
| --- | --- | --- |
| Node.js | 22.18.0 | 已安裝；執行開發工具及建置 |
| npm | 10.9.3 | 已安裝；儲存庫目前具有 npm 鎖檔 |
| pnpm | 10.14.0 | 已安裝；建議作為後續統一套件管理器，尚未完成儲存庫切換 |
| Git | 本次未查版本 | 已能讀取工作目錄狀態；依根目錄授權界線操作 |

【實測】本機 PowerShell 執行 `npm`、`pnpm` 時，其 `.ps1` 啟動檔受到執行原則阻擋；使用 `npm.cmd`、`pnpm.cmd` 已成功查詢版本，無須為此變更系統執行原則。

【推論】若確認採用 pnpm，應統一套件管理器、固定團隊版本及維護對應鎖檔。鎖檔轉換、`packageManager` 設定與安裝驗證屬後續另行授權工作；本文件未執行這些操作。

【官方】環境相容性及安裝方式以 [pnpm 安裝文件原始來源](https://github.com/pnpm/pnpm.io/blob/main/docs/installation.md) 與 [Next.js 安裝文件](https://nextjs.org/docs/app/getting-started/installation) 為查核入口；後續設定環境時須依實際選定版本再核對。

## 現有技術與必要套件

【實測】以下版本或範圍取自 [package.json](../../package.json)，表示專案宣告值，未逐一核對 `node_modules` 實際解析版本。

| 工具／套件 | 宣告版本 | 用途 |
| --- | --- | --- |
| Next.js | 16.3.5 | 網站框架、頁面路由與建置 |
| React／React DOM | 19.2.8 | UI 元件與畫面呈現 |
| TypeScript | ^5 | 型別檢查 |
| Tailwind CSS | ^4 | 樣式 |
| @tailwindcss/postcss | ^4 | 已在 PostCSS 設定中引用 |
| ESLint | ^9 | 程式碼檢查 |
| eslint-config-next | 16.3.5 | Next.js 對應檢查規則 |
| @types/node | ^20 | Node.js 型別宣告；與本機執行版本不同，後續按實際使用 API 評估 |
| @types/react／@types/react-dom | ^19 | React 型別宣告 |

【推論】以上現有工具可作為三頁形象網站的起點，現階段未確認必須新增的執行期套件。實際相容性仍須在後續安裝、型別檢查與建置時驗證。

## 編輯器、插件與額外工具

【推論】編輯器可沿用團隊現有工具；若使用 VS Code，可選配 ESLint 與 Tailwind CSS IntelliSense 擴充套件。這些是開發輔助，不是網站執行依賴；本次未檢查或安裝編輯器擴充套件。

【實測】`tsconfig.json` 已包含 `next` TypeScript 外掛設定，`postcss.config.mjs` 已包含 `@tailwindcss/postcss`。不需把這兩項誤列為尚未設定。

【推論】目前無須預先加入 UI 元件庫、圖示庫、動畫庫、SEO 外掛、CMS、ORM 或狀態管理套件。待視覺設計與功能需求明確後，再評估是否確有必要。AI 服務插件亦非目前必要工具，不要求額外連接帳號。

## 既有開發指令

【實測】下列腳本名稱取自 `package.json`；本次只核對腳本，未啟動伺服器、安裝依賴或執行建置。

| 目的 | pnpm 使用方式 | 現有 npm 使用方式 |
| --- | --- | --- |
| 開發 | `pnpm.cmd dev` | `npm.cmd run dev` |
| 程式碼檢查 | `pnpm.cmd lint` | `npm.cmd run lint` |
| 建置 | `pnpm.cmd build` | `npm.cmd run build` |
| 啟動正式版本 | `pnpm.cmd start` | `npm.cmd run start` |

`start` 須先有成功建置的產物；本次未驗證以上網站執行指令。其他終端可使用 `pnpm`／`npm`，本機 PowerShell 使用 `.cmd` 入口。不要以執行腳本取代套件管理器切換與鎖檔驗證。

## 開始製作前待確認事項

1. 「公司介紹」與「關於公司」各自放哪些內容？頁面網址尚未決定。
2. 公司名稱、產業、Logo、品牌色、文字與圖片素材由誰提供？網站語言為何？
3. 是否確認以 pnpm 作為此儲存庫的唯一套件管理器？正式團隊版本尚未鎖定。
4. 是否將現有練習專案改為形象網站？現有練習內容如何保留，尚未授權變更。
5. 是否需要聯絡表單、多語系、外部追蹤或其他互動？目前都未確認。
6. 部署平台、網域、預算及內容更新方式為何？尚未選定任何付費服務。

上述未決事項不阻礙本基本文件建立；涉及實際功能或重要技術決策時，依 SDD 規範確認後再執行。
