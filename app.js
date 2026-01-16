// app.js

document.addEventListener("DOMContentLoaded", () => {
  const gridEl = document.getElementById("serviceGrid");
  const viewMain = document.getElementById("view-main");
  const viewService = document.getElementById("view-service");
  const backBtn = document.getElementById("backBtn");
  const serviceTitleEl = document.getElementById("serviceTitle");
  const serviceDescEl = document.getElementById("serviceDesc");
  const serviceFrameEl = document.getElementById("serviceFrame");

  // 1. 從 SERVICES (services.js) 產生卡片
  function renderServiceCards() {
    gridEl.innerHTML = "";

    SERVICES.forEach((svc) => {
      const card = document.createElement("div");
      card.className = "service-card";
      card.dataset.serviceId = svc.id;

    const thumb = document.createElement("div");
    thumb.className = "service-card-thumb";

    // 用服務名稱前 2 個字當縮圖文字
    const initials =
      (svc.name && svc.name.trim().slice(0, 2)) || "App";

    if (svc.thumbnail) {
      const img = document.createElement("img");
      img.src = svc.thumbnail;
      img.alt = svc.name || "服務縮圖";

      img.onerror = () => {
    // 載圖失敗 → 換成文字縮圖
        thumb.classList.add("thumb-fallback");
        thumb.innerHTML = `<span class="thumb-fallback-text">${initials}</span>`;
      };

      thumb.appendChild(img);
    } else {
      // 一開始就沒有 thumbnail → 直接用文字縮圖
      thumb.classList.add("thumb-fallback");
      thumb.innerHTML = `<span class="thumb-fallback-text">${initials}</span>`;
    }


      const body = document.createElement("div");
      body.className = "service-card-body";

      const nameEl = document.createElement("h3");
      nameEl.className = "service-card-name";
      nameEl.textContent = svc.name;

      const descEl = document.createElement("p");
      descEl.className = "service-card-desc";
      descEl.textContent = svc.description;

      body.appendChild(nameEl);
      body.appendChild(descEl);

      card.appendChild(thumb);
      card.appendChild(body);

      // 卡片點擊 → 切到內嵌服務畫面
      card.addEventListener("click", () => {
        openService(svc);
      });

      gridEl.appendChild(card);
    });
  }

  // 2. 開啟某個服務（切畫面、設定 iframe）
  function openService(service) {
    serviceTitleEl.textContent = service.name;
    serviceDescEl.textContent = service.description || "";
    serviceFrameEl.src = service.url;

    viewMain.classList.add("hidden");
    viewService.classList.remove("hidden");
  }

  // 3. 回主選單（清掉 iframe 避免背景一直跑）
  function backToMain() {
    serviceFrameEl.src = "";
    viewService.classList.add("hidden");
    viewMain.classList.remove("hidden");
  }

  backBtn.addEventListener("click", backToMain);

  // 初始畫面：顯示主選單卡片
  renderServiceCards();
});
