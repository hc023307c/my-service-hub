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

      // 👉 注意：桌機是「左圖右字」，手機我們在 CSS 裡調成「文字 1/3 + 圖片 2/3」
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

  // 4. 手機版 scroll spotlight：最接近視窗上方 35% 的卡片高亮，
  //    頂端區域特別照顧第一張，讓你一進頁面就有「選到」的感覺。
  function setupMobileSpotlight() {
    const cards = Array.from(document.querySelectorAll(".service-card"));
    if (!cards.length) return;

    function updateActiveCard() {
      // 只在手機（寬度 <= 640px）啟用 spotlight
      if (window.innerWidth > 640) {
        cards.forEach((c) => c.classList.remove("service-card--active"));
        return;
      }

      // ===== 1) 頂端特別處理：避免「最上面那張很難亮」 =====
      // 捲動幾乎在最上面時，就直接固定第一張當 active
      if (window.scrollY < 20) {
        cards.forEach((c, idx) => {
          c.classList.toggle("service-card--active", idx === 0);
        });
        return;
      }

      // ===== 2) 一般情況：找「離視窗 35% 高度最近」的卡片 =====
      const targetY = window.innerHeight * 0.35; // 稍微偏上，滑起來更自然

      let closestCard = null;
      let closestDist = Infinity;

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.top + rect.height / 2;
        const dist = Math.abs(cardCenter - targetY);

        if (dist < closestDist) {
          closestDist = dist;
          closestCard = card;
        }
      });

      cards.forEach((c) => c.classList.remove("service-card--active"));
      if (closestCard) {
        closestCard.classList.add("service-card--active");
      }
    }

    // 進頁面先跑一次，讓第一張先亮起來
    updateActiveCard();

    // 滑動 & 旋轉螢幕時更新 spotlight
    window.addEventListener("scroll", updateActiveCard, { passive: true });
    window.addEventListener("resize", updateActiveCard);
  }

  setupMobileSpotlight();
});
