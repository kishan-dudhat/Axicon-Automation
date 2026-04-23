const navbar = document.getElementById("main-navbar");
const hero = document.getElementById("hero-top-bar");
const desktopNavbar = document.getElementById("desktop-navbar");
const mobileMenu = document.getElementById("mobile-menu");
const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
const mobileMenuIcon = document.getElementById("mobile-menu-icon");
const toggleBtn = document.getElementById("mobile-menu-toggle");
const mobileBtnClose = document.getElementById("mobile-menu-close");
const productsBtn = document.getElementById("products-btn");
const productsPanel = document.getElementById("products-panel");
const contactUsBtn = document.getElementById("contact-us-btn");
const contactUsPanel = document.getElementById("contact-us-panel");
const scrollBtn = document.getElementById("scrollTopBtn");



const navbarManageScroll = () => {
  let last = 0;
  const mobile = innerWidth < 1020;
  const desktop = !mobile;
  const y = scrollY;

  // Mobile → hero hidden, navbar sticky
  if (mobile) {
    hero.classList.add("hidden");
    navbar.classList.add("sticky", "top-0");
    desktopNavbar.classList.add("hidden");
    mobileMenu.classList.remove("hidden");
    mobileMenuToggle.classList.remove("hidden");
    last = y;
    return;
  }

  if (desktop) {
    mobileMenuToggle.classList.add("hidden");
    mobileMenu.classList.add("hidden");
    desktopNavbar.classList.remove("hidden");
  }

  // Desktop → top of page
  if (y === 0) {
    hero.classList.remove("hidden");
    navbar.classList.remove("sticky", "top-0");
    return;
  }

  // After scroll
  const down = y > last;
  hero.classList.toggle("hidden", down);
  navbar.classList.toggle("sticky", down);
  navbar.classList.toggle("top-0", down);

  last = y;
};

addEventListener("scroll", navbarManageScroll);
addEventListener("resize", navbarManageScroll);
navbarManageScroll();




const mobileOverlay = document.getElementById("mobileOverlay");

// --- Mobile Menu Toggle Logic ---
function openMobileMenu() {
  mobileMenu.classList.add("is-open");
  mobileMenu.setAttribute("aria-hidden", "false");

  if (mobileOverlay) {
    mobileOverlay.classList.remove("opacity-0", "pointer-events-none");
    mobileOverlay.classList.add("opacity-100");
  }

  document.body.classList.add("sidebar-open");
  toggleBtn.setAttribute("aria-expanded", "true");
  mobileMenuIcon.classList.remove("fa-list");
  mobileMenuIcon.classList.add("fa-xmark");
}

function closeMobileMenu() {
  mobileMenu.classList.remove("is-open");
  mobileMenu.setAttribute("aria-hidden", "true");

  if (mobileOverlay) {
    mobileOverlay.classList.add("opacity-0", "pointer-events-none");
    mobileOverlay.classList.remove("opacity-100");
  }

  document.body.classList.remove("sidebar-open");
  toggleBtn.setAttribute("aria-expanded", "false");
  mobileMenuIcon.classList.remove("fa-xmark");
  mobileMenuIcon.classList.add("fa-list");
}

toggleBtn.addEventListener("click", () => {
  const isClosed = !mobileMenu.classList.contains("is-open");
  if (isClosed) {
    openMobileMenu();
  } else {
    closeMobileMenu();
  }
});

mobileBtnClose.addEventListener("click", closeMobileMenu);
if (mobileOverlay) {
  mobileOverlay.addEventListener("click", closeMobileMenu);
}

// Auto-close on link click
const mobileNavLinksList = document.querySelectorAll('.mobile-nav-link');
mobileNavLinksList.forEach(link => {
  link.addEventListener("click", closeMobileMenu);
});
// Panels inside accordions matching links
const mobilePanelLinksList = document.querySelectorAll('.mobile-panel a');
mobilePanelLinksList.forEach(link => {
  link.addEventListener("click", closeMobileMenu);
});


// --- Accordions Logic ---
const productsIcon = document.getElementById("products-icon");
productsBtn.addEventListener("click", () => {
  const isOpen = productsPanel.classList.contains("is-open");
  if (!isOpen) {
    productsPanel.classList.add("is-open");
    productsBtn.setAttribute("aria-expanded", "true");
    if (productsIcon) productsIcon.classList.add("rotate-180");
  } else {
    productsPanel.classList.remove("is-open");
    productsBtn.setAttribute("aria-expanded", "false");
    if (productsIcon) productsIcon.classList.remove("rotate-180");
  }
});

const contactUsIcon = document.getElementById("contact-us-icon");
contactUsBtn.addEventListener("click", () => {
  const isOpen = contactUsPanel.classList.contains("is-open");
  if (!isOpen) {
    contactUsPanel.classList.add("is-open");
    contactUsBtn.setAttribute("aria-expanded", "true");
    if (contactUsIcon) contactUsIcon.classList.add("rotate-180");
  } else {
    contactUsPanel.classList.remove("is-open");
    contactUsBtn.setAttribute("aria-expanded", "false");
    if (contactUsIcon) contactUsIcon.classList.remove("rotate-180");
  }
});

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    scrollBtn.classList.remove("hidden", "opacity-0", "translate-y-4");
    scrollBtn.classList.add("opacity-100", "translate-y-0");
  } else {
    scrollBtn.classList.add("opacity-0", "translate-y-4");
    setTimeout(() => scrollBtn.classList.add("hidden"), 300);
  }
});

// Scroll to top smoothly
scrollBtn.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Update active states based on current URL pathname
function updateActiveNavLinks() {
  const currentPath = window.location.pathname;

  // Desktop links
  const desktopLinks = document.querySelectorAll('.desktop-nav .nav-link, .desktop-nav .dropdown-item');
  desktopLinks.forEach(link => {
    link.classList.remove('active');

    const linkHref = link.getAttribute('href');
    if (!linkHref) return;

    // Normalize: strip trailing slash for comparison
    const linkPath = linkHref.replace(/\/$/, '') || '/';
    const pagePath = currentPath.replace(/\/$/, '') || '/';

    // Exact match, or current path starts with link path (for product sub-pages)
    if (
      linkPath === pagePath ||
      (pagePath.startsWith(linkPath) && linkPath !== '/' && linkPath.length > 1)
    ) {
      link.classList.add('active');

      // Highlight parent dropdown toggle if link is inside a dropdown
      const dropdownParent = link.closest('.dropdown');
      if (dropdownParent) {
        const toggle = dropdownParent.querySelector('.dropdown-toggle');
        if (toggle) toggle.classList.add('active');
      }
    }
  });

  // Mobile links
  const mobileLinks = document.querySelectorAll('.mobile-nav-link');
  mobileLinks.forEach(link => {
    link.classList.remove('active');
    const linkHref = link.getAttribute('href');
    if (!linkHref) return;
    const linkPath = linkHref.replace(/\/$/, '') || '/';
    const pagePath = currentPath.replace(/\/$/, '') || '/';
    if (linkPath === pagePath || (pagePath.startsWith(linkPath) && linkPath !== '/' && linkPath.length > 1)) {
      link.classList.add('active');
    }
  });
}

// Run on load
updateActiveNavLinks();
