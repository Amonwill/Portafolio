<script setup>
import Navbar from './components/Navbar.vue'
</script>

<template>
  <Navbar />
  <router-view />
</template>

<style>

:root {
  --bg-main: #f0e4e4;
  --text-main: #111;
  --card-bg: rgb(240, 228, 228);
  --card-glow: #1ed760;
  --h1-color: #1ed760;
  --h2-color: #400080;
  --link-color: #400080;
  --link-color-hover: #1ed760;
  --content-color: #000000;
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

body {
  background: var(--bg-main);
  color: var(--text-main);
  transition: background 0.3s, color 0.3s;
  font-family: 'Fira Mono', 'Courier New', monospace;
  min-height: 100vh;
  margin: 0;
}


.card-hover-effect {
  transition: transform .16s, box-shadow .16s;
  box-shadow: 0 2px 18px #0002;
}
.card-hover-effect:hover {
  transform: translateY(-8px) scale(1.04);
  box-shadow: 0 0 32px 7px var(--card-glow, #6a1b20), 0 4px 22px #0002;
  z-index: 2;
}
</style>