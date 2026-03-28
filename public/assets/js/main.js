/* 
 Import the route loader function.
 This handles client-side routing (SPA navigation).
 */
import { loadRoute } from "./router.js";

/*
 Load a reusable UI component (header, footer, etc.)
 by fetching its HTML, CSS, and JS dynamically.
 */
async function loadComponent(name) {

  // Find the container element where component HTML will be injected
  // Example: <div id="header"></div>
  const container = document.getElementById(name);

  // Base path for component files
  // Example for "header":
  // /public/components/header/header.html
  // /public/components/header/header.css
  // /public/components/header/header.js
  const base = `./public/components/${name}/${name}`;

  /*
   Fetch the HTML file of the component
   - await pauses execution until fetch completes
   - r.text() converts response to HTML string
   */
  const html = await fetch(`${base}.html`).then(r => r.text());

  // Inject HTML into the container
  container.innerHTML = html;

  /*
   Inject component-specific CSS
   - Uses unique ID to prevent duplicate loading
   */
  injectCSS(`${base}.css`, `${name}-style`);

  /*
   Inject component-specific JavaScript
   - Loaded as ES module
   - Prevents duplicate execution
   */
  injectJS(`${base}.js`, `${name}-script`);
}

/*
 Dynamically inject a CSS file into <head>
 */
function injectCSS(href, id) {

  // If stylesheet already exists, do nothing
  if (document.getElementById(id)) return;

  // Create <link> element
  const link = document.createElement("link");

  // Set required attributes
  link.rel = "stylesheet";
  link.href = href;
  link.id = id;

  // Append CSS to document head
  document.head.appendChild(link);
}

/*
 Dynamically inject a JavaScript file into <body>
 */
function injectJS(src, id) {

  // Prevent loading same script multiple times
  if (document.getElementById(id)) return;

  // Create <script> element
  const script = document.createElement("script");

  // Set script source
  script.src = src;

  // Use ES module so imports work
  script.type = "module";

  // Unique ID for duplicate protection
  script.id = id;

  // Append script to body (executes automatically)
  document.body.appendChild(script);
}

/* ======================
   INITIALIZATION (APP BOOTSTRAP)
   ====================== */

// Load header component
loadComponent("header");

// Load footer component
loadComponent("footer");

// Load Lead Popup Form
loadComponent("popupform");

// Initialize SPA routing
loadRoute();
