# 我的工具主選單（Service Hub）

集中入口，快速切換我開發的各種小服務。
每個服務以卡片呈現，點擊後在同一個網站框架內以 iframe 開啟，可隨時「回主選單」，不會跳走到外部網站。

目前已整合：

- [IPv4 子網路計算器](https://ipv4-subnet.vercel.app/)
- [114 年國軍年終獎金試算](https://114-year-bonus-new.vercel.app/)

之後會持續新增更多服務。

---

## ✨ 功能特色

- **集中入口**：把所有工具收納到一個主選單頁面。
- **同頁操作**：服務在主站 iframe 中執行，按「回主選單」即可回選單。
- **Mobile-first RWD**：手機/桌機皆有舒適版面。
- **卡片式 UI**：每個服務一張卡片。
- **縮圖 fallback**：無縮圖時自動生成。
- **JS DB 管理**：服務列表集中於 `services.js`。

---

## 🧱 架構概念

Service Hub：

```
主選單（Service List）
 └─ 卡片 → iframe Viewer → 回主選單
```

---

## 📁 專案結構

```
my-service-hub/
  ├─ index.html
  ├─ style.css
  ├─ app.js
  └─ services.js
```

---

## 🗃 JS 服務資料庫（services.js）

```
const SERVICES = [
  {
    id: "ipv4-subnet",
    name: "IPv4 子網計算器",
    description: "輸入 IPv4 與首碼，計算子網資訊",
    url: "https://ipv4-subnet.vercel.app/",
    thumbnail: ""
  },
  {
    id: "114-year-bonus",
    name: "114 年年終試算",
    description: "輸入條件試算年終獎金",
    url: "https://114-year-bonus-new.vercel.app/",
    thumbnail: ""
  }
];
```

新增服務只需改此檔。

---

## 🚀 部署流程

1. GitHub 推送程式碼
2. Vercel Import GitHub Repo
3. 自動部署+HTTPS+CDN

更新流程：

```
編輯 → commit → push → Vercel 自動部署
```

---

## 🔮 未來規劃

- 搜尋
- 收藏/最近使用
- PWA 安裝
- 自動縮圖
- 類別分類
- Git Tag 版控

---

