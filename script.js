// Body soft fade on load + Scroll-Reveal mit optionaler Rücksicht auf "Reduce Motion"

document.addEventListener("DOMContentLoaded", () => {
    // Body-Fade aktivieren
    document.body.classList.add("ready");

    const revealElements = document.querySelectorAll(".reveal");
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    function handleScrollReveal() {
        const windowHeight = window.innerHeight;
        revealElements.forEach((el) => {
            const rect = el.getBoundingClientRect();
            if (rect.top < windowHeight - 80) {
                el.classList.add("visible");
            }
        });
    }

    if (prefersReducedMotion.matches) {
        // Nutzer möchte weniger Animationen → alles direkt anzeigen
        revealElements.forEach((el) => el.classList.add("visible"));
    } else {
        window.addEventListener("scroll", handleScrollReveal);
        window.addEventListener("load", handleScrollReveal);
        // Einmal initial aufrufen
        handleScrollReveal();
    }
});
