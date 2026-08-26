<template>
  <section class="certifications-section">
    <div class="section-header">
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
        {{ k.label }}
      </button>
    </div>

    <!-- Badges: main view, compact grid, more items per page -->
    <template v-if="activeKind === 'badge'">
      <div class="badges-grid" :style="{ '--badge-cols': badgeGridColumns }">
        <div
          v-for="badge in displayedBadges"
          :key="badge.title"
          class="badge-card card-hover-effect"
        >
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

      <p v-if="!displayedBadges.length" class="no-results">No badges yet.</p>

      <div class="pagination-container">
        <button v-if="hasLessBadges" @click="showLessBadges" class="cv-btn cv-btn-secondary">
          <i class="fas fa-chevron-up"></i> Ver Menos
        </button>
        <button v-if="hasMoreBadges" @click="showMoreBadges" class="cv-btn cv-btn-primary">
          Ver Más <i class="fas fa-plus"></i>
        </button>
      </div>
    </template>

    <!-- Certificates: unchanged card design and pagination -->
    <template v-else>
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

      <p v-if="!displayedCertifications.length" class="no-results">No certificates yet.</p>

      <div class="pagination-container">
        <button v-if="hasLessCerts" @click="showLessCerts" class="cv-btn cv-btn-secondary">
          <i class="fas fa-chevron-up"></i> Ver Menos
        </button>
        <button v-if="hasMoreCerts" @click="showMoreCerts" class="cv-btn cv-btn-primary">
          Ver Más <i class="fas fa-plus"></i>
        </button>
      </div>
    </template>
  </section>
</template>

<script lang="ts" src="./Certifications.ts" />
<style scoped src="./Certifications.css" />