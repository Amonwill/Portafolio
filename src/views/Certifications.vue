<script setup>
import GIT from '../assets/Certifications/GIT.jpg'
import Reque from '../assets/Certifications/Requisitos.jpg'
/* == Desarrollo web == */
import Vue from '../assets/Certifications/vuejs.jpg'
import PHP from '../assets/Certifications/PHP.jpg'

/* == C# == */
import CsharpBasico from '../assets/Certifications/csharp-basico.jpg'
import BackendC from '../assets/Certifications/BackendCsharp.jpg'
import CAvanzado from '../assets/Certifications/CSharpAvanzado.jpg'

/* == Base de datos == */
import PostgreSQL from '../assets/Certifications/PostgreSQL.jpg'
const certifications = [
  {
    title: "Curso de C#",
    category: "SOFTWARE DEVELOPMENT",
    year: "2025",
    description: "Certification in the basics to intermediate level of C# programming language.",
    image: CsharpBasico,
  },
    {
    title: "Curso de C# .NET Avanzado",
    category: "SOFTWARE DEVELOPMENT",
    year: "2025",
    description: "Certification in advanced topics of C# programming language.",
    image: CAvanzado,
  },
  {
    title: "Aprende programacion backend en C# .NET",
    category: "SOFTWARE DEVELOPMENT",
    year: "2025",
    description: "Certification in backend development with C# programming language.",
    image: BackendC,
  },
  {
    title: "Recoleccion y analisis de requerimientos de software",
    category: "SOFTWARE DEVELOPMENT",
    year: "2025",
    description: "Certification in requirements gathering and analysis for software development projects.",
    image: Reque,
  },
  {
    title: "Vue.js: de cero a experto",
    category: "FRONTEND DEVELOPMENT",
    year: "2026",
    description: "Certification in the fundamentals of Vue.js framework.",
    image: Vue,
  },
  {
    title: "Modern PHP: the complete guide - from Beginner to Advanced",
    category: "BACKEND DEVELOPMENT",
    year: "2026",
    description: "Certification in the fundamentals of PHP programming language.",
    image: PHP,
  },
  {
    title: "PostgreSQL: De cero a avanzado (pgAdmin4 y shell)",
    category: "DATABASES",
    year: "2026",
    description: "Certification in the fundamentals of PostgreSQL database management system.",
    image: PostgreSQL,
  },
  {
    title: "Aprende Git, GitHub y GitHub Actions",
    category: "VERSION CONTROL",
    year: "2026",
    description: "Certification in the fundamentals of Git version control system.",
    image: GIT,
  },

]
</script>

