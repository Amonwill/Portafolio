<template>
  <section class="technologies-section">
    <div class="section-header">
      <p class="section-eyebrow">Stack</p>
      <h1 class="main-title">Technologies</h1>
      <p class="contact-subtitle">
        Tools and languages I work with day to day.
      </p>
    </div>

    <div class="tech-cards-container">
      <!-- Ahora cada categoría genera su propia tarjeta encapsulada -->
      <div 
        v-for="(icons, category) in groupedSkills" 
        :key="category" 
        class="tech-card card-hover-effect always-glow"
      >
        <h3>{{ category }}</h3>
        <div class="icons-list">
          <img 
            v-for="icon in icons" 
            :key="icon.name" 
            :src="urlFor(icon.icon).width(64).auto('format').quality(85).url()" 
            :alt="icon.name" 
            :title="icon.name" 
            class="tech-icon" 
            loading="lazy"
            decoding="async"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" src="./Technology.ts" />
<style scoped src="./Technology.css" />