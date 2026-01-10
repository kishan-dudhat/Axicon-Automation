const navbar = document.getElementById("main-navbar");
const hero = document.getElementById("hero-top-bar");
const desktopNavbar = document.getElementById("desktop-navbar");
const mobileMenu = document.getElementById("mobile-menu");
const mobileMenuToggle = document.getElementById("mobile-menu-toggle");
const mobileMenuIcon = document.getElementById("mobile-menu-icon");
const toggleBtn = document.getElementById("mobile-menu-toggle");
const productsBtn = document.getElementById("products-btn");
const productsPanel = document.getElementById("products-panel");
const aboutBtn = document.getElementById("about-btn");
const aboutpanel = document.getElementById("about-panel")



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





toggleBtn.addEventListener("click", () => {
  const isOpen = mobileMenu.classList.contains("translate-x-full");

  if (isOpen) {
    mobileMenu.classList.remove("translate-x-full");
    mobileMenu.setAttribute("aria-hidden", "false");

    mobileOverlay.classList.remove("opacity-0", "pointer-events-none");
    mobileOverlay.classList.add("opacity-100");

    toggleBtn.setAttribute("aria-expanded", "true");
    mobileMenuIcon.classList.remove("fa-list");
    mobileMenuIcon.classList.add("fa-xmark");
  } else {
    mobileMenu.classList.add("translate-x-full");
    mobileMenu.setAttribute("aria-hidden", "true");

    mobileOverlay.classList.add("opacity-0", "pointer-events-none");
    mobileOverlay.classList.remove("opacity-100");

    toggleBtn.setAttribute("aria-expanded", "false");
    mobileMenuIcon.classList.remove("fa-xmark");
    mobileMenuIcon.classList.add("fa-list");
  }
});




productsBtn.addEventListener("click", () => {
  const isOpen = productsPanel.classList.contains("hidden");

  if (!isOpen) {
    productsPanel.classList.add("hidden");
    productsBtn.setAttribute("aria-expanded", "false");
    productsBtn.classList.remove("rotate-180");
  } else {
    productsPanel.classList.remove("hidden");
    productsBtn.setAttribute("aria-expanded", "true");
    productsBtn.classList.add("rotate-180");
  }
});



aboutBtn.addEventListener("click", () => {
  const isOpen = aboutpanel.classList.contains("hidden");

  if (!isOpen) {
    aboutpanel.classList.add("hidden");
    aboutBtn.setAttribute("aria-expanded", "false");
    aboutBtn.classList.remove("rotate-180");
  } else {
    aboutpanel.classList.remove("hidden");
    aboutBtn.setAttribute("aria-expanded", "true");
    aboutBtn.classList.add("rotate-180");
  }
});

