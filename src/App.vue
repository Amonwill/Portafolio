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
}

h1, h2, h3, h4 {
  font-weight: 800;
  letter-spacing: .01em;
}
.app-container {
  position: relative;
  z-index: 1;
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
</style>