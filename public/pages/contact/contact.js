import { submitForm } from "../../assets/js/standardapi.js";

/**
 * Contact Form Logic
 */
export function initContactForm() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // 1. Basic Validation
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const phone = document.getElementById('contactNumber');
        const message = document.getElementById('message');
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

        if (!message.value.trim()) {
            document.getElementById('messageErr').classList.remove('hidden');
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

// Initialize
initContactForm();
