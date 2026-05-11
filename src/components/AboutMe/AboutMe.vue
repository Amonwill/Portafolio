<template>
  <section v-if="!loading" class="about-me-card card-hover-effect always-glow">
    <div class="about-me-info">
      <h1>{{ author.name }}</h1>
      <h2>{{ author.role }}</h2>
      <p>{{ author.bio }}</p>
      <div v-html="author.detailedBio" class="detailed-bio"></div>
      
      <div class="about-me-links">
        <a :href="author.linkedin" target="_blank" rel="noopener"><i class="fab fa-linkedin"></i></a>
        <a :href="'mailto:' + author.email" target="_blank" rel="noopener"><i class="fas fa-envelope"></i></a>
        <a :href="author.github" target="_blank" rel="noopener"><i class="fab fa-github"></i></a>
      </div>

      <div class="cv-download-group">
        <a :href="getFileUrl(author.cvEn.asset._ref)" download class="cv-btn cv-btn-primary">Download CV (EN)</a>
        <a :href="getFileUrl(author.cvEs.asset._ref)" download class="cv-btn cv-btn-secondary">Descargar CV (ES)</a>
      </div>
    </div>
    <div class="about-me-photo">
      <img class="about-me-photo-img" :src="urlFor(author.photo).url()" alt="William Cruz Hernández" />
    </div>
  </section>
</template>

<script lang="ts" src="./AboutMe.ts" />
<style scoped src="./AboutMe.css" />