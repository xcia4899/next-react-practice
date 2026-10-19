# AGENTS.md

本檔是 AI Agent 指令檔（Codex 直接讀取；其他代理依其支援方式載入），負責 `docs/` 正式文件的治理規則與索引。本檔與根目錄 `AGENTS.md` **不是正式文件**：不使用文件 ID、不適用正式文件生命週期、不計入 REQ 完成率、不佔用任何流水號。

開發入口、L0～L3 分級、實作授權、測試與停止規則由根目錄 `AGENTS.md` 管理；本檔管理正式文件的分類、ID、狀態、生命週期、文件核准、追溯、索引與附錄。

## 文件管理規範與索引

本章節包含：基本規則（§1～§9）、索引（§10）、Framework 開發規則（§11）、各類文件規則（§12～§15）、關聯與追溯（§16）、核准與 AI 權限（§17）、文件同步（§18）、外部 AI 工具（§19）、範本（附錄 A～F）。

制度名稱：**AI-Maintained Documentation + Flexible Spec-Driven Development**。正式文件由 Codex、Claude Code 等 AI Agent 建立與維護；分類、ID、命名、生命週期、審核與關聯規則由本專案定義，不依賴特定 AI 工具。

### 1. 原則

- **REQ** 記錄原始需求與完成率；**SPEC** 以簡潔的方式定義功能目的、主要行為與重要限制，作為 DESIGN 的設計依據；**DESIGN** 依據 SPEC（或已確認的需求）進行詳細設計，記錄如何實現與如何驗證；**TASK** 記錄任務拆解與執行；**ADR** 記錄重要決策與原因；**GUIDE** 記錄已實現且驗證過的正式用法。
- `docs/` 是正式文件的權威來源；專案參考資料與工程規範另放既有 `references/`、`conventions/`。
- 程式碼與測試是判斷**目前實際行為**的證據，但不會自動取代**已核准的預期規格**；實際行為與已核准 SPEC 不一致時，記錄差異並修正實作，或正式提出規格變更。文件與程式碼不一致時，先查證再修正，不得直接假設文件正確。
- 不得把尚未實作的 SPEC／DESIGN 內容寫成目前的系統行為。
- 不為了符合流程而建立空洞或重複的文件；每種資訊只在一個地方維護。
- 分析報告、Gap 分析、測試矩陣、方案清單等工作產物，不建立新的文件類型或目錄；依性質併入 SPEC（主要行為與重要限制）、DESIGN（現況、差異、方案比較、驗證策略、待確認事項）、TASK（執行與驗證紀錄）、ADR（長期決策），原有編號保留為該文件的局部 ID（跨文件寫成 `DESIGN-YYYYMMDD-NNNN GAP-01`）。

### 2. 文件類型

| 類型 | 位置 | ID | 主要責任 |
| --- | --- | --- | --- |
| REQ | `docs/req/` | `REQ-YYYYMMDD-NNNN` | 原始需求、功能基準、完成率（§12） |
| SPEC | `docs/spec/` | `SPEC-YYYYMMDD-NNNN` | 簡潔功能目的、行為、限制（§13） |
| DESIGN | `docs/design/` | `DESIGN-YYYYMMDD-NNNN` | 詳細設計與驗收策略（§6） |
| TASK | `docs/task/` | `TASK-YYYYMMDD-NNNN` | 拆解、執行狀態與驗證（§14） |
| ADR | `docs/adr/` | `ADR-YYYYMMDD-NNNN` | 長期決策（§7） |
| GUIDE | `docs/guide/` | 無 | 已完成且已驗證使用方式（§15） |

- `docs/evidence/` 為可選驗證證據存放區，非正式文件類型；不取代 DESIGN 驗收條件與 TASK 驗證紀錄。若建立證據索引，按實際證據登錄，不虛構 EVD 編號。
- `docs/conventions/`、`docs/references/` 存放工程規範與原始資料，不視為 REQ／SPEC 等正式文件；文件格式與建立指引由各類別目錄內的 `README.md` 說明，範本在本檔附錄 A～F。
- 不強制每項工作都要有所有類型；已驗證的正式用法才寫 GUIDE。

### 3. 目錄結構

