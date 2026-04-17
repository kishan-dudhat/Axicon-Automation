import { submitForm } from "../../js/standardapi.js";

/**
 * Popup Form Logic
 * Handles 6-second delay, close button, and submission.
 */

export function initPopupForm() {
    const popup = document.getElementById('lead-popup');
    const closeBtn = document.getElementById('close-popup');
    const form = document.getElementById('popup-lead-form');

    if (!popup) return;

    // Show popup after 6 seconds
    const showTimer = setTimeout(() => {
        popup.classList.remove('hidden');
        // Trigger opacity fade in
        setTimeout(() => {
            popup.classList.remove('opacity-0');
        }, 10);
    }, 10000);

    const closePopup = () => {
        popup.classList.add('opacity-0');
        setTimeout(() => {
            popup.classList.add('hidden');
        }, 400);
    };

    // Close on X button
    if (closeBtn) {
        closeBtn.addEventListener('click', closePopup);
    }

    // Close on clicking overlay background
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            closePopup();
        }
    });

    // Handle form submission
    if (form) {
        form.addEventListener('submit', (e) => {
            e.preventDefault();

            // 1. Validate Business Logic
            const nameEl = document.getElementById('popup-name');
            const emailEl = document.getElementById('popup-email');
            const phoneEl = document.getElementById('popup-phone');

            let isValid = true;

            // Reset styles
            [nameEl, emailEl, phoneEl].forEach(el => el.style.borderColor = '');

            // Name validation (not empty)
            if (!nameEl.value.trim()) {
                nameEl.style.borderColor = '#ef4444';
                isValid = false;
            }

            // Email validation (regex)
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(emailEl.value)) {
                emailEl.style.borderColor = '#ef4444';
                isValid = false;
            }

            // Phone validation (exactly 10 digits)
            const phoneRegex = /^[0-9]{10}$/;
            if (!phoneRegex.test(phoneEl.value)) {
                phoneEl.style.borderColor = '#ef4444';
                isValid = false;
                alert('Please enter a valid 10-digit phone number.');
            }

            if (!isValid) return;

            // 2. Prepare Data for Web3Forms
            const formData = new FormData(form);
            const object = Object.fromEntries(formData);
            const json = JSON.stringify(object);

            // Show loading state
            const submitBtn = form.querySelector('.popup-submit-btn');
            const originalBtnText = submitBtn.innerHTML;
            submitBtn.innerHTML = `<span>Sending...</span> <i class="fa-solid fa-spinner animate-spin"></i>`;
            submitBtn.disabled = true;

            // 3. Silent Background Submission (Web3Forms)
            submitForm(object)
                .then((result) => {
                    if (result.success) {
                        // Success UI (Clean and attractive)
                        form.innerHTML = `
                        <div class="flex flex-col items-center justify-center py-12 px-4 text-center success-msg">
                            <div class="h-20 w-20 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-emerald-100">
                                <i class="fa-solid fa-check text-4xl text-emerald-500"></i>
                            </div>
                            <h3 class="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Thank You!</h3>
                            <p class="text-slate-500 text-sm leading-relaxed max-w-[280px]">Your inquiry has been received. Our expert will contact you shortly.</p>
                        </div>
                    `;
                        clearTimeout(showTimer);
                        // Set flag for one-time submission
                        localStorage.setItem('popup_submitted', 'true');
                        setTimeout(closePopup, 3000);
                    } else {
                        alert(result.message);
                        submitBtn.innerHTML = originalBtnText;
                        submitBtn.disabled = false;
                    }
                })
                .catch(error => {
                    alert("An unexpected error occurred. Please try again later.");
                    submitBtn.innerHTML = originalBtnText;
                    submitBtn.disabled = false;
                });
        });
    }
}

// Global execution
initPopupForm();
