/* ================================
   HERO TITLE ANIMATION
================================ */
const heroTitle = document.getElementById("heroTitle");

const heroObserver = new IntersectionObserver(
  ([entry]) => {
    if (entry.isIntersecting) {
      heroTitle.classList.remove("opacity-0", "translate-x-20");
      heroObserver.disconnect();
    }
  },
  { threshold: 0.7 }
);

heroObserver.observe(heroTitle);


/* ================================
   SCROLL ANIMATIONS (MULTI ELEMENT)
================================ */
const scrollObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.remove(
          "opacity-0",
          "translate-y-10",
          "translate-x-10",
          "-translate-x-10"
        );
        scrollObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.2 }
);

document
  .querySelectorAll(".animate-on-scroll")
  .forEach((el) => scrollObserver.observe(el));




// Carousel
const track = document.getElementById("carouselTrack");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

const GAP = 24;
const AUTO_DELAY = 2500;
const THRESHOLD = 60;

let index = 1;
let autoTimer;
let isDown = false;
let startX = 0;

/* ---------- Infinite Clone Setup ---------- */
const cards = [...track.children];
track.appendChild(cards[0].cloneNode(true));
track.insertBefore(cards[cards.length - 1].cloneNode(true), cards[0]);

/* ---------- Helpers ---------- */
const itemWidth = () => track.children[0].offsetWidth + GAP;

/* ---------- Center Card ---------- */
function updateCenter() {
  [...track.children].forEach(c => c.classList.remove("is-center"));
  if (window.innerWidth >= 1024) track.children[index]?.classList.add("is-center");
}

/* ---------- Slide ---------- */
let isTransitioning = false;

function updateSlide(animate = true) {
  track.style.transition = animate ? "transform 0.7s ease" : "none";
  track.style.transform = `translateX(-${index * itemWidth()}px)`;
  updateCenter();
  if (animate) isTransitioning = true;
}

/* ---------- Loop Fix (requestAnimationFrame prevents glitch) ---------- */
track.addEventListener("transitionend", () => {
  if (index === 0) { index = cards.length; updateSlide(false); }
  if (index === cards.length + 1) { index = 1; updateSlide(false); }
  isTransitioning = false;
});

/* ---------- Navigation ---------- */
const next = () => { if (isTransitioning) return; index++; updateSlide(); };
const prev = () => { if (isTransitioning) return; index--; updateSlide(); };

/* ---------- Auto ---------- */
const stopAuto = () => clearInterval(autoTimer);
const startAuto = () => { stopAuto(); autoTimer = setInterval(next, AUTO_DELAY); };

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
window.addEventListener("load", () => { updateSlide(false); startAuto(); });
window.addEventListener("resize", () => updateSlide(false));
