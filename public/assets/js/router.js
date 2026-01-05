const routes = {
  "/": "/public/pages/home/home.html",

  "/about": "/public/pages/about/about.html",
  "/company-profile": "/public/pages/about/company-profile.html",
  "/environmental-protection": "/public/pages/about/environmental-protection.html",
  "/mission-vision": "/public/pages/about/mission-vision.html",
  "/awards-achievements": "/public/pages/about/awards-achievements.html",

  "/quality": "/public/pages/queality/queality.html",

  "/services": "/public/pages/services/services.html",

  "/industries": "/public/pages/industries/industries.html",

  "/products": "/public/pages/products/products.html",
  
  "/contact": "/public/pages/contact/contact.html",
};

async function loadFile(path) {
  const res = await fetch(path);
  return await res.text();
}

export async function loadRoute() {
  const app = document.getElementById("app");
  const hash = location.hash.replace("#", "") || "/";
  const page = routes[hash] || routes["/"];

  app.innerHTML = await loadFile(page);

  const base = page.replace(".html", "");
  loadCSS(`${base}.css`);
  loadJS(`${base}.js`);
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
  script.src = src;
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
