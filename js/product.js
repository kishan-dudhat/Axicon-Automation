const track = document.getElementById("track");
const slides = document.querySelectorAll("#track > div");
const thumbs = document.querySelectorAll(".thumb");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let index = 0;
let auto;

// FIX: set width properly
track.style.width = `${slides.length * 100}%`;

slides.forEach(slide => {
    slide.style.width = `${100 / slides.length}%`;
    slide.style.flexShrink = "0";
});

function updateSlider() {
    track.style.transform = `translateX(-${index * (100 / slides.length)}%)`;

    thumbs.forEach((thumb, i) => {
        thumb.classList.remove("border-[#1773d0]", "bg-white", "shadow-md");
        thumb.classList.add("border-transparent", "bg-gray-100");

        if (i === index) {
            thumb.classList.add("border-[#1773d0]", "bg-white", "shadow-md");
            thumb.classList.remove("border-transparent", "bg-gray-100");
        }
    });
}

function nextSlide() {
    index = (index + 1) % slides.length;
    updateSlider();
    resetAuto();
}

function prevSlide() {
    index = (index - 1 + slides.length) % slides.length;
    updateSlider();
    resetAuto();
}

nextBtn.addEventListener("click", nextSlide);
prevBtn.addEventListener("click", prevSlide);

thumbs.forEach((thumb, i) => {
    thumb.addEventListener("click", () => {
        index = i;
        updateSlider();
        resetAuto();
    });
});

function startAuto() {
    auto = setInterval(nextSlide, 5000);
}

function resetAuto() {
    clearInterval(auto);
    startAuto();
}

updateSlider();
startAuto();

// Reveal animation
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.15 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));