// contactForm.js
const CONTACT_HTML_PATH = './components/contactForm/contactForm.html';
let modalLoaded = false;
let isModalOpen = false;

/* OPEN MODAL */
document.addEventListener('click', async (e) => {
  
  const trigger = e.target.closest('[data-contact-open]');
  if (!trigger) return;

  e.preventDefault();
  e.stopPropagation();

  const root = document.getElementById('contact-root');
  if (!root) {
    console.error('contact-root not found');
    return;
  }

  // Load modal HTML only once
  if (!modalLoaded) {
    try {
      const res = await fetch(CONTACT_HTML_PATH);
      if (!res.ok) throw new Error('Failed to load contact form');
      root.innerHTML = await res.text();
      modalLoaded = true;
      initCloseListeners();
    } catch (error) {
      console.error('Error loading contact form:', error);
      return;
    }
  }

  openModal();
});

function openModal() {
  
  if (isModalOpen) return;

  const overlay = document.getElementById('contactOverlay');
  const modal = document.getElementById('contactModal');

  if (!overlay || !modal) {
    console.error('Modal elements not found');
    return;
  }

  // Show modal
  overlay.classList.remove('hidden');
  document.body.style.overflow = 'hidden'; // Prevent scrolling

  // Trigger animations
  setTimeout(() => {
    overlay.classList.remove('opacity-0');
    modal.classList.remove('scale-95', 'opacity-0');
  }, 10);

  isModalOpen = true;
}

/* INITIALIZE CLOSE LISTENERS */
function initCloseListeners() {
  
  // Close on button click
  const closeBtn = document.querySelector('[data-contact-close]');
  if (closeBtn) {
    closeBtn.addEventListener('click', closeModal);
  }

  // Close on overlay click
  const overlay = document.getElementById('contactOverlay');
  if (overlay) {
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeModal();
      }
    });
  }

  // Close on Escape key
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && isModalOpen) {
      closeModal();
    }
  });
}

/* CLOSE MODAL */
function closeModal() {
  if (!isModalOpen) return;

  const overlay = document.getElementById('contactOverlay');
  const modal = document.getElementById('contactModal');

  if (!overlay || !modal) return;

  // Trigger animations
  modal.classList.add('scale-95', 'opacity-0');
  overlay.classList.add('opacity-0');

  setTimeout(() => {
    overlay.classList.add('hidden');
    document.body.style.overflow = ''; // Restore scrolling
    isModalOpen = false;
  }, 300);
}w