<template>
  <section v-if="!loading" class="about-me-section">
    <div class="section-header">
      <p class="section-eyebrow">Get to know me</p>
      <h1 class="main-title">About Me</h1>
      <p class="contact-subtitle">
        A bit about who I am, what drives me, and where I'm headed.
      </p>
    </div>

    <div class="about-me-card card-hover-effect always-glow">
      <div class="about-me-info">
        <h1 class="notranslate">{{ author?.name }}</h1>
        <h2 class="about-me-role">{{ author?.role }}</h2>

        <div v-if="bioParagraphs.length" class="bio-content">
          <p
            v-for="(paragraph, index) in bioParagraphs"
            :key="`bio-${index}`"
            class="bio-paragraph"
          >
            {{ paragraph }}
          </p>
        </div>

        <div v-if="detailedBioParagraphs.length" class="detailed-bio">
          <p
            v-for="(paragraph, index) in detailedBioParagraphs"
            :key="`detailed-${index}`"
            class="bio-paragraph"
          >
            {{ paragraph }}
          </p>
        </div>

        <div class="about-me-links">
          <a :href="author?.linkedin" target="_blank" rel="noopener" title="LinkedIn"><i class="fab fa-linkedin"></i></a>
          <a :href="'mailto:' + author?.email" target="_blank" rel="noopener" title="Email"><i class="fas fa-envelope"></i></a>
          <a :href="author?.github" target="_blank" rel="noopener" title="GitHub"><i class="fab fa-github"></i></a>
        </div>

        <div class="cv-download-group">
          <a
            v-if="author?.cvEn?.asset?._ref"
            :href="getFileUrl(author.cvEn.asset._ref)"
            download
            class="cv-btn cv-btn-primary"
          >
            <svg class="cv-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16"/></svg>
            Download CV (EN)
          </a>
          <a
            v-if="author?.cvEs?.asset?._ref"
            :href="getFileUrl(author.cvEs.asset._ref)"
            download
            class="cv-btn cv-btn-secondary"
          >
            <svg class="cv-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><path d="M12 3v12m0 0l-4-4m4 4l4-4M4 21h16"/></svg>
            Descargar CV (ES)
          </a>
        </div>
      </div>

      <div class="about-me-photo">
        <img
          class="about-me-photo-img"
          :src="author?.photo ? urlFor(author.photo).width(500).auto('format').quality(85).url() : ''"
          alt="William Cruz Hernández"
          decoding="async"
        />
      </div>
    </div>
  </section>
</template>

<script lang="ts" src="./AboutMe.ts" />
<style scoped src="./AboutMe.css" />