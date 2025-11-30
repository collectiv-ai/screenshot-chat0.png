// Body soft fade on load + Scroll-Reveal + Nav + Demo-Card
// Respektiert "Reduce Motion" (System-Einstellung).

document.addEventListener("DOMContentLoaded", () => {
    // Body-Fade aktivieren (CSS: body.ready { opacity: 1; })
    document.body.classList.add("ready");

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    // -----------------------------
    // Scroll Reveal
    // -----------------------------
    const revealElements = Array.from(document.querySelectorAll(".reveal"));

    let allRevealed = false;

    function handleScrollReveal() {
        if (allRevealed || !revealElements.length) return;

        const windowHeight = window.innerHeight;

        for (const el of revealElements) {
            if (el.classList.contains("visible")) continue;

            const rect = el.getBoundingClientRect();
            if (rect.top < windowHeight - 80) {
                el.classList.add("visible");
            }
        }

        const remaining = revealElements.some(el => !el.classList.contains("visible"));
        if (!remaining) {
            allRevealed = true;
            window.removeEventListener("scroll", onScrollThrottled);
            window.removeEventListener("resize", onScrollThrottled);
        }
    }

    // Simple Throttling für Scroll/Resize
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

    if (prefersReducedMotion.matches) {
        // Nutzer möchte weniger Animationen → alles direkt anzeigen
        revealElements.forEach((el) => el.classList.add("visible"));
    } else {
        window.addEventListener("scroll", onScrollThrottled);
        window.addEventListener("resize", onScrollThrottled);
        window.addEventListener("load", handleScrollReveal);
        // Einmal initial aufrufen
        handleScrollReveal();
    }

    // -----------------------------
    // Navigation: Shadow bei Scroll + Mobile Toggle
    // -----------------------------
    const nav = document.querySelector(".top-nav");
    const navLinks = document.querySelector(".nav-links");
    const navToggle = document.querySelector(".nav-toggle");

    function handleNavShadow() {
        if (!nav) return;
        if (window.scrollY > 10) {
            nav.classList.add("scrolled");
        } else {
            nav.classList.remove("scrolled");
        }
    }

    window.addEventListener("scroll", handleNavShadow);
    handleNavShadow();

    if (navToggle && navLinks) {
        navToggle.addEventListener("click", () => {
            navLinks.classList.toggle("open");
        });

        // Mobile: Menü schließen, wenn ein Link geklickt wird
        navLinks.addEventListener("click", (event) => {
            if (event.target.tagName.toLowerCase() === "a") {
                navLinks.classList.remove("open");
            }
        });
    }

    // -----------------------------
    // Sanftes Scrollen für nav-Links (optional, falls Browser kein smooth scrollen kann)
    // -----------------------------
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(link => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");
            if (!targetId || targetId === "#") return;

            const targetEl = document.querySelector(targetId);
            if (!targetEl) return;

            event.preventDefault();

            const navHeight = nav ? nav.offsetHeight : 0;
            const rect = targetEl.getBoundingClientRect();
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            const targetOffset = rect.top + scrollTop - navHeight - 12; // kleines Offset

            if (prefersReducedMotion.matches) {
                window.scrollTo(0, targetOffset);
            } else {
                window.scrollTo({
                    top: targetOffset,
                    behavior: "smooth",
                });
            }
        });
    });

    // -----------------------------
    // Router-Demo (Hero): Provider-Tabs
    // -----------------------------
    const demoOutput = document.getElementById("router-demo-output");
    const demoPills = document.querySelectorAll("[data-provider-demo]");

    if (demoOutput && demoPills.length) {
        demoPills.forEach(pill => {
            pill.addEventListener("click", () => {
                const provider = pill.getAttribute("data-provider-demo") || "Auto";

                demoPills.forEach(p => p.classList.remove("active"));
                pill.classList.add("active");

                let providerLabel = provider;
                if (provider === "Auto") {
                    providerLabel = "Auto (best backend)";
                }

                demoOutput.innerHTML = `
                    ✓ Analyzing prompt<br>
                    ✓ Selecting backend: <strong>${providerLabel}</strong><br>
                    ✓ Applying ethical &amp; privacy filters<br>
                    → Returning CollectiVAI answer…
                `;
            });
        });
    }
});
