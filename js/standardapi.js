/**
 * Standard API for form submissions
 * Handles dynamic form data and returns a standard response object.
 */
export async function submitForm(data) {
    const API_ENDPOINT = 'https://api.web3forms.com/submit';
    const mailformate = {
        access_key: "796a7fdf-3c41-43f3-868e-b206868c9e5f", // Centralized Key
        subject: "🚀 New Lead - Axicon Automation",
        from_name: "Axicon Automation",
    }
    const payload = { ...data, ...mailformate };
    try {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        const result = await response.json();

        if (response.ok) {
            return {
                success: true,
                message: result.message || "Form submitted successfully!"
            };
        } else {
            return {
                success: false,
                message: result.message || "Submission failed. Please try again."
            };
        }
    } catch (error) {
        console.error("API Error:", error);
        return {
            message: "Network error. Please check your connection and try again."
        };
    }
}
