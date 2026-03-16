<script setup>
defineProps({
  title: String,
  subtitle: String
});
</script>

<template>
  <div class="section-name-card card-hover-effect always-glow">
    <h1 class="section-title">
      <slot name="icon"/>{{ title }}
    </h1>
    <p v-if="subtitle" class="section-sub">{{ subtitle }}</p>
  </div>
</template>

<style scoped>
.section-name-card {
  background: var(--card-bg, #161616);
  color: var(--content-color, #fff);
  border-radius: 1.6rem;
  box-shadow: none;
  padding: 2.1rem 2.3em 1rem 2.3em;
  margin: 0 auto 2.7rem auto;
  max-width: 510px;
  text-align: center;
  position: relative;
  z-index: 2;
}
.section-title {
  font-size: 2.2rem;
  font-weight: 800;
  letter-spacing: 1px;
  margin: 0 0 0.18em 0;
  background: var(--title-gradient); 
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.section-sub {
  font-size: 1.12rem;
  opacity: .82;
  margin: 0;
  letter-spacing: 0.01em;
}
</style>