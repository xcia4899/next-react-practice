# 資料存取規範

修改資料模型、查詢、操作或 API 對接時，與 [工程規範](engineering.md) 一併閱讀。目錄用途依 [工程規範](engineering.md#6-專案定位)。

## 1. 非同步契約

- **預期未來會對接 API，或已作為頁面資料存取邊界的函式，應維持 `Promise` 非同步契約並以 `async` / `await` 使用；純同步轉換、統計及元件內靜態資料不強制非同步。**
- 優先沿用既有的 `getProduct()`、`getProducts()`、`getMyProducts()`、`getSalesProducts()` 等函式名稱與契約；不要無必要地新增同義函式。
- 頁面及功能模組應依賴穩定的資料取得函式，不直接依賴大型 Mock 資料陣列或 HTTP client。
- 日後接正式 API 時，優先替換資料函式內部實作並維持呼叫端契約；若正式 API 或業務需求使契約必須變更，應先確認影響範圍並同步更新所有使用端，且於資料邊界做必要轉換。
- `get*` 查詢函式的參數、回傳型別與錯誤語意應清楚且一致；列表可使用 `Query` / `Result`，但不為小功能建立無必要的型別。
- 不因 Mock 資料原本可同步取得，就讓 UI 直接改用同步資料存取方式；也不需為了模擬非同步而添加無意義的 `setTimeout`。
- 新增、更新、刪除等未來需串接 API 的資料操作，也應維持適合正式 API 的非同步契約。

例如 `getProduct(productId): Promise<Product | null>`，內部可由 Mock 切換為 API，呼叫端維持 `await getProduct(productId)`；名稱與型別依既有契約，不照例子另建實作。

## 2. 資料契約與責任分工

- `data/<domain>/` 可放 Mock 資料、領域查詢函式、篩選、排序、統計及必要的資料轉換。
- `lib/api/` 放置 Axios／HTTP client、請求設定及正式 API 呼叫；不混入 React 畫面狀態。
- `app/api/` 的 Route Handler 負責 HTTP 邊界、驗證、授權及呼叫資料／服務層，不堆疊可重用的業務邏輯。
- `components/` 負責呈現與互動；需要外部資料的元件由頁面、Context 或專用資料存取流程提供資料。
- Mock 資料與正式 API 應盡量共用呼叫端可使用的資料模型；只有確實存在格式差異時才建立 Adapter，不提前建立完整 Repository 架構或假 HTTP endpoint。
- 找不到單筆資料時應遵循既有契約（例如回傳 `null`）；請求失敗不可無聲地偽裝成「空列表」或「查無資料」。
- 訂單／商品的列表、狀態數量與查詢結果應維持一致的資料來源，避免各元件自行重複統計導致結果不同。
- 需要依狀態、關鍵字、日期或分頁查詢時，優先以查詢參數集中描述條件；不在各 UI 元件重複實作相同篩選邏輯。
- 不自行虛構後端 API 路徑、欄位、驗證方式或回應格式；正式對接以前後端確認的契約為準。

## 3. 非同步狀態與執行環境

- Server Component 可直接 `await` 資料函式；一般 Client Component 不宣告為 `async` 元件，改由事件處理、Effect 或既有查詢機制觸發資料取得。
- Client-only 資料（例如 `localStorage`）應在瀏覽器端取得，不可由 Server Component 直接存取。
- 資料函式若會從 Client Component 使用，不得匯入僅能在伺服器執行的模組或私密金鑰。
- 依需求處理 Loading、Empty、Error、重複送出及競態；避免較舊請求結果覆蓋較新的篩選結果。
- 切換 Mock 至 API 時，確認查詢參數、回傳模型、空資料、錯誤處理及更新畫面的行為都維持正確。

## 4. 資料模型與檔案責任

- 不強制每個功能都拆成 mock、repository、service、adapter 等多層檔案；依實際責任與重用需求決定。
- 檔名應清楚，例如 `mock-orders.ts`、`order-data.ts`、`order-api.ts`；新增前先檢查現有資料入口。
- 不把簡單的單一元件展示邏輯抽到全域 helper，也不將可重用的查詢規則複製到多個元件。
- 處理資料時確認搜尋結果、分類計數、選取狀態與畫面同步，避免資料更新後顯示不一致。
