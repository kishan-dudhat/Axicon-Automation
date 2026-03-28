/**
 * Industries Page Performance Script
 * Handles dynamic grid generation and scroll-based reveal animations.
 */

import industriesData from './industries-object.js';

// Initialize directly for SPA fragment loading
initIndustries();

/**
 * Initializes the industries grid and reveal animations.
 */
function initIndustries() {
    const grid = document.getElementById('industries-grid');
    if (!grid) return;

    // Clear existing content if any
    grid.innerHTML = '';

    // Generate Cards
    industriesData.forEach((industry, index) => {
        const card = createIndustryCard(industry, index);
        grid.appendChild(card);
    });

    // Initialize Intersection Observer for the newly added cards
    initRevealObserver();
}

/**
 * Creates an industry card element from data.
 * @param {Object} industry Data for the specific industry.
 * @param {number} index Index for staggered animations.
 * @returns {HTMLElement} The card element.
 */
function createIndustryCard(industry, index) {
    const col = document.createElement('div');
    // Staggered reveal effect classes
    col.className = `industries-animate-in opacity-0 translate-y-10 transition-all duration-700`;
    col.style.transitionDelay = `${(index % 4) * 150}ms`;

    col.innerHTML = `
        <div class="industry-card group">
            <div class="industry-card-image-box">
                <img src="${industry.image}" 
                     alt="${industry.alt}" 
                     class="industry-card-image" 
                     loading="lazy">
            </div>
            <div class="industry-card-footer">
                <h4 class="industry-card-name underline-offset-4 group-hover:underline transition-all">
                    ${industry.name}
                </h4>
            </div>
        </div>
    `;

    return col;
}

/**
 * Monitors cards as they enter the viewport to trigger fade-in animations.
 */
function initRevealObserver() {
    const cards = document.querySelectorAll('.industries-animate-in');
    
    const observerOptions = {
        threshold: 0.15,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible', 'opacity-100', 'translate-y-0');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    cards.forEach(card => observer.observe(card));
}
