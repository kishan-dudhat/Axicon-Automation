// public/assets/js/style.js

(function () {
  // Tailwind CDN
  const tailwindCdn = document.createElement("script");
  tailwindCdn.src = "https://cdn.tailwindcss.com";
  document.head.appendChild(tailwindCdn);

  // Tailwind config using CSS variables
  const tailwindConfig = document.createElement("script");
  tailwindConfig.textContent = `
    tailwind.config = {
      theme: {
        extend: {
          colors: {
            primary: 'var(--primary)',
            secondary: 'var(--secondary)',
            accent: 'var(--accent)',
            surface: 'var(--surface)',
            dark: 'var(--dark)',
            success: 'var(--success)',
            info: 'var(--info)',
            warning: 'var(--warning)',
            danger: 'var(--danger)',
          }
        }
      }
    }
  `;
  document.head.appendChild(tailwindConfig);
})();
