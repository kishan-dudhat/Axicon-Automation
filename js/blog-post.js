/**
 * AXICON AUTOMATION — Individual Blog Post Renderer
 * Reads post ID from the URL path: /blog/blog-3.html → id = 3
 * Renders the full post content dynamically from blogData.
 */

import { blogData } from './blog-object.js';

const SITE  = "Axicon Automation";
const BLOG_LIST_URL = "/blog/index.html";

/* ── Helpers ────────────────────────────────────────────── */

function formatDate(dateStr) {
  return new Date(dateStr).toLocaleDateString(undefined, {
    year: 'numeric', month: 'long', day: 'numeric'
  });
}

function setMeta(title, desc) {
  document.title = title;
  const m = document.querySelector('meta[name="description"]');
  if (m) m.setAttribute('content', desc);
  const ot = document.querySelector('meta[property="og:title"]');
  if (ot) ot.setAttribute('content', title);
  const od = document.querySelector('meta[property="og:description"]');
  if (od) od.setAttribute('content', desc);
}

function injectSchema(post) {
  const old = document.getElementById('blog-schema');
  if (old) old.remove();
  const schema = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.description,
    "image": post.image,
    "datePublished": post.date,
    "author": { "@type": "Organization", "name": SITE },
    "publisher": { "@type": "Organization", "name": SITE,
      "logo": { "@type": "ImageObject",
        "url": "https://www.axiconautomation.com/assets/images/axicon-automation-logo.webp" }
    },
    "mainEntityOfPage": { "@type": "WebPage", "@id": window.location.href },
    "keywords": (post.seo?.keywords || []).join(', ')
  };
  const s = document.createElement('script');
  s.id = 'blog-schema';
  s.type = 'application/ld+json';
  s.text = JSON.stringify(schema);
  document.head.appendChild(s);
}

/* ── Main renderer ──────────────────────────────────────── */

