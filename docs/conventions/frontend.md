# 前端規範

修改頁面、元件、樣式、路由或多語系時，與 [工程規範](engineering.md) 一併閱讀。資料查詢與操作另依 [資料存取規範](data-access.md)。

## 1. 元件與介面規範

- UI 元件與 props 採偏向 MUI 的命名，優先沿用專案現有 API。
- `Button` 與相關按鈕沿用：
  - `variant`: `contained` / `outlined` / `text`
  - `color`: `primary` / `secondary` / `success` / `warning` / `error` / `info`
  - `size`: `sm` / `md` / `lg`
- 新增相同責任的按鈕需求時，優先擴充既有元件，不另建高度重複的版本。
- `Button`、`Card`、`Input` 等基礎 UI 元件只負責共用結構、樣式與互動，不耦合商品、促銷、訂單等業務資料。
- `ProductCard`、`PromoCard` 等業務元件負責各自的資料呈現；命名應反映責任。
- 單一區域專用的靜態選項與簡單 `map()` 可留在該元件；需要頁面控制、共用或未來由 API 取得的資料才透過 props 或資料層提供。
- 不為傳遞固定靜態資料而新增多餘 props；也不將單次使用的小段 JSX 過度拆分。
- 直接將狀態 setter 傳給子元件時，props 使用 `setXxx` 命名，例如 `setSort`；只有代表事件通知、值轉換或額外處理流程的 callback 才使用 `onXxxChange`。
- 互動控制需保留可辨識的 hover、focus-visible、disabled 等狀態；表單欄位需有可理解的標籤與錯誤提示。

## 2. Tailwind CSS v4 規範

<!-- BEGIN:project-tailwind-rules -->

- 使用 Tailwind CSS v4；修改前確認 `package.json` 與 `pnpm-lock.yaml` 的實際版本。
- 不使用 Tailwind CSS v3 或更舊版本的語法、設定方式與已淘汰 utility；新增或修改樣式時一律採用目前安裝版本支援的 Tailwind CSS v4 寫法。若在修改範圍內遇到舊版寫法，應同步改為對應的 v4 語法，但不因此批次改寫無關檔案。
- Tailwind CSS v4 已有對應 utility 時，必須使用內建寫法，例如以 `min-w-48` 取代 `min-w-[12rem]`；只有無對應 utility 時才使用 arbitrary value。
- 維持 CSS-first 設定：`postcss.config.mjs` 使用 `@tailwindcss/postcss`，`app/globals.css` 使用 `@import "tailwindcss"`。
- 不加入 Tailwind v3 的 `@tailwind base`、`@tailwind components` 或 `@tailwind utilities`。
- 主題變數優先使用既有 `@theme` / `@theme inline` 與語意化 utility，例如 `bg-background`、`text-foreground`、`text-primary`。
- 優先使用 Tailwind utility；不為了定義少量主題變數建立 `tailwind.config.js`，也不新增大量自訂 CSS class。
- `app/globals.css` 只保留主題變數、必要的 Tailwind 設定與真正的全域樣式。
- Utility class 必須可被靜態偵測，避免以不完整的 class 字串進行動態插值。
- 修改樣式時保留 responsive、hover、focus、disabled、dark mode 等現有狀態。
- 對不熟悉的 Tailwind v4 語法，先查驗目前版本是否支援；驗證依 [工程規範：安全、驗證與交付](engineering.md#5-安全驗證與交付) 執行。

<!-- END:project-tailwind-rules -->

## 3. Server / Client Component 與多語系

- 預設使用 Server Component；只有需要互動 state、effect、Client hooks 或瀏覽器 API 時才建立 Client boundary。
- Client boundary 應靠近真正需要互動的區域，不因子元件需互動就將整個頁面一律改成 Client Component。
- 適合伺服器執行的資料取得優先在 Server Component 執行；Client-only 資料與互動查詢由 Client Component、Context 或專用 Hook 處理。
- 從 Server Component 跨邊界傳入 Client Component 的 props 應符合 React 的序列化限制；Client Component 彼此仍可傳遞 callback。
- `next-intl` 依目前安裝版本使用；async Server Component 使用 `getTranslations()`，同步 Server Component 與 Client Component 使用 `useTranslations()`。
- locale-aware 路由、導頁及語系切換使用現有 `@/i18n/navigation` 與 routing 設定，不自行拼接語系路徑。
- 新增或修改翻譯時，依 `i18n/routing.ts` 所列語系同步更新並保持翻譯 key 一致；目前包含 `zh-TW` 與 `en`。
- 通用 UI 元件不直接耦合特定業務的翻譯 namespace；不重建 `next-intl` 已提供的功能。

## 4. 互動完整性與檔案責任

- 除非明確要求純 UI，新增互動功能應具備實際操作行為，不以無作用的按鈕或假成功提示冒充完成。
- 表單應依需求處理驗證、提交中、錯誤及重複提交；列表應依需求處理資料為空與篩選切換。
- `components/`：畫面呈現與互動；不承擔與多個頁面共用的核心資料查詢規則。
- `app/`：依現有路由配置頁面、Layout 與適當的資料組合；不新增衝突路由。
