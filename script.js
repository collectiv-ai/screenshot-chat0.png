document.addEventListener("DOMContentLoaded", () => {
  // Body fade-in
  requestAnimationFrame(() => {
    document.body.classList.add("ready");
  });

  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // Scroll reveal
  if (!prefersReducedMotion && "IntersectionObserver" in window) {
    const revealEls = document.querySelectorAll(".reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealEls.forEach((el) => observer.observe(el));
  } else {
    document.querySelectorAll(".reveal").forEach((el) => {
      el.classList.add("visible");
    });
  }

  // Theme toggle with localStorage
  const body = document.body;
  const themeToggle = document.getElementById("theme-toggle");
  const themeIcon = document.getElementById("theme-toggle-icon");
  const storedTheme = window.localStorage.getItem("collectivai-theme");

  function applyTheme(theme) {
    if (theme === "light") {
      body.classList.add("light");
      themeIcon.textContent = "☀️";
    } else {
      body.classList.remove("light");
      themeIcon.textContent = "🌙";
    }
  }

  if (storedTheme === "light" || storedTheme === "dark") {
    applyTheme(storedTheme);
  } else {
    // Prefer system
    const prefersLight =
      window.matchMedia && window.matchMedia("(prefers-color-scheme: light)").matches;
    applyTheme(prefersLight ? "light" : "dark");
  }

  themeToggle.addEventListener("click", () => {
    const nextTheme = body.classList.contains("light") ? "dark" : "light";
    applyTheme(nextTheme);
    window.localStorage.setItem("collectivai-theme", nextTheme);
  });

  // Mobile nav
  const burger = document.getElementById("nav-burger");
  const navLinks = document.querySelector(".nav-links");

  burger.addEventListener("click", () => {
    const open = body.classList.toggle("nav-open");
    if (open) {
      navLinks.style.display = "flex";
    } else {
      navLinks.style.display = "";
    }
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      if (body.classList.contains("nav-open")) {
        body.classList.remove("nav-open");
        navLinks.style.display = "";
      }
    });
  });

  // Active nav link on scroll
  const sections = [
    { id: "app", link: null },
    { id: "router", link: null },
    { id: "sdk", link: null },
    { id: "chain", link: null },
    { id: "who", link: null },
    { id: "manifesto", link: null },
    { id: "roadmap", link: null },
    { id: "contact", link: null }
  ];

  const navLinkEls = document.querySelectorAll(".nav-link");
  sections.forEach((s) => {
    s.link = Array.from(navLinkEls).find((a) => a.getAttribute("href") === "#" + s.id);
  });

  function updateActiveNav() {
    const scrollY = window.scrollY;
    let activeId = null;

    sections.forEach((s) => {
      const el = document.getElementById(s.id);
      if (!el) return;
      const offsetTop = el.offsetTop - 90;
      if (scrollY >= offsetTop) {
        activeId = s.id;
      }
    });

    navLinkEls.forEach((link) => link.classList.remove("active"));
    if (activeId) {
      const activeLink = Array.from(navLinkEls).find(
        (a) => a.getAttribute("href") === "#" + activeId
      );
      if (activeLink) activeLink.classList.add("active");
    }
  }

  window.addEventListener("scroll", updateActiveNav);
  updateActiveNav();

  // Router demo logic
  const routerScenarios = {
    city: [
      { prefix: "input ›", text: "Help us explain our climate plan to residents.", cls: "" },
      {
        prefix: "router ›",
        text: "Analysing topic, sensitivity & language.",
        cls: "code-line-ok"
      },
      {
        prefix: "route ›",
        text: "Selected: Gemini (policy & reasoning) for this civic climate question.",
        cls: ""
      },
      {
        prefix: "filters ›",
        text: "Applying neutrality, factual checks and accessibility filters.",
        cls: ""
      },
      {
        prefix: "↳",
        text: "Returning citizen-friendly explainer in clear language.",
        cls: "code-line-arrow"
      }
    ],
    university: [
      {
        prefix: "input ›",
        text: "Outline a seminar on AI ethics and European regulation.",
        cls: ""
      },
      {
        prefix: "router ›",
        text: "Classifying request: education · ethics · regulation.",
        cls: "code-line-ok"
      },
      {
        prefix: "route ›",
        text: "Selected: OpenAI (teaching material) with research snippets.",
        cls: ""
      },
      {
        prefix: "filters ›",
        text: "Ensuring transparent references and no hallucinated citations.",
        cls: ""
      },
      {
        prefix: "↳",
        text: "Drafting seminar structure + reading list for students.",
        cls: "code-line-arrow"
      }
    ],
    ngo: [
      { prefix: "input ›", text: "Track new policy proposals on digital rights.", cls: "" },
      {
        prefix: "router ›",
        text: "Checking for monitoring / summarisation patterns.",
        cls: "code-line-ok"
      },
      {
        prefix: "route ›",
        text: "Selected: Mistral (fast summaries) + DeepSeek (detailed analysis).",
        cls: ""
      },
      {
        prefix: "filters ›",
        text: "Highlighting human-rights impact, risks and opportunities.",
        cls: ""
      },
      {
        prefix: "↳",
        text: "Creating a briefing for the NGO policy team.",
        cls: "code-line-arrow"
      }
    ],
    institution: [
      {
        prefix: "input ›",
        text: "Compare three options for a new participation programme.",
        cls: ""
      },
      {
        prefix: "router ›",
        text: "Detecting multi-option policy comparison request.",
        cls: "code-line-ok"
      },
      {
        prefix: "route ›",
        text: "Selected: Gemini (reasoning) + Meta (scenario generation).",
        cls: ""
      },
      {
        prefix: "filters ›",
        text: "Avoiding biased framing and political targeting.",
        cls: ""
      },
      {
        prefix: "↳",
        text: "Returning neutral comparison and citizen-friendly summary.",
        cls: "code-line-arrow"
      }
    ]
  };

  const routerButtons = document.querySelectorAll(".router-scenario-button");
  const routerLogLines = document.getElementById("router-log-lines");

  function renderScenario(key) {
    const lines = routerScenarios[key];
    if (!lines) return;
    routerLogLines.innerHTML = "";
    lines.forEach((line) => {
      const div = document.createElement("div");
      if (line.cls) div.classList.add(line.cls);
      const prefixSpan = document.createElement("span");
      prefixSpan.className = "code-line-prefix";
      prefixSpan.textContent = line.prefix;
      div.appendChild(prefixSpan);
      const textNode = document.createTextNode(line.text);
      div.appendChild(textNode);
      routerLogLines.appendChild(div);
    });
  }

  routerButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      routerButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");
      const key = btn.getAttribute("data-scenario");
      renderScenario(key);
    });
  });

  // initial scenario
  renderScenario("city");
});
