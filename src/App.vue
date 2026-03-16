<script setup>
import Navbar from './components/Navbar.vue'
</script>

<template>
  <Navbar />
  <router-view />
</template>

<style>
/* FUENTES */
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;800&display=swap');

/* PALETA DE COLORES Y VARIABLES CSS */
:root {
  --bg-main: #f7ecec;       /* Fondo principal claro */
  --text-main: #181818;     /* Texto principal oscuro */
  --card-bg: #f0e4e4;       /* Card clara */
  --card-glow: #1ed760;
  --h1-color: #1ed760;
  --h2-color: #400080;
  --link-color: #400080;
  --link-color-hover: #1ed760;
  --content-color: #181818;
  --Navbar-bg: #fff;
  --Navbar-text: #000;
  --Navbar-hover: #1ed760;
  --cv-btn-shadow: 0 6px 32px #40008055;         
  --cv-btn-shadow-hover: 0 7px 36px #1ed760bb;   
  --cv-btn-bg: transparent;   
  --cv-btn-bg-hover: transparent; 
  --cv-btn-text: #222;
  --cv-btn-text-hover: #1ed760;
} 

.dark {
  --bg-main: #161616;
  --text-main: #fff;
  --card-bg: #161616;
  --card-glow: #6a1b20;
  --h1-color: #6a1b20;
  --h2-color: #ffd700;
  --link-color: #ffd700;
  --link-color-hover: #6a1b20;
  --content-color: #fff;
  --Navbar-bg: #1a1a1a;
  --Navbar-text: #fff;
  --Navbar-hover: #6a1b20;
  --cv-btn-shadow: 0 6px 32px #ffd70099;        
  --cv-btn-shadow-hover: 0 7px 36px #6a1b20bb;  
  --cv-btn-bg: transparent;   
  --cv-btn-bg-hover: transparent;
  --cv-btn-text: #fff7de;
  --cv-btn-text-hover: #ffd700;
}

/* FONDO GLOBAL */
body {
  background: var(--bg-main);
  color: var(--text-main);
  font-family: 'Montserrat', 'Segoe UI', Arial, sans-serif;
  min-height: 100vh;
  margin: 0;
  line-height: 1.5;
  transition: background 0.3s, color 0.3s;
}

/* TIPOGRAFÍA Y JERARQUÍA TEXTUAL */
h1, h2, h3, h4 {
  font-family: 'Montserrat', 'Segoe UI', Arial, sans-serif;
  font-weight: 800;
  letter-spacing: .01em;
  margin-bottom: 0.6em;
}

h2 {
  font-size: 2rem;
  font-weight: 700;
}

h1 {
  font-size: 2.7rem;
  font-weight: 800;
}

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