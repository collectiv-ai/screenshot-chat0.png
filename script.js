document.addEventListener("DOMContentLoaded", () => {
  // Body fade-in
  requestAnimationFrame(() => {
    document.body.classList.add("ready");
  });

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Scroll reveal
  const revealEls = document.querySelectorAll(".reveal");
  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    revealEls.forEach((el) => observer.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("visible"));
  }

  // Mobile nav toggle
  const toggle = document.getElementById("nav-toggle");
  const nav = document.getElementById("nav");

  if (toggle && nav) {
    toggle.addEventListener("click", () => {
      nav.classList.toggle("nav-open");
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        nav.classList.remove("nav-open");
      });
    });
  }

  // Active nav link on scroll
  const navLinks = document.querySelectorAll(".nav-link");
  const sections = ["app", "router", "sdk", "chain", "who", "manifesto", "roadmap", "contact"];

  function updateActiveNav() {
    const scrollY = window.scrollY;
    let activeId = null;

    sections.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const offsetTop = el.offsetTop - 120; // etwas Puffer unterhalb Header
      if (scrollY >= offsetTop) activeId = id;
    });

    navLinks.forEach((link) => link.classList.remove("active"));
    if (!activeId) return;

    const activeLink = Array.from(navLinks).find(
      (a) => a.getAttribute("href") === `#${activeId}`
    );
    if (activeLink) activeLink.classList.add("active");
  }

  window.addEventListener("scroll", updateActiveNav);
  updateActiveNav();
});
