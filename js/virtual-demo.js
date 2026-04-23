import { submitForm } from './standardapi.js';

/**
 * Demo Form Logic - Expanded for Premium Lead Capture
 */
export function initDemoForm() {
    const form = document.getElementById('demoForm');
    if (!form) return;

    // --- 1. Character Counter Logic ---
    const textarea = document.getElementById('message');
    const charCount = document.getElementById('charCount');
    
    if (textarea && charCount) {
        textarea.addEventListener('input', () => {
            const count = textarea.value.length;
            charCount.textContent = count;
            
            // Visual feedback as it nears limit
            if (count > 900) {
                charCount.style.color = '#ef4444'; // Red
            } else {
                charCount.style.color = '#3e4095'; // Brand-primary
            }
        });
    }

    // --- 2. Form Submission ---
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // 1. Validation Logic
        const name = document.getElementById('name');
        const email = document.getElementById('email');
        const phone = document.getElementById('contactNumber');
        const company = document.getElementById('company');
        const address = document.getElementById('address');
        const message = document.getElementById('message');

        let isValid = true;

        // Reset error messages
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

        if (!company.value.trim()) {
            document.getElementById('companyErr').classList.remove('hidden');
            isValid = false;
        }

        if (!address.value.trim()) {
            document.getElementById('addressErr').classList.remove('hidden');
            isValid = false;
        }

        if (!message.value.trim()) {
            document.getElementById('messageErr').classList.remove('hidden');
            isValid = false;
        }

        if (!isValid) {
            // Scroll to first error
            const firstError = document.querySelector('.text-red-500:not(.hidden)');
            if (firstError) firstError.parentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            return;
        }

        // 2. Prepare Data (Including Multi-Select Checkboxes)
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        // Handle Multi-select arrays (Tailwind/FormData doesn't do this by default in Object.fromEntries)
        data.processing_types = formData.getAll('processing_type').join(', ');
        data.material_types = formData.getAll('material_type').join(', ');
        data.referral_sources = formData.getAll('referral').join(', ');
        
        data.form_type = "Virtual Demo Lead"; // Meta info

        // 3. UI Feedback (Loading)
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalContent = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span>Processing Request...</span> <i class="fa-solid fa-spinner animate-spin"></i>`;

        // 4. Submit via Standard API
        const result = await submitForm(data);

        if (result.success) {
            form.innerHTML = `
                <div class="flex flex-col items-center justify-center py-20 px-4 text-center animate-on-scroll">
                    <div class="h-28 w-28 bg-emerald-100 rounded-full flex items-center justify-center mb-8 shadow-inner">
                        <i class="fa-solid fa-check-double text-6xl text-emerald-600"></i>
                    </div>
                    <h3 class="text-4xl font-extrabold text-slate-900 mb-4">Request Submitted!</h3>
                    <p class="text-slate-500 max-w-[400px] text-lg leading-relaxed">Thank you, ${name.value.split(' ')[0]}. We've received your assessment details. Our technical team will reach out to you within 24 hours.</p>
                </div>
            `;
            window.scrollTo({ top: form.offsetTop - 150, behavior: 'smooth' });
        } else {
            alert("Submission failed: " + result.message);
            submitBtn.disabled = false;
            submitBtn.innerHTML = originalContent;
        }
    });
}

// Initialize
initDemoForm();
