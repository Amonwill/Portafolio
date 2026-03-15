<script setup>
import AboutMe from './AboutMe.vue'
import Projects from './Projects.vue'
import Technology from './Technology.vue'
import Certifications from './Certifications.vue'
</script>

<template>
  <div class="home-content">
    <AboutMe />
    <Projects />
    <Technology />
    <Certifications />
  </div>
</template>

<style scoped>
.home-content {
  display: flex;
  flex-direction: column;
  gap: 2.5rem;
  margin-bottom: 2rem;
}
</style>