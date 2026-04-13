/**
 * Product2 Interactive Logic
 * Handles carousels, scroll animations, and header/navigation interactively.
 */

document.addEventListener('DOMContentLoaded', () => {
    initScrollAnimations();
    initCarousels();
    initHeaderLogic();
});

/**
 * Scroll Animations using Intersection Observer
 */
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('appear');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });
}

/**
 * Image Carousel Logic
 */
const carouselsData = {};

function initCarousels() {
    const tracks = document.querySelectorAll('.carousel-track');
    tracks.forEach(track => {
        const id = track.id.split('-').pop();
        const images = track.querySelectorAll('.carousel-item');
        const originalCount = images.length - 2; // Subtract clones

        carouselsData[id] = {
            index: 1,
            totalOriginal: originalCount,
            isTransitioning: false,
            trackEl: track,
            timer: null
        };

        // Navigation buttons
        document.querySelectorAll(`.carousel-nav-btn[data-id="${id}"]`).forEach(btn => {
            btn.addEventListener('click', () => {
                const dir = parseInt(btn.getAttribute('data-dir'));
                changeSlide(id, dir);
            });
        });

        // Thumbnails
        document.querySelectorAll(`.thumb-box[data-id="${id}"]`).forEach(thumb => {
            thumb.addEventListener('click', () => {
                const index = parseInt(thumb.getAttribute('data-index'));
                goToSlide(id, index + 1);
            });
        });

        // Infinite loop handling
        track.addEventListener('transitionend', () => {
            const data = carouselsData[id];
            data.isTransitioning = false;
            
            if (data.index === 0) {
                data.index = data.totalOriginal;
                updateCarouselUI(id, false);
            } else if (data.index === data.totalOriginal + 1) {
                data.index = 1;
                updateCarouselUI(id, false);
            }
        });

        // Auto-slide
        startAutoSlide(id);
        
        // Pause on hover
        const viewport = track.closest('.carousel-viewport');
        if (viewport) {
            viewport.addEventListener('mouseenter', () => stopAutoSlide(id));
            viewport.addEventListener('mouseleave', () => startAutoSlide(id));
        }
    });
}

function updateCarouselUI(id, animate = true) {
    const data = carouselsData[id];
    if (!data) return;

    if (animate) data.isTransitioning = true;
    data.trackEl.style.transition = animate ? "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)" : "none";
    data.trackEl.style.transform = `translateX(-${data.index * 100}%)`;

    // Active visual thumbnail
    let activeIndex = data.index - 1;
    if (activeIndex < 0) activeIndex = data.totalOriginal - 1;
    if (activeIndex >= data.totalOriginal) activeIndex = 0;

    const thumbContainer = document.querySelector(`.thumbnails-container[data-id="${id}"]`);
    if (thumbContainer) {
        thumbContainer.querySelectorAll('.thumb-box').forEach((thumb, idx) => {
            if (idx === activeIndex) {
                thumb.classList.add('active');
            } else {
                thumb.classList.remove('active');
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
    startAutoSlide(id);
}

function goToSlide(id, targetIndex) {
    const data = carouselsData[id];
    if (!data || data.isTransitioning || data.index === targetIndex) return;
    stopAutoSlide(id);
    data.index = targetIndex;
    updateCarouselUI(id, true);
    startAutoSlide(id);
}

function startAutoSlide(id) {
    stopAutoSlide(id);
    carouselsData[id].timer = setInterval(() => {
        changeSlide(id, 1);
    }, 5000);
}

function stopAutoSlide(id) {
    if (carouselsData[id] && carouselsData[id].timer) {
        clearInterval(carouselsData[id].timer);
        carouselsData[id].timer = null;
    }
}

/**
 * Mobile Navigation & Scroll Header Logic
 * (Ported from header.js for standalone use)
 */
function initHeaderLogic() {
    const navbar = document.getElementById("main-navbar");
    const hero = document.getElementById("hero-top-bar");
    const mobileMenu = document.getElementById("mobile-menu");
    const toggleBtn = document.getElementById("mobile-menu-toggle");
    const mobileBtnClose = document.getElementById("mobile-menu-close");
    const mobileOverlay = document.getElementById("mobileOverlay");
    const productsBtn = document.getElementById("products-btn");
    const productsPanel = document.getElementById("products-panel");
    const contactUsBtn = document.getElementById("contact-us-btn");
    const contactUsPanel = document.getElementById("contact-us-panel");

    if (!navbar) return;

    // Sticky Navbar Logic
    window.addEventListener("scroll", () => {
        const y = window.scrollY;
        if (y > 50) {
            navbar.classList.add("sticky-nav");
            if (hero) hero.classList.add("hidden");
        } else {
            navbar.classList.remove("sticky-nav");
            if (hero) hero.classList.remove("hidden");
        }
    });

    // Mobile Menu Toggle
    if (toggleBtn) {
        toggleBtn.addEventListener("click", () => {
            mobileMenu.classList.add("is-open");
            mobileOverlay.classList.remove("opacity-0", "pointer-events-none");
            mobileOverlay.classList.add("opacity-100");
            document.body.style.overflow = 'hidden';
        });
    }

    const closeHandler = () => {
        mobileMenu.classList.remove("is-open");
        mobileOverlay.classList.add("opacity-0", "pointer-events-none");
        mobileOverlay.classList.remove("opacity-100");
        document.body.style.overflow = '';
    };

    if (mobileBtnClose) mobileBtnClose.addEventListener("click", closeHandler);
    if (mobileOverlay) mobileOverlay.addEventListener("click", closeHandler);

    // Accordions
    if (productsBtn) {
        productsBtn.addEventListener("click", () => {
            productsPanel.classList.toggle("is-open");
            productsBtn.querySelector('i').classList.toggle("rotate-180");
        });
    }

    if (contactUsBtn) {
        contactUsBtn.addEventListener("click", () => {
            contactUsPanel.classList.toggle("is-open");
            contactUsBtn.querySelector('i').classList.toggle("rotate-180");
        });
    }
}
