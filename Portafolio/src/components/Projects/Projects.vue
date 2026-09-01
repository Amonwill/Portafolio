<template>
  <section id="projects" class="projects-section">
    <div class="section-header">
      <p class="section-eyebrow">Work</p>
      <h1 class="main-title">Projects</h1>
      <p class="contact-subtitle">
        A selection of things I've built, from concept to deployment.
      </p>
    </div>

    <div class="filter-bar" v-if="availableFilters.length > 2">
      <button
        v-for="f in availableFilters"
        :key="f.value"
        type="button"
        class="filter-pill"
        :class="{ 'filter-pill--active': activeFilter === f.value }"
        @click="setFilter(f.value)"
      >
        {{ f.label }}
      </button>
    </div>

    <transition-group name="project-fade" tag="div" class="projects-grid" :style="{ '--cols': gridColumns }">
      <div
        class="project-card"
        v-for="proj in filteredProjects"
        :key="proj.slug ? proj.slug.current : proj.title"
        @click="openProject(proj)"
      >
        <div class="project-img-banner">
          <img
            :src="urlFor(proj.image).width(640).auto('format').quality(75).url()"
            :alt="proj.title"
            loading="lazy"
            decoding="async"
          />
        </div>
        <div class="project-info">
          <div class="project-title-row">
            <h3 class="project-title">{{ proj.title }}</h3>
            <span v-if="proj.projectType" class="project-type-tag">{{ typeLabel(proj.projectType) }}</span>
          </div>
          <p class="project-desc">{{ proj.desc }}</p>
          <div class="project-techs">
            <span v-for="t in proj.tech" :key="t.name" class="tech-icon">
              <img
                v-if="t.iconType === 'Imagen'"
                :src="urlFor(t.image).width(48).auto('format').quality(80).url()"
                class="tech-img-icon"
                loading="lazy"
                decoding="async"
              />
              <i v-else-if="t.iconType === 'FontAwesome'" :class="t.iconClass" :style="{color: t.color}"></i>
              <span v-else>{{ t.emoji }}</span>
            </span>
          </div>
        </div>
      </div>
    </transition-group>

    <p v-if="!filteredProjects.length" class="no-results">
      No projects found for this category yet.
    </p>

    <ProjectModal
      v-if="selectedProject"
      :project="selectedProject"
      @close="closeProject"
    />
  </section>
</template>

<script lang="ts" src="./Projects.ts" />
<style scoped src="./Projects.css" />