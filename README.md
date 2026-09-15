# React 語法練習室

使用 Next.js、React、TypeScript 與 Tailwind CSS v4 建立的互動練習專案。

## 開始使用

```bash
npm run dev
```

瀏覽器開啟 [http://localhost:3000](http://localhost:3000)。Windows PowerShell 若阻擋 `npm.ps1`，可改用：

```bash
cmd /c npm run dev
```

## 目前的練習內容

- `useState`：計數器、受控 input、不可變陣列更新
- `useEffect`：計時器、依賴陣列與 cleanup
- `useContext`：跨元件共用學習模式與完成進度
- 資料流：props 向下傳遞、callback 將事件傳回父元件
- TypeScript 購物車：使用 `find`、`map`、`filter`、`every`、`reduce` 操作型別化陣列
- 購物車勾選：單選、全選、刪除已選，以及已選商品總價
- TypeScript：元件 props、表單事件、物件與 union type

## 建議閱讀順序

1. `src/app/page.tsx`：了解 App Router 頁面入口。
2. `src/components/LearningLab.tsx`：了解首頁如何組合各個練習元件。
3. `src/components/practice/`：分別操作 Hooks、資料流與購物車範例，頁面中也附有完整核心程式碼。
4. `src/context/LearningContext.tsx`：理解 Provider、自訂 Hook 與共享狀態。
5. `src/app/globals.css`：查看 Tailwind CSS v4 的 `@import` 與主題變數。

## 可用指令

```bash
npm run dev     # 啟動開發環境
npm run lint    # 檢查程式規範
npm run build   # 建立正式版本
npm run start   # 執行正式版本
```

## 下一步練習

可以嘗試加入 `useReducer`、自訂 Hook、API 資料讀取、loading/error 狀態，以及 Next.js 動態路由。
