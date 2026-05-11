<template>
  <section class="certifications-section">
    <div class="certifications-grid">
      <div 
        v-for="cert in displayedCertifications" 
        :key="cert.title" 
        class="cert-card card-hover-effect"
      >
        <div class="cert-img-banner">
          <img :src="urlFor(cert.image).url()" :alt="cert.title" />
        </div>
        
        <div class="cert-info">
          <div class="cert-header-meta">
            <p class="cert-category">{{ cert.category }}</p>
            <span class="cert-year">{{ cert.year }}</span>
          </div>
          
          <h3 class="cert-title">{{ cert.title }}</h3>
          
          <div class="cert-body">
            <p class="cert-desc">{{ cert.description }}</p>
          </div>
        </div>
      </div>
    </div>

    <div class="pagination-container">
      <button v-if="hasLess" @click="showLess" class="cv-btn cv-btn-secondary">
        <i class="fas fa-chevron-up"></i> Ver Menos
      </button>

      <button v-if="hasMore" @click="showMore" class="cv-btn cv-btn-primary">
        Ver Más <i class="fas fa-plus"></i>
      </button>
    </div>
  </section>
</template>

<script lang="ts" src="./Certifications.ts" />
<style scoped src="./Certifications.css" />