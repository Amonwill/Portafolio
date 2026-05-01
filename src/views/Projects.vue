<script setup>
import ConexionDispositivo from '../assets/IrrigacionInteligente/ConexionDispositivo.png';
import TdaModerna from '../assets/TdaModerna/TdaModerna.jpg';
import Porta from '../assets/Portafolio/Portafolio.png';
import Arduino_IDE from '../assets/iconos/Arduino_IDE.png';
import Kotlin_Icon from '../assets/iconos/Kotlin_Icon.png';
import tensorflow_lite from '../assets/iconos/tensorflow-lite.webp';
import SectionNameCard from '../components/SectionNameCard.vue';

const projects = [
  {
    title: 'Smart Irrigation System',
    desc: 'An intelligent irrigation system that uses sensors and automation to optimize water usage.',
    image: ConexionDispositivo,
    github: 'https://github.com/Amonwill/irrigation-app',
    tech: [
      { image: Kotlin_Icon, name: 'Kotlin' },
      { image: tensorflow_lite, name: 'TensorFlow Lite' },
      { image: Arduino_IDE, name: 'Arduino IDE' },
    ],
  },
  {
    title: 'Sales Management System',
    desc: 'A comprehensive sales management system designed to streamline sales processes and improve customer relationships.',
    image: TdaModerna,
    github: 'https://github.com/Amonwill/Tienda',
    sql: 'https://github.com/Amonwill/La_Moderna_DB',
    tech: [
      { icon: 'fa-brands fa-vuejs', name: 'Vue.js', style: 'color:#41B883;' },
      { icon: 'fa-brands fa-php', name: 'PHP', style: 'color:#777BB4;' },
      { icon: 'fa-brands fa-js', name: 'JS', style: 'color:#F7DF1E;' },
    ],
  },
  {
    title: 'Portfolio Website',
    desc: 'A comprehensive portfolio website to showcase my work and skills.',
    image: Porta,
    github: 'https://github.com/Amonwill/Portafolio',
    tech: [
      { icon: 'fa-brands fa-vuejs', name: 'Vue.js', style: 'color:#41B883;' },
      { icon: 'fa-brands fa-css3', name: 'CSS3', style: 'color:#777BB4;' },
      { icon: 'fa-brands fa-js', name: 'JS', style: 'color:#F7DF1E;' },
    ],
  }
];
</script>