```text
docs/
  AGENTS.md             # 正式文件治理、生命週期與索引
  req/                  # REQ
  spec/                 # SPEC
  design/               # DESIGN（歸檔不搬移）
  task/                 # TASK
  adr/                  # ADR
  guide/                # GUIDE
  evidence/             # 驗證產物（按需）
  conventions/          # 既有工程／前端／資料／Git；Node.js 規劃
  references/           # 需求與產品參考材料
  # 文件類別目錄內各有 README.md，說明格式、建立方式與對應附錄
```

- 使用六種正式文件目錄（單數）；文件不按狀態搬移，未建立的文件以 `.gitkeep` 保留空目錄。
- 正式文件使用上述單數目錄；不使用 `plans/`，DESIGN 與 TASK 獨立管理。
- `evidence/` 可以依主題分組，其餘正式文件目錄維持平面結構；不得產生另一套並行分類制度。
- 未經核准的草稿不得視為正式規格；不追補沒有證據的歷史核准或執行紀錄。

### 4. 命名與編號

- 有編號的正式文件使用 `YYYYMMDD-NNNN-kebab-case.md`（英文小寫），ID 為 `REQ-YYYYMMDD-NNNN`、`SPEC-YYYYMMDD-NNNN`、`DESIGN-YYYYMMDD-NNNN`、`TASK-YYYYMMDD-NNNN`、`ADR-YYYYMMDD-NNNN`；檔名中的日期與 ID 日期必須一致。
- 同類型、同日期獨立使用四位流水號，從 `0001` 開始。新增前檢查該目錄現有檔案與 §10 索引，使用當日最大編號 +1；合併前再次檢查撞號。同一天同類型不得重號；跨日可重新從 `0001` 開始。
- 日期使用建立當日 `Asia/Taipei` 日曆日期（`YYYYMMDD`），`created`、`updated` 使用 `YYYY-MM-DD`；文件改名、狀態變更、歸檔時 ID 與原建立日期不變，不加 `final`、`new`、`v2` 等版本尾綴。
- GUIDE 以主題英文 slug 命名，不使用流水號。
- Metadata 依文件類型使用附錄 A～E 及所屬目錄 `README.md` 的格式；各類文件欄位不必相同，不強制 ADR 使用 `updated`。關聯欄位依需要選用，只有已確認的關聯才能填寫。
- 一份文件跨多子專案時，以 `project` 標示主責，其餘列入 `related_projects`；不存在的專案或文件不得建立假關聯。

### 5. 文件狀態

DESIGN：`draft → approved → implementing → implemented → archived`

| 狀態 | 說明 |
|------|------|
| `draft` | 需求或方案尚未確認 |
| `approved` | 設計已確認，可以開始實作 |
| `implementing` | 開發與驗證中 |
| `implemented` | 功能完成並通過驗收條件 |
| `archived` | 正式用法（GUIDE 或根目錄 `AGENTS.md` 既有用法章節）與相關 ADR 已同步；檔案留在原處 |

- 退回修改時可回到前一個狀態，並在「設計變更紀錄」寫原因。
- 不得只因程式碼已 commit 就標記 `implemented` 或 `archived`。

其他類型：

| 類型 | 狀態 |
|------|------|
| REQ（文件） | `draft`、`reviewing`、`approved`、`rejected`、`archived`；個別功能狀態另計（§12） |
| SPEC | `draft`、`reviewing`、`approved`、`deprecated` |
| TASK（文件） | `draft`、`ready`、`implementing`、`completed`、`cancelled`；個別任務狀態另計（§14） |
| ADR | `proposed`、`accepted`、`rejected`、`superseded`（§7） |
| GUIDE | 不使用狀態生命週期 |

### 6. Design 格式

開頭必須有 metadata（欄位見附錄 A）。正文建議章節：背景與問題、目標、範圍與非目標、現況與限制、方案比較、最終設計、受影響子專案與元件、實作步驟、測試與驗收條件、待確認事項、設計變更紀錄、實作紀錄與差異。

