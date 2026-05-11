<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content always-glow">
      <button class="close-btn" @click="$emit('close')">&times;</button>
      
      <div class="modal-header">
        <h1>{{ project.title }}</h1>
        <span 
          v-if="project.status" 
          class="status-badge" 
          :class="project.status.toLowerCase().replace(' ', '-')"
        >
          {{ project.status }}
        </span>
      </div>

      <div class="modal-body-grid">
        
        <div class="left-col">
          <div class="info-section">
            <h3>Sobre el proyecto</h3>
            <p>{{ project.detailedDesc || project.desc }}</p>
          </div>

          <div class="info-section">
            <h3>Tecnologías y Frameworks</h3>
            <div class="tech-chips-container">
              <div v-for="t in project.tech" :key="t.name" class="tech-chip">
                <img v-if="t.iconType === 'Imagen'" :src="urlFor(t.image).url()" class="chip-icon-img" />
                <i v-else-if="t.iconType === 'FontAwesome'" :class="t.iconClass" class="chip-icon-fa" :style="{color: t.color}"></i>
                <span v-else class="chip-icon-emoji">{{ t.emoji }}</span>
                <span class="chip-text">{{ t.name }}</span>
              </div>
            </div>
          </div>

          <div class="modal-links">
            <a v-if="project.github" :href="project.github" target="_blank" class="cv-btn cv-btn-primary">
              <i class="fab fa-github"></i> Código
            </a>
            <a v-if="project.liveUrl" :href="project.liveUrl" target="_blank" class="cv-btn cv-btn-secondary">
              <i class="fas fa-external-link-alt"></i> Demo Live
            </a>
          </div>
        </div>

        <div class="right-col">
          <div class="image-stack">
            <div class="image-wrapper">
              <img :src="urlFor(project.image).url()" class="modal-main-img" alt="Portada" />
            </div>
            
            <div v-for="(img, idx) in project.gallery" :key="idx" class="image-wrapper">
              <img :src="urlFor(img).url()" class="modal-main-img" alt="Captura de pantalla" />
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</template>

<script setup>
import { urlFor } from '../../sanityClient';
defineProps(['project']);
defineEmits(['close']);
</script>

<style scoped src="./ProjectModal.css" />