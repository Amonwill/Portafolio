<template>
  <main class="home-content">
    <header id="home" class="home-hero">
      <div class="hero-card card-hover-effect">
        <p class="hero-eyebrow">Data Analyst · Web Developer</p>
        <h1 v-if="!loading" class="hero-name notranslate">{{ author?.name }}</h1>
        <p v-if="!loading && author?.role" class="hero-role">{{ author.role }}</p>
        <p v-if="!loading && shortBio" class="hero-desc">{{ shortBio }}</p>

        <div class="hero-cta">
          <button class="btn btn-primary" @click="scrollTo('projects')">
            see my work
          </button>
          <button class="btn btn-ghost" @click="scrollTo('contact')">
            contact me
          </button>
        </div>
      </div>

      <div class="hero-orb-wrap">
        <div class="hero-orb" ref="heroOrb"></div>
      </div>

      <p class="scroll-hint">Scroll to explore ↓</p>
    </header>

    <AboutMe id="aboutme" />
    <Projects id="projects" />
    <Technology id="technology" />
    <Certifications id="certificates" />
    <Contact id="contact" />

    <!-- Nuevo Footer -->
    <footer class="home-footer">
      <div class="footer-content">
        <p>
          Designed and built by <span class="footer-name notranslate">{{ author?.name }}</span>
        </p>
        <p class="footer-meta">
          &copy; {{ new Date().getFullYear() }} ·
          <button class="back-to-top" @click="scrollTo('home')">
            ↑ Back to top
          </button>
        </p>
      </div>
    </footer>
  </main>
</template>

<script lang="ts" src="./Home.ts"></script>
<style scoped src="./Home.css"></style>