- DESIGN 回答「如何實現需求或規格」。
- 已有 SPEC 時，DESIGN 以 SPEC 為設計依據，負責展開 SPEC 的主要行為：補充詳細流程、例外處理、邊界條件、技術契約與實作方式，並定義驗收條件；可以新增不違反 SPEC 的技術細節。SPEC 的主要行為以引用表示，不在 DESIGN 重複維護（§13）。
- 詳細設計涉及新的重要業務行為、對外契約或重大限制時，檢查是否需要更新 SPEC 並取得確認。DESIGN 不得自行改變已核准 SPEC 的主要行為；發現 SPEC 模糊、不完整、互相矛盾或不可行時，列入「待確認事項」提出。
- Design First 且尚未建立 SPEC 時，DESIGN 承載已確認的行為要求與驗收條件（見 §8）；之後需要 SPEC 時，將主要行為與重要限制整理到 SPEC，詳細內容留在 DESIGN，並保留關聯與歷史。
- DESIGN 記錄**驗證策略**（驗證什麼、用什麼方式與範圍驗證、驗收條件）；**測試執行紀錄**（執行的測試、結果、證據）記在 TASK（§14）。尚未建立 TASK 時，DESIGN 可以記錄必要的驗證結果；建立 TASK 後改由 TASK 維護，DESIGN 不重複。
- 實作與相關 SPEC 不一致時，差異記在 DESIGN（「實作紀錄與差異」或「待確認事項」），不寫入 SPEC（§13）。
- 建立 TASK 後，DESIGN 只保留高層次計畫，不重複維護詳細的任務勾選狀態。
- 既有 DESIGN 不強制拆分或改寫；既有實作步驟不強制搬到 TASK。

### 7. ADR 格式

開頭必須有 metadata（欄位見附錄 B）。狀態：`proposed`、`accepted`、`rejected`、`superseded`。
待決策的架構事項以 `proposed` ADR 記錄（背景、可選方案與影響；「決策」「選擇原因」寫「待決定」），決定後改為 `accepted`／`rejected` 並補上原因；索引中狀態為 `proposed` 的 ADR 即待決策清單。單一 Design 內的小問題留在該 Design 的「待確認事項」。正文：背景、決策、考慮過的替代方案、選擇原因、影響（正面／負面）、相關文件。

- `proposed` ADR 可以直接修改（仍不得自行改為 `accepted`）。
- `accepted` ADR 只能做最小必要修訂，限於：文字勘誤、內容釐清（不改變決策意義），以及**同一輪開發中**經使用者確認的決策整理（例如對齊前後 ADR 的分工、移除舊設計遺留的描述）。修訂時在文末「修訂紀錄」寫日期、原因與確認來源。
- 決策已形成正式依賴（已上線，或已被其他模組、服務依賴）後的重大架構變更，建立新的 ADR 並記錄取代關係（`supersedes`／`superseded_by`），不修改舊 ADR 的決策。
- AI Agent 不得自行核准新決策，也不得把未經使用者確認的行為寫成 ADR 決策。
- 現有 ADR 中屬於正式行為的規則，不批次搬到 SPEC；未來視需要逐步整理。

### 8. 文件生命週期（AI Agent 與開發人員皆適用）

開發入口（Requirement First／Spec First／Design First）、修改等級（L0～L3）與何時可直接執行、何時需要先規劃或核准，以根目錄 `AGENTS.md`「AI 開發流程」為準；本節規定各階段文件要求與狀態轉換。

Design First 的 SPEC 補齊規則：

1. **不改變正式行為**（內部重構、效能優化、內部元件替換）：依 DESIGN 開發與驗證，不強制補 SPEC。
2. **新增或改變正式行為**：可以先以 DESIGN 探索方案，但實作相關行為前，DESIGN 必須明確記錄預期行為（涵蓋正常、例外與邊界情況，不要求分成獨立章節）、驗收標準、是否需要補 SPEC、需要人工確認的事項。
   - 低風險工作經明確授權，可先依已確認的 DESIGN 實作；若判定需要補 SPEC，應在正式驗收完成前取得核准。不要求所有低風險工作都補 SPEC。
   - 涉及**安全性、資料隔離、多租戶／多品牌隔離、重大相容性或已核准行為的變更**時，必須先核准相關 SPEC，才可實作會改變該行為的程式。
   - 事後補 SPEC 時，在 DESIGN 記錄原因、待補內容與驗收限制。
