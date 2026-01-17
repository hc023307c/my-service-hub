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
    SERVICES.forEach(svc => {
      const card=document.createElement("div");
      card.className="service-card";
      card.dataset.serviceId=svc.id;

      const thumb=document.createElement("div");
      thumb.className="service-card-thumb";

      const initials=(svc.name && svc.name.trim().slice(0,2)) || "App";

      if(svc.thumbnail){
        const img=document.createElement("img");
        img.src=svc.thumbnail;
        img.alt=svc.name;
        img.onerror=()=>{
          thumb.classList.add("thumb-fallback");
          thumb.innerHTML=`<span class="thumb-fallback-text">${initials}</span>`;
        };
        thumb.appendChild(img);
      } else {
        thumb.classList.add("thumb-fallback");
        thumb.innerHTML=`<span class="thumb-fallback-text">${initials}</span>`;
      }

      const body=document.createElement("div");
      body.className="service-card-body";

      const nameEl=document.createElement("h3");
      nameEl.className="service-card-name";
      nameEl.textContent=svc.name;

      const descEl=document.createElement("p");
      descEl.className="service-card-desc";
      descEl.textContent=svc.description;

      body.appendChild(nameEl);
      body.appendChild(descEl);
      card.appendChild(thumb);
      card.appendChild(body);

      card.addEventListener("click",()=>openService(svc));
      gridEl.appendChild(card);
    });
  }

  function openService(service){
    serviceTitleEl.textContent=service.name;
    serviceDescEl.textContent=service.description||"";
    serviceFrameEl.src=service.url;
    viewMain.classList.add("hidden");
    viewService.classList.remove("hidden");
  }

  function backToMain(){
    serviceFrameEl.src="";
    viewService.classList.add("hidden");
    viewMain.classList.remove("hidden");
  }

  backBtn.addEventListener("click",backToMain);

  /* === Spotlight (手機 + scroll) === */

  function spotlightUpdate(){
    const cards=[...document.querySelectorAll(".service-card")];
    if(cards.length===0) return;

    const centerY=window.innerHeight/2;
    let best=null;
    let bestDist=Infinity;

    cards.forEach(card=>{
      const rect=card.getBoundingClientRect();
      const cardCenter=rect.top+rect.height/2;
      const dist=Math.abs(cardCenter-centerY);
      if(dist<bestDist){
        bestDist=dist;
        best=card;
      }
    });

    cards.forEach(c=>{
      if(c===best){
        c.classList.add("active-center");
        c.classList.remove("dim");
      } else {
        c.classList.remove("active-center");
        c.classList.add("dim");
      }
    });
  }

  let ticking=false;
  function onScroll(){
    if(!ticking){
      requestAnimationFrame(()=>{
        spotlightUpdate();
        ticking=false;
      });
      ticking=true;
    }
  }

  window.addEventListener("scroll",onScroll,{passive:true});

  renderServiceCards();
  spotlightUpdate();
});
