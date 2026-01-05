import { loadRoute } from "./router.js";

async function loadComponent(name) {
  const container = document.getElementById(name);
  const base = `/public/components/${name}/${name}`;

  const html = await fetch(`${base}.html`).then(r => r.text());
  container.innerHTML = html;

  injectCSS(`${base}.css`, `${name}-style`);
  injectJS(`${base}.js`, `${name}-script`);
}

function injectCSS(href, id) {
  if (document.getElementById(id)) return;
  const link = document.createElement("link");
  link.rel = "stylesheet";
  link.href = href;
  link.id = id;
  document.head.appendChild(link);
}

function injectJS(src, id) {
  if (document.getElementById(id)) return;
  const script = document.createElement("script");
  script.src = src;
  script.type = "module";
  script.id = id;
  document.body.appendChild(script);
}

/* INIT */
loadComponent("header");
loadComponent("footer");
loadRoute();
