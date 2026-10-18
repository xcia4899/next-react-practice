# 共用 Git 協作與 Commit 訊息規範

## 規範依據與範圍

本規範供團隊跨專案重複使用，由各專案根目錄 `AGENTS.md` 指引採用，適用於採用專案的所有 Git 操作，不受變更檔案所在目錄限制。Commit 訊息採用 [Conventional Commits 1.0.0](https://www.conventionalcommits.org/en/v1.0.0/)，格式以該版本官方規範為準，以下為摘要與格式示例。

此規範未指定推送分支、分支命名、PR、合併策略或發布流程；專案特有要求由採用專案另行指定。Git 操作授權界線以根目錄 [AGENTS.md](../AGENTS.md) 為準，提供規範不代表授權執行 Commit 或 Push。

## Commit 格式

```text
<type>[optional scope][!]: <description>

[optional body]

[optional footer(s)]
```

- type 與非空摘要必填，冒號後須有空格；scope 選填，以括號包住受影響範圍。
- 新增功能用 `feat`，修復錯誤用 `fix`。
- 其他類型可使用 `docs`、`build`、`ci`、`chore`、`style`、`refactor`、`perf`、`test` 等；官方未規定封閉清單。
- body 選填，與摘要空一行；footer 與前文空一行，以合法 trailer token 及分隔符撰寫，例如 `Refs: #123`。
- 不相容變更須以冒號前的 `!` 或 footer 的 `BREAKING CHANGE: 說明` 標示；兩者可以並用。只用 `!` 時，摘要須說明不相容變更。
- `BREAKING CHANGE` 須大寫；footer 中 `BREAKING-CHANGE` 同義。其餘元素官方不要求區分大小寫，應維持一致。

## 格式示例

以下僅示範格式，不代表功能已完成或已提交；scope 與摘要語言未新增強制限制。

```text
docs: 新增專案基本文件
```

```text
feat(home): 新增首頁品牌介紹區塊
```

```text
fix(nav): 修正手機版導覽無法關閉
```

```text
feat(routes)!: 將既有公司介紹網址改為新路徑

BREAKING CHANGE: 舊網址不再提供，外部連結須更新。
```

## 提交與推送前

依既有授權確認操作範圍，檢視工作目錄及暫存差異，避免納入無關變更；按本次變更執行適當驗證並如實回報。Commit 訊息須對應實際差異，不以提交或推送取代採用專案要求的核准與驗收。

是否配置 commitlint、Husky、hooks 或 CI，由採用專案另行決定；採用本文不代表已安裝或啟用自動檢查，這些工具亦非 Conventional Commits 的必要條件。
