/**
 * Footer Component Logic
 * Used for any dynamic interactions within the footer (e.g., copyright year, social hove effects).
 */

console.log("Footer Component Initialized.");

// Dynamically update copyright year if needed
const yearSpan = document.getElementById("copyright-year");
if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
}
