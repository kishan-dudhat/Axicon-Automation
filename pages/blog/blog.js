import { blogData } from "./blog-object.js";

/**
 * AXICON AUTOMATION — BLOG LOGIC
 * Handles dynamic grid rendering, filtering, pagination, and single post view.
 */

// Configuration & State
const CONFIG = {
    itemsPerPage: 6,
    defaultImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80&w=1200", // Industrial fallback
    placeholderBase: "https://picsum.photos/seed/",
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

    const displayData = state.filteredData.slice(0, state.visibleCount);

    if (!append) grid.innerHTML = "";

    if (displayData.length === 0) {
        grid.innerHTML = `
            <div class="col-span-full py-20 text-center animate-on-scroll">
                <i class="fa-solid fa-note-sticky text-5xl text-slate-200 mb-4"></i>
                <h3 class="text-xl font-bold text-slate-800">No articles found</h3>
                <p class="text-slate-500">Try selecting a different category.</p>
            </div>
        `;
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
    
    // SEO optimization: use semantic HTML
    div.innerHTML = `
        <article class="blog-card flex flex-col h-full bg-white rounded-3xl overflow-hidden border border-slate-100 hover:shadow-2xl transition-all duration-500">
            <div class="card-image-wrapper relative overflow-hidden aspect-[16/10]">
                <span class="card-category-badge">${post.category.toUpperCase()}</span>
                <img src="${post.image}" 
                     alt="${post.alt || post.title}" 
                     class="card-image w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                     onerror="this.src='${CONFIG.placeholderBase}${post.id}'">
            </div>
            
            <div class="card-content p-8 flex flex-col flex-grow">
                <div class="card-meta flex items-center gap-4 text-xs font-semibold text-slate-400 uppercase tracking-wider mb-4">
                    <span class="flex items-center gap-1.5"><i class="fa-regular fa-calendar text-brand"></i> ${formatDate(post.date)}</span>
                    <span class="flex items-center gap-1.5"><i class="fa-regular fa-clock text-brand"></i> ${post.readTime}</span>
                </div>
                
                <h3 class="card-title text-xl lg:text-2xl font-black text-slate-900 mb-4 line-clamp-2 leading-tight hover:text-brand transition-colors">
                    <a href="#/blog?slug=${post.slug}">${post.title}</a>
                </h3>
                
                <p class="card-excerpt text-slate-500 text-sm lg:text-base line-clamp-3 mb-6 leading-relaxed">
                    ${post.description}
                </p>
                
                <div class="card-footer mt-auto pt-6 border-t border-slate-50">
                    <a href="#/blog?slug=${post.slug}" class="read-more-link group/link inline-flex items-center gap-2 font-bold text-brand uppercase text-xs tracking-widest">
                        Read Full Insight
                        <i class="fa-solid fa-arrow-right-long transition-transform group-hover/link:translate-x-1.5"></i>
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

    // Switch views
    listView.classList.add("hidden");
    postView.classList.remove("hidden");
    window.scrollTo(0, 0);

    // Update Browser SEO Title & Description
    // The router handles base metadata, but we can override for specific posts
    document.title = `${post.seo.metaTitle} | Axicon Automation`;
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) metaDesc.setAttribute("content", post.seo.metaDescription);

    // Build Post HTML
    postContent.innerHTML = `
        <article class="animate-on-scroll opacity-0 translate-y-10 transition-all duration-700">
            <header class="post-header mb-12 text-center lg:text-left">
                <div class="flex flex-wrap justify-center lg:justify-start items-center gap-4 mb-6">
                    <span class="px-4 py-1.5 bg-brand/10 text-brand rounded-full text-xs font-bold uppercase tracking-widest">
                        ${post.category}
                    </span>
                    <span class="text-slate-400 text-sm font-medium">
                        <i class="fa-regular fa-calendar-days mr-1.5"></i> ${formatDate(post.date)}
                    </span>
                </div>
                <h1 class="post-title text-3xl md:text-5xl lg:text-6xl font-black text-slate-900 mb-8 leading-[1.1]">
                    ${post.title}
                </h1>
                <p class="text-lg md:text-xl text-slate-500 max-w-3xl leading-relaxed">
                    ${post.description}
                </p>
            </header>

            <div class="post-featured-image aspect-[21/9] rounded-[2rem] overflow-hidden mb-12 shadow-2xl relative group">
                <img src="${post.image}" 
                     alt="${post.alt}" 
                     class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[2s]"
                     onerror="this.src='${CONFIG.placeholderBase}${post.id}'">
                <div class="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
            </div>

            <div class="grid grid-cols-1 lg:grid-cols-12 gap-12">
                <div class="lg:col-span-8">
                    <div class="post-body prose prose-lg prose-slate max-w-none">
                        <h2 class="text-3xl font-bold text-slate-900 mb-6">Technical Overview</h2>
                        <p>${post.description}</p>
                        
                        <h2 class="text-3xl font-bold text-slate-900 mb-6">Impact on Industry</h2>
                        <p>The implementation of high-precision ${post.category} technology in <strong>${post.city}, ${post.state}</strong> has revolutionized local manufacturing processes. Companies are seeing significant improvements in throughput and quality consistency.</p>
                        
                        <h3 class="text-2xl font-bold text-slate-900 mb-4">Key Benefits:</h3>
                        <ul class="space-y-3 mb-8">
                            ${post.industries.map(ind => `<li>Proven results in <strong>${ind}</strong> applications.</li>`).join('')}
                            <li>Zero-compromise precision with ±0.05mm accuracy.</li>
                            <li>Significant reduction in operational overhead and waste.</li>
                        </ul>

                        <div class="p-8 bg-slate-50 border-l-4 border-brand rounded-r-2xl mb-10 italic text-slate-700 text-xl font-medium leading-relaxed">
                            "Automation is not just about replacing labor; it's about amplifying human potential and precision to levels previously unreachable."
                        </div>

                        <p>As we look towards the future of <strong>Smart Manufacturing</strong>, Axicon Automation remains committed to delivering state-of-the-art solutions that empower Indian industries to compete on a global scale.</p>
                    </div>

                    <div class="post-tags mt-12 flex flex-wrap gap-2">
                        ${post.hashtags.map(tag => `<span class="post-tag text-xs font-bold text-slate-500 bg-slate-100 px-3 py-1 rounded-md hover:bg-brand/10 hover:text-brand transition-colors cursor-default">${tag}</span>`).join('')}
                    </div>
                </div>

                <!-- Sidebar / Related Info -->
                <aside class="lg:col-span-4">
                    <div class="sticky top-32 space-y-8">
                        <!-- Quick Stats -->
                        <div class="p-8 bg-bg-dark rounded-3xl text-white">
                            <h4 class="text-xl font-bold mb-6 flex items-center gap-2">
                                <i class="fa-solid fa-microchip text-brand"></i> Post Details
                            </h4>
                            <div class="space-y-6">
                                <div>
                                    <span class="block text-xs uppercase text-slate-500 font-bold tracking-widest mb-1">Estimated Read</span>
                                    <span class="text-lg font-bold">${post.readTime}</span>
                                </div>
                                <div>
                                    <span class="block text-xs uppercase text-slate-500 font-bold tracking-widest mb-1">Primary Industry</span>
                                    <span class="text-lg font-bold">${post.industries[0]}</span>
                                </div>
                                <div>
                                    <span class="block text-xs uppercase text-slate-500 font-bold tracking-widest mb-1">Application Focus</span>
                                    <span class="text-lg font-bold">${post.category === 'cutting' ? 'Heavy Fabrication' : 'Traceability & Branding'}</span>
                                </div>
                            </div>
                            <a href="#/contact" class="mt-10 w-full inline-flex justify-center items-center gap-2 px-6 py-4 bg-brand hover:bg-brand/90 text-white font-bold rounded-2xl transition-all shadow-lg hover:shadow-brand/20">
                                Get Expert Advice <i class="fa-solid fa-paper-plane text-xs"></i>
                            </a>
                        </div>

                        <!-- Share -->
                        <div class="p-8 border border-slate-100 rounded-3xl text-center">
                            <h4 class="text-sm font-bold text-slate-900 mb-4 uppercase tracking-[0.2em]">Share this insight</h4>
                            <div class="flex justify-center gap-4">
                                <a href="#" class="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-blue-600 hover:text-white transition-all"><i class="fa-brands fa-linkedin-in"></i></a>
                                <a href="#" class="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-green-500 hover:text-white transition-all"><i class="fa-brands fa-whatsapp"></i></a>
                                <a href="#" class="w-10 h-10 flex items-center justify-center rounded-full bg-slate-50 text-slate-400 hover:bg-blue-400 hover:text-white transition-all"><i class="fa-brands fa-twitter"></i></a>
                            </div>
                        </div>
                    </div>
                </aside>
            </div>
        </article>
    `;

    // Trigger entrance animation for post
    setTimeout(() => {
        postContent.querySelector("article").classList.remove("opacity-0", "translate-y-10");
    }, 50);
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
