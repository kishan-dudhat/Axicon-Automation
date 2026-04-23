import { homeProducts } from './productlist.js';

function renderProductCards() {
    const grid = document.getElementById('productListGrid');
    const loader = document.getElementById('productGridLoader');

    if (!grid) return;

    // Use a small delay for smoother transition with SPA loader
    setTimeout(() => {
        if (loader) loader.remove();

        if (!homeProducts || homeProducts.length === 0) {
            grid.innerHTML = `<div class="col-span-full py-20 text-center">
                <i class="fa-solid fa-triangle-exclamation text-4xl text-amber-500 mb-4"></i>
                <p class="text-slate-500">No products found in the catalog.</p>
            </div>`;
            return;
        }

        grid.innerHTML = homeProducts.map((p, index) => `
        
        <div class="product-card flex flex-col justify-between h-auto rounded-3xl bg-white border border-slate-300 hover:border-slate-400 shadow-sm hover:shadow-xl hover:-translate-y-2 transition-all duration-500 cursor-pointer animate-on-scroll opacity-0 translate-y-10 overflow-hidden" style="transition-delay: ${index * 50}ms">

           <a href="${p.navigatelink}" class="flex flex-col h-full">
                <!-- Image Container -->
                <div class="relative w-full h-64 overflow-hidden rounded-t-[22px] bg-slate-50 flex items-center justify-center p-6 group">
                    <img src="${p.image}" alt="${p.name}" class="object-contain h-full w-full transition-transform duration-700 ease-out cursor-pointer">
                </div>
                
                <!-- Content Area -->
                <div class="p-8 text-left flex-grow flex flex-col justify-between border-t border-slate-50">
                    <div>
                        <h3 class="text-xl font-bold text-slate-900 mb-3 leading-tight hover:text-brand transition-colors cursor-pointer">${p.name}</h3>
                        <p class="text-secondary text-sm leading-relaxed line-clamp-3 mb-6">${p.description}</p>
                    </div>
                    
                    <div class="flex items-center justify-between mt-auto pt-6 border-t border-slate-50">
                        <div class="inline-flex items-center gap-2 text-brand font-bold text-sm hover:translate-x-1 transition-all">
                            Learn More <i class="fa-solid fa-arrow-right-long text-xs"></i>
                        </div>
                    </div>
                </div>
            </a>
        </div>
        `).join('');

        // Re-initialize intersection observer for entry animations
        initAnimations();
    }, 100);
}

function initAnimations() {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.remove('opacity-0', 'translate-y-10');
                entry.target.classList.add('opacity-100', 'translate-y-0');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.animate-on-scroll').forEach(el => observer.observe(el));
}

// Execute when page loads
renderProductCards();
