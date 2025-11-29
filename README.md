<p align="center">
  <img src="logo.png" alt="CollectiVAI Logo" width="400" />
</p>

<h1 align="center">CollectiVAI Website & Public Docs</h1>
<h3 align="center">Democratic AI for Europe</h3>

<p align="center">
  <a href="https://collectivai.org">
    <img src="https://img.shields.io/badge/Website-collectivai.org-003399?style=flat" alt="Website" />
  </a>
  <a href="https://github.com/collectiv-ai/collectiv-ai-app">
    <img src="https://img.shields.io/badge/App-Alpha-ffcc00?style=flat" alt="App Alpha" />
  </a>
  <a href="https://github.com/collectiv-ai/collectiv-ai-app-chain">
    <img src="https://img.shields.io/badge/Chain-Pre--Alpha-999999?style=flat" alt="Chain Pre-Alpha" />
  </a>
  <img src="https://img.shields.io/badge/Made%20in-Europe-003399?style=flat" alt="Made in Europe" />
</p>

---

## About this repository

This repository powers the **official CollectiVAI website**:  
👉 **https://collectivai.org**

It serves as the **public entry point** for:

- the overall **vision** of CollectiVAI  
- **documentation** (overview, architecture, roadmap, governance)  
- links to the **App**, the **Chain** and related repositories  
- information for **citizens, institutions, universities, NGOs and sponsors**

The content is currently maintained in **English and German**.

---

## What you will find here

Typical building blocks of this repo:

- **Landing page**  
  High-level introduction to CollectiVAI – mission, values and key building blocks.

- **Public documentation** (structure may evolve)  
  - project overview and concept  
  - roadmap (Alpha / Beta / Chain Phase)  
  - examples of civic use cases (cities, universities, NGOs, startups)  
  - links to business plan, governance drafts and technical docs

- **Whitepaper & deep-dive**  
  - conceptual and philosophical foundations of CollectiVAI  
  - see [`WHITEPAPER.md`](WHITEPAPER.md) for the current markdown version

- **Static assets**  
  - logos and basic branding assets  
  - images used on the website  
  - diagrams or visuals for future docs

The website is intentionally lightweight and focused on **clarity** and  
**public understanding**, not on heavy marketing.

---

## Local development & structure

This is a **static site** (HTML / CSS / JS) served via GitHub Pages.

Main files:

- `index.html` – landing page  
- `style.css` – styling and layout  
- `script.js` – interactive behaviour  
- `logo*.png`, `icon.png` – branding assets  
- `WHITEPAPER.md` – public whitepaper in markdown form  

To preview the site locally:

```bash
git clone https://github.com/collectiv-ai/collectiv-ai.github.io.git
cd collectiv-ai.github.io

# Option 1: open directly
open index.html           # macOS
# or double-click index.html on Windows/Linux

# Option 2: run a simple local web server
python3 -m http.server 8000
# then open http://localhost:8000 in your browser