3. 不得讓程式碼先決定正確行為，再反向編寫 SPEC；已有已核准 SPEC 時，DESIGN 與實作必須遵守；既有 SPEC 需要變更時，先提出變更並取得確認。
4. 需要長期維護的主要行為與重要限制，應建立或更新 SPEC（詳細內容仍在 DESIGN，§13）；不要求所有 DESIGN 最終都有 SPEC。

各階段的文件要求（L0、L1 不強制建立新文件，見根目錄 `AGENTS.md`）：

1. **規劃**：查閱 §10 索引、相關 REQ／SPEC／DESIGN／ADR 與實際程式碼；建立或更新所需文件（`draft`；TASK 拆解確認後 `ready`）；記錄異動範圍與驗收條件。需要核准的 SPEC／DESIGN，`approved` 依 §17 取得；是否必須等待核准才能實作，依根目錄 `AGENTS.md`「人工確認與核准」。
2. **實作**（DESIGN `implementing`；TASK `implementing`）：偏離設計時在 DESIGN「實作紀錄與差異」記錄原因；出現重要架構決策時提出 `proposed` ADR。
3. **驗收**：執行測試、對照驗收條件，確認沒有未完成項目 → DESIGN `implemented`、TASK `completed`（§14）；有證據時更新 REQ 功能狀態（§12）。TASK 完成不代表相關 SPEC／DESIGN 的驗收已全部完成；某份 SPEC 或 DESIGN 驗收完成，也不代表關聯的 REQ 功能自動完成。
4. **同步**：依 §18 檢查並只更新受影響的文件。
5. **歸檔**：以上完成且索引已更新 → `archived`（不搬移、不刪除、不改編號）。

### 9. 執行限制

- 未經確認，不得大量改名、搬移或刪除文件，不得改變已接受的 ADR（允許的修訂見 §7）、已核准的 SPEC 或已核准的 REQ 範圍。
- 不得依檔名推測功能已完成；不得強制每個 DESIGN 建立 ADR、REQ 或 SPEC。
- 不得在多份文件維護相同的詳細說明；不得自創狀態或編號格式。
- 整理文件不得修改程式碼行為。
- 何時需要先提出計畫或等待核准，依根目錄 `AGENTS.md`「人工確認與核准」。
- 不得為了填滿目錄而虛構任何文件；關聯只能指向真實存在的文件 ID，不得建立失效連結。
- 新增任何 `docs/` 檔案前，先確認屬於 §2 的哪一種類型（或 `docs/evidence/` 證據）、是否已有可更新的既有文件（§10 索引；證據見 `docs/evidence/README.md`（若已建立）），以及路徑與檔名符合 §3、§4。需求指定的路徑或分類不符合本規則時，先回報差異並取得確認，再建立檔案。
- 規則與既有文件或決策衝突時，先列出差異並採最小必要修改；可能破壞既有文件或決策時先停止並回報。

### 10. 索引

本索引只列真實存在的正式文件。AI Agent 新增、更名、修改狀態時須同步本節；不能把參考文件當成已核准規格。

| 類型 | 文件 | 狀態 | 說明 |
| --- | --- | --- | --- |


目前沒有正式 REQ／SPEC／DESIGN／TASK／ADR／GUIDE；現有產品與專案資料存於 `references/`，不作正式規格與完成率依據。

### 11. Framework／共用模組開發規則

本節適用共用框架、跨端模組與後續新建的 Node.js 共用程式；架構與分層須以本專案實際採用的技術與核准設計為準。本專案目前以前端 Next.js 為主；未來 Node.js 後端尚未實作，見 `conventions/backend.md`。

1. 修改共用元件、共享資料層、API 契約或跨端功能前，先查 §10 索引、相關 DESIGN、SPEC、ADR（含 `proposed`）與真實程式碼。
2. 可獨立維護的共用功能以可追蹤的 DESIGN 記錄；不同功能不集中到大型 DESIGN。跨功能的長期決策放在 ADR。
3. 對外行為、公開 API 或資料模型改變時，同步必要 SPEC、DESIGN、ADR 及已驗證 GUIDE。
4. DESIGN 定義驗證目標與驗收條件，TASK 記錄實際測試；不得以測試通過數量推定功能完成。
5. 不得覆寫已接受的 ADR、已核准 SPEC 或已存在的歷史。拆分文件保留原 ID，新增主題取得新 ID。
6. 未來 Node.js 框架、ORM、資料庫、部署等章節允許留空或寫「待確認」；不得憑規劃虛構實作。

