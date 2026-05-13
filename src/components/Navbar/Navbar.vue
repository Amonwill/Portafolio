<template>
  <nav class="navbar">
    <button class="burger" @click="toggleMenu" aria-label="Open Menu">
      <span></span><span></span><span></span>
    </button>
    
    <div class="nav-links" :class="{ open: menuOpen }">
      <a href="#home" 
         :class="{ active: currentSection === 'home' }" 
         @click.prevent="scrollToSection('home')">Home</a>
         
      <a href="#aboutme" 
         :class="{ active: currentSection === 'aboutme' }" 
         @click.prevent="scrollToSection('aboutme')">About Me</a>
         
      <a href="#projects" 
         :class="{ active: currentSection === 'projects' }" 
         @click.prevent="scrollToSection('projects')">Projects</a>
         
      <a href="#technology" 
         :class="{ active: currentSection === 'technology' }" 
         @click.prevent="scrollToSection('technology')">Technologies</a>
         
      <a href="#certificates" 
         :class="{ active: currentSection === 'certificates' }" 
         @click.prevent="scrollToSection('certificates')">Certificates</a>
         
      <a href="#contact" 
         :class="{ active: currentSection === 'contact' }" 
         @click.prevent="scrollToSection('contact')">Contact</a>
    </div>

    <div class="navbar-right">
      <a href="https://github.com/Amonwill" target="_blank" class="github-btn">GitHub</a>
      <div class="dark-toggle">
        <label class="switch">
          <input type="checkbox" :checked="isDark" @change="toggleTheme" />
          <span class="slider">
            <span v-if="isDark" class="mode-icon">🌙</span>
            <span v-else class="mode-icon">☀️</span>
          </span>
        </label>
      </div>
    </div>
  </nav>
</template>

<script lang="ts" src="./Navbar.ts"></script>
<style scoped src="./Navbar.css"></style>