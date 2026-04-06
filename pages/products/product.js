import { products } from './product-object.js';

// Global Carousel State Management
const carouselsData = {};

function renderProducts() {
  const container = document.getElementById('products-container');
  if (!container) return;

  const hashParts = window.location.hash.split("?");
  let targetSlug = null;
  if (hashParts.length > 1) {
    const params = new URLSearchParams(hashParts[1]);
    targetSlug = params.get("item");
  }

  // Find targeted product by slug, fallback to first entry
  let selectedProduct = products && products.length > 0 ? products[0] : null;
  if (targetSlug && products) {
    const foundProduct = products.find(p => {
      const slug = p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
      return slug === targetSlug;
    });
    if (foundProduct) selectedProduct = foundProduct;
  }

  const p = selectedProduct;
  if (!p) {
    container.innerHTML = `<div class="text-center py-20 text-2xl">No products found.</div>`;
    return;
  }

  // Update hero title dynamically
  const heroTitle = document.getElementById('product-hero-title');
  if (heroTitle) {
    heroTitle.innerText = p.name;
    // Special class reset for animations to re-trigger if needed
    heroTitle.classList.remove('opacity-0', 'scale-95', 'translate-y-4');
  }

  // Update SEO Metadata
  updateProductSEO(p);

  // Generic fallbacks
  const desc = p.description
  const specEntries = Object.entries(p.specifications || {}).slice(0, 3);

  // Extract images from the new structured object '{ src, alt }'
  let images = [];
  if (p.productcarouselImage && typeof p.productcarouselImage === 'object') {
    // Extracts all image objects from the group
    images = Object.values(p.productcarouselImage).filter(img => img && img.src);
  } else if (p.images && Array.isArray(p.images)) {
    images = p.images;
  }

  // Fallback for safety
  if (images.length === 0) {
    images = [{ src: "https://via.placeholder.com/800x400?text=No+Image", alt: "No Image Available" }];
  }

  // If object only had 1 image, handle gracefully
  if (images.length === 0) {
    images = ["https://via.placeholder.com/800x400?text=No+Image"];
  }

  // Extract application images dynamically
  const appImages = p.applicationImages || [
    { src: "https://via.placeholder.com/600x400/e2e8f0/1e293b?text=Industry+Application+1", alt: "Industry Application" },
    { src: "https://via.placeholder.com/600x400/e2e8f0/1e293b?text=Industry+Application+2", alt: "Industry Application" },
    { src: "https://via.placeholder.com/600x400/e2e8f0/1e293b?text=Industry+Application+3", alt: "Industry Application" },
    { src: "https://via.placeholder.com/600x400/e2e8f0/1e293b?text=Industry+Application+4", alt: "Industry Application" },
    { src: "https://via.placeholder.com/600x400/e2e8f0/1e293b?text=Industry+Application+5", alt: "Industry Application" },
    { src: "https://via.placeholder.com/600x400/e2e8f0/1e293b?text=Industry+Application+6", alt: "Industry Application" }
  ];

  let justifyCls = "justify-start";
  if (appImages.length <= 2) {
    justifyCls = "justify-center";
  } else if (appImages.length === 3) {
    justifyCls = "justify-start md:justify-center";
  } else if (appImages.length === 4) {
    justifyCls = "justify-start xl:justify-center";
  }

  const html = `
    <div class="max-w-[1450px] mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
      
      <!-- Split Product Intro Section -->
      <div class="flex flex-col lg:flex-row bg-white rounded-[1.25rem] shadow-lg border border-gray-100 overflow-hidden relative">
        
        <!-- Left Side: Product Information -->
        <div class="w-full lg:w-2/5 bg-slate-50/80 p-8 lg:p-12 xl:p-14 border-b lg:border-b-0 lg:border-r border-gray-200 flex flex-col justify-center relative overflow-hidden">
          
          <!-- Decorative Blur -->
          <div class="absolute top-0 right-0 -mt-10 -mr-10 w-48 h-48 bg-blue-200/40 rounded-full blur-3xl pointer-events-none z-0"></div>

          <div class="relative z-10 w-full h-full flex flex-col justify-center">
            
            <h2 class="text-[2.2rem] xl:text-[2.5rem] font-extrabold text-brand tracking-tight leading-tight">${p.name}</h2>
            <div class="w-[20%] h-1 bg-gradient-to-r from-blue-900 to-cyan-500 rounded-full mt-2 mb-6"></div>

            <p class="text-slate-600 text-[1rem] mb-8 leading-relaxed">
              ${desc}
            </p>
            
            <!-- Specs Inner Card -->
            <div class="space-y-3 mb-10 text-[0.95rem] bg-white p-4 rounded-xl border border-gray-100 shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] w-full">
              ${specEntries.map(([k, v]) => `
                <div class="flex items-center gap-3">
                  <div class="w-1.5 h-1.5 rounded-full bg-brand opacity-70 flex-shrink-0"></div>
                  <p class="truncate"><span class="font-bold text-slate-800">${k} :</span> <span class="text-slate-500">${v}</span></p>
                </div>
              `).join('')}
            </div>
            
            <h3 class="text-[1.1rem] font-bold text-slate-800 tracking-wide mb-5">Immediate Contact No.</h3>
            <ul class="space-y-4 mb-10">
              <li class="flex items-center text-brand font-semibold hover:text-blue-700 transition-colors cursor-pointer text-[1.05rem]">
                <div class="w-8 h-8 rounded-full bg-blue-100/60 flex items-center justify-center mr-3 shadow-inner"><i class="fa-solid fa-phone text-[0.85rem]"></i></div>
                <a href="tel:9978430431">+91-9978430431</a>
              </li>
              <li class="flex items-center text-brand font-semibold hover:text-blue-700 transition-colors cursor-pointer text-[1.05rem]">
                <div class="w-8 h-8 rounded-full bg-blue-100/60 flex items-center justify-center mr-3 shadow-inner"><i class="fa-solid fa-phone text-[0.85rem]"></i></div>
                <a href="tel:9099653777">+91-9099653777</a>
              </li>
            </ul>
            
            <button onclick="window.location.hash='#/inquiry'" class="bg-gradient-to-r from-brand to-[#115ba5] hover:to-brand-dark text-trinary font-bold py-4 px-8 rounded-lg flex items-center justify-center gap-3 w-max text-[0.95rem] shadow-[0_5px_15px_-3px_rgba(23,115,208,0.4)] hover:shadow-[0_8px_20px_-4px_rgba(23,115,208,0.5)] transition-all duration-300 transform hover:-translate-y-1 tracking-wider">
              SEND INQUIRY <i class="fa-solid fa-paper-plane ml-1"></i>
            </button>
            
          </div>
        </div>

        <!-- Right Side: Product Image Carousel -->
        <div class="w-full lg:w-3/5 p-8 lg:p-14 flex flex-col items-center justify-between bg-white relative">
          
          <!-- Main Image Wrapper -->
          <div class="relative w-full flex-grow flex items-center justify-center mb-8 min-h-[400px]">
             
             <!-- Left Arrow -->
             <button class="carousel-nav-btn absolute left-0 z-30 text-slate-500 hover:text-primary text-[1.15rem] hover:bg-brand transition-all duration-300 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white opacity-100 border-2 border-slate-300 hover:border-brand shadow-md hover:shadow-lg hover:scale-105" data-id="${p.id}" data-dir="-1">
               <i class="fa-solid fa-chevron-left"></i>
             </button>
             
             <!-- Viewport Slider Track -->
             <div class="w-full h-full overflow-hidden" id="carousel-viewport-${p.id}">
                <div class="flex h-full items-center relative" id="carousel-track-${p.id}">
                   <!-- Cloned Last Image -->
                   <div class="w-full h-full flex-shrink-0 flex items-center justify-center px-12 md:px-16 py-4">
                      <div class="w-full max-w-[480px] aspect-[4/3] relative flex items-center justify-center">
                         <img src="${images[images.length - 1].src}" alt="${images[images.length - 1].alt}" class="absolute inset-0 w-full h-full object-contain mix-blend-multiply drop-shadow-[0_4px_12px_rgba(0,0,0,0.08)] p-1" />
                      </div>
                   </div>
                   <!-- Original Images -->
                   ${images.map((img, i) => `
                     <div class="w-full h-full flex-shrink-0 flex items-center justify-center px-12 md:px-16 py-4">
                        <div class="w-full max-w-[480px] aspect-[4/3] relative flex items-center justify-center">
                           <img src="${img.src}" alt="${img.alt}" class="absolute inset-0 w-full h-full object-contain mix-blend-multiply drop-shadow-[0_4px_12px_rgba(0,0,0,0.08)] p-1" />
                        </div>
                     </div>
                   `).join('')}
                   <!-- Cloned First Image -->
                   <div class="w-full h-full flex-shrink-0 flex items-center justify-center px-12 md:px-16 py-4">
                      <div class="w-full max-w-[480px] aspect-[4/3] relative flex items-center justify-center">
                         <img src="${images[0].src}" alt="${images[0].alt}" class="absolute inset-0 w-full h-full object-contain mix-blend-multiply drop-shadow-[0_4px_12px_rgba(0,0,0,0.08)] p-1" />
                      </div>
                   </div>
                </div>
             </div>
             
             <!-- Right Arrow -->
             <button class="carousel-nav-btn absolute right-0 z-30 text-slate-500 hover:text-primary text-[1.15rem] hover:bg-brand transition-all duration-300 w-11 h-11 md:w-12 md:h-12 flex items-center justify-center rounded-full bg-white opacity-100 border-2 border-slate-300 hover:border-brand shadow-md hover:shadow-lg hover:scale-105" data-id="${p.id}" data-dir="1">
               <i class="fa-solid fa-chevron-right"></i>
             </button>
          </div>
          
          <!-- Thumbnails -->
          <div class="w-full flex gap-3 md:gap-5 justify-center py-2 relative z-10" id="thumbs-${p.id}">
             ${images.map((img, idx) => `
               <div class="thumb-box w-20 h-14 md:w-28 md:h-16 flex-shrink-0 cursor-pointer overflow-hidden transition-all duration-300 
                           ${idx === 0 ? 'bg-white rounded-lg border-[2px] border-brand shadow-md' : 'bg-gray-100/50 rounded-lg hover:bg-gray-200/50 border-[2px] border-transparent blur-[0.3px]'}"
                    data-id="${p.id}" data-index="${idx}">
                  <img src="${img.src}" class="w-full h-full object-contain p-[2px] mix-blend-multiply ${idx !== 0 ? 'opacity-80 grayscale-[20%]' : ''}" alt="${img.alt}"/>
               </div>
             `).join('')}
          </div>
          
        </div>
      </div>
      
      <!-- Section 2: Technical Specification -->
      ${Object.keys(p.specifications || {}).length > 0 ? `
      <div class="mt-20 md:mt-28 mb-10 w-full animate-on-scroll">
         <div class="text-center mb-10 md:mb-14">
            <h2 class="text-[2rem] md:text-[2.5rem] font-bold text-brand tracking-tight">Technical Specification</h2>
         </div>
         
         <div class="max-w-5xl mx-auto overflow-hidden bg-white shadow-sm hover:shadow-md transition-shadow duration-300 rounded-xl border border-gray-200">
            <table class="w-full text-left border-collapse">
               <tbody>
                 ${Object.entries(p.specifications || {}).map(([key, value]) => `
                   <tr class="border-b border-gray-200 last:border-b-0 hover:bg-slate-50 transition-colors duration-200">
                     <th class="w-2/5 md:w-[35%] align-middle py-4 px-5 md:py-6 md:px-8 border-r border-gray-200 text-slate-900 font-bold text-[0.95rem] md:text-[1.05rem]">
                       ${key}
                     </th>
                     <td class="w-3/5 md:w-[65%] align-middle py-4 px-5 md:py-6 md:px-8 text-slate-600 text-[0.95rem] md:text-[1.05rem] leading-relaxed">
                       ${value}
                     </td>
                   </tr>
                 `).join('')}
               </tbody>
            </table>
         </div>
      </div>
      ` : ''}
      
      <!-- Section 3: Application Industries -->
      <div class="mt-20 md:mt-28 mb-16 w-full animate-on-scroll">
         <div class="text-center mb-10 md:mb-12">
            <h2 class="text-[2rem] md:text-[2.5rem] font-bold text-brand tracking-tight">Application Industries</h2>
         </div>
         
         <!-- Horizontal Scroll Container -->
         <div class="relative w-full">
            <div class="w-full overflow-x-auto pb-8 pt-2 snap-x snap-mandatory flex ${justifyCls} gap-3 sm:gap-4 md:gap-5 lg:gap-6 px-1 scroll-smooth" style="scrollbar-width: thin; scrollbar-color: #cbd5e1 transparent;">
               ${appImages.map(img => `
                  <div class="flex-shrink-0 snap-start bg-white
                              w-[calc(50%-0.375rem)] sm:w-[calc(50%-0.5rem)] md:w-[calc(33.333%-0.85rem)] lg:w-[calc(25%-1.125rem)]
                              rounded-xl border-[2px] border-brand/20 hover:border-brand shadow-[0_2px_10px_-3px_rgba(0,0,0,0.05)] hover:shadow-lg transition-all duration-300 overflow-hidden group">
                      <div class="w-full h-36 sm:h-40 md:h-48 lg:h-52 overflow-hidden bg-slate-50">
                         <img src="${img.src}" alt="${img.alt}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[600ms] ease-out mix-blend-multiply" />
                      </div>
                  </div>
               `).join('')}
            </div>
         </div>

         <!-- Mobile Swipe Indicator -->
         <div class="flex justify-center mt-2 lg:hidden">
            <div class="flex items-center gap-2 text-slate-400 text-[0.85rem] bg-slate-50 px-4 py-1.5 rounded-full border border-gray-100 shadow-sm animate-pulse">
               <i class="fa-solid fa-arrows-left-right"></i>
               <span>Swipe to explore industries</span>
            </div>
         </div>
      </div>
      
    </div>
  `;

  container.innerHTML = html;

  // Register Carousel State
  carouselsData[p.id] = {
    index: 1, // Start at index 1 (skipping cloned last image)
    totalOriginal: images.length,
    timer: null,
    isTransitioning: false,
    trackEl: document.getElementById(`carousel-track-${p.id}`),
    startX: 0,
    isDown: false
  };

  initCarouselEvents(p.id);
  // Prepare initial position (no transition animation)
  updateCarouselUI(p.id, false);
  startAutoSlide(p.id);
  window.scrollTo({ top: 0, behavior: 'smooth' });
}

