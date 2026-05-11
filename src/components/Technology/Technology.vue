<template>
  <section class="technologies-section">
    <div class="technologies-card card-hover-effect always-glow">
      <div class="tech-sections">
        <div v-for="(icons, category) in groupedSkills" :key="category" class="tech-section">
          <h3>{{ category }}</h3>
          <div class="icons-list">
            <img 
              v-for="icon in icons" 
              :key="icon.name" 
              :src="urlFor(icon.icon).url()" 
              :alt="icon.name" 
              :title="icon.name" 
              class="tech-icon" 
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts" src="./Technology.ts" />
<style scoped src="./Technology.css" />