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






const track = document.getElementById("carouselTrack");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let index = 1;
let autoTimer;
let isDragging = false;
let startX = 0;
let currentTranslate = 0;

const GAP = 24;
const AUTO_DELAY = 2500;

/* ---------- Setup Infinite ---------- */
const cards = [...track.children];
const firstClone = cards[0].cloneNode(true);
const lastClone = cards[cards.length - 1].cloneNode(true);

track.appendChild(firstClone);
track.insertBefore(lastClone, cards[0]);

/* ---------- Helpers ---------- */
function itemsPerView() {
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 768) return 2;
  return 1;
}

function itemWidth() {
  return track.children[0].offsetWidth + GAP;
}

/* ---------- Center Card ---------- */
function updateCenter() {
  [...track.children].forEach(c => c.classList.remove("is-center"));

  if (window.innerWidth < 1024) return;

  const centerIndex = index + 1;
  track.children[centerIndex]?.classList.add("is-center");
}

/* ---------- Slide ---------- */
function updateSlide(animate = true) {
  track.style.transition = animate ? "transform 0.5s ease" : "none";
  track.style.transform = `translateX(-${index * itemWidth()}px)`;
  updateCenter();
}

/* ---------- Loop Fix ---------- */
function checkLoop() {
  if (index === 0) {
    index = cards.length;
    updateSlide(false);
  }

  if (index === cards.length + 1) {
    index = 1;
    updateSlide(false);
  }
}

/* ---------- Navigation ---------- */
function next() {
  index++;
  updateSlide();
}

function prev() {
  index--;
  updateSlide();
}

track.addEventListener("transitionend", checkLoop);

/* ---------- Auto ---------- */
function startAuto() {
  stopAuto();
  autoTimer = setInterval(next, AUTO_DELAY);
}

function stopAuto() {
  clearInterval(autoTimer);
}

// let startX = 0;
let isDown = false;
const THRESHOLD = 60;

/* ---------- Mouse ---------- */
track.addEventListener("mousedown", (e) => {
  stopAuto();
  isDown = true;
  startX = e.clientX;
});

window.addEventListener("mouseup", (e) => {
  if (!isDown) return;
  isDown = false;

  const diff = e.clientX - startX;

  if (diff > THRESHOLD) {
    prev(); // RIGHTIGHT drag
  } else if (diff < -THRESHOLD) {
    next(); // LEFT drag
  }

  startAuto();
});

/* ---------- Touch ---------- */
track.addEventListener("touchstart", (e) => {
  stopAuto();
  startX = e.touches[0].clientX;
});

track.addEventListener("touchend", (e) => {
  const endX = e.changedTouches[0].clientX;
  const diff = endX - startX;

  if (diff > THRESHOLD) {
    prev(); // RIGHT swipe
  } else if (diff < -THRESHOLD) {
    next(); // LEFT swipe
  }

  startAuto();
});

/* ---------- Mouse Wheel (LEFT / RIGHT ONLY) ---------- */
track.addEventListener("wheel", (e) => {
  if (Math.abs(e.deltaX) < Math.abs(e.deltaY)) return;

  e.preventDefault();
  stopAuto();

  if (e.deltaX > 0) {
    next(); // scroll right
  } else {
    prev(); // scroll left
  }

  startAuto();
}, { passive: false });


/* ---------- Buttons ---------- */
prevBtn.addEventListener("click", () => {
  stopAuto();
  prev();
  startAuto();
});

nextBtn.addEventListener("click", () => {
  stopAuto();
  next();
  startAuto();
});

/* ---------- Init ---------- */
window.addEventListener("load", () => {
  updateSlide(false);
  startAuto();
});

window.addEventListener("resize", () => updateSlide(false));