function initCarouselEvents(id) {
  const data = carouselsData[id];
  if (!data || !data.trackEl) return;

  const track = data.trackEl;
  const viewportContainer = track.parentElement.parentElement;

  // Hover Events
  viewportContainer.addEventListener('mouseenter', () => stopAutoSlide(id));
  viewportContainer.addEventListener('mouseleave', () => startAutoSlide(id));

  // Arrow Buttons
  document.querySelectorAll(`.carousel-nav-btn[data-id="${id}"]`).forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const dir = parseInt(btn.getAttribute('data-dir'));
      changeSlide(id, dir);
    });
  });

  // Track Event (Infinite Loop Resolution)
  track.addEventListener("transitionend", () => {
    data.isTransitioning = false;

    // If reached cloned Start (which is Original Last Image)
    if (data.index === 0) {
      data.index = data.totalOriginal;
      updateCarouselUI(id, false); // Snap physically
    }
    // If reached cloned End (which is Original First Image)
    if (data.index === data.totalOriginal + 1) {
      data.index = 1;
      updateCarouselUI(id, false); // Snap physically
    }
  });

  // Thumbnails
  document.querySelectorAll(`.thumb-box[data-id="${id}"]`).forEach(box => {
    box.addEventListener('click', (e) => {
      e.preventDefault();
      const realIndex = parseInt(box.getAttribute('data-index'));
      goToSlide(id, realIndex + 1); // Map to track index (offset by clone)
    });
  });

  // Touch and Mouse Swipe logic
  const swipeThreshold = 50;

  // Mouse Drag
  track.addEventListener("mousedown", (e) => {
    stopAutoSlide(id);
    data.isDown = true;
    data.startX = e.clientX;
    track.style.cursor = 'grabbing';
  });
  window.addEventListener("mouseup", (e) => {
    if (!data.isDown) return;
    data.isDown = false;
    track.style.cursor = 'default';
    const diff = e.clientX - data.startX;
    if (diff > swipeThreshold) changeSlide(id, -1);
    else if (diff < -swipeThreshold) changeSlide(id, 1);
    startAutoSlide(id);
  });

  // Touch Swipe
  track.addEventListener("touchstart", (e) => {
    stopAutoSlide(id);
    data.startX = e.touches[0].clientX;
  }, { passive: true });
  track.addEventListener("touchend", (e) => {
    const diff = e.changedTouches[0].clientX - data.startX;
    if (diff > swipeThreshold) changeSlide(id, -1);
    else if (diff < -swipeThreshold) changeSlide(id, 1);
    startAutoSlide(id);
  });
}

