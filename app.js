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

  // 4. 手機版：滑到最靠近視窗中間的卡片 → 只有那一張亮起
  function initScrollFocus() {
    // 只在手機 / 窄螢幕啟用這個效果
    if (!window.matchMedia || !window.matchMedia("(max-width: 640px)").matches) {
      return;
    }

    const cards = Array.from(document.querySelectorAll(".service-card"));
    if (!cards.length) return;

    let ticking = false;

    function updateActiveCard() {
      const viewportMiddle = window.innerHeight / 2;
      let bestCard = null;
      let bestDistance = Infinity;

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        // 只考慮有出現在視窗裡的卡片
        if (rect.bottom > 0 && rect.top < window.innerHeight) {
          const cardMiddle = rect.top + rect.height / 2;
          const distance = Math.abs(cardMiddle - viewportMiddle);

          if (distance < bestDistance) {
            bestDistance = distance;
            bestCard = card;
          }
        }
      });

      // 先清掉全部 active
      cards.forEach((card) => card.classList.remove("service-card--active"));

      // 再把最靠近中間的那張打亮
      if (bestCard) {
        bestCard.classList.add("service-card--active");
      }

      ticking = false;
    }

    function onScroll() {
      if (!ticking) {
        window.requestAnimationFrame(updateActiveCard);
        ticking = true;
      }
    }

    // 初始先算一次（避免一進頁面全都不亮）
    updateActiveCard();

    window.addEventListener("scroll", onScroll, { passive: true });
  }

  // 初始畫面：顯示主選單卡片 + 啟動手機 scroll 聚焦效果
  renderServiceCards();
  initScrollFocus();
});
