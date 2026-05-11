<template>
  <section id="projects" class="projects-section">
    <div class="projects-grid">
      <div 
        class="project-card" 
        v-for="(proj, idx) in projects" 
        :key="idx"
        @click="openProject(proj)"
      >
        <div class="project-img-banner">
          <img :src="urlFor(proj.image).url()" :alt="proj.title" />
        </div>
        <div class="project-info">
          <h3 class="project-title">{{ proj.title }}</h3>
          <p class="project-desc">{{ proj.desc }}</p>
          <div class="project-techs">
            <span v-for="t in proj.tech" :key="t.name" class="tech-icon">
              <img v-if="t.iconType === 'Imagen'" :src="urlFor(t.image).url()" class="tech-img-icon" />
              <i v-else-if="t.iconType === 'FontAwesome'" :class="t.iconClass" :style="{color: t.color}"></i>
              <span v-else>{{ t.emoji }}</span>
            </span>
          </div>
        </div>
      </div>
    </div>

    <ProjectModal 
      v-if="selectedProject" 
      :project="selectedProject" 
      @close="closeProject" 
    />
  </section>
</template>

<script lang="ts" src="./Projects.ts" />
<style scoped src="./Projects.css" />