function updateCarouselUI(id, animate = true) {
  const data = carouselsData[id];
  if (!data || !data.trackEl) return;

  if (animate) data.isTransitioning = true;

  // Transform horizontal track flawlessly
  data.trackEl.style.transition = animate ? "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)" : "none";
  data.trackEl.style.transform = `translateX(-${data.index * 100}%)`;

  // Determine active visual thumbnail (handling infinite clone edges safely)
  let activeDotIndex = data.index - 1;
  if (activeDotIndex < 0) activeDotIndex = data.totalOriginal - 1;
  if (activeDotIndex >= data.totalOriginal) activeDotIndex = 0;

  // Sync Thumbnails UI
  const thumbContainer = document.getElementById(`thumbs-${id}`);
  if (thumbContainer) {
    const thumbs = thumbContainer.querySelectorAll('.thumb-box');
    thumbs.forEach((th, idx) => {
      const img = th.querySelector('img');
      if (idx === activeDotIndex) {
        th.className = "thumb-box w-20 h-14 md:w-28 md:h-16 flex-shrink-0 cursor-pointer overflow-hidden transition-all duration-300 bg-white rounded-lg border-[2px] border-brand shadow-md";
        img.className = "w-full h-full object-contain p-[2px] mix-blend-multiply";
      } else {
        th.className = "thumb-box w-20 h-14 md:w-28 md:h-16 flex-shrink-0 cursor-pointer overflow-hidden transition-all duration-300 bg-gray-100/50 rounded-lg hover:bg-gray-200/50 border-[2px] border-transparent blur-[0.3px]";
        img.className = "w-full h-full object-contain p-[2px] mix-blend-multiply opacity-80 grayscale-[20%]";
      }
    });
  }
}

