<script setup>
import AboutMe from '../components/AboutMe/AboutMe.vue'
import Projects from '../components/Projects/Projects.vue'
import Technology from '../components/Technology/Technology.vue'
import Certifications from '../components/Certifications/Certifications.vue'
</script>

<template>
  <main class="home-content">
    <header id="home" class="home-hero">
      <h1 class="big-hello">WELCOME!</h1>
      <div class="subtitle-hero">Web Developer & Data Analyst Portfolio</div>
    </header>

    <AboutMe id="aboutme" />
    <Projects id="projects" />
    <Technology id="technology" />
    <Certifications id="certificates" />
  </main>
</template>

<style scoped>
.home-content {
  display: flex;
  flex-direction: column;
  gap: 1rem; /* espaciado xd */
  margin-bottom: 4rem;
  position: relative;
  z-index: 1;
}

.home-hero {
  height: 60vh; 
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 0;
}

.big-hello {
  font-size: 3.5rem;
  font-weight: 800;
  background: var(--title-gradient);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  color: transparent !important;
  text-align: center;
  letter-spacing: 2px;
}

.subtitle-hero {
  font-size: 1.3rem;
  color: var(--h2-color);
  font-weight: 500;
  letter-spacing: 0.15em;
  text-align: center;
}

@media (max-width: 600px) {
  .big-hello { font-size: 2.2rem; }
  .home-content { gap: 2rem; }
}
</style>