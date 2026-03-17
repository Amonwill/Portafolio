<script setup>
import AboutMe from './AboutMe.vue'
import Projects from './Projects.vue'
import Technology from './Technology.vue'
import Certifications from './Certifications.vue'
</script>

<template>
  <div class="home-content">
    <div class="home-hero">
      <!-- Usa h1, pero el degradado no se sobrescribe -->
      <h1 class="big-hello">WELCOME!</h1>
      <div class="subtitle-hero">Web Developer & Data Analyst Portfolio</div>
    </div>
    <AboutMe />
    <Projects />
    <Technology />
    <Certifications />
  </div>
</template>

<style scoped>
/* Mueve el gradiente aquí, NO uses variables globales que el dark pueda pisar. */
.big-hello {
  font-size: 2.7rem;
  font-weight: 800;
  background: linear-gradient(90deg, #46e3cf 12%, #58d0e9 45%, #8786c9 72%, #ee7799 100%);
  -webkit-background-clip: text;
  background-clip: text;
  -webkit-text-fill-color: transparent;
  /* fallback para Firefox/otros */
  color: transparent !important; /* lo forzamos para que ninguna regla global pise */
  margin: 0 0 0.2em 0;
  text-align: center;
  letter-spacing: 1px;
  text-shadow: none;
}

/* El subtítulo (puedes personalizar) */
.subtitle-hero {
  font-size: 1.14rem;
  color: #0f6fa5;
  font-weight: 500;
  letter-spacing: 0.1em;
  text-shadow: 0 1px 6px #58d0e933;
  text-align: center;
}

.home-content {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  margin-bottom: 2rem;
  position: relative;
  z-index: 1;
}
.home-hero {
  margin: 2.5rem 0 1rem 0;
  padding-top: 1.8rem;
  padding-bottom: 1rem;
}
@media (max-width: 600px) {
  .big-hello { font-size: 1.7rem; }
  .subtitle-hero { font-size: 0.97rem; }
  .home-content { gap: 1.1rem; }
}
</style>