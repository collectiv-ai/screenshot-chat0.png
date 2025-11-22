// Body soft fade on load (optional – wirkt smoother)
document.addEventListener("DOMContentLoaded", () => {
    document.body.style.opacity = 1;
});

// Scroll-Reveal für Sections
const revealElements = document.querySelectorAll(".reveal");

function handleScrollReveal() {
    const windowHeight = window.innerHeight;
    revealElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top < windowHeight - 80) {
            el.classList.add("visible");
        }
    });
}

// Initial + Scroll
window.addEventListener("scroll", handleScrollReveal);
window.addEventListener("load", handleScrollReveal);

