<template>
  <div class="modal-overlay" @click.self="$emit('close')">
    <div class="modal-content always-glow" tabindex="-1" ref="modalContentRef">
      <button class="close-btn" @click="$emit('close')" aria-label="Close modal">&times;</button>

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
            <h3>About the Project</h3>

            <div v-if="descriptionParagraphs.length" class="project-desc-content">
              <p
                v-for="(paragraph, index) in descriptionParagraphs"
                :key="`project-desc-${index}`"
                class="project-desc-paragraph"
              >
                {{ paragraph }}
              </p>
            </div>
          </div>

          <div class="info-section">
            <h3>Technologies and Frameworks</h3>
            <div class="tech-chips-container">
              <div v-for="t in project.tech" :key="t.name" class="tech-chip">
                <img v-if="t.iconType === 'Imagen'" :src="urlFor(t.image).url()" class="chip-icon-img" />
                <i
                  v-else-if="t.iconType === 'FontAwesome'"
                  :class="t.iconClass"
                  class="chip-icon-fa"
                  :style="{ color: t.color }"
                ></i>
                <span v-else class="chip-icon-emoji">{{ t.emoji }}</span>
                <span class="chip-text">{{ t.name }}</span>
              </div>
            </div>
          </div>

          <div class="modal-links">
            <a v-if="project.github" :href="project.github" target="_blank" class="cv-btn cv-btn-primary">
              <i class="fab fa-github"></i> Project Code
            </a>
            <a v-if="project.liveUrl" :href="project.liveUrl" target="_blank" class="cv-btn cv-btn-secondary">
              <i class="fas fa-external-link-alt"></i> Live Project
            </a>
          </div>
        </div>

        <div class="right-col">
          <div class="image-stack">
            <div class="image-wrapper">
              <img :src="urlFor(project.image).url()" class="modal-main-img" alt="cover image" />
            </div>

            <div v-for="(img, idx) in project.gallery" :key="idx" class="image-wrapper">
              <img :src="urlFor(img).url()" class="modal-main-img" alt="screen capture" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onBeforeUnmount, ref, nextTick } from 'vue'
import { urlFor } from '../../sanityClient'

const props = defineProps(['project'])
const emit = defineEmits(['close'])
const modalContentRef = ref(null)

const normalize = (value) =>
  String(value || '')
    .replace(/\r\n/g, '\n')
    .replace(/\r/g, '\n')
    .trim()

const splitParagraphs = (value) =>
  normalize(value)
    .split(/\n+/)
    .map((p) => p.trim())
    .filter(Boolean)

const descriptionParagraphs = computed(() => {
  const text = props.project?.detailedDesc || props.project?.desc || ''
  return splitParagraphs(text)
})

const onKeydown = (event) => {
  if (event.key === 'Escape') {
    emit('close')
  }
}

onMounted(async () => {
  window.addEventListener('keydown', onKeydown)
  await nextTick()
  modalContentRef.value?.focus()
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
})
</script>

<style scoped src="./ProjectModal.css" />