function renderPost() {
  // Extract post ID from URL: /blog/blog-7.html → 7
  const match = window.location.pathname.match(/blog-(\d+)\.html/i);
  if (!match) { window.location.href = BLOG_LIST_URL; return; }

  const id   = parseInt(match[1], 10);
  const post = blogData.find(p => p.id === id);

  if (!post) { window.location.href = BLOG_LIST_URL; return; }

  // ── SEO update ──────────────────────────────────────────
  const seoTitle = post.seo?.metaTitle || `${post.title} | ${SITE}`;
  const seoDesc  = post.seo?.metaDescription || post.description;
  setMeta(seoTitle, seoDesc);
  injectSchema(post);

  const canonical = document.querySelector('link[rel="canonical"]');
  if (canonical) canonical.href =
    `https://www.axiconautomation.com/blog/blog-${post.id}.html`;

  // ── Content render ──────────────────────────────────────
  const container = document.getElementById('blog-post-container');
  if (!container) return;

  const industries = (post.industries || [])
    .map(ind => `
      <li class="flex items-start gap-3 p-4 bg-slate-50 rounded-xl border border-slate-100">
        <i class="fa-solid fa-square-check text-brand mt-0.5 shrink-0"></i>
        <span class="text-slate-700">Advanced automation tailored for <strong>${ind}</strong></span>
      </li>`).join('');

  // Prev / Next navigation
  const allIds = blogData.map(p => p.id).sort((a,b)=>a-b);
  const currentIndex = allIds.indexOf(id);
  const prevId = currentIndex > 0 ? allIds[currentIndex - 1] : null;
  const nextId = currentIndex < allIds.length - 1 ? allIds[currentIndex + 1] : null;
  const prevPost = prevId ? blogData.find(p => p.id === prevId) : null;
  const nextPost = nextId ? blogData.find(p => p.id === nextId) : null;

  container.innerHTML = `

    <!-- ── Hero Image ─────────────────────────────────── -->
    <section class="relative w-full h-[50vh] md:h-[60vh] lg:h-[70vh] min-h-[300px]
                    flex items-center justify-center overflow-hidden bg-slate-900 pt-16">
      <div class="absolute inset-0 bg-black/45 z-10"></div>
      <img src="${post.image}"
           class="absolute inset-0 w-full h-full object-cover"
           alt="${post.alt || post.title}"
           loading="eager"
           onerror="this.src='/assets/images/blog/hero-industrial.png'">
    </section>

    <!-- ── Article Wrapper ────────────────────────────── -->
    <div class="bg-white">
      <div class="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">

        <!-- Category badge + heading -->
        <div class="mb-10">
          <span class="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase
                       tracking-widest bg-blue-50 text-brand border border-blue-100 mb-6">
            <i class="fa-solid fa-microchip"></i>${post.category} Insights
          </span>

          <h1 class="text-3xl sm:text-4xl md:text-5xl font-extrabold text-slate-900 leading-tight mb-6
                     animate-on-scroll opacity-0 translate-y-10"
              style="font-family:'Outfit',sans-serif;">
            ${post.title}
          </h1>

          <p class="text-slate-500 text-lg leading-relaxed max-w-3xl animate-on-scroll opacity-0 translate-y-10">
            ${post.description}
          </p>
        </div>

        <!-- Meta bar -->
        <div class="flex flex-wrap items-center justify-between gap-4 py-6
                    border-y border-slate-100 mb-12">
          <nav class="flex items-center gap-2 text-slate-400 text-xs font-black uppercase tracking-widest">
            <a href="${BLOG_LIST_URL}" class="hover:text-brand transition-colors">All Insights</a>
            <i class="fa-solid fa-chevron-right text-[8px]"></i>
            <span class="text-slate-700 capitalize">${post.category}</span>
          </nav>
          <div class="flex items-center gap-4 text-slate-500 text-xs font-bold uppercase tracking-widest">
            <span><i class="fa-regular fa-calendar-days text-brand mr-1.5"></i>${formatDate(post.date)}</span>
            <span class="h-3 w-px bg-slate-200"></span>
            <span><i class="fa-regular fa-clock text-brand mr-1.5"></i>${post.readTime}</span>
          </div>
        </div>

        <!-- Article content -->
        <article class="prose prose-slate prose-lg max-w-none">

          <p class="text-xl font-semibold text-slate-800 border-l-4 border-brand pl-6 mb-10 leading-relaxed">
            ${post.description}
          </p>

          <!-- Key highlights box -->
          <div class="not-prose my-10 p-8 bg-gradient-to-br from-blue-50 to-slate-50
                      rounded-2xl border border-blue-100 animate-on-scroll opacity-0 translate-y-10">
            <h4 class="flex items-center gap-2 font-bold text-slate-900 mb-5">
              <i class="fa-solid fa-bolt text-brand"></i> Key Highlights
            </h4>
            <div class="grid sm:grid-cols-2 gap-3">
              <span class="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <span class="w-2 h-2 rounded-full bg-brand shrink-0"></span>High Precision (±0.03–0.05mm)
              </span>
              <span class="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <span class="w-2 h-2 rounded-full bg-brand shrink-0"></span>Industrial Grade Durability
              </span>
              <span class="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <span class="w-2 h-2 rounded-full bg-brand shrink-0"></span>Integrated PLC / CNC Control
              </span>
              <span class="flex items-center gap-2 text-sm font-semibold text-slate-700">
                <span class="w-2 h-2 rounded-full bg-brand shrink-0"></span>24/7 Production Ready
              </span>
            </div>
          </div>

          <h2 id="overview">Advancing Industrial Standards in ${post.city}</h2>
          <p>Axicon Automation's advanced <strong>${post.category}</strong> systems deployed in
             <strong>${post.city}, ${post.state}</strong> are redefining precision manufacturing.
             By integrating state-of-the-art laser technology, local enterprises are achieving
             unprecedented efficiency and product quality.</p>

          <!-- CTA block -->
          <div class="not-prose my-14 p-10 md:p-14 bg-slate-900 rounded-3xl
                      flex flex-col md:flex-row items-center justify-between gap-8
                      animate-on-scroll opacity-0 translate-y-10">
            <div class="md:max-w-xl text-center md:text-left">
              <h3 class="text-white text-2xl md:text-3xl font-extrabold mb-3"
                  style="font-family:'Outfit',sans-serif;">
                Need a customized automation solution?
              </h3>
              <p class="text-slate-300 leading-relaxed">
                Our industrial engineering experts are ready to consult on your specific
                production challenges — free of charge.
              </p>
            </div>
            <a href="https://wa.me/919978430431" target="_blank"
               class="shrink-0 inline-flex items-center gap-3 px-8 py-4
                      bg-brand hover:bg-blue-600 text-white rounded-2xl font-bold
                      text-sm uppercase tracking-wider shadow-lg hover:scale-105 transition-all">
              <i class="fa-brands fa-whatsapp text-2xl"></i>Chat with Expert
            </a>
          </div>

          <h2 id="industries">Industries Served in ${post.state}</h2>
          <ul class="not-prose space-y-3 my-6">${industries}</ul>

          <h2 id="specs">Technical Specifications</h2>
          <div class="not-prose grid sm:grid-cols-2 gap-4 my-6">
            <div class="p-5 border border-slate-100 rounded-xl bg-slate-50 shadow-sm">
              <p class="text-[10px] uppercase tracking-widest text-brand font-black mb-1">Standard Accuracy</p>
              <p class="text-lg font-bold text-slate-900">±0.03mm — 0.05mm</p>
            </div>
            <div class="p-5 border border-slate-100 rounded-xl bg-slate-50 shadow-sm">
              <p class="text-[10px] uppercase tracking-widest text-brand font-black mb-1">Duty Cycle</p>
              <p class="text-lg font-bold text-slate-900">24/7 Continuous Operation</p>
            </div>
            <div class="p-5 border border-slate-100 rounded-xl bg-slate-50 shadow-sm">
              <p class="text-[10px] uppercase tracking-widest text-brand font-black mb-1">Warranty</p>
              <p class="text-lg font-bold text-slate-900">1 Year On-Site Support</p>
            </div>
            <div class="p-5 border border-slate-100 rounded-xl bg-slate-50 shadow-sm">
              <p class="text-[10px] uppercase tracking-widest text-brand font-black mb-1">Certification</p>
              <p class="text-lg font-bold text-slate-900">ISO & CE Compliant</p>
            </div>
          </div>

        </article>

        <!-- ── Footer bar ──────────────────────────────── -->
        <div class="mt-14 pt-8 border-t border-slate-100
                    flex flex-wrap items-center justify-between gap-4">
          <!-- Share -->
          <div class="flex items-center gap-3">
            <span class="text-xs font-black text-slate-400 uppercase tracking-widest">Share:</span>
            <a href="https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(window.location.href)}"
               target="_blank"
               class="w-9 h-9 rounded-full bg-slate-100 hover:bg-blue-700 hover:text-white
                      text-slate-500 flex items-center justify-center transition-all">
              <i class="fa-brands fa-linkedin-in"></i>
            </a>
            <a href="https://wa.me/?text=${encodeURIComponent(post.title + ' — ' + window.location.href)}"
               target="_blank"
               class="w-9 h-9 rounded-full bg-slate-100 hover:bg-green-500 hover:text-white
                      text-slate-500 flex items-center justify-center transition-all">
              <i class="fa-brands fa-whatsapp"></i>
            </a>
            <button onclick="navigator.clipboard.writeText(window.location.href).then(()=>alert('Link copied!'))"
                    class="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-800 hover:text-white
                           text-slate-500 flex items-center justify-center transition-all">
              <i class="fa-solid fa-link"></i>
            </button>
          </div>
          <a href="${BLOG_LIST_URL}"
             class="text-sm font-bold text-brand hover:underline flex items-center gap-2">
            <i class="fa-solid fa-arrow-left"></i>All Industrial Insights
          </a>
        </div>

        <!-- ── Prev / Next navigation ──────────────────── -->
        <div class="mt-10 grid grid-cols-1 sm:grid-cols-2 gap-4">
          ${prevPost ? `
          <a href="/blog/blog-${prevPost.id}.html"
             class="group flex items-center gap-4 p-5 border border-slate-200 rounded-2xl
                    hover:border-brand hover:bg-blue-50 transition-all">
            <i class="fa-solid fa-arrow-left text-slate-400 group-hover:text-brand transition-colors"></i>
            <div>
              <p class="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Previous</p>
              <p class="text-sm font-semibold text-slate-700 group-hover:text-brand line-clamp-2">
                ${prevPost.title}
              </p>
            </div>
          </a>` : '<div></div>'}

          ${nextPost ? `
          <a href="/blog/blog-${nextPost.id}.html"
             class="group flex items-center justify-end gap-4 p-5 border border-slate-200 rounded-2xl
                    hover:border-brand hover:bg-blue-50 transition-all text-right">
            <div>
              <p class="text-xs text-slate-400 font-bold uppercase tracking-wider mb-1">Next</p>
              <p class="text-sm font-semibold text-slate-700 group-hover:text-brand line-clamp-2">
                ${nextPost.title}
              </p>
            </div>
            <i class="fa-solid fa-arrow-right text-slate-400 group-hover:text-brand transition-colors"></i>
          </a>` : '<div></div>'}
        </div>

      </div>
    </div>
  `;

  window.scrollTo(0, 0);
  setTimeout(() => window.initScrollAnimations?.(), 120);
}

renderPost();
