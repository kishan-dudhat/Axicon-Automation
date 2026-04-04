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
    currentCategory: "all",
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

    // Category Filter clicks
    const filterContainer = document.getElementById("blog-filters");
    if (filterContainer) {
        filterContainer.addEventListener("click", (e) => {
            const btn = e.target.closest(".filter-btn");
            if (!btn) return;

            // Update UI
            document.querySelectorAll(".filter-btn").forEach(el => el.classList.remove("active"));
            btn.classList.add("active");

            // Update State
            state.currentCategory = btn.dataset.category;
            state.visibleCount = CONFIG.itemsPerPage;
            applyFilters();
        });
    }

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
 * Filter data based on category
 */
function applyFilters() {
    if (state.currentCategory === "all") {
        state.filteredData = [...blogData];
    } else {
        state.filteredData = blogData.filter(item =>
            item.category.toLowerCase().includes(state.currentCategory.toLowerCase())
        );
    }
    renderBlogList();
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
            <div class="card-image-wrapper">
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
                
                <div class="card-footer">
                    <a href="#/blog?slug=${post.slug}" class="read-more-link">
                        Read Analytics
                        <i class="fa-solid fa-arrow-right-long"></i>
                    </a>
                </div>
            </div>
        </article>
    `;

    // Trigger entrance animation
    setTimeout(() => {
        div.classList.remove("opacity-0", "translate-y-10");
    }, 50);

    return div;
}

/**
 * Render the Single Blog Post Detail View
 */
function renderSinglePost(slug) {
    const listView = document.getElementById("blog-list-view");
    const postView = document.getElementById("blog-post-view");
    const postContent = document.getElementById("post-content");

    const post = blogData.find(p => p.slug === slug);

    if (!post) {
        window.location.hash = "#/blog";
        return;
    }

    // Update SEO Meta Tags
    document.title = `${post.title} | ${CONFIG.siteName}`;
    updateMetaDescription(post.seo.metaDescription || post.description);
    injectJSONLD(post);

    // Switch views
    listView.classList.add("hidden");
    postView.classList.remove("hidden");
    window.scrollTo(0, 0);

    // Build Post HTML with Premium Structure
    postContent.innerHTML = `
        <article class="post-detail-container animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
            <header class="post-header">
                <div class="flex flex-wrap justify-center items-center gap-4 mb-8">
                    <span class="px-5 py-2 bg-brand/5 text-brand rounded-full text-xs font-extrabold uppercase tracking-widest border border-brand/10">
                        ${post.category}
                    </span>
                    <span class="text-slate-400 text-sm font-bold">
                        <i class="fa-regular fa-calendar-days mr-2 text-brand"></i> ${formatDate(post.date)}
                    </span>
                </div>
                <h1 class="post-title">
                    ${post.title}
                </h1>
                <p class="text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed font-light">
                    ${post.description}
                </p>
            </header>

            <div class="post-featured-img-wrapper">
                <img src="${post.image}" 
                     alt="${post.alt}" 
                     class="w-full h-full object-cover transition-transform duration-[3s] hover:scale-105"
                     onerror="this.src='${CONFIG.placeholderBase}${post.id}'">
            </div>

            <div class="post-body max-w-none">
                <h2 class="text-4xl">Technical Innovation Overview</h2>
                <p>${post.description}</p>
                
                <p>The strategic implementation of high-precision ${post.category} technology in <strong>${post.city}, ${post.state}</strong> has established a new benchmark for manufacturing excellence. By integrating Axicon Automation's advanced industrial systems, local enterprises are achieving unprecedented levels of efficiency.</p>
                
                <blockquote>
                    "Precision is not an act, it is a habit. Automation is the vehicle that drives that habit into production reality."
                </blockquote>

                <h2 class="text-3xl">Strategic Impact & Results</h2>
                <ul class="space-y-4 mb-12">
                    ${post.industries.map(ind => `<li class="flex items-start gap-3"><i class="fa-solid fa-circle-check text-brand mt-1"></i> Specialized optimization for <strong>${ind}</strong>.</li>`).join('')}
                    <li class="flex items-start gap-3"><i class="fa-solid fa-circle-check text-brand mt-1"></i> Industry-leading ±0.05mm precision threshold.</li>
                    <li class="flex items-start gap-3"><i class="fa-solid fa-circle-check text-brand mt-1"></i> Significant reduction in MTBF (Mean Time Between Failures).</li>
                </ul>

                <p>Axicon Automation continues to lead the <strong>Industry 4.0</strong> revolution in India, providing the tools and technical expertise required for global competitiveness.</p>
            </div>

            <footer class="mt-16 pt-10 border-t border-slate-100 flex flex-wrap items-center justify-between gap-6">
                <div class="flex flex-wrap gap-2">
                    ${post.hashtags.map(tag => `<span class="px-3 py-1 bg-slate-50 text-slate-500 rounded-lg text-xs font-bold hover:bg-brand/10 hover:text-brand transition-colors">${tag}</span>`).join('')}
                </div>
                <div class="flex items-center gap-4">
                    <span class="text-xs font-black text-slate-400 uppercase tracking-widest">Share Project:</span>
                    <div class="flex gap-3">
                        <button class="w-10 h-10 rounded-full bg-slate-50 text-slate-400 hover:bg-brand hover:text-white transition-all"><i class="fa-brands fa-linkedin-in"></i></button>
                        <button class="w-10 h-10 rounded-full bg-slate-50 text-slate-400 hover:bg-green-500 hover:text-white transition-all"><i class="fa-brands fa-whatsapp"></i></button>
                    </div>
                </div>
            </footer>
        </article>
    `;

    // Trigger entrance animation for post
    setTimeout(() => {
        const article = postContent.querySelector("article");
        if (article) article.classList.remove("opacity-0", "translate-y-10");
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