<template>
  <section class="projects-section">
    <SectionNameCard
      title="Projects"
      subtitle="Personal & Team Software Projects"
      class="section-glow-card"
    />
    <div class="projects-grid">
      <div
        class="project-card"
        v-for="(proj, idx) in projects"
        :key="idx"
      >
        <div class="project-img-banner">
          <img :src="proj.image" :alt="proj.title" />
        </div>
        <div class="project-info">
          <h3 class="project-title">{{ proj.title }}</h3>
          <p class="project-desc">{{ proj.desc }}</p>
          <div class="project-techs">
            <span>TECHNOLOGIES:</span>
            <span
              v-for="tech in proj.tech"
              :key="tech.name"
              :title="tech.name"
              class="tech-icon"
            >
              <img
                v-if="tech.image"
                :src="tech.image"
                :alt="tech.name"
                class="tech-img-icon"
              />
              <i
                v-else-if="tech.icon"
                :class="tech.icon"
                :style="tech.style || ''"
              ></i>
              <span
                v-else-if="tech.emoji"
                :style="tech.style || ''"
                style="font-size:1.38rem; vertical-align:middle;"
              >{{ tech.emoji }}</span>
            </span>
          </div>
        </div>
        <div class="project-gh">
          <a :href="proj.github" target="_blank" title="View on GitHub">
            <i class="fab fa-github"></i>
          </a>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.section-glow-card {
  margin-bottom: 2.8rem;
  position: relative;
  z-index: 2;
  box-shadow: none;
  animation: boxGlowProjectHeader 4s linear infinite;
}
@keyframes boxGlowProjectHeader {
  0% {
    box-shadow:
      0 0 11px 2px var(--glow-a, #5bd6b999),
      0 0 22px 6px var(--glow-b, #45a2ff55),
      0 0 33px 8px var(--glow-c, #fc5c7d33);
  }
  33% {
    box-shadow:
      0 0 16px 5px var(--glow-b, #45a2ff44),
      0 0 24px 8px var(--glow-c, #fc5c7d44),
      0 0 8px 2px var(--glow-a, #5bd6b977);
  }
  66% {
    box-shadow:
      0 0 19px 6px var(--glow-c, #fc5c7d44),
      0 0 10px 3px var(--glow-a, #5bd6b977),
      0 0 16px 4px var(--glow-b, #45a2ff44);
  }
  100% {
    box-shadow:
      0 0 11px 2px var(--glow-a, #5bd6b999),
      0 0 22px 6px var(--glow-b, #45a2ff55),
      0 0 33px 8px var(--glow-c, #fc5c7d33);
  }
}

.projects-section {
  max-width: 1200px;
  margin: 2.5rem auto;
  padding: 2rem 1rem;
}
.projects-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 3.6rem 4.6rem;
  justify-content: center;
  align-items: stretch;
}

.project-card {
  background: var(--card-bg);
  border-radius: 1.2rem;
  overflow: hidden;
  min-width: 320px;
  max-width: 355px;
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow:
    0 0 18px 1px var(--glow-a, #5bd6b933),
    0 2px 10px #0002;
  transition: box-shadow 0.45s cubic-bezier(.28,.84,.42,1), transform .18s;
  z-index: 1;
  margin-bottom: 0.7em;
}
.project-card:hover {
  animation: boxGlowProject 3.1s linear infinite;
  z-index: 2;
  transform: translateY(-8px) scale(1.022);
}
@keyframes boxGlowProject {
  0% {
    box-shadow:
      0 0 21px 2px var(--glow-a, #5bd6b977),
      0 0 34px 9px var(--glow-b, #45a2ff66),
      0 0 74px 19px var(--glow-c, #fc5c7d44),
      0 2px 10px #0002;
  }
  33% {
    box-shadow:
      0 0 28px 8px var(--glow-b, #45a2ff66),
      0 0 38px 13px var(--glow-c, #fc5c7d44),
      0 0 18px 7px var(--glow-a, #5bd6b988),
      0 2px 10px #0002;
  }
  66% {
    box-shadow:
      0 0 44px 12px var(--glow-c, #fc5c7d44),
      0 0 14px 4px var(--glow-a, #5bd6b988),
      0 0 33px 11px var(--glow-b, #45a2ff66),
      0 2px 10px #0002;
  }
  100% {
    box-shadow:
      0 0 21px 2px var(--glow-a, #5bd6b977),
      0 0 34px 9px var(--glow-b, #45a2ff66),
      0 0 74px 19px var(--glow-c, #fc5c7d44),
      0 2px 10px #0002;
  }
}

.project-img-banner {
  width: 100%;
  height: 220px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.project-img-banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: #fff;
}

.project-info {
  flex: 1 1 auto;
  padding: 1.1rem 1.1rem 0.7rem 1.1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.project-title {
  font-size: 1.23rem;
  font-weight: 800;
  color: var(--h2-color, #45a2ff);
  margin-top: 0;
  margin-bottom: 0.45rem;
  letter-spacing: .01em;
  font-family: 'Montserrat', 'Segoe UI', Arial, sans-serif;
}
.project-desc {
  font-size: 1.01rem;
  color: var(--content-color, #383d42);
  margin-bottom: .7rem;
  font-family: 'Fira Mono', 'Courier New', monospace;
  letter-spacing: .03em;
  text-align: left;
}
.project-techs {
  display: flex;
  align-items: center;
  gap: .6em;
  flex-wrap: wrap;
  margin-top: 0.5em;
}
.project-techs > span:first-child {
  color: var(--glow-b, #45a2ff);
  font-weight: bold;
  font-size: .95rem;
  margin-right: .5em;
  letter-spacing: .03em;
  font-family: 'Fira Mono', 'Courier New', monospace;
}
.tech-icon i {
  font-size: 1.38rem;
  vertical-align: middle;
}
.tech-img-icon {
  width: 2rem;
  height: 2rem;
  object-fit: contain;
  border-radius: 6px;
  background: #232323;
  box-shadow: 0 0 10px 2px #3ad6b944;
  margin-right: .15em;
  vertical-align: middle;
  display: inline-block;
}
.project-gh {
  text-align: right;
  padding: 0 1.3rem 1rem 0;
  margin-top: auto;
}
.project-gh a {
  color: var(--h2-color, #45a2ff);
  font-size: 2rem;
  opacity: .82;
  transition: opacity .15s, color .13s;
}
.project-gh a:hover {
  opacity: 1;
  color: var(--link-color-hover, #7ecdff);
}

@media (max-width: 1200px) {
  .projects-grid { gap: 2.2rem 2.8rem; }
}
@media (max-width: 1000px) {
  .projects-grid { gap: 1.3rem 2rem; }
  .project-card { min-width: 92vw; max-width: 97vw; height: auto; }
  .project-img-banner { height: 175px; }
}
@media (max-width: 600px) {
  .projects-section { padding: .5rem; }
  .projects-grid { gap: 1.3rem 0.5rem; }
  .project-card { min-width: 98vw; max-width: 99vw; height: auto; }
  .project-img-banner { height: 110px; }
}
</style>