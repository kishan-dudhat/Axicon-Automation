const btn = document.getElementById('mobile-menu-button');
const menu = document.getElementById('mobile-menu');

if (btn && menu) {
    btn.onclick = () => {
        menu.classList.toggle('hidden');
    };

    // Close menu when clicking a link
    menu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            menu.classList.add('hidden');
        });
    });
}