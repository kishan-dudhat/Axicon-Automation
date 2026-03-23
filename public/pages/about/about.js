document.addEventListener("DOMContentLoaded", () => {

    /* =========================================================
       1. Scroll Reveal Animation Logic (Intersecion Observer)
       ========================================================= */
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15 // Triggers when 15% of the element is visible
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Add visible class to trigger CSS transition
                entry.target.classList.add('visible');

                // Once visible, start counter logic if the element has counters
                const counters = entry.target.querySelectorAll('.counter');
                if (counters.length > 0) {
                    startCounters(counters);
                }

                // Optional: Stop observing after reveal if you only want it once
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    // Grab elements to observe
    const hiddenElements = document.querySelectorAll('.slide-left, .slide-right, .slide-up, .fade-in');
    hiddenElements.forEach(el => revealObserver.observe(el));


    /* =========================================================
       2. Number Counter Animation
       ========================================================= */
    // Function that runs the number animation
    const animateValue = (obj, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);

            // Apply easeOutQuart for smooth deceleration
            const easeOutProgress = 1 - Math.pow(1 - progress, 4);
            const currentVal = Math.floor(easeOutProgress * (end - start) + start);

            obj.innerHTML = currentVal;

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                obj.innerHTML = end; // ensure it finishes precisely at target
            }
        };
        window.requestAnimationFrame(step);
    }

    const startCounters = (counters) => {
        counters.forEach(counter => {
            // Check if animation has already run
            if (!counter.classList.contains('counted')) {
                const target = parseInt(counter.getAttribute('data-target'), 10);

                // Depending on the amount, dynamic duration can feel better
                // Using 2000ms duration for a smooth count
                animateValue(counter, 0, target, 2500);

                // Mark as counted
                counter.classList.add('counted');
            }
        });
    }
});
