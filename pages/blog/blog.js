import { blogData } from "./blog-object.js";

/**
 * AXICON AUTOMATION — BLOG LOGIC
 * Optimized for Premium Industrial UI & High SEO
 */

// Configuration & State
const CONFIG = {
    itemsPerPage: 6,
    defaultImage: "../../assets/images/blog/hero-industrial.png",
    placeholderBase: "https://picsum.photos/seed/",
    siteName: "Axicon Automation"
};

let state = {
    visibleCount: CONFIG.itemsPerPage,
    filteredData: [...blogData],
};

/**
 * Initialize the Blog Page
 */
export function initBlog() {
    setupEventListeners();
    handleRouting();
}

/**
 * Handle Hash-based Routing within the Blog Page
 */
function handleRouting() {
    const params = new URLSearchParams(window.location.hash.split("?")[1]);
    const slug = params.get("slug");

    if (slug) {
        renderSinglePost(slug);
    } else {
        renderBlogList();
    }
}

/**
 * Set up event listeners for filters and navigation
 */
function setupEventListeners() {
    // Listen for hash changes to support back/forward buttons
    window.addEventListener("hashchange", handleRouting);


    // Load More click
    const loadMoreBtn = document.getElementById("load-more-btn");
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener("click", () => {
            state.visibleCount += CONFIG.itemsPerPage;
            renderBlogList(true); // true = append mode
        });
    }

    // Back to blog button (Single post view)
    const backBtn = document.getElementById("back-to-blog");
    if (backBtn) {
        backBtn.addEventListener("click", () => {
            window.location.hash = "#/blog";
        });
    }
}


/**
 * Render the Grid of Blog Cards
 */
