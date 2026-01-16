// services.js
// 這個檔案就是你的「JS DB」
// 以後要新增服務，就在 SERVICES 陣列多加一個物件

const SERVICES = [
  {
    id: "ipv4-subnet",
    name: "IPv4 子網計算器",
    description: "輸入 IPv4 與首碼，計算子網路遮罩、網段範圍、廣播與可用 IP 範圍。",
    url: "https://ipv4-subnet.vercel.app/",
    thumbnail: "https://ipv4-subnet.vercel.app/favicon.ico" // 先暫時用服務自己的 icon，之後你也可以換成自己做的圖
  },
  {
    id: "114-year-bonus",
    name: "114 年年終試算",
    description: "輸入年資與條件，試算 114 年年終與相關獎金。",
    url: "https://114-year-bonus-new.vercel.app/",
    thumbnail: "https://114-year-bonus-new.vercel.app/favicon.ico"
  },
  {
    id: "Countdown-Timer",
    name: "課堂計時器",
    description: "可同時設定時間倒數計時，並於時間結束時撥放提醒音樂。",
    url: "https://countdown-timer-navy-one.vercel.app/",
    thumbnail: "https://countdown-timer-navy-one.vercel.app/favicon.ico"
  }


  // 未來要新增服務，照這樣加就好：
  // {
  //   id: "xxx",
  //   name: "服務名稱",
  //   description: "功能描述…",
  //   url: "https://你的服務網址",
  //   thumbnail: "https://縮圖網址（可以先放同一張）"
  // }
];
