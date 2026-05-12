import { submitForm } from './standardapi.js';

/**
 * Contact Form Logic
 */
export function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    /* -------------------------------------------------------
       Strict Phone Number Validation
       - Only digits 0–9, max 10 characters
       - Blocks letters / symbols on keypress, paste & drop
       ------------------------------------------------------- */
    const phoneInput = document.getElementById('contactNumber');
    if (phoneInput) {
        phoneInput.addEventListener('keydown', (e) => {
            const allowedKeys = [
                'Backspace', 'Delete', 'Tab', 'Escape', 'Enter', 'Home', 'End',
                'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'
            ];
            if (allowedKeys.includes(e.key)) return;
            if ((e.ctrlKey || e.metaKey) && ['a', 'c', 'v', 'x', 'z'].includes(e.key.toLowerCase())) return;
            if (!/^[0-9]$/.test(e.key)) e.preventDefault();
        });
        const sanitizePhone = () => {
            const digitsOnly = phoneInput.value.replace(/\D/g, '').slice(0, 10);
            if (phoneInput.value !== digitsOnly) phoneInput.value = digitsOnly;
        };
        phoneInput.addEventListener('input', sanitizePhone);
        phoneInput.addEventListener('paste', () => setTimeout(sanitizePhone, 0));
        phoneInput.addEventListener('drop', () => setTimeout(sanitizePhone, 0));
        phoneInput.addEventListener('input', () => {
            const errEl = document.getElementById('contactNumberErr');
            if (errEl && /^\d{10}$/.test(phoneInput.value)) errEl.classList.add('hidden');
        });
    }

    /* -------------------------------------------------------
       Live error reset for required text fields
       ------------------------------------------------------- */
    const liveValidationMap = {
        name: 'nameErr',
        email: 'emailErr',
        country: 'countryErr',
        city: 'cityErr'
    };
    Object.entries(liveValidationMap).forEach(([id, errId]) => {
        const input = document.getElementById(id);
        const errEl = document.getElementById(errId);
        if (!input || !errEl) return;
        input.addEventListener('input', () => {
            if (input.value.trim()) errEl.classList.add('hidden');
        });
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // 1. Basic Validation
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const phone = document.getElementById('contactNumber');
        const country = document.getElementById('country');
        const city = document.getElementById('city');

        let isValid = true;

        // Reset error messages (if any)
        document.querySelectorAll('.text-red-500').forEach(el => el.classList.add('hidden'));

        if (!name.value.trim()) {
            document.getElementById('nameErr').classList.remove('hidden');
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email.value)) {
            document.getElementById('emailErr').classList.remove('hidden');
            isValid = false;
        }

        if (!phone.value.trim() || !/^\d{10}$/.test(phone.value.trim())) {
            document.getElementById('contactNumberErr').classList.remove('hidden');
            isValid = false;
        }

        if (!country.value.trim()) {
            document.getElementById('countryErr').classList.remove('hidden');
            isValid = false;
        }

        if (!city.value.trim()) {
            document.getElementById('cityErr').classList.remove('hidden');
            isValid = false;
        }

        if (!isValid) return;

        // 2. Prepare Data
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);

        // 3. UI Feedback (Loading)
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalContent = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `
            <span class="relative z-10 tracking-wide font-poppins text-primary">Sending...</span>
            <i class="fa-solid fa-spinner animate-spin relative z-10 text-primary"></i>
        `;

        // 4. Submit via Standard API
        const result = await submitForm(data);

        if (result.success) {
            // Show success message
            form.innerHTML = `
                <div class="flex flex-col items-center justify-center py-12 px-4 text-center">
                    <div class="h-20 w-20 bg-emerald-50 rounded-2xl flex items-center justify-center mb-6 shadow-sm border border-emerald-100">
                        <i class="fa-solid fa-check text-4xl text-emerald-500"></i>
                    </div>
                    <h3 class="text-2xl font-bold text-slate-900 mb-3 tracking-tight">Message Sent!</h3>
                    <p class="text-slate-500 text-sm leading-relaxed max-w-[280px]">Thank you for reaching out. Our team will get back to you shortly.</p>
                </div>
            `;
        } else {
            alert(result.message);
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalContent;
        }
    });
}

/**
 * Regional Presence Carousel Logic
 */
export function initCityCarousel() {
    const track = document.getElementById('cityTrack');
    if (!track) return;

    const cities = [
        "Ahmedabad", "Mumbai", "Pune", "New Delhi", "Chennai",
        "Hyderabad", "Bengaluru", "Coimbatore", "Surat", "Rajkot",
        "Vadodara", "Vapi", "Ankleshwar", "Gandhinagar", "Jaipur",
        "Indore", "Bhopal", "Nagpur", "Nashik", "Kolhapur",
        "Aurangabad", "Kochi", "Madurai", "Trichy", "Vizag",
        "Kolkata", "Lucknow", "Kanpur", "Ludhiana"
    ];

    // Ensure the track is wide enough for seamless infinite scroll
    // Duplicate the array to create the loop effect
    const fullList = [...cities, ...cities];

    track.innerHTML = fullList.map(city => `
        <div class="city-pill">
            <i class="fa-solid fa-location-dot opacity-40 mr-2 text-[0.8rem]"></i>
            ${city}
        </div>
    `).join('');
}

// Initialize components
document.addEventListener('DOMContentLoaded', () => {
    initContactForm();
    initCityCarousel();
});

// Since the app uses hash-based routing, we might need a re-init
window.addEventListener('popstate', () => {
    // Small delay to ensure DOM is ready after navigation
    setTimeout(() => {
        initContactForm();
        initCityCarousel();
    }, 400);
});

// Manual call for initial load if DOM is already ready
initContactForm();
initCityCarousel();
