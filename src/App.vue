<script setup>
import Navbar from './components/Navbar.vue'
</script>

<template>
  <Navbar />
  <router-view />
</template>

<style>
@import url('https://fonts.googleapis.com/css2?family=Montserrat:wght@400;600;800&display=swap');

:root {
  --bg-main: #f7ecec;
  --text-main: #181818;
  --card-bg: #f0e4e4;
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
  --glow-a: #a932ee;
  --glow-b: #580ba5;
  --glow-c: #400080;
  --title-gradient: linear-gradient(90deg, #97e891, #bfe5ff 60%, #f3b4e3 90%);
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
  --glow-a: #ffd700;
  --glow-b: #ea0000;
  --glow-c: #6a1b20;
  --title-gradient: linear-gradient(90deg, #ffd700, #ff7c51 60%, #7ee1ff 90%);
}

.card-hover-effect {
  position: relative;
  overflow: visible;
  z-index: 1;
}

.card-hover-effect::before {
  content: '';
  position: absolute;
  z-index: -1;
  top: -18px; left: -18px; right: -18px; bottom: -18px;
  border-radius: inherit;
  background: conic-gradient(
    var(--glow-1),
    var(--glow-2),
    var(--glow-3),
    var(--glow-1)
  );
  filter: blur(18px) brightness(0.95) saturate(1.03);
  opacity: 0.65;
  animation: glow-rotate 6s linear infinite;
  transition: opacity 0.22s, filter 0.23s;
  pointer-events: none;
}

.card-hover-effect:hover::before {
  opacity: 1;
  filter: blur(27px) brightness(1.09) saturate(1.15);
}

@keyframes glow-rotate {
  from { transform: rotate(0deg); }
  to   { transform: rotate(359deg); }
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