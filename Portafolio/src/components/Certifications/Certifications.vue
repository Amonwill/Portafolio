<template>
  <section id="certificates" class="certifications-section">
    <div class="section-header">
      <p class="section-eyebrow">Credentials</p>
      <h1 class="main-title">Certifications</h1>
      <p class="contact-subtitle">
        Courses and credentials that back up what I know.
      </p>
    </div>

    <template v-if="badges.length > 0">
      <h2 class="category-title">Badges</h2>

      <div class="badges-grid" :style="{ '--badge-cols': badgeGridColumns }">
        <a
          v-for="badge in displayedBadges"
          :key="badge._id"
          class="badge-card card-hover-effect"
          :class="{ 'is-disabled': !badge.credlyUrl }"
          :href="badge.credlyUrl || '#'"
          target="_blank"
          rel="noopener"
          @click="!badge.credlyUrl && $event.preventDefault()"
        >
          <div
            class="badge-img-wrap"
            :style="{ '--img-ratio': badge.visual?.aspectRatio || 1 }"
          >
            <img
              v-if="badge.visual?.src"
              :src="badge.visual.src"
              :alt="badge.title"
              loading="lazy"
              decoding="async"
            />
            <i v-else class="fas fa-award"></i>
          </div>
          <p class="badge-title">{{ badge.title }}</p>
          <div class="badge-meta">
            <span v-if="badge.category" class="badge-category">{{ badge.category }}</span>
            <span v-if="badge.area" class="badge-area">{{ badge.area }}</span>
            <span v-if="badge.year" class="badge-year">{{ badge.year }}</span>
          </div>
        </a>
      </div>

      <div class="pagination-container" v-if="hasLessBadges || hasMoreBadges">
        <button v-if="hasLessBadges" @click="showLessBadges" class="cv-btn cv-btn-secondary">
          <i class="fas fa-chevron-up"></i> see less
        </button>
        <button v-if="hasMoreBadges" @click="showMoreBadges" class="cv-btn cv-btn-primary">
          see more <i class="fas fa-plus"></i>
        </button>
      </div>
    </template>

    <template v-if="certificates.length > 0">
      <h2 class="category-title" :style="badges.length > 0 ? 'margin-top: 5rem;' : ''">
        Certificates
      </h2>

      <div class="kind-tabs area-tabs" v-if="availableAreas.length > 1">
        <button
          v-for="a in availableAreas"
          :key="a.value"
          type="button"
          class="filter-pill filter-pill--area"
          :class="{ 'filter-pill--active': activeArea === a.value }"
          @click="setArea(a.value)"
        >
          {{ a.label }}
        </button>
      </div>

      <div v-if="displayedCertifications.length > 0" class="certifications-grid">
        <div
          v-for="cert in displayedCertifications"
          :key="cert._id"
          class="cert-card card-hover-effect"
          :class="{ 'is-disabled': !cert.visual }"
          @click="cert.visual ? abrirModal(cert) : null"
        >
          <div class="cert-img-banner" :class="{ 'cert-img-banner--pdf': cert.visual?.type === 'pdf' }">
            <img
              v-if="cert.visual?.type === 'image'"
              :src="cert.visual.src"
              :alt="cert.title"
              loading="lazy"
              decoding="async"
            />
            <template v-else-if="cert.visual?.type === 'pdf'">
              <i class="fas fa-file-pdf"></i>
              <span class="pdf-label">PDF</span>
            </template>
            <i v-else class="fas fa-certificate"></i>
          </div>
          <div class="cert-info">
            <div class="cert-header-meta">
              <p class="cert-category">CERTIFICATE</p>
              <span v-if="cert.area" class="cert-area">{{ cert.area }}</span>
              <span class="cert-year">{{ cert.year }}</span>
            </div>
            <h3 class="cert-title">{{ cert.title }}</h3>
          </div>
        </div>
      </div>

      <p v-else class="no-results">No certificates match this area yet.</p>

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

  <Teleport to="body">
    <div v-if="certificadoSeleccionado" class="cert-modal-overlay" @click="cerrarModal">
      <div class="cert-modal-content" @click.stop>
        <button class="cert-modal-close" @click="cerrarModal"><i class="fas fa-times"></i></button>
        
        <img v-if="certificadoSeleccionado.visual?.type === 'image'" :src="certificadoSeleccionado.visual.src" :alt="certificadoSeleccionado.title" />
        <iframe v-else-if="certificadoSeleccionado.visual?.type === 'pdf'" :src="certificadoSeleccionado.visual.href"></iframe>
        
        <div class="cert-modal-info">
          <h3>{{ certificadoSeleccionado.title }}</h3>
          <p class="cert-modal-desc" v-if="certificadoSeleccionado.description">
            {{ certificadoSeleccionado.description }}
          </p>
        </div>
      </div>
    </div>
  </Teleport>
</template>

<script lang="ts" src="./Certifications.ts"></script>
<style scoped src="./Certifications.css"></style>