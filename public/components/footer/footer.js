console.log("Footer loaded");

// example: dynamic year
const year = new Date().getFullYear();
document.querySelector("footer")?.insertAdjacentHTML(
  "beforeend",
  `<div class="text-center text-sm mt-6">© ${year} Axicon Automation</div>`
);
