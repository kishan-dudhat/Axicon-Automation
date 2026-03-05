const routes = {
  "/home": "/public/pages/home/home.html",

  "/about": "/public/pages/about/about.html",
  "/company-profile": "/public/pages/about/company-profile.html",
  "/environmental-protection": "/public/pages/about/environmental-protection.html",
  "/mission-vision": "/public/pages/about/mission-vision.html",
  "/awards-achievements": "/public/pages/about/awards-achievements.html",

  "/quality": "/public/pages/queality/queality.html",

  "/services": "/public/pages/services/services.html",

  "/industries": "/public/pages/industries/industries.html",

  "/products": "/public/pages/products/product.html",

  "/contact": "/public/pages/contact/contact.html",


  "/contactForm": "/public/components/contactForm.html"
};

async function loadFile(path) {
  const res = await fetch(path);
  return await res.text();
}

export async function loadRoute() {
  const app = document.getElementById("app");
  const loader = document.getElementById("page-loader");

  // Show loader
  if (loader) {
    loader.classList.remove("hidden");
    loader.classList.remove("opacity-0");
  }

  const hash = location.hash.replace("#", "") || "/";
  const page = routes[hash] || routes["/"];

  // Random delay between 500ms and 1000ms to show the loader
  const delayMs = Math.floor(Math.random() * 500) + 500;

  // Load file and wait for delay concurrently
  const [htmlContent] = await Promise.all([
    loadFile(page),
    new Promise((resolve) => setTimeout(resolve, delayMs)),
  ]);

  app.innerHTML = htmlContent;

  // Reset scroll position to the top of the page
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

  // Hide loader smoothly
  if (loader) {
    loader.classList.add("opacity-0");
    setTimeout(() => {
      loader.classList.add("hidden");
    }, 200); // 300ms matches Tailwind's default duration-300
  }
}

function initScrollAnimations() {
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
    { threshold: 0.05 } // Low threshold ensures it triggers even for tall elements on small screens
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
  // Add timestamp to foil module caching so scripts re-run correctly across routes
  script.src = src + "?t=" + Date.now();
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
