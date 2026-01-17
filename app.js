document.addEventListener("DOMContentLoaded", () => {
  const gridEl = document.getElementById("serviceGrid");
  const viewMain = document.getElementById("view-main");
  const viewService = document.getElementById("view-service");
  const backBtn = document.getElementById("backBtn");
  const serviceTitleEl = document.getElementById("serviceTitle");
  const serviceDescEl = document.getElementById("serviceDesc");
  const serviceFrameEl = document.getElementById("serviceFrame");

  function renderServiceCards() {
    gridEl.innerHTML = "";

    SERVICES.forEach((svc) => {
      const card = document.createElement("div");
      card.className = "service-card";
      card.dataset.serviceId = svc.id;

      const thumb = document.createElement("div");
      thumb.className = "service-card-thumb";

      const initials = (svc.name && svc.name.trim().slice(0, 2)) || "App";

      if (svc.thumbnail) {
        const img = document.createElement("img");
        img.src = svc.thumbnail;
        img.alt = svc.name || "服務縮圖";

        img.onerror = () => {
          thumb.classList.add("thumb-fallback");
          thumb.innerHTML = `<span class="thumb-fallback-text">${initials}</span>`;
        };

        thumb.appendChild(img);
      } else {
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

      card.appendChild(body);
      card.appendChild(thumb);

      card.addEventListener("click", () => {
        openService(svc);
      });

      gridEl.appendChild(card);
    });
  }

  function openService(service) {
    serviceTitleEl.textContent = service.name;
    serviceDescEl.textContent = service.description || "";
    serviceFrameEl.src = service.url;

    viewMain.classList.add("hidden");
    viewService.classList.remove("hidden");
  }

  function backToMain() {
    serviceFrameEl.src = "";
    viewService.classList.add("hidden");
    viewMain.classList.remove("hidden");
  }

  backBtn.addEventListener("click", backToMain);

  renderServiceCards();

  /* === Mobile spotlight scroll === */

  function setupMobileSpotlight() {
    const cards = Array.from(document.querySelectorAll(".service-card"));
    if (!cards.length) return;

    function updateActiveCard() {
      if (window.innerWidth > 640) {
        cards.forEach((c) => c.classList.remove("service-card--active"));
        return;
      }

      const centerY = window.innerHeight * 0.40;

      let closest = null;
      let cd = Infinity;

      cards.forEach((card) => {
        const rect = card.getBoundingClientRect();
        const mid = rect.top + rect.height / 2;
        const dist = Math.abs(mid - centerY);
        if (dist < cd) {
          cd = dist;
          closest = card;
        }
      });

      cards.forEach((c) => c.classList.remove("service-card--active"));
      if (closest) closest.classList.add("service-card--active");
    }

    updateActiveCard(); // 預設第一張亮

    window.addEventListener("scroll", updateActiveCard, { passive: true });
    window.addEventListener("resize", updateActiveCard);
  }

  setupMobileSpotlight();
});