### 12. REQ：需求與完成率

REQ 保存老闆／PM／客戶的原始想法、需求背景與目標、原始功能清單、討論與確認紀錄、需求範圍、變更歷史、功能狀態與完成率。格式見附錄 C。

- REQ 可以包含未確認的想法，但**不得直接作為程式開發依據**（開發依據為 SPEC 或已確認的 DESIGN）。
- REQ `approved` 代表需求方向或範圍已確認，不代表正式規格已核准，也不代表功能已完成。
- 文件狀態與個別功能狀態分開。

功能清單：每項功能以 REQ 內部的穩定鍵（`F01`、`F02`…，不是全域文件 ID）識別，記錄功能名稱、需求說明、狀態、相關 SPEC、驗收證據、備註；另標記是否屬於**原始需求基準**。

功能狀態：`proposed`、`approved`、`implementing`、`completed`、`deferred`、`rejected`。

- 一項功能可以對應多份 SPEC，一份 SPEC 也可以對應多項功能。
- SPEC 以 `related_reqs` 記錄關聯的 REQ；需要精確到功能時，另以 `related_req_features` 記錄 `REQ-YYYYMMDD-NNNN/Fxx`（例：`REQ-20261019-0001/F01`）。功能鍵必須存在於該 REQ 的功能清單，且其 REQ 必須同時列在 `related_reqs`；不得虛構文件或功能鍵。REQ 端的「相關 SPEC」欄與 SPEC 端的 `related_req_features` 必須互相一致。
- 只有相關驗收條件已滿足、且有可核對的證據（測試、驗收紀錄，或對照已確認 DESIGN 驗收條件的驗收結果；證據記在 DESIGN 或 TASK）時，才能標記 `completed`。不要求驗收條件必須以 SPEC 的驗收編號表示。
- 某份 SPEC 或 DESIGN 驗收完成**不代表**所有關聯的 REQ 功能自動完成；每項功能須逐一確認其驗收條件（可能分散在多份 SPEC／DESIGN）都已滿足，再更新該功能狀態。

完成率（以功能數量計算，不代表工作量或工時；分母為 0 時顯示 `N/A`）：

| 指標 | 計算 |
|------|------|
| 原始需求完成率 | 原始需求基準中已完成驗收的功能數 ÷ 原始需求基準功能總數 × 100%。基準確立後固定；後續新增的功能不計入分子或分母 |
| 目前核准範圍完成率 | 目前核准範圍中已完成驗收的功能數 ÷ 目前核准範圍功能總數 × 100%。範圍包含 `approved`、`implementing`、`completed`；不含 `proposed`、`rejected` 與已移出範圍（`deferred`）的功能 |

- 不得以 SPEC 數量或 TASK 勾選數量計算完成率。
- 新增、拆分、合併、暫緩、拒絕或移除功能時保留歷史，不得刪除原始功能項目、不得重複使用功能鍵；拆分或合併後，原始需求基準的項目與完成判定必須仍可追溯（在備註記錄對應的新鍵，並在「需求變更紀錄」記錄日期與原因）。SPEC 的 `related_req_features` 改指向新鍵時，同步更新 REQ 的對應關係。
- 原始功能拆分或合併後，仍須保留**每項原始功能各自的驗收判定**（備註列出該原始功能必要的對應新鍵）；原始功能只有在其必要的對應功能**全部**完成驗收後，才能計入原始需求完成率的分子。合併時不得因合併後的功能完成，就一併把未涵蓋的原始功能視為完成。

### 13. SPEC：功能規格

SPEC 是簡潔、容易閱讀的功能規格：說明功能目的、主要行為與重要限制，讓工程師與 AI Agent 快速理解功能，並作為 DESIGN 詳細設計的依據。

- SPEC 回答：「這個功能是什麼？系統應該怎麼運作？設計時不能違反哪些主要規則？」
- DESIGN 回答：「如何依據 SPEC 進行設計？詳細流程、技術契約、例外情境、邊界條件與實作方式如何處理？」（分工見 §6）