function renderBlogList(append = false) {
    const grid = document.getElementById("blog-grid");
    const listView = document.getElementById("blog-list-view");
    const postView = document.getElementById("blog-post-view");
    const loadMoreContainer = document.getElementById("load-more-container");

    if (!grid) return;

    // Switch views
    listView.classList.remove("hidden");
    postView.classList.add("hidden");

    // Reset Meta for List View
    document.title = `Industrial Insights & Innovation Blog | ${CONFIG.siteName}`;

    const displayData = state.filteredData.slice(0, state.visibleCount);

    if (!append) grid.innerHTML = "";

    if (displayData.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full py-24 text-center animate-on-scroll opacity-0 translate-y-10">
                <i class="fa-solid fa-note-sticky text-6xl text-slate-200 mb-6"></i>
                <h3 class="text-2xl font-bold text-slate-800 mb-2">No articles found in this category</h3>
                <p class="text-slate-500">Please try selecting a different industrial category.</p>
            </div>
        `;
        if (window.initScrollAnimations) window.initScrollAnimations();
        loadMoreContainer.classList.add("hidden");
        return;
    }

    displayData.forEach((post, index) => {
        // Skip already rendered if appending
        if (append && index < state.visibleCount - CONFIG.itemsPerPage) return;

        const card = createBlogCard(post, index);
        grid.appendChild(card);
    });

    // Update Load More visibility
    if (state.visibleCount < state.filteredData.length) {
        loadMoreContainer.classList.remove("hidden");
    } else {
        loadMoreContainer.classList.add("hidden");
    }

    // Re-initialize scroll animations if helper exists
    if (window.initScrollAnimations) window.initScrollAnimations();
}

/**
 * Build a single Blog Card Element
 */
function createBlogCard(post, index) {
    const div = document.createElement("div");
    div.className = "blog-grid-item opacity-0 translate-y-10 transition-all duration-700";
    div.style.transitionDelay = `${(index % 3) * 100}ms`;

    // Premium Cardiovascular Design
    div.innerHTML = `
        <article class="blog-card">
        <a href="#/blog?slug=${post.slug}" class="read-more-link">
            <div class="card-image-wrapper cursor-pointer">
                <span class="card-category-badge">${post.category}</span>
                <img src="${post.image}" 
                     alt="${post.alt || post.title}" 
                     class="card-image w-full h-full object-cover"
                     onerror="this.src='${CONFIG.placeholderBase}${post.id}'">
            </div>
            
            <div class="card-content">
                <div class="card-meta">
                    <span class="meta-item"><i class="fa-regular fa-calendar"></i> ${formatDate(post.date)}</span>
                    <span class="meta-item"><i class="fa-regular fa-clock"></i> ${post.readTime}</span>
                </div>
                
                <h3 class="card-title">
                     <a href="#/blog?slug=${post.slug}">${post.title}</a>
                </h3>
                
                <p class="card-excerpt">
                    ${post.description}
                </p>
                
                <div class="card-footer cursor-pointer font-[600]">
                        Read Analytics
                        <i class="fa-solid fa-arrow-right-long"></i>
                   
                </div>
            </div>
            </a>
        </article>
    `;

    // Trigger entrance animation
    setTimeout(() => {
        div.classList.remove("opacity-0", "translate-y-10");
    }, 50);

    return div;
}

/**
 * Render the Single Blog Post Detail View (Refined & Simplified)
 */
function renderSinglePost(slug) {
    const listView = document.getElementById("blog-list-view");
    const blogHero = document.querySelector("section.relative.w-full.h-\\[50vh\\]"); // Main blog hero
    const postView = document.getElementById("blog-post-view");
    const postContent = document.getElementById("post-content");

    const post = blogData.find(p => p.slug === slug);

    if (!post) {
        window.location.hash = "#/blog";
        return;
    }

    // Hide main blog list and hero
    if (blogHero) blogHero.classList.add("hidden");
    listView.classList.add("hidden");
    postView.classList.remove("hidden");
    window.scrollTo(0, 0);

    // Update SEO (Prioritize SEO-specific titles/descriptions)
    const seoTitle = post.seo?.metaTitle || `${post.title} | ${CONFIG.siteName}`;
    const seoDesc = post.seo?.metaDescription || post.description;

    document.title = seoTitle;
    updateMetaDescription(seoDesc);
    injectJSONLD(post);

    // Build Post HTML (Refined: Title & Description BELOW Hero)
    postContent.innerHTML = `
        <!-- Professional Industrial Hero (Clean Background) -->
        <section class="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] min-h-[300px] flex items-center justify-center overflow-hidden bg-slate-900">
            <div class="absolute inset-0 bg-black/40 z-10"></div>
            <img src="${post.image}" 
                 class="absolute inset-0 w-full h-full object-cover " 
                 alt="${post.alt}"
                 onerror="this.src='${CONFIG.placeholderBase}${post.id}'">
        </section>

        <!-- Premium Title & Header Section (Under Hero) -->
        <div class="bg-white">
            <div class="container mx-auto px-6 py-12 lg:py-16">
                
                <div class="max-w-4xl mx-auto">
                    <!-- Standard Badge & Heading (matches About Page) -->
                    <div class="text-left mb-10 overflow-hidden">
                        <div class="section-badge mb-6 inline-flex animate-on-scroll">
                            <i class="fa-solid fa-microchip"></i>
                            <span>${post.category} Insights</span>
                        </div>
                        
                        <h1 class="section-heading mb-6 animate-on-scroll leading-[1.1] md:text-5xl lg:text-6xl" style="font-family: 'Outfit', sans-serif;">
                            ${post.title}
                        </h1>

                        <p class="text-general-sm text-secondary leading-relaxed opacity-80 animate-on-scroll max-w-3xl">
                            ${post.description}
                        </p>
                    </div>

                    <!-- Refined Navigation & Meta Hub -->
                    <div class="flex flex-wrap items-center justify-between gap-6 py-8 border-y border-slate-100 mb-12">
                        <nav class="flex items-center gap-2 text-slate-400 text-[10px] font-black uppercase tracking-[2px]">
                            <a href="#/blog" class="hover:text-brand transition-colors">Axicon Research</a>
                            <i class="fa-solid fa-chevron-right text-[8px] mt-0.5"></i>
                            <span class="text-slate-800">${post.category}</span>
                        </nav>
                        
                        <div class="flex items-center gap-6 text-slate-500 text-xs font-bold uppercase tracking-widest">
                            <span class="flex items-center gap-2">
                                <i class="fa-regular fa-calendar-days text-brand"></i> ${formatDate(post.date)}
                            </span>
                            <span class="h-4 w-[1px] bg-slate-200"></span>
                            <span class="flex items-center gap-2 font-inter">
                                <i class="fa-regular fa-clock text-brand"></i> ${post.readTime}
                            </span>
                        </div>
                    </div>

                    <!-- Article Content Container -->
                    <article class="prose prose-lg max-w-none text-slate-600 leading-relaxed font-inter">
                        
                        <p class="text-xl font-medium text-slate-800 border-l-4 border-brand pl-6 mb-12">
                            ${post.description}
                        </p>

                        <!-- Key Takeaways (Simplified & Professional) -->
                        <div class="my-16 p-10 bg-slate-50 rounded-2xl border-l-[6px] border-brand shadow-sm">
                            <h4 class="text-slate-900 font-bold mb-6 flex items-center gap-3">
                                <i class="fa-solid fa-check-circle text-brand"></i> Quick Assessment Tags
                            </h4>
                            <div class="grid sm:grid-cols-2 gap-4">
                                <div class="flex items-center gap-3 text-sm font-semibold text-slate-700">
                                    <span class="w-1.5 h-1.5 rounded-full bg-brand"></span> High Precision Accuracy
                                </div>
                                <div class="flex items-center gap-3 text-sm font-semibold text-slate-700">
                                    <span class="w-1.5 h-1.5 rounded-full bg-brand"></span> Industrial Durability
                                </div>
                                <div class="flex items-center gap-3 text-sm font-semibold text-slate-700">
                                    <span class="w-1.5 h-1.5 rounded-full bg-brand"></span> Integrated PLC Control
                                </div>
                                <div class="flex items-center gap-3 text-sm font-semibold text-slate-700">
                                    <span class="w-1.5 h-1.5 rounded-full bg-brand"></span> SCADA Ready System
                                </div>
                            </div>
                        </div>

                        <h2 id="tech-overview">Advancing Industrial Standards in Delhi NCR</h2>
                        <p>The strategic implementation of high-precision ${post.category} technology in <strong>${post.city}, ${post.state}</strong> has established a new benchmark for manufacturing excellence. By integrating Axicon Automation's advanced industrial systems, local enterprises are achieving unprecedented levels of efficiency.</p>

                        <!-- Professional Engineering CTA -->
                        <div class="my-20 p-12 md:p-16 bg-slate-900 rounded-[2.5rem] border border-slate-800 flex flex-col md:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden">
                            <!-- Subtle industrial pattern or glow -->
                            <div class="absolute inset-0 bg-gradient-to-br from-brand/10 to-transparent pointer-events-none"></div>
                            
                            <div class="text-center md:text-left relative z-10 max-w-2xl">
                                <h3 class="text-white text-2xl md:text-4xl font-bold mb-4 tracking-tight leading-tight" style="font-family: 'Outfit', sans-serif;">
                                    Need a customized automation solution?
                                </h3>
                                <p class="text-slate-100 text-base md:text-lg opacity-90 mb-0 leading-relaxed font-medium">
                                    Our industrial engineering experts are ready to provide a detailed technical consultation tailored to your specific production challenges.
                                </p>
                            </div>
                            
                            <div class="relative z-10">
                                <a href="https://wa.me/919978430431" target="_blank" class="inline-flex items-center gap-4 px-12 py-5 bg-brand hover:bg-blue-600 text-white rounded-2xl font-black text-sm uppercase tracking-widest shadow-2xl shadow-brand/30 transition-all duration-300 hover:scale-105 active:scale-95 whitespace-nowrap">
                                    <i class="fa-brands fa-whatsapp text-2xl"></i>
                                    <span>Chat with Expert</span>
                                </a>
                            </div>
                        </div>

                        <blockquote>
                            "Precision is not an act, it is a habit. Automation is the vehicle that drives that habit into production reality."
                        </blockquote>

                        <h2 id="key-benefits">Strategic Impact & Multi-Sector Results</h2>
                        <ul class="space-y-4 mb-12 list-none p-0">
                            ${post.industries.map(ind => `
                                <li class="flex items-start gap-4 p-4 bg-slate-50 rounded-xl border border-slate-100">
                                    <i class="fa-solid fa-square-check text-brand mt-1.5"></i>
                                    <span>Advanced Optimization specifically architected for <strong>${ind}</strong> fabrication.</span>
                                </li>
                            `).join('')}
                        </ul>

                        <!-- Technical Specs Grid (Minimalist) -->
                        <h2 id="specs">Technical Specifications</h2>
                        <div class="grid sm:grid-cols-2 gap-6 my-10">
                            <div class="p-6 border border-slate-100 rounded-xl bg-white shadow-sm">
                                <p class="text-[10px] uppercase tracking-widest text-brand font-black mb-1">Standard Accuracy</p>
                                <p class="text-lg font-bold text-slate-900 mb-0">±0.03mm — 0.05mm</p>
                            </div>
                            <div class="p-6 border border-slate-100 rounded-xl bg-white shadow-sm">
                                <p class="text-[10px] uppercase tracking-widest text-brand font-black mb-1">Operational Duty</p>
                                <p class="text-lg font-bold text-slate-900 mb-0">24/7 Heavy Duty Cycles</p>
                            </div>
                        </div>

                        <!-- FAQ Accordion -->
                        <h2 id="faq">Industry Deep-Dive</h2>
                        <div class="space-y-4 my-10">
                            <details class="group p-5 bg-slate-50 border border-slate-200 rounded-xl">
                                <summary class="font-bold cursor-pointer list-none flex justify-between items-center text-slate-800">
                                    Is Axicon's ${post.category} technology compliant with local standards?
                                    <i class="fa-solid fa-plus group-open:rotate-45 transition-transform text-slate-400"></i>
                                </summary>
                                <p class="mt-4 text-sm text-slate-600 border-t border-slate-200 pt-4 mb-0">
                                    Absolutely. Every system we deploy in <strong>${post.city}</strong> is engineered to meet and exceed national safety and operational standards. We provide full documentation including ISO compliance and IBR certifications where applicable.
                                </p>
                            </details>
                            <details class="group p-5 bg-slate-50 border border-slate-200 rounded-xl">
                                <summary class="font-bold cursor-pointer list-none flex justify-between items-center text-slate-800">
                                    What is the typical ROI period for this automation project?
                                    <i class="fa-solid fa-plus group-open:rotate-45 transition-transform text-slate-400"></i>
                                </summary>
                                <p class="mt-4 text-sm text-slate-600 border-t border-slate-200 pt-4 mb-0">
                                    Based on recent case studies in <strong>${post.state}</strong>, most enterprises realize full ROI within 12–18 months of active deployment, driven by a 40% reduction in material waste.
                                </p>
                            </details>
                        </div>
                    </article>

                    <div class="mt-20 pt-10 border-t border-slate-100 flex flex-wrap items-center justify-between gap-6">
                        <div class="flex items-center gap-4">
                            <span class="text-xs font-black text-slate-400 uppercase tracking-widest">Share Hub:</span>
                            <div class="flex gap-3">
                                <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}" target="_blank"
                                   class="w-10 h-10 rounded-full bg-slate-50 text-slate-400 hover:bg-brand hover:text-white transition-all flex items-center justify-center"><i class="fa-brands fa-linkedin-in"></i></a>
                                <a href="https://wa.me/?text=${encodeURIComponent(post.title + ' ' + window.location.href)}" target="_blank"
                                   class="w-10 h-10 rounded-full bg-slate-50 text-slate-400 hover:bg-green-500 hover:text-white transition-all flex items-center justify-center"><i class="fa-brands fa-whatsapp"></i></a>
                                <button onclick="navigator.clipboard.writeText(window.location.href)" 
                                        class="w-10 h-10 rounded-full bg-slate-50 text-slate-400 hover:bg-slate-900 hover:text-white transition-all flex items-center justify-center"><i class="fa-solid fa-link"></i></button>
                            </div>
                        </div>
                        <button id="back-to-blog-v3" class="text-sm font-bold text-brand hover:underline">
                            <i class="fa-solid fa-arrow-left mr-2"></i> All Industrial Insights
                        </button>
                    </div>
                </div>

            </div>
        </div>
    `;

    // Re-attach listener
    const backBtnV3 = document.getElementById("back-to-blog-v3");
    if (backBtnV3) {
        backBtnV3.addEventListener("click", () => {
            if (blogHero) blogHero.classList.remove("hidden");
            window.location.hash = "#/blog";
        });
    }

    // Scroll to Top & Init
    setTimeout(() => {
        if (window.initScrollAnimations) window.initScrollAnimations();
    }, 50);
}

/**
 * SEO Utility: Update Meta Description
 */
function updateMetaDescription(description) {
    let meta = document.querySelector('meta[name="description"]');
    if (!meta) {
        meta = document.createElement('meta');
        meta.name = "description";
        document.head.appendChild(meta);
    }
    meta.setAttribute("content", description);
}

/**
 * SEO Utility: Inject JSON-LD Schema for BlogPosting
 */
function injectJSONLD(post) {
    // Remove existing blog schema if any
    const existingSchema = document.getElementById("blog-schema");
    if (existingSchema) existingSchema.remove();

    const schema = {
        "@context": "https://schema.org",
        "@type": "BlogPosting",
        "headline": post.title,
        "description": post.description,
        "image": post.image,
        "author": {
            "@type": "Organization",
            "name": CONFIG.siteName
        },
        "publisher": {
            "@type": "Organization",
            "name": CONFIG.siteName,
            "logo": {
                "@type": "ImageObject",
                "url": "https://axiconautomation.com/assets/images/logo.png" // Update with real URL
            }
        },
        "datePublished": post.date,
        "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": window.location.href
        }
    };

    const script = document.createElement('script');
    script.id = "blog-schema";
    script.type = "application/ld+json";
    script.text = JSON.stringify(schema);
    document.head.appendChild(script);
}

/**
 * Utility: Format Date
 */
function formatDate(dateStr) {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateStr).toLocaleDateString(undefined, options);
}

// Auto-run init on load (exported for router use)
initBlog();
