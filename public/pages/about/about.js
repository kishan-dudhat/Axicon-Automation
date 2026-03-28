
/**
 * About Us Page Scripts
 * Handles: Scroll-to-Count Number Animations
 */

const initModule = () => {
    // 1. Define the counting logic
    const animateValue = (obj, start, end, duration) => {
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);

            // Premium Ease-Out-Quart for smooth finish
            const easeOutProgress = 1 - Math.pow(1 - progress, 4);
            const currentVal = Math.floor(easeOutProgress * (end - start) + start);

            obj.innerHTML = currentVal;

            if (progress < 1) {
                window.requestAnimationFrame(step);
            } else {
                obj.innerHTML = end;
            }
        };
        window.requestAnimationFrame(step);
    };

    const startCounters = (counters) => {
        counters.forEach(counter => {
            if (!counter.classList.contains('counted')) {
                const target = parseInt(counter.getAttribute('data-target'), 10);
                if (!isNaN(target)) {
                    animateValue(counter, 0, target, 3000); // 2 Seconds
                    counter.classList.add('counted');
                }
            }
        });
    };

    // 2. Setup the Intersection Observer
    const observerOptions = {
        threshold: 0.1
    };

    const counterObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('.counter');
                if (counters.length > 0) {
                    startCounters(counters);
                    observer.unobserve(entry.target);
                }
            }
        });
    }, observerOptions);

    // 3. Tab Switching Logic
    const initTabs = () => {
        const tabBtns = document.querySelectorAll('.tab-btn');
        const tabPanels = document.querySelectorAll('.tab-panel');

        if (!tabBtns.length || !tabPanels.length) return;

        tabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                const targetId = btn.getAttribute('data-tab');

                // Update Buttons
                tabBtns.forEach(b => {
                    b.classList.remove('active');
                    b.setAttribute('aria-selected', 'false');
                });
                btn.classList.add('active');
                btn.setAttribute('aria-selected', 'true');

                // Update Panels
                tabPanels.forEach(panel => {
                    panel.classList.remove('active');
                });
                const targetPanel = document.getElementById(targetId);
                if (targetPanel) {
                    targetPanel.classList.add('active');
                }
            });
        });
    };

    // 4. Video Modal Logic
    const initVideoModal = () => {
        const playBtn = document.querySelector('.video-play-btn');
        const modal = document.getElementById('video-modal');
        const player = document.getElementById('youtube-player');
        const closeBtn = document.getElementById('close-video');
        const youtubeUrl = "https://www.youtube.com/embed/XjHdZ7W6klc?autoplay=1&rel=0&showinfo=0";

        if (!playBtn || !modal || !player || !closeBtn) return;

        const openModal = () => {
            player.src = youtubeUrl;
            modal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        };

        const closeModal = () => {
            modal.classList.remove('active');
            player.src = ""; // Stop playback
            document.body.style.overflow = ''; // Restore scrolling
        };

        playBtn.addEventListener('click', openModal);
        closeBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            closeModal();
        });
        
        modal.addEventListener('click', (e) => {
            if (e.target === modal) closeModal();
        });

        // Close on Escape key
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && modal.classList.contains('active')) {
                closeModal();
            }
        });
    };

    // 5. Begin observing and init features
    initTabs();
    initVideoModal();

    const searchSelectors = ['.animate-on-scroll', '.bg-white.p-6'];
    searchSelectors.forEach(selector => {
        document.querySelectorAll(selector).forEach(el => {
            if (el.querySelector('.counter')) {
                counterObserver.observe(el);
            }
        });
    });
};

// Execute initialization
// Since this is loaded as a module via router.js, the DOM is already partially or fully ready
// We use a small timeout to ensure the browser has finished the innerHTML injection paint
setTimeout(initModule, 200);