格式見附錄 D。

撰寫原則：

- 以快速閱讀與理解為優先；主要行為優先使用簡潔表格，搭配少量必要說明。
- 必須清楚列出 DESIGN 不得違反的主要行為與重要限制。涉及安全性、資料隔離、多租戶／多品牌隔離或重大相容性的約束，必須寫得足夠明確，不得只以模糊描述帶過。
- 不要求完整的正常流程、例外流程、邊界案例或測試矩陣，也不強制驗收章節；詳細行為契約、錯誤處理、例外與邊界情境、框架細節、驗收條件與驗證策略由 DESIGN 維護。
- 精簡 SPEC 時不得遺失重要行為；必要時以簡短摘要加上 DESIGN 連結保留追溯。
- SPEC 與 DESIGN 不重複維護同一份詳細規則；同一條規則只在一個位置完整定義，其他位置引用。
- 不強制規則 ID 或驗收 ID。需要被 DESIGN、TASK 或測試精確引用時，可以使用穩定的局部 ID（跨文件寫成 `SPEC-YYYYMMDD-NNNN R01`）；ID 一經使用不得重新編號或重複使用，移除或被取代時在變更紀錄保留歷史與取代關係，正文不需保留失效規則全文。
- 不記錄技術實作、實作進度、程式與規格的差異、測試方法或測試執行結果；這些分別記在 DESIGN（§6）與 TASK（§14）。

核准與變更：

- SPEC `approved` 代表主要行為與重要限制已核准，**不代表** DESIGN 已核准、功能已實作或測試已通過。
- 已核准 SPEC 的行為變更須經明確確認並留下變更紀錄；不得為了符合現有程式碼而修改規格。程式與已核准 SPEC 不一致時，修正程式，或正式提出規格變更。
- 不強制每項工作或每份 DESIGN 都建立 SPEC（§8）。

### 14. TASK：開發任務

TASK 記錄工作拆解（含實作工作與驗證工作）、順序與依賴、執行狀態、測試與驗證紀錄（含對照 DESIGN 驗收條件的測試證據）、阻礙事項、完成摘要，並關聯相關 DESIGN 或 SPEC。格式見附錄 E。

- L0、L1 不強制建立；L2 視複雜度決定；L3 原則上建立。
- 執行進度只在 TASK 維護，DESIGN 不重複勾選。
- TASK `completed` 不代表相關 SPEC／DESIGN 的驗收已全部完成。

TASK 文件狀態（metadata `status`）與個別任務狀態（任務清單的「狀態」欄）分開維護，不得混用：

| TASK 文件狀態 | 說明 |
|------|------|
| `draft` | 任務拆解中，尚未確認 |
| `ready` | 拆解已確認，可以開始執行 |
| `implementing` | 至少一項任務已開始執行 |
| `completed` | 工作目標及必要驗收條件已達成；所有任務皆為 `done` 或 `cancelled`，且測試與驗證紀錄已填寫 |
| `cancelled` | 整份工作取消；保留文件，在「完成摘要」記錄原因 |

| 個別任務狀態 | 說明 |
|------|------|
| `todo` | 尚未開始 |
| `in_progress` | 執行中 |
| `done` | 已完成，且「驗證」欄有可核對的結果 |
| `blocked` | 受阻；在「阻礙事項」記錄原因與解除條件 |
| `cancelled` | 不再執行；保留該列並在備註記錄原因，不刪除 |

- 仍有 `todo`、`in_progress` 或 `blocked` 的任務時，文件不得標記 `completed`。
- `completed` 必須代表工作目標及必要驗收條件已達成，不只是沒有未完成的任務列；不得因所有任務都被取消而標記 `completed`（應為 `cancelled`，或補上新任務後繼續）。

### 15. GUIDE：正式使用指南

GUIDE 記錄已實現且經驗證的使用方式：功能設定、API 使用、模組整合、正確範例、常見問題、注意事項。格式見附錄 F。

- 不使用流水號與狀態生命週期。
- 不得把尚未實現的 SPEC 或 DESIGN 寫成已可使用的功能。
- 公開 API、設定或正式操作方式改變時，檢查是否需要同步 GUIDE。

