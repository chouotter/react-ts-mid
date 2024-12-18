Student Hub 專案
專案描述
Student Hub 是一個基於 MVC 架構，採用前後端分離設計的專案，主要功能為學生資料的管理，包括新增、查詢、更新與刪除操作。

功能描述
新增 (Create)：新增學生資料。
查詢 (Read)：依據條件查詢學生資料（例如：缺席次數、姓名、座號）。
更新 (Update)：修改現有學生資料。
刪除 (Delete)：移除學生資料。
技術架構
前端：React + TypeScript
後端：Node.js + Express
資料庫：MongoDB
API 測試工具：Postman
套件管理工具：npm
API 規格
基本資訊
基本 URL：/api/v1/user/
資料格式：JSON
API 功能
查詢學生資料
HTTP 方法：GET
描述：根據學生的缺席次數、姓名或座號查詢資料。
新增學生資料
HTTP 方法：POST
描述：新增一筆學生資料。
流程說明
使用者操作
使用者透過前端介面（例如提交表單或點擊按鈕）執行新增、查詢、更新或刪除學生資料的操作。

前端發送請求
前端利用 fetch 或類似工具發送 HTTP 請求（如 GET、POST、PUT、DELETE）至後端 Express 伺服器。

後端處理請求

路由層 (Route)：根據請求的路徑與方法，匹配對應的控制器方法。
控制器 (Controller)：處理具體邏輯，並調用服務層進行業務操作。
服務層與資料庫交互

服務層 (Service)：負責驗證請求數據，調用數據模型與資料庫互動。
數據模型 (Model)：利用 Mongoose 操作 MongoDB，完成資料的增、刪、改、查。
返回結果

後端將處理結果返回給前端。
前端接收到數據後更新界面顯示。