<template>
  <section class="certifications-section">
    <div class="category-card section-glow-card">
      <h1>Certifications</h1>
      <p>Validated Skills & Professional Growth</p>
    </div>
    <div class="certifications-grid">
      <div v-for="cert in certifications" :key="cert.title" class="cert-card card-hover-effect">
        <div class="cert-img-banner">
          <img :src="cert.image" :alt="cert.title" />
        </div>
        <div class="cert-info">
          <h3 class="cert-title">{{ cert.title }}</h3>
          <p class="cert-category">{{ cert.category }}</p>
          <div class="cert-footer">
            <span class="cert-year">{{ cert.year }}</span>
          </div>
          <p class="cert-desc">{{ cert.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.certifications-section {
  max-width: 1200px;
  margin: 2.5rem auto;
  padding: 2rem 1rem;
  overflow-x: clip;
}
.section-glow-card {
  margin-bottom: 2.8rem;
  position: relative;
  z-index: 2;
  animation: boxGlowCertHeader 4s linear infinite;
  box-shadow: none;
  background: var(--card-bg);
  border-radius: 1.3rem;
  padding: 2.2rem 1.2rem .7em 2.1em;
  width: 100%;
  max-width: 690px;
  margin-left: auto;
  margin-right: auto;
  box-sizing: border-box;
  overflow-x: clip;
}
@keyframes boxGlowCertHeader {
  0% {
    box-shadow:
      0 0 11px 2px var(--glow-a, #ffe66299),
      0 0 22px 6px var(--glow-b, #ff823f55),
      0 0 33px 8px var(--glow-c, #fc5c7d33);
  }
  33% {
    box-shadow:
      0 0 16px 5px var(--glow-b, #ff823f44),
      0 0 24px 8px var(--glow-c, #fc5c7d44),
      0 0 8px 2px var(--glow-a, #ffe66277);
  }
  66% {
    box-shadow:
      0 0 19px 6px var(--glow-c, #fc5c7d44),
      0 0 10px 3px var(--glow-a, #ffe66277),
      0 0 16px 4px var(--glow-b, #ff823f44);
  }
  100% {
    box-shadow:
      0 0 11px 2px var(--glow-a, #ffe66299),
      0 0 22px 6px var(--glow-b, #ff823f55),
      0 0 33px 8px var(--glow-c, #fc5c7d33);
  }
}
@media (max-width: 800px) {
  .section-glow-card {
    max-width: calc(100vw - 1.2rem);
    padding: 1.2rem 0.5rem 0.8rem 0.5rem;
  }
}
@media (max-width: 600px) {
  .section-glow-card {
    max-width: calc(100vw - 0.4rem);
    padding: 1rem 0.15rem 0.7rem 0.15rem;
  }
}

.category-card h1 {
  font-size: 2.2rem;
  font-weight: 800;
  letter-spacing: 1px;
  margin: 0 0 0.3em 0;
  background: var(--title-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.category-card p {
  font-size: 1.15rem;
  margin: 0;
  opacity: 0.89;
  letter-spacing: .01em;
}

.certifications-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 3.6rem 4.6rem;
  justify-content: center;
  align-items: stretch;
}
.cert-card {
  background: var(--card-bg);
  border-radius: 1.2rem;
  overflow: hidden;
  min-width: 320px;
  max-width: 355px;
  width: 100%;
  display: flex;
  flex-direction: column;
  position: relative;
  box-shadow:
    0 0 18px 1px var(--glow-a, #ffe66233),
    0 2px 10px #0002;
  transition: box-shadow 0.45s cubic-bezier(.28,.84,.42,1), transform .18s;
  z-index: 1;
  margin-bottom: 0.7em;
}
.cert-card:hover {
  animation: boxGlowCertCard 3.1s linear infinite;
  z-index: 2;
  transform: translateY(-8px) scale(1.022);
}
@keyframes boxGlowCertCard {
  0% {
    box-shadow:
      0 0 21px 2px var(--glow-a, #ffe66277),
      0 0 34px 9px var(--glow-b, #ff823f66),
      0 0 74px 19px var(--glow-c, #fc5c7d44),
      0 2px 10px #0002;
  }
  33% {
    box-shadow:
      0 0 28px 8px var(--glow-b, #ff823f66),
      0 0 38px 13px var(--glow-c, #fc5c7d44),
      0 0 18px 7px var(--glow-a, #ffe66288),
      0 2px 10px #0002;
  }
  66% {
    box-shadow:
      0 0 44px 12px var(--glow-c, #fc5c7d44),
      0 0 14px 4px var(--glow-a, #ffe66288),
      0 0 33px 11px var(--glow-b, #ff823f66),
      0 2px 10px #0002;
  }
  100% {
    box-shadow:
      0 0 21px 2px var(--glow-a, #ffe66277),
      0 0 34px 9px var(--glow-b, #ff823f66),
      0 0 74px 19px var(--glow-c, #fc5c7d44),
      0 2px 10px #0002;
  }
}

.cert-img-banner {
  width: 100%;
  height: 220px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  overflow: hidden;
}
.cert-img-banner img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  background: #fff;
}

.cert-info {
  flex: 1 1 auto;
  padding: 1.1rem 1.1rem 0.7rem 1.1rem;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
}
.cert-title {
  font-size: 1.14rem;
  font-weight: 800;
  color: var(--h2-color, #ffe662);
  margin-top: 0;
  margin-bottom: 0.21rem;
  letter-spacing: .01em;
}
.cert-category {
  font-weight: 700;
  color: #ffd700;
  font-size: .99rem;
  margin-bottom: 0.5em;
  letter-spacing: 0.02em;
  text-transform: uppercase;
}
.cert-footer {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  margin-bottom: 0.5em;
}
.cert-year {
  color: #767676;
  font-size: 0.98rem;
  font-weight: 600;
  margin-left: auto;
}
.cert-desc {
  margin-top: .5em;
  color: var(--content-color, #232323);
  font-size: .98rem;
  opacity: 0.9;
  line-height: 1.32;
  font-family: 'Montserrat', sans-serif;
  text-align: left;
}

@media (max-width: 1200px) {
  .certifications-grid { gap: 2.2rem 2.8rem; }
}
@media (max-width: 1000px) {
  .certifications-grid { gap: 1.3rem 2rem; }
  .cert-card { min-width: 92vw; max-width: 97vw; }
  .cert-img-banner { height: 175px; }
}
@media (max-width: 600px) {
  .certifications-section { padding: .5rem; }
  .certifications-grid { gap: 1.3rem 0.5rem; }
  .cert-card { min-width: 98vw; max-width: 99vw; }
  .cert-img-banner { height: 110px; }
}
</style>