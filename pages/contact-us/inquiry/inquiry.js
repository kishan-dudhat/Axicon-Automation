import { submitForm } from "../../../js/standardapi.js";

/**
 * Inquiry Form Logic
 */
export function initInquiryForm() {
    const form = document.getElementById('inquiryForm');
    if (!form) return;

    // Handle Custom Checkbox UI interactions
    form.addEventListener('change', (e) => {
        if (e.target.type === 'checkbox' && e.target.name === 'product') {
            const box = e.target.parentElement.querySelector('.checkbox-box');
            const icon = box.querySelector('i');
            if (e.target.checked) {
                box.classList.add('bg-brand', 'border-brand');
                icon.classList.remove('hidden');
            } else {
                box.classList.remove('bg-brand', 'border-brand');
                icon.classList.add('hidden');
            }
        }
    });

    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        // 1. Basic Validation
        const fields = {
            name: document.getElementById('name'),
            company: document.getElementById('company'),
            address: document.getElementById('address'),
            pincode: document.getElementById('pincode'),
            email: document.getElementById('email'),
            phone: document.getElementById('contactNumber')
        };

        let isValid = true;

        // Reset error messages
        document.querySelectorAll('.text-red-500').forEach(el => el.classList.add('hidden'));

        // Validate Mandatory Fields
        if (!fields.name.value.trim()) {
            document.getElementById('nameErr').classList.remove('hidden');
            isValid = false;
        }
        if (!fields.company.value.trim()) {
            document.getElementById('companyErr').classList.remove('hidden');
            isValid = false;
        }
        if (!fields.address.value.trim()) {
            document.getElementById('addressErr').classList.remove('hidden');
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(fields.email.value)) {
            document.getElementById('emailErr').classList.remove('hidden');
            isValid = false;
        }

        if (!fields.phone.value.trim() || !/^\d{10}$/.test(fields.phone.value.trim())) {
            document.getElementById('contactNumberErr').classList.remove('hidden');
            isValid = false;
        }

        if (!isValid) {
            // Scroll to first error
            const firstErr = document.querySelector('.text-red-500:not(.hidden)');
            if (firstErr) {
                firstErr.parentElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
            return;
        }

        // 2. Prepare Data Cleanly
        const formData = new FormData(form);
        const data = {};

        // Robustly capture all fields while handling multi-select products
        const products = [];
        formData.forEach((value, key) => {
            if (key === 'product') {
                products.push(value);
            } else {
                data[key] = value;
            }
        });

        data.requested_products = products.join(', ');
        data.form_type = "Project Inquiry";

        // 3. UI Feedback (Loading)
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalContent = submitBtn.innerHTML;
        submitBtn.disabled = true;
        submitBtn.innerHTML = `<span class="text-white">Sending Inquiry...</span> <i class="fa-solid fa-spinner animate-spin text-white"></i>`;
        console.log("data", data);

        // 4. Submit via Standard API
        const result = await submitForm(data);


        if (result.success) {
            form.innerHTML = `
                <div class="flex flex-col items-center justify-center py-16 px-4 text-center animate-on-scroll">
                    <div class="h-24 w-24 bg-emerald-100 rounded-full flex items-center justify-center mb-8 shadow-inner">
                        <i class="fa-solid fa-check text-5xl text-emerald-600"></i>
                    </div>
                    <h3 class="text-3xl font-extrabold text-[#1e293b] mb-4">Inquiry Received!</h3>
                    <p class="text-slate-600 max-w-sm mx-auto leading-relaxed">
                        Thank you for your interest. Our engineering team will review your requirements and contact you within 24 hours.
                    </p>
                    <button onclick="window.location.reload()" class="mt-8 text-brand font-bold hover:underline">Send another inquiry</button>
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
initInquiryForm();
