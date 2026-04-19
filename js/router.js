import { routes, pageMetadata } from "./config.js";

async function loadFile(path) {
  const res = await fetch(path);
  if (!res.ok) throw new Error(`Failed to load: ${path}`);
  return await res.text();
}

function updateSEO(path) {
  const metadata = pageMetadata[path] || pageMetadata["/home"];

  // Set window title
  document.title = metadata.title;

  // Update standard description
  const metaDescription = document.querySelector('meta[name="description"]');
  if (metaDescription) {
    metaDescription.setAttribute("content", metadata.description);
  }

  // Update Open Graph (Social Sharing) Tags
  const ogTitle = document.querySelector('meta[property="og:title"]');
  if (ogTitle) ogTitle.setAttribute("content", metadata.title);

  const ogDescription = document.querySelector('meta[property="og:description"]');
  if (ogDescription) ogDescription.setAttribute("content", metadata.description);
}

export async function loadRoute() {
  const app = document.getElementById("app");
  const loader = document.getElementById("page-loader");

  // Show loader
  if (loader) {
    loader.classList.remove("hidden");
    loader.classList.remove("opacity-0");
  }

  const fullHash = location.hash.replace("#", "");
  const hashPath = fullHash.split("?")[0] || "/home";
  const page = routes[hashPath] || routes["/home"];

  try {
    // Fetch content immediately
    const htmlContent = await loadFile(page);

    app.innerHTML = htmlContent;

    // Update SEO
    updateSEO(hashPath);

    // Reset scroll position
    window.scrollTo(0, 0);

    if (!window.location.hash) {
      window.location.hash = "#/home";
    }

    const base = page.replace(".html", "");
    loadCSS(`${base}.css`);
    loadJS(`${base}.js`);

    // Force animations to reset / initialize
    setTimeout(() => {
      initScrollAnimations();
    }, 100);

  } catch (error) {
    console.error("Routing error:", error);
    app.innerHTML = `<div class="p-20 text-center"><h2>Page Not Found</h2><p>Sorry, the page you are looking for does not exist.</p><a href="#/home" class="text-brand">Go back home</a></div>`;
  } finally {
    // Hide loader smoothly

    if (screen.width > 768) {
      if (loader) {
        loader.classList.add("opacity-0");
        setTimeout(() => {
          loader.classList.add("hidden");
        }, 200);
      }
    }

    if (screen.width <= 768) {
      if (loader) {
        loader.classList.add("opacity-0");
        setTimeout(() => {
          loader.classList.add("hidden");
        }, 300);
      }
    }
  }
}


// Expose function globally to allow re-triggering for dynamic content
window.initScrollAnimations = function initScrollAnimations() {
  const scrollObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.remove(
            "opacity-0",
            "translate-y-10",
            "-translate-y-10",
            "translate-x-10",
            "-translate-x-10",
            "translate-y-20",
            "-translate-y-20",
            "translate-x-20",
            "-translate-x-20",
            "scale-95"
          );
          scrollObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.05 }
  );

  document
    .querySelectorAll(".animate-on-scroll")
    .forEach((el) => scrollObserver.observe(el));
}

function loadCSS(href) {
  removeOld("page-style");
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  link.id = "page-style";
  document.head.appendChild(link);
}

function loadJS(src) {
  removeOld("page-script");
  const script = document.createElement("script");
  // Use timestamp to bypass cache
  script.src = src + "?v=" + new Date().getTime();
  script.type = "module";
  script.id = "page-script";
  document.body.appendChild(script);
}

function removeOld(id) {
  const el = document.getElementById(id);
  if (el) el.remove();
}

window.addEventListener("hashchange", loadRoute);
window.addEventListener("load", loadRoute);

