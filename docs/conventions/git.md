# Git 規範

Git Commit 採 Conventional Commits 1.0.0；操作授權與既有變更保護依根目錄 [AGENTS.md](../../AGENTS.md)。

## 1. Commit 規範

- 僅在使用者明確要求 Commit 時執行。
- 訊息格式為 `<type>: <description>`；`type` 用小寫英文，描述使用精簡中文，不加句號。
- 依內容選擇 `feat`、`fix`、`docs`、`style`、`refactor`、`perf`、`test`、`chore` 或 `revert`。
- 一個 Commit 聚焦單一目的；不同性質的變更應視需求拆開提交。

範例：

```text
feat: 新增商品查詢篩選功能
fix: 修正訂單狀態切換顯示錯誤
chore: 更新專案依賴套件
```