### 16. 文件關聯與追溯

追溯鏈：`REQ ↔ SPEC ↔ DESIGN ↔ TASK ↔ CODE / TEST`；ADR 記錄重要決策，GUIDE 記錄已驗證的正式用法。

- metadata 依文件類型只加入適用的欄位：`related_reqs`、`related_req_features`（僅 SPEC，§12）、`related_specs`、`related_designs`、`related_tasks`、`related_adrs`、`related_evidence`（`EVD-NNNN`，SPEC／DESIGN／TASK 可用，見 `docs/evidence/README.md`）。
- 關聯必須指向真實存在的文件 ID；`related_req_features` 的功能鍵必須存在於對應 REQ。
- 工作直接由 DESIGN 開始時，可以沒有 REQ 或 SPEC；後續補齊 SPEC 時同步更新雙方的關聯。
- REQ 的功能項目以「相關 SPEC」欄連到 SPEC；CODE／TEST 以 DESIGN 或 TASK 的「受影響元件」「驗證紀錄」連結。

### 17. 核准與 AI Agent 權限

Codex、Claude Code 可以：建立及修改草稿、整理需求、提出規格與技術方案、拆解任務、修改程式碼、執行測試、記錄驗證結果、更新文件關聯、依證據同步進度、更新 GUIDE。

但不得自行：

- 將未確認的需求或 REQ 功能標記為 `approved`。
- 將 SPEC 草稿標記為 `approved`。
- 將重大 DESIGN 草稿視為已核准。
- 將 ADR 標記為 `accepted`。
- 為了符合程式碼而改寫已核准 SPEC。
- 覆寫已接受 ADR 的決策歷史，或未經使用者確認修訂 `accepted` ADR（§7）。
- 在缺乏驗收證據時將 REQ 功能標記為 `completed`。

核准必須來自明確授權（對話中的明確指示、審查紀錄或專案既有的核准機制），並在文件的變更紀錄寫下核准來源與日期；不得以 AI 自行判斷合理作為核准依據。

### 18. 文件同步規則

每次完成開發後檢查相關文件，只修改受影響的文件：

| 發生事件 | 應檢查文件 |
|---|---|
| 提出新需求 | REQ |
| 確認需求範圍 | REQ、SPEC |
| 確認主要行為或重要限制 | SPEC |
| 確認技術設計 | DESIGN、必要時 ADR |
| 開始開發 | DESIGN、TASK |
| 任務完成 | TASK |
| 功能驗收通過 | DESIGN 或 TASK 的驗證紀錄、REQ（SPEC 不記錄驗收結果，§13） |
| 實作偏離設計 | DESIGN、必要時 ADR |
| 公開使用方式改變 | GUIDE（既有內容在根目錄 `AGENTS.md`） |
| 取得或更新驗證證據 | `docs/evidence/README.md`（如有建立）、引用它的 DESIGN／TASK |

每次新增、改名或變更狀態時同步 §10 索引。

### 19. 外部 AI 開發工具（Spec Kit、BMAD 等）

1. 可以使用 GitHub Spec Kit、BMAD 或其他 AI 開發框架作為需求分析、規劃與開發輔助。
2. 正式文件制度由本專案定義，`docs/` 是權威來源；工具產生的規格、計畫、任務只是工作產物，不會自動取代正式文件。
3. 工具內容與正式文件衝突時，先提出差異，依本檔規則處理。
4. 更換 AI 工具不改變正式文件的 ID、命名與生命週期；維護正式文件不需要安裝任何特定框架。
5. 目前沒有安裝 Spec Kit 或 BMAD，也沒有它們的專用目錄。


### 文件驗證與交付依據

正式文件新增或修改時，須確認檔案實際存在、ID 與日期唯一、Metadata、狀態、章節、索引及關聯正確；未執行的驗證不得標記為通過。需要記錄技術來源或實測時，依根目錄 `AGENTS.md`「來源與驗證可信度」使用證據標記；完整測試結果記於 TASK，沒有 TASK 時依 §6 記於 DESIGN。

### 附錄 A：Design 範本

