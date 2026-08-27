<template>
  <section class="certifications-section">
    <div class="section-header">
      <!-- Se agregó el eyebrow para mantener consistencia con las otras secciones -->
      <p class="section-eyebrow">Credentials</p>
      <h1 class="main-title">Certifications</h1>
      <p class="contact-subtitle">
        Courses and credentials that back up what I know.
      </p>
    </div>

    <div class="kind-tabs" v-if="availableKinds.length > 1">
      <button
        v-for="k in availableKinds"
        :key="k.value"
        type="button"
        class="filter-pill"
        :class="{ 'filter-pill--active': activeKind === k.value }"
        @click="setKind(k.value)"
      >
        {{ k?.label }}
      </button>
    </div>

    <!-- SECCIÓN DE INSIGNIAS (Arriba) -->
    <template v-if="activeKind === 'all' || activeKind === 'badge'">
      <!-- Título separador solo visible si estamos en la vista combinada y hay insignias -->
      <h2 v-if="activeKind === 'all' && displayedBadges.length > 0" class="category-title">Badges</h2>
      
      <div v-if="displayedBadges.length > 0" class="badges-grid" :style="{ '--badge-cols': badgeGridColumns }">
        <div v-for="badge in displayedBadges" :key="badge.title" class="badge-card card-hover-effect">
          <div class="badge-img-wrap">
            <img :src="urlFor(badge.image).url()" :alt="badge.title" />
          </div>
          <p class="badge-title">{{ badge.title }}</p>
          <div class="badge-meta">
            <span v-if="badge.category" class="badge-category">{{ badge.category }}</span>
            <span v-if="badge.year" class="badge-year">{{ badge.year }}</span>
          </div>
        </div>
      </div>
      
      <p v-else-if="activeKind === 'badge'" class="no-results">dont have any badges yet.</p>

      <div class="pagination-container" v-if="displayedBadges.length > 0 && (hasLessBadges || hasMoreBadges)">
        <button v-if="hasLessBadges" @click="showLessBadges" class="cv-btn cv-btn-secondary">
          <i class="fas fa-chevron-up"></i> see less
        </button>
        <button v-if="hasMoreBadges" @click="showMoreBadges" class="cv-btn cv-btn-primary">
          see more <i class="fas fa-plus"></i>
        </button>
      </div>
    </template>

    <!-- SECCIÓN DE CERTIFICADOS (Abajo) -->
    <template v-if="activeKind === 'all' || activeKind === 'certificate'">
      <!-- Título separador dinámico -->
      <h2 v-if="activeKind === 'all' && displayedCertifications.length > 0" 
          class="category-title" 
          :style="displayedBadges.length > 0 ? 'margin-top: 5rem;' : ''">
        Certificates
      </h2>

      <div v-if="displayedCertifications.length > 0" class="certifications-grid">
        <div v-for="cert in displayedCertifications" :key="cert.title" class="cert-card card-hover-effect">
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

      <p v-else-if="activeKind === 'certificate'" class="no-results">dont have any certificates yet.</p>

      <div class="pagination-container" v-if="displayedCertifications.length > 0 && (hasLessCerts || hasMoreCerts)">
        <button v-if="hasLessCerts" @click="showLessCerts" class="cv-btn cv-btn-secondary">
          <i class="fas fa-chevron-up"></i> see less
        </button>
        <button v-if="hasMoreCerts" @click="showMoreCerts" class="cv-btn cv-btn-primary">
          see more <i class="fas fa-plus"></i>
        </button>
      </div>
    </template>
  </section>
</template>

<script lang="ts" src="./Certifications.ts"></script>
<style scoped src="./Certifications.css"></style>