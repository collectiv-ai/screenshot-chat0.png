// Body soft fade on load + Scroll-Reveal
// Respektiert "Reduce Motion" (System-Einstellung).

document.addEventListener("DOMContentLoaded", () => {
    // Body-Fade aktivieren (CSS: body.ready { opacity: 1; })
    document.body.classList.add("ready");

    const revealElements = Array.from(document.querySelectorAll(".reveal"));
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    // Falls es keine Reveal-Elemente gibt, direkt raus
    if (!revealElements.length) {
        return;
    }

    let allRevealed = false;

    function handleScrollReveal() {
        if (allRevealed) return;

        const windowHeight = window.innerHeight;
        let newlyRevealedCount = 0;

        for (const el of revealElements) {
            // Elemente, die schon sichtbar sind, überspringen
            if (el.classList.contains("visible")) continue;

            const rect = el.getBoundingClientRect();
            if (rect.top < windowHeight - 80) {
                el.classList.add("visible");
                newlyRevealedCount++;
            }
        }

        // Wenn alle .reveal-Elemente sichtbar sind, Listener entfernen
        const remaining = revealElements.some(el => !el.classList.contains("visible"));
        if (!remaining) {
            allRevealed = true;
            window.removeEventListener("scroll", onScrollThrottled);
            window.removeEventListener("resize", onScrollThrottled);
        }
    }

    if (prefersReducedMotion.matches) {
        // Nutzer möchte weniger Animationen → alles direkt anzeigen
        revealElements.forEach((el) => el.classList.add("visible"));
        return;
    }

    // Einfaches Throttling, damit bei schnellem Scrollen nicht zu viele Events laufen
    let ticking = false;
    function onScrollThrottled() {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleScrollReveal();
                ticking = false;
            });
            ticking = true;
        }
    }

    window.addEventListener("scroll", onScrollThrottled);
    window.addEventListener("resize", onScrollThrottled);
    window.addEventListener("load", handleScrollReveal);

    // Einmal initial aufrufen (falls schon Elemente im Viewport sind)
    handleScrollReveal();
});