```markdown
---
id: DESIGN-YYYYMMDD-NNNN
title: 標題
project: 主要子專案
status: draft
created: YYYY-MM-DD
updated: YYYY-MM-DD
related_projects: []
related_adrs: []
related_evidence: []
---

# 標題

## 1. 背景與問題
## 2. 目標
## 3. 範圍與非目標
## 4. 現況與限制
## 5. 方案比較
## 6. 最終設計
## 7. 受影響子專案與元件
## 8. 實作步驟
## 9. 測試與驗收條件
## 10. 待確認事項
## 11. 設計變更紀錄
## 12. 實作紀錄與差異
```

### 附錄 B：ADR 範本

```markdown
---
id: ADR-YYYYMMDD-NNNN
title: 決策標題
status: proposed
created: YYYY-MM-DD
related_designs: []
supersedes: []
superseded_by: null
---

# 決策標題

## 背景
## 決策
## 考慮過的替代方案
## 選擇原因
## 影響
## 相關文件
```

### 附錄 C：REQ 範本

```markdown
---
id: REQ-YYYYMMDD-NNNN
title: 需求標題
status: draft
created: YYYY-MM-DD
updated: YYYY-MM-DD
owner: 待確認
related_specs: []
---

# 需求標題

## 1. 原始想法與背景
## 2. 目標
## 3. 需求範圍與非範圍
## 4. 功能清單

原始需求基準確立日期：YYYY-MM-DD

| 鍵 | 功能 | 說明 | 原始基準 | 狀態 | 相關 SPEC | 驗收證據 | 備註 |
|----|------|------|---------|------|----------|---------|------|
| F01 |  |  | 是 | proposed |  |  |  |

## 5. 完成率

| 指標 | 已完成 | 總數 | 完成率 |
|------|-------|------|-------|
| 原始需求完成率 |  |  | N/A |
| 目前核准範圍完成率 |  |  | N/A |

## 6. 討論與確認紀錄
## 7. 需求變更紀錄
```

### 附錄 D：SPEC 範本

```markdown
---
id: SPEC-YYYYMMDD-NNNN
title: 規格標題
status: draft
created: YYYY-MM-DD
updated: YYYY-MM-DD
related_reqs: []
related_req_features: []
related_designs: []
related_adrs: []
related_evidence: []
---

# 規格標題

## 1. 功能目的
## 2. 主要行為
## 3. 重要限制
## 4. 相關設計與決策
## 5. 變更紀錄（含核准來源）
```

範本使用說明（不寫入 SPEC 本文）：

- 章節可以依功能需要調整；不為了填滿範本而增加沒有必要的章節。
- 「主要行為」優先使用簡潔表格（例：情境／行為），只列工程師需要知道、DESIGN 不得違反的行為。
- 「重要限制」列出安全性、資料隔離、相容性等主要約束；有重大安全、資料隔離或相容性限制時必須寫清楚，不得只以模糊描述帶過。
- 「相關設計與決策」列出展開本規格的 DESIGN 與依據的 ADR；詳細設計、驗收條件與驗證策略由 DESIGN 管理。
- 不強制建立驗收準則章節，不強制規則 ID 或驗收 ID（§13）。

### 附錄 E：TASK 範本

```markdown
---
id: TASK-YYYYMMDD-NNNN
title: 任務標題
status: draft
created: YYYY-MM-DD
updated: YYYY-MM-DD
related_designs: []
related_specs: []
related_evidence: []
---

# 任務標題

## 1. 範圍與依據
## 2. 任務清單

任務狀態：`todo`／`in_progress`／`done`／`blocked`／`cancelled`（§14）

| # | 任務 | 依賴 | 狀態 | 驗證 | 備註 |
|---|------|------|------|------|------|
| 1 |  |  | todo |  |  |

## 3. 測試與驗證紀錄
## 4. 阻礙事項
## 5. 完成摘要
```

### 附錄 F：GUIDE 範本

```markdown
# 主題名稱

> 相關文件：SPEC-YYYYMMDD-NNNN、DESIGN-YYYYMMDD-NNNN、ADR-YYYYMMDD-NNNN（只列真實存在的文件）

## 用途
## 設定
## 使用方式與範例
## 注意事項
## 常見問題
```
