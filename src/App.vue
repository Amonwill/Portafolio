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
  /* Evita que Google empuje la etiqueta html */
  margin-top: 0 !important;
}

/* ======= LIGHT MODE — azules / verdes ======= */
:root {
  --bg-main: #eef4f4;
  --card-bg: rgba(240, 247, 246, 0.85);

  --name-font: 'Fraunces', serif;
  /* Texto */
  --text-main: #0d1b26;
  --content-color: #3c5464;
  --h1-color: #2563eb;
  --h2-color: #0d9668;

  /* Navbar */
  --Navbar-bg: rgba(240, 247, 246, 0.6);
  --Navbar-text: #0d1b26;
  --Navbar-border: #dbe6e6;
  --Navbar-hover: #2563eb;
  --Navbar-hover-bg: #e7f0fb;

  /* Acentos */
  --link-color: #0d9668;
  --link-color-hover: #2563eb;

  /* Glow */
  --glow-a: #2563eb;
  --glow-b: #0d9668;
  --glow-c: #38bdf8;

  /* Toggle del navbar (mismo switch, nueva paleta) */
  --nav-toggle-bg: #c9d6e0;
  --nav-toggle-bg-dark: #2563eb;

  /* CV */
  --cv-btn-shadow: rgba(37, 99, 235, 0.35);
  --cv-btn-bg-main: linear-gradient(90deg, #2563eb 0%, #0d9668 100%);
  --cv-btn-text-main: #fff;
  --cv-btn-bg-alt: #e7f0fb;
  --cv-btn-text-alt: #2563eb;

  --title-gradient: linear-gradient(90deg, #2563eb, #0d9668 60%, #38bdf8 100%);

  /* Liquid Glass */
  --glass-bg: rgba(255, 255, 255, 0.26);
  --glass-border: rgba(255, 255, 255, 0.42);
  --glass-highlight: rgba(255, 255, 255, 0.52);
  --glass-shadow: 0 10px 30px rgba(13, 27, 42, 0.14), 0 2px 10px rgba(37, 99, 235, 0.16);
  --glass-blur: 18px;
}

/* ======= DARK MODE — Familia Fuego / Atardecer ======= */
.dark {
  --name-font: 'Montserrat', sans-serif; 
  --bg-main: #150a0a;
  --card-bg: rgba(28, 13, 13, 0.82);
  --text-main: #f7ece8;
  --content-color: #f0ddd8;
  --h1-color: #e11d48;
  --h2-color: #f97316;

  /* Navbar */
  --Navbar-bg: rgba(28, 13, 13, 0.5);
  --Navbar-text: #f7ece8;
  --Navbar-border: #3a1414;
  --Navbar-hover: #f97316;
  --Navbar-hover-bg: rgba(225, 29, 72, 0.16);

  /* Toggle del navbar */
  --nav-toggle-bg: #3a1414;
  --nav-toggle-bg-dark: #e11d48;

  /* CV */
  --cv-btn-shadow: rgba(225, 29, 72, 0.4);
  --cv-btn-bg-main: linear-gradient(90deg, #e11d48 0%, #f97316 100%);
  --cv-btn-text-main: #fff;
  --cv-btn-bg-alt: #241010;
  --cv-btn-text-alt: #f97316;

  /* Glow */
  --glow-a: #e11d48; 
  --glow-b: #f97316; 
  --glow-c: #facc15; 

  /* Título */
  --title-gradient: linear-gradient(90deg, var(--glow-a), var(--glow-b) 60%, var(--glow-c) 100%);

  /* Enlaces */
  --link-color: #f97316;
  --link-color-hover: #e11d48;

  /* Liquid Glass */
  --glass-bg: rgba(30, 10, 10, 0.42);
  --glass-border: rgba(247, 231, 227, 0.14);
  --glass-highlight: rgba(247, 231, 227, 0.08);
  --glass-shadow: 0 14px 34px rgba(0, 0, 0, 0.5), 0 4px 12px rgba(225, 29, 72, 0.18);
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
  /* Reglas para evitar que Google empuje la página */
  top: 0 !important;
  position: relative !important; 
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

/* ======= GOOGLE TRANSLATE OVERRIDES ======= */
/* 1. Ocultar el iframe del banner superior */
iframe.goog-te-banner-frame,
.goog-te-banner-frame {
  display: none !important;
  visibility: hidden !important;
  height: 0 !important;
}

/* 2. Ocultar el espacio en blanco inyectado */
.skiptranslate > iframe.goog-te-banner-frame {
  display: none !important;
}

/* 3. Evitar el cuadro que empuja la página */
body > .skiptranslate {
  display: none !important;
}

/* 4. Eliminar el globo flotante que aparece al pasar el cursor */
.goog-tooltip,
.goog-tooltip:hover {
  display: none !important;
  visibility: hidden !important;
}

/* 5. Quitar fondo amarillo y borde a la palabra traducida */
.goog-text-highlight {
  background-color: transparent !important;
  border: none !important;
  box-shadow: none !important;
}

/* 6. Esconder el widget genérico */
#google_translate_element {
  display: none !important;
}
</style>