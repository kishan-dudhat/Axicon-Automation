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

let index = 0;
let autoSlide = null;

function itemsPerView() {
  if (window.innerWidth >= 1024) return 3;
  if (window.innerWidth >= 768) return 2;
  return 1;
}

function slide() {
  if (!track.children.length) return;

  const itemWidth = track.children[0].offsetWidth + 24; // gap-6
  track.style.transform = `translateX(-${index * itemWidth}px)`;
}

function next() {
  const maxIndex = track.children.length - itemsPerView();
  index = index >= maxIndex ? 0 : index + 1;
  slide();
}

function startAuto() {
  stopAuto(); // 🔥 IMPORTANT
  autoSlide = setInterval(next, 2000); // smoother
}

function stopAuto() {
  if (autoSlide) {
    clearInterval(autoSlide);
    autoSlide = null;
  }
}

// Pause on hover
track.addEventListener("mouseenter", stopAuto);
track.addEventListener("mouseleave", startAuto);

// Handle resize
window.addEventListener("resize", () => {
  index = 0;
  slide();
});

//  Start after layout is ready
window.addEventListener("load", () => {
  slide();
  startAuto();
});