function changeSlide(id, dir) {
  const data = carouselsData[id];
  if (!data || data.isTransitioning) return;
  stopAutoSlide(id);
  data.index += dir;
  updateCarouselUI(id, true);
}

function goToSlide(id, targetIndex) {
  const data = carouselsData[id];
  if (!data || data.isTransitioning || data.index === targetIndex) return;
  stopAutoSlide(id);
  data.index = targetIndex;
  updateCarouselUI(id, true);
}

function startAutoSlide(id) {
  stopAutoSlide(id);
  if (!carouselsData[id]) return;
  carouselsData[id].timer = setInterval(() => {
    changeSlide(id, 1);
  }, 4500); // Same pacing as Our Portfolio
}

function stopAutoSlide(id) {
  if (carouselsData[id] && carouselsData[id].timer) {
    clearInterval(carouselsData[id].timer);
    carouselsData[id].timer = null;
  }
}

/**
 * Dynamically updates the page's meta tags for better SEO based on the selected product.
 */
function updateProductSEO(p) {
  if (!p) return;

  // Update window title
  if (p.seoTitle) {
    document.title = p.seoTitle;
  }

  // Update meta description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription && p.seoDescription) {
    metaDescription.setAttribute("content", p.seoDescription);
  }

  // Update Open Graph (Social Sharing) Tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle && p.seoTitle) ogTitle.setAttribute("content", p.seoTitle);

  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription && p.seoDescription) ogDescription.setAttribute("content", p.seoDescription);
}

// Render when DOM loads
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", renderProducts);
} else {
  renderProducts();
}

// Ensure product loads immediately when clicking a header product while already on the product page
window.addEventListener("hashchange", () => {
  if (window.location.hash.includes("#/products")) {
    renderProducts();
  }
});
