<script setup>
import Navbar from './components/Navbar/Navbar.vue'
import Home from './views/Home.vue'
import BackgroundCanvas from './components/Background/BackgroundCanvas.vue'
</script>

<template>
  <div class="app-container">
    <BackgroundCanvas />
    <Navbar />
    <Home />
  </div>
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;800&display=swap');

html {
  scroll-behavior: smooth;
}

/* ======= LIGHT MODE ======= */
:root {
  --bg-main: #f4f7fa;
  --card-bg: rgba(250, 252, 255, 0.85);

  /* Texto */
  --text-main: #222b2f;
  --content-color: #383d42;
  --h1-color: #45a2ff;
  --h2-color: #0f6fa5;

  /* Navbar */
  --Navbar-bg: rgba(250, 252, 255, 0.58);
  --Navbar-text: #222b2f;
  --Navbar-border: #e0e8ed;
  --Navbar-hover: #45a2ff;
  --Navbar-hover-bg: #eaf6fa;

  /* Acentos */
  --link-color: #5bd6b9;
  --link-color-hover: #fc5c7d;

  /* Glow */
  --glow-a: #5bd6b9;
  --glow-b: #45a2ff;
  --glow-c: #fc5c7d;

  /* CV */
  --cv-btn-shadow: rgba(236, 72, 153, 0.4);
  --cv-btn-bg-main: linear-gradient(90deg, #5bd6b9 0%, #48c6ef 100%);
  --cv-btn-text-main: #fff;
  --cv-btn-bg-alt: #eaf6ff;
  --cv-btn-text-alt: #48c6ef;

  --title-gradient: linear-gradient(90deg, #5bd6b9, #48c6ef 60%, #fc5c7d 100%);

  /* Liquid Glass */
  --glass-bg: rgba(255, 255, 255, 0.26);
  --glass-border: rgba(255, 255, 255, 0.42);
  --glass-highlight: rgba(255, 255, 255, 0.52);
  --glass-shadow: 0 10px 30px rgba(43, 76, 112, 0.14), 0 2px 10px rgba(69, 162, 255, 0.18);
  --glass-blur: 18px;
}

/* ======= DARK MODE ======= */
.dark {
  --bg-main: #050505;
  --card-bg: rgba(22, 22, 22, 0.82);
  --text-main: #fff;
  --content-color: #fff;
  --h1-color: #ff0000;
  --h2-color: #ffd700;

  /* Navbar */
  --Navbar-bg: rgba(24, 24, 24, 0.48);
  --Navbar-text: #fff;
  --Navbar-border: #333;
  --Navbar-hover: #ffd700;

  /* CV */
  --cv-btn-shadow: rgba(236, 72, 153, 0.4);
  --cv-btn-bg-main: #5c0c03;
  --cv-btn-text-main: #eeeeee;
  --cv-btn-bg-alt: #232323;
  --cv-btn-text-alt: #7ee1ff;

  --glow-a: #ff5e00;
  --glow-b: #ea0000;
  --glow-c: #6a1b20;
  --title-gradient: linear-gradient(90deg, #ff5e00, #ea0000 60%, #6a1b20 90%);

  --link-color: #800000;
  --link-color-hover: #057c91;

  /* Liquid Glass */
  --glass-bg: rgba(16, 16, 16, 0.42);
  --glass-border: rgba(255, 255, 255, 0.16);
  --glass-highlight: rgba(255, 255, 255, 0.1);
  --glass-shadow: 0 14px 34px rgba(0, 0, 0, 0.5), 0 4px 12px rgba(255, 0, 0, 0.16);
  --glass-blur: 20px;
}

body {
  background: var(--bg-main);
  color: var(--text-main);
  font-family: 'Montserrat', sans-serif;
  min-height: 100vh;
  margin: 0;
  line-height: 1.5;
  transition: background 0.3s, color 0.3s;
  overflow-x: hidden;
  top: 0 !important;
  position: static !important;
}

h1,
h2,
h3,
h4 {
  font-weight: 800;
  letter-spacing: 0.01em;
}

.app-container {
  position: relative;
  z-index: 1;
  width: 100%;
}

.modal-active .navbar {
  transform: translateY(-100%);
  opacity: 0;
  pointer-events: none;
  transition: transform 0.3s ease, opacity 0.3s ease;
}

.modal-active .global-background {
  filter: blur(15px);
  transition: filter 0.5s ease;
}

/* ======= GLOBAL LIQUID GLASS ======= */
.aboutme-card,
.project-card,
.technology-card,
.certification-card,
.contact-card {
  position: relative;
  overflow: hidden;
  border-radius: 24px;
  border: 1px solid var(--glass-border);
  background: linear-gradient(135deg, var(--glass-highlight), transparent 45%), var(--glass-bg);
  backdrop-filter: blur(var(--glass-blur)) saturate(140%);
  -webkit-backdrop-filter: blur(var(--glass-blur)) saturate(140%);
  box-shadow: var(--glass-shadow);
  transition: transform 220ms ease, box-shadow 220ms ease, border-color 220ms ease;
}

.aboutme-card::before,
.project-card::before,
.technology-card::before,
.certification-card::before,
.contact-card::before {
  content: '';
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(120deg, rgba(255, 255, 255, 0.28), rgba(255, 255, 255, 0.03) 38%, rgba(255, 255, 255, 0.18) 100%);
  opacity: 0.52;
}

.aboutme-card::after,
.project-card::after,
.technology-card::after,
.certification-card::after,
.contact-card::after {
  content: '';
  position: absolute;
  inset: 1px;
  border-radius: 22px;
  border-top: 1px solid rgba(255, 255, 255, 0.38);
  border-left: 1px solid rgba(255, 255, 255, 0.2);
  pointer-events: none;
}

.aboutme-card:hover,
.project-card:hover,
.technology-card:hover,
.certification-card:hover,
.contact-card:hover {
  transform: translateY(-2px);
  border-color: color-mix(in srgb, var(--glass-border) 72%, var(--glow-b) 28%);
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.18);
}

.aboutme-card > *,
.project-card > *,
.technology-card > *,
.certification-card > *,
.contact-card > * {
  position: relative;
  z-index: 1;
}

@media (prefers-reduced-motion: reduce) {
  .aboutme-card,
  .project-card,
  .technology-card,
  .certification-card,
  .contact-card {
    transition: none;
  }

  .aboutme-card:hover,
  .project-card:hover,
  .technology-card:hover,
  .certification-card:hover,
  .contact-card:hover {
    transform: none;
  }
}

/* ======= GOOGLE TRANSLATE (reglas globales, no scoped) ======= */
.goog-te-banner-frame,
.goog-te-gadget-icon,
iframe.goog-te-banner-frame {
  display: none !important;
  visibility: hidden !important;
  height: 0 !important;
}

.goog-tooltip,
.goog-tooltip:hover {
  display: none !important;
}

.goog-text-highlight {
  background: none !important;
  box-shadow: none !important;
}

#google_translate_element {
  position: absolute;
  top: -9999px;
  left: -9999px;
  height: 0;
  overflow: hidden;
}
</style>