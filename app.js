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

      const img = document.createElement("img");
      img.src = svc.thumbnail || "";
      img.alt = svc.name || "服務縮圖";

      // 如果載入圖片失敗，用文字 fallback
      img.onerror = () => {
        thumb.innerHTML = `<span style="font-size:0.8rem;color:#64748b;">No Img</span>`;
      };

      thumb.appendChild(img);

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
