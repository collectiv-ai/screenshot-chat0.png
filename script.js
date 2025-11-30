// Body soft fade on load + Scroll-Reveal + smooth scrolling + router demo

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

    // Smooth scroll für interne Links (#anchors)
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const href = link.getAttribute("href");
            if (!href || href === "#") return;

            const target = document.querySelector(href);
            if (!target) return;

            event.preventDefault();

            if (prefersReducedMotion.matches) {
                target.scrollIntoView();
            } else {
                target.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        });
    });

    // Mobile nav toggle
    const navToggle = document.querySelector(".nav-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (navToggle && navLinks) {
        navToggle.addEventListener("click", () => {
            navLinks.classList.toggle("open");
        });

        navLinks.querySelectorAll("a[href^='#']").forEach((navLink) => {
            navLink.addEventListener("click", () => {
                navLinks.classList.remove("open");
            });
        });
    }

    // Router-Provider-Demo im Hero
    const pills = document.querySelectorAll("#router-pills .pill");
    const selectedSpan = document.getElementById("router-selected");

    if (pills.length && selectedSpan) {
        pills.forEach((pill) => {
            pill.addEventListener("click", () => {
                pills.forEach((p) => p.classList.remove("active"));
                pill.classList.add("active");
                const provider = pill.getAttribute("data-provider") || "Auto";
                if (provider === "Auto") {
                    selectedSpan.textContent = "Gemini";
                } else {
                    selectedSpan.textContent = provider;
                }
            });
        });
    }
}); 
