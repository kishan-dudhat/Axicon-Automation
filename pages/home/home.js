import { homeProducts } from './productlist.js';
import { submitForm } from '../../js/standardapi.js';
import { blogData } from '../blog/blog-object.js';

// Carousel Logic
const track = document.getElementById("carouselTrack");

// Dynamically inject all 16 product cards right before cloning begins, avoiding dual renders
if (track && homeProducts && (track.children.length === 0 || !track.firstElementChild.classList.contains("carousel-card"))) {
  track.innerHTML = homeProducts.map(p => `
          <div class="carousel-card flex flex-col justify-between h-auto rounded-2xl bg-primary border border-slate-100 hover:border-blue-200 cursor-pointer overflow-hidden">
            <a href="${p.navigatelink}" onclick="window.location.hash='${p.navigatelink.replace('#', '')}'" class="flex flex-col h-full"> 
              <div class="relative w-full h-64 overflow-hidden rounded-t-xl bg-secondary flex items-center justify-center p-4">
                <img src="${p.image}" alt="${p.name}" class="object-contain h-full mix-blend-multiply group-hover:scale-105 transition-transform duration-500 cursor-pointer">
              </div>
              <div class="p-6 text-left flex-grow flex flex-col justify-between border-t border-slate-100">
                <div>
                  <h3 class="text-xl font-bold text-primary mb-2 leading-tight">${p.name}</h3>
                  <p class="text-sm text-secondary line-clamp-2">${p.description}</p>
                </div>
                <div class="mt-4 inline-flex items-center text-brand font-semibold text-sm hover:text-blue-800 transition-colors">
                  Learn More <i class="fa-solid fa-arrow-right ml-2 text-xs"></i>
                </div>
              </div>
            </a>
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
    track.style.transition = animate ? "transform 0.5s cubic(0.4, 0, 0.2, 1)" : "none";
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

// Home Page Blog Rendering
function initHomeBlog() {
    const homeGrid = document.getElementById("home-blog-grid");
    if (!homeGrid) return;

    // Get latest 3 posts
    const latestPosts = [...blogData]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 3);

    homeGrid.innerHTML = latestPosts.map((post, index) => `
        <a href="#/blog?slug=${post.slug}" class="group block opacity-0 translate-y-10 animate-on-scroll"
                 style="transition-delay: ${index * 150}ms;">
            <article class="h-full bg-white rounded-[2rem] border border-slate-200 overflow-hidden hover:shadow-2xl hover:shadow-brand/5 transition-all duration-500 hover:-translate-y-2">
                <div class="relative h-64 overflow-hidden">
                    <div class="absolute inset-0 bg-brand/10 group-hover:bg-transparent transition-colors z-10"></div>
                    <img src="${post.image}" alt="${post.alt}" class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110">
                    <span class="absolute top-6 left-6 z-20 px-4 py-1.5 bg-white/90 backdrop-blur-md rounded-full text-[10px] font-black uppercase tracking-widest text-brand shadow-sm">
                        ${post.category}
                    </span>
                </div>
                
                <div class="p-8">
                    <div class="flex items-center gap-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-4">
                        <span><i class="fa-regular fa-calendar mr-1.5 text-brand"></i> ${new Date(post.date).toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}</span>
                        <span class="w-1 h-1 rounded-full bg-slate-200"></span>
                        <span><i class="fa-regular fa-clock mr-1.5 text-brand"></i> ${post.readTime}</span>
                    </div>
                    
                    <h3 class="text-xl font-bold text-slate-900 mb-4 group-hover:text-brand transition-colors leading-tight" style="font-family: 'Outfit', sans-serif;">
                        ${post.title}
                    </h3>
                    
                    <p class="text-slate-500 text-sm line-clamp-2 mb-6 leading-relaxed">
                        ${post.description}
                    </p>
                    
                    <div class="inline-flex items-center gap-2 text-brand font-black text-xs uppercase tracking-widest group-hover:gap-4 transition-all">
                        Read Full Insight
                        <i class="fa-solid fa-arrow-right-long"></i>
                    </div>
                </div>
            </article>
        </a>
    `).join('');

    // Re-init animations
    if (window.initScrollAnimations) window.initScrollAnimations();
}

// Homepage Contact Form Logic
export function initHomeContactForm() {
    const form = document.getElementById('homeContactForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // 1. Prepare Data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // 2. UI Feedback (Loading)
        const submitBtn = form.querySelector('button[type="submit"]') || form.querySelector('button');
        const originalContent = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span class="text-md font-semibold text-light">Sending...</span> <i class="fa-solid fa-spinner animate-spin text-light"></i>`;

        // 3. Submit via Standard API
        const result = await submitForm(data);

        if (result.success) {
            // Show success message
            form.innerHTML = `
                <div class="flex flex-col items-center justify-center py-12 px-4 text-center">
                    <div class="h-20 w-20 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-emerald-100">
                        <i class="fa-solid fa-check text-4xl text-emerald-500"></i>
                    </div>
                    <h3 class="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Message Sent!</h3>
                    <p class="text-slate-500 text-sm leading-relaxed max-w-[280px]">Thank you for your message. We will get back to you shortly.</p>
                </div>
            `;
        } else {
            alert(result.message);
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalContent;
        }
    });
}

// Initialize
initHomeContactForm();
initHomeBlog();
