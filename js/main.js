/*
 Load a reusable UI component (header, footer, etc.)
 by fetching its HTML, CSS, and JS dynamically.
 Uses absolute paths so this works from any page depth.
*/
async function loadComponent(name) {
  const container = document.getElementById(name);
  if (!container) return;

  const base = `/components/${name}/${name}`;

  const html = await fetch(`${base}.html`).then(r => r.text());
  container.innerHTML = html;

  injectCSS(`${base}.css`, `${name}-style`);
  injectJS(`${base}.js`, `${name}-script`);
}

/*
 Dynamically inject a CSS file into <head>
*/
function injectCSS(href, id) {
  if (document.getElementById(id)) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  link.id = id;
  document.head.appendChild(link);
}

/*
 Dynamically inject a JavaScript file into <body>
*/
function injectJS(src, id) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.src = src;
  script.type = "module";
  script.id = id;
  document.body.appendChild(script);
}

/* ======================
   SCROLL ANIMATIONS
   ====================== */

// Expose globally so page scripts can call it after injecting content
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
};

/* ======================
   INITIALIZATION
   ====================== */

// Load header component
loadComponent("header");

// Load footer component
loadComponent("footer");

// Load Lead Popup Form
loadComponent("popupform");

// Initialize scroll animations after page loads
window.addEventListener("load", () => {
  setTimeout(() => window.initScrollAnimations(), 100);
});
