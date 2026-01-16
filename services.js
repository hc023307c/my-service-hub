// services.js
// 這個檔案就是你的「JS DB」
// 以後要新增服務，就在 SERVICES 陣列多加一個物件

const SERVICES = [
  {
    id: "ipv4-subnet",
    name: "IPv4 子網計算器",
    description: "輸入 IPv4 與首碼，計算子網路遮罩、網段範圍、廣播與可用 IP 範圍。",
    url: "https://ipv4-subnet.vercel.app/",
    thumbnail: "/thumbnails/ipv4-subnet.jpg"
  },
  {
    id: "114-year-bonus",
    name: "114 年年終試算",
    description: "輸入年資與條件，試算 114 年年終與相關獎金。",
    url: "https://114-year-bonus-new.vercel.app/",
    thumbnail: "/thumbnails/114-year-bonus-new.jpg"
  },
  {
    id: "Countdown-Timer",
    name: "課堂計時器",
    description: "可同時設定時間倒數計時，並於時間結束時撥放提醒音樂。",
    url: "https://countdown-timer-navy-one.vercel.app/",
    thumbnail: "/thumbnails/countdown-timer.jpg"
  },
  {
  id: "WifiQRCode",
  name: "Wi-Fi QRCode 產生器",
  description: "輸入 SSID、加密方式與密碼，快速產出支援 iPhone 與 Android 的 Wi-Fi QRCode。",
  url: "https://wi-fi-q-rcode-generator.vercel.app/",
  thumbnail: "/thumbnails/wi-fi-q-rcode-generator.jpg"
},
 {
   id: "draw-people",
   name: "號碼抽籤器",
   description: "用號碼抽人 + 顏色紀錄 + 不重複/重複模式",
   url: "https://draw-people.vercel.app",
   thumbnail: "/thumbnails/draw-people.jpg"
}


  // 未來要新增服務，照這樣加就好：
  // {
  //   id: "xxx",
  //   name: "服務名稱",
  //   description: "功能描述…",
  //   url: "https://你的服務網址",
  //   thumbnail: "/thumbnails/圖片檔名.jpc"（可以先放同一張）"
  // }
];
