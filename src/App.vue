<script setup>
import Navbar from './components/Navbar.vue'
</script>

<template>
  <Navbar />
  <router-view />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;800&display=swap');

/* ======= LIGHT MODE ======= */
:root {
  --bg-main: #f4f7fa;
  --card-bg: #fafcff;

  /* === TEXTO  === */
  --text-main: #222b2f;
  --content-color: #383d42;
  --h1-color: #45a2ff;
  --h2-color: #0f6fa5;

  /* === NAVBAR === */
  --Navbar-bg: #fafcff;
  --Navbar-text: #222b2f;
  --Navbar-border: #e0e8ed;
  --Navbar-hover: #45a2ff;
  --Navbar-hover-bg: #eaf6fa;
  --Navbar-active-bg: #eaf6fa; /* Light navbar active link fondo */
  --github-btn-bg: linear-gradient(90deg, #45a2ffcc 10%, #5bd6b9cc 95%);
  --github-btn-hover-bg: linear-gradient(100deg,#48c6ef 20%, #7ee1ff 100%);
  --github-btn-text: #fff;
  --github-btn-hover-text: #232323;
  --nav-toggle-bg: #48c6ef;

  /* === LINKS/ACCENTOS === */
  --link-color: #400080;
  --link-color-hover: #1ed760;

  /* === GLOW  === */
  --glow-a: #5bd6b9;
  --glow-b: #45a2ff;
  --glow-c: #fc5c7d;

  /* === CV === */
  --cv-btn-bg: #f8fdff;
  --cv-btn-bg-main: linear-gradient(90deg, #5bd6b9 0%, #48c6ef 100%);
  --cv-btn-text-main: #fff;
  --cv-btn-bg-alt: #eaf6ff;
  --cv-btn-text-alt: #48c6ef;
  --cv-btn-font: 'Fira Mono', monospace;
  --cv-btn-shadow: 0 2px 16px #5bd6b933, 0 2px 2px #45a2ff19;
  --cv-btn-shadow-hover: 0 9px 28px #5bd6b966, 0 1.5px 9px #48c6ef53;
  --cv-btn-bg-hover: linear-gradient(98deg, #48c6ef 0%, #38ef7d 100%);
  --cv-btn-text-hover: #fff;

  /* === DEGRADADO DE TÍTULOS === */
  --title-gradient: linear-gradient(90deg, #5bd6b9, #48c6ef 60%, #fc5c7d 100%);
}

/* ======= DARK MODE ======= */
.dark {
  --bg-main: #161616;
  --card-bg: #161616;
  --card-glow: #6a1b20;
  --text-main: #fff;
  --content-color: #fff;
  --h1-color: #ffd700;
  --h2-color: #ffd700;

  /* Navbar  */
  --Navbar-bg: #181818;
  --Navbar-text: #fff;
  --Navbar-border: #333;
  --Navbar-hover: #ffd700;
  --Navbar-hover-bg: #23231a;
  --Navbar-active-bg: #ffd700;   
  --github-btn-bg: #ffd700;
  --github-btn-hover-bg: #fc5c7d;
  --github-btn-text: #181818;
  --github-btn-hover-text: #fff;
  --nav-toggle-bg: #ffd700;

  /* === CV === */
  --cv-btn-bg: #161616;
  --cv-btn-bg-main: #232f1a;
  --cv-btn-text-main: #1ed760;
  --cv-btn-bg-alt: #232323;
  --cv-btn-text-alt: #7ee1ff;
  --cv-btn-shadow: 0 2px 12px #1ed76035;
  --cv-btn-shadow-hover: 0 8px 30px #1ed76044;
  --cv-btn-bg-hover: #222;
  --cv-btn-text-hover: #ffd700;
  --cv-btn-font: 'Fira Mono', monospace;

  --link-color: #ffd700;
  --link-color-hover: #6a1b20;

  --glow-a: #ffd700;
  --glow-b: #ea0000;
  --glow-c: #6a1b20;
  --title-gradient: linear-gradient(90deg, #ffd700, #ff7c51 60%, #7ee1ff 90%);
}

body {
  background: var(--bg-main);
  color: var(--text-main);
  font-family: 'Montserrat', 'Segoe UI', Arial, sans-serif;
  min-height: 100vh;
  margin: 0;
  line-height: 1.5;
  transition: background 0.3s, color 0.3s;
}

h1, h2, h3, h4 {
  font-family: 'Montserrat', 'Segoe UI', Arial, sans-serif;
  font-weight: 800;
  letter-spacing: .01em;
  margin-bottom: 0.6em;
}
h2 { font-size: 2rem; font-weight: 700; }
h1 { font-size: 2.7rem; font-weight: 800; }

.about-me-info p, .about-me-info strong {
  font-size: 1.15rem;
  font-family: 'Montserrat', sans-serif;
  text-align: left;
}
.about-me-info h2 {
  font-size: 1.35rem;
  font-weight: 600;
  margin-bottom: 1.3em;
}

.cv-btn {
  font-family: 'Montserrat', monospace;
  font-size: 1rem;
  font-weight: 600;
  letter-spacing: 0.05em;
}
</style>