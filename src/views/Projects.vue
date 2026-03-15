<script setup>
import ConexionDispositivo from '../assets/IrrigacionInteligente/ConexionDispositivo.png';
import TdaModerna from '../assets/TdaModerna/TdaModerna.jpg';
import Porta from '../assets/Portafolio/Portafolio.png';
import Arduino_IDE from '../assets/iconos/Arduino_IDE.png';
import Kotlin_Icon from '../assets/iconos/Kotlin_Icon.png';
import tensorflow_lite from '../assets/iconos/tensorflow-lite.webp';

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
    github: 'https://github.com/Amonwill/tndalamoderna',
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
    github: 'https://github.com/Amonwill/tndalamoderna',
    tech: [
      { icon: 'fa-brands fa-vuejs', name: 'Vue.js', style: 'color:#41B883;' },
      { icon: 'fa-brands fa-php', name: 'PHP', style: 'color:#777BB4;' },
      { icon: 'fa-brands fa-js', name: 'JS', style: 'color:#F7DF1E;' },
    ],
  }
];
</script>

<template>
  <section class="projects-section">
    <h2>Projects</h2>
    <div class="projects-grid">
      <div class="project-card" v-for="(proj, idx) in projects" :key="idx">
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
.projects-section {
  max-width: 1200px;
  margin: 2.5rem auto;
  padding: 2rem;
}
.projects-section h2 {
  text-align: center;
  color: var(--h1-color);
  font-size: 2.1rem;
  margin-bottom: 2rem;
  font-weight: 700;
}

.projects-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 2rem;
  justify-content: center;
}

.project-card {
  background: var(--card-bg);
  border-radius: 1.2rem;
  overflow: hidden;
  min-width: 310px;
  max-width: 355px;
  box-shadow: 0 2px 18px #0002;
  display: flex;
  flex-direction: column;
  transition: transform .16s, box-shadow .16s;
  position: relative;
  height: 510px;
}
.project-card:hover {
  transform: translateY(-8px) scale(1.022);
  box-shadow: 0 0 32px 6px var(--card-glow, #6a1b20), 0 4px 22px #0002;
  z-index: 2;
}

.project-img-banner {
  width: 100%;
  height: 58%;
  min-height: 230px;
  max-height: 320px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  padding: 0;
}

.project-img-banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  background: #fff;
}

.project-info {
  flex: 1 1 auto;
  padding: 1.1rem 1.2rem 0.5rem 1.2rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}

.project-title {
  font-size: 1.18rem;
  font-weight: 700;
  color: var(--h2-color);
  margin-top: 0;
  margin-bottom: 0.45rem;
  letter-spacing: .02em;
}

.project-desc {
  font-size: 1rem;
  color: var(--content-color);
  margin-bottom: .8rem;
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
  color: var(--h2-color);
  font-weight: bold;
  font-size: .98rem;
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
  box-shadow: 0 0 10px 2px #d32f2f44;
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
  color: var(--h2-color, #fff);
  font-size: 2.1rem;
  opacity: .87;
  transition: opacity .15s, color .15s;
}
.project-gh a:hover {
  opacity: 1;
  color: var(--link-color-hover, #7ecdff);
}
@media (max-width: 1000px) {
  .projects-grid {
    gap: 1.1rem;
  }
  .project-card {
    min-width: 92vw;
    max-width: 97vw;
    height: auto;
  }
  .project-img-banner {
    min-height: 160px;
    height: 42vw;
    max-height: 240px;
  }
}
@media (max-width: 600px) {
  .projects-section {
    padding: .5rem;
  }
  .project-card {
    min-width: 99vw;
    max-width: 99vw;
    height: auto;
  }
  .project-img-banner {
    min-height: 90px;
    height: 34vw;
    max-height: 160px;
  }
}
</style>