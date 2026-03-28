const routes = {
  "/home": "/public/pages/home/home.html",
  "/about": "/public/pages/about/about.html",
  "/quality": "/public/pages/queality/queality.html",
  "/services": "/public/pages/services/services.html",
  "/industries": "/public/pages/industries/industries.html",
  "/products": "/public/pages/products/product.html",
  "/contact": "/public/pages/contact-us/contact/contact.html",
  "/inquiry": "/public/pages/contact-us/inquiry/inquiry.html",
  "/virtual-demo": "/public/pages/contact-us/virtual-demo/virtual-demo.html",
};

const pageMetadata = {
  "/home": {
    title: "Axicon Automation | Leader in Laser Marking & Automation",
    description: "Axicon Automation provides state-of-the-art Fiber Laser Marking, Cutting, and Robotic automation solutions for precision industries."
  },
  "/about": {
    title: "About Axicon | Our Story, Awards & Global Presence",
    description: "Learn about Axicon Automation's journey, industry recognition, and our mission to innovate the future of laser technology."
  },
  "/quality": {
    title: "Quality Excellence | Axicon Automation Standards",
    description: "Our commitment to international quality standards and precision engineering ensures long-lasting and reliable industrial systems."
  },
  "/services": {
    title: "Automation Services | Support, Training & Installation",
    description: "Comprehensive technical support, professional installation, and expert training for all Axicon laser and automation systems."
  },
  "/industries": {
    title: "Industrial Applications | Laser Solutions for Every Sector",
    description: "Explore how Axicon laser systems power the automotive, electronics, medical, jewellery, and engineering sectors."
  },
  "/products": {
    title: "Product Catalog | Fiber Laser Marking & Cutting Machines",
    description: "View our full range of industrial fiber laser marking machines, CO2 lasers, and customized automation systems."
  },
  "/contact": {
    title: "Contact Us | Get a Quote from Axicon Automation",
    description: "Ready to upgrade your manufacturing? Contact Axicon Automation today for expert advice and competitive quotes."
  }
};

async function loadFile(path) {
  const res = await fetch(path);
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

  // Random delay between 500ms and 1000ms to show the loader
  const delayMs = Math.floor(Math.random() * 500) + 500;

  // Load file and wait for delay concurrently
  const [htmlContent] = await Promise.all([
    loadFile(page),
    new Promise((resolve) => setTimeout(resolve, delayMs)),
  ]);

  app.innerHTML = htmlContent;
  
  // Update SEO after a small delay to ensure DOM state is captured correctly
  setTimeout(() => updateSEO(hashPath), 100);

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
