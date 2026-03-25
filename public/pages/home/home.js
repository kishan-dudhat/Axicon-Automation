import { homeProducts } from './productlist.js';

// Carousel Logic
const track = document.getElementById("carouselTrack");

// Dynamically inject all 16 product cards right before cloning begins, avoiding dual renders
if (track && homeProducts && (track.children.length === 0 || !track.firstElementChild.classList.contains("carousel-card"))) {
  track.innerHTML = homeProducts.map(p => `
          <div class="carousel-card flex flex-col justify-between h-auto rounded-2xl bg-primary border border-slate-100 hover:border-blue-200 cursor-pointer">
            <div class="relative w-full h-64 overflow-hidden rounded-t-xl bg-secondary flex items-center justify-center p-4">
              <img src="${p.image}" alt="${p.name}" class="object-contain h-full mix-blend-multiply group-hover:scale-105 transition-transform duration-500 cursor-pointer">
            </div>
            <div class="p-6 text-left flex-grow flex flex-col justify-between border-t border-slate-100">
              <div>
                <h3 class="text-xl font-bold text-primary mb-2 leading-tight">${p.name}</h3>
                <p class="text-sm text-secondary line-clamp-2">${p.description}</p>
              </div>
              <a href="${p.navigatelink}" class="mt-4 inline-flex items-center text-brand font-semibold text-sm hover:text-blue-800 transition-colors cursor-pointer" onclick="window.location.hash='${p.navigatelink.replace('#', '')}'">Learn More <i class="fa-solid fa-arrow-right ml-2 text-xs"></i></a>
            </div>
          </div>
  `).join('');
}

const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const dotsContainer = document.getElementById("carouselDots");
if (track && prevBtn && nextBtn) {
  const GAP = 22; // Must match CSS gap exactly
  const AUTO_DELAY = 3000;
  const THRESHOLD = 60;

  let index = 1;
  let isDown = false;
  let startX = 0;

  /* ---------- Prevent memory leaks on SPA re-render ---------- */
  if (window.carouselAutoTimer) {
    clearInterval(window.carouselAutoTimer);
  }

  /* ---------- Infinite Clone Setup ---------- */
  const cards = [...track.children];
  const totalOriginalCards = cards.length;
  // Clone only if not already cloned
  if (!cards[0].classList.contains("cloned-card")) {
    const firstClone = cards[0].cloneNode(true);
    const lastClone = cards[cards.length - 1].cloneNode(true);
    firstClone.classList.add("cloned-card");
    lastClone.classList.add("cloned-card");

    track.appendChild(firstClone);
    track.insertBefore(lastClone, cards[0]);
  }

  const updatedCards = [...track.children];

  /* ---------- Pagination Dots Setup ---------- */
  if (dotsContainer) {
    dotsContainer.innerHTML = "";
    for (let i = 0; i < totalOriginalCards; i++) {
      const dot = document.createElement("button");
      dot.className = "carousel-dot";
      dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
      dot.addEventListener("click", () => {
        stopAuto();
        index = i + 1; // 0th is the prefixed clone
        updateSlide();
        startAuto();
      });
      dotsContainer.appendChild(dot);
    }
  }

  /* ---------- Helpers ---------- */
  const itemWidth = () => track.children[0].offsetWidth + GAP;

  /* ---------- Center Card & Active Dot ---------- */
  function updateCenterAndDots() {
    [...track.children].forEach(c => c.classList.remove("is-center"));
    if (window.innerWidth >= 1024) track.children[index]?.classList.add("is-center");

    // Update Dots
    if (dotsContainer) {
      let activeDotIndex = index - 1;
      // Handle bounds due to infinite clones
      if (activeDotIndex < 0) activeDotIndex = totalOriginalCards - 1;
      if (activeDotIndex >= totalOriginalCards) activeDotIndex = 0;

      Array.from(dotsContainer.children).forEach((dot, idx) => {
        if (idx === activeDotIndex) dot.classList.add("active");
        else dot.classList.remove("active");
      });
    }
  }

  /* ---------- Slide ---------- */
  let isTransitioning = false;

  function updateSlide(animate = true) {
    if (!track) return;
    track.style.transition = animate ? "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)" : "none";
    track.style.transform = `translateX(-${index * itemWidth()}px)`;
    updateCenterAndDots();
    if (animate) isTransitioning = true;
  }

  /* ---------- Loop Fix ---------- */
  track.addEventListener("transitionend", () => {
    if (index === 0) { index = updatedCards.length - 2; updateSlide(false); }
    if (index === updatedCards.length - 1) { index = 1; updateSlide(false); }
    isTransitioning = false;
  });

  /* ---------- Navigation ---------- */
  const next = () => { if (isTransitioning) return; index++; updateSlide(); };
  const prev = () => { if (isTransitioning) return; index--; updateSlide(); };

  /* ---------- Auto ---------- */
  const stopAuto = () => clearInterval(window.carouselAutoTimer);
  const startAuto = () => {
    stopAuto();
    window.carouselAutoTimer = setInterval(next, AUTO_DELAY);
  };

  /* ---------- Mouse ---------- */
  track.addEventListener("mousedown", (e) => { stopAuto(); isDown = true; startX = e.clientX; });
  window.addEventListener("mouseup", (e) => {
    if (!isDown) return;
    isDown = false;
    const diff = e.clientX - startX;
    if (diff > THRESHOLD) prev();
    else if (diff < -THRESHOLD) next();
    startAuto();
  });

  /* ---------- Touch ---------- */
  track.addEventListener("touchstart", (e) => { stopAuto(); startX = e.touches[0].clientX; }, { passive: true });
  track.addEventListener("touchend", (e) => {
    const diff = e.changedTouches[0].clientX - startX;
    if (diff > THRESHOLD) prev();
    else if (diff < -THRESHOLD) next();
    startAuto();
  });

  /* ---------- Buttons ---------- */
  prevBtn.addEventListener("click", () => { stopAuto(); prev(); startAuto(); });
  nextBtn.addEventListener("click", () => { stopAuto(); next(); startAuto(); });

  /* ---------- Init ---------- */
  updateSlide(false);
  startAuto();

  window.addEventListener("resize", () => updateSlide(false));
}
