<script setup>
import Reque from '../assets/Certifications/Requisitos.jpg'
const certifications = [
  {
    title: "Recoleccion y analisis de requerimientos de software",
    category: "SOFTWARE DEVELOPMENT",
    year: "2025",
    description: "Certification in requirements gathering and analysis for software development projects.",
    image: Reque,
  },
]
</script>

<template>
  <div class="certifications-page">
    <div class="category-card section-glow-card">
      <h1>Certifications</h1>
      <p>Validated Skills & Professional Growth</p>
    </div>

    <div class="certifications-grid">
      <div v-for="cert in certifications" :key="cert.title" class="cert-card card-hover-effect">
        <div class="cert-img">
          <img :src="cert.image" :alt="cert.title" />
        </div>
        <div class="cert-content">
          <p class="cert-category">{{ cert.category }}</p>
          <div class="cert-footer">
            <span class="cert-year">{{ cert.year }}</span>
          </div>
          <p class="cert-desc">{{ cert.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.certifications-page {
  max-width: 1160px;
  margin: 0 auto;
  padding: 2.5rem 1rem 3rem 1rem;
  box-sizing: border-box;
}

.category-card.section-glow-card {
  background: var(--card-bg);
  color: var(--content-color, #232323);
  border-radius: 1.3rem;
  box-shadow: none;
  padding: 2.2rem 1.2rem .7em 2.1em;
  margin: 0 auto 2.8rem auto;
  max-width: 690px;
  text-align: center;
  position: relative;
  z-index: 2;
  animation: boxGlowCertHeader 4s linear infinite;
}
@keyframes boxGlowCertHeader {
  0%   { box-shadow: 
    0 0 10px 1.5px var(--glow-a, #1ed76099),
    0 0 21px 4px var(--glow-b, #40008055),
    0 0 29px 7px var(--glow-c, #ffd70044);
  }
  33%  { box-shadow:
    0 0 15px 3px var(--glow-b, #40008055),
    0 0 23px 7px var(--glow-c, #ffd70044),
    0 0 8px 2px var(--glow-a, #1ed76099);
  }
  66%  { box-shadow:
    0 0 18px 4px var(--glow-c, #ffd70044),
    0 0 8px 2px var(--glow-a, #1ed76099),
    0 0 11px 3px var(--glow-b, #40008055);
  }
  100% { box-shadow: 
    0 0 10px 1.5px var(--glow-a, #1ed76099),
    0 0 21px 4px var(--glow-b, #40008055),
    0 0 29px 7px var(--glow-c, #ffd70044);
  }
}

.category-card h1 {
  font-size: 2.6rem;
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
  gap: 2.4rem;
  flex-wrap: wrap;
  justify-content: center;
}

.cert-card {
  background: var(--card-bg);
  border-radius: 1.3rem;
  box-shadow: 0 0 10px 1.5px var(--glow-a, #ffd70022), 0 2px 10px #0002;
  width: 350px;
  max-width: 98vw;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  padding: 1.1rem 1rem 1rem 1rem;
  margin-bottom: 1.6rem;
  transition: 
    box-shadow 0.33s cubic-bezier(.29,.73,.44,1),
    transform 0.18s cubic-bezier(0.4,0.2,0.2,1),
    z-index 0.15s;
  will-change: transform, box-shadow;
}
.cert-card:hover {
  animation: boxGlowCertCard 3.1s linear infinite;
  z-index: 10;
  transform: translateY(-12px) scale(1.037);
}
@keyframes boxGlowCertCard {
  0% { box-shadow:
    0 0 16px 2px var(--glow-a, #1ed760aa),
    0 0 24px 5px var(--glow-b, #40008044),
    0 0 29px 8px var(--glow-c, #ffd70033),
    0 2px 10px #0002;
  }
  33% { box-shadow:
    0 0 20px 4px var(--glow-b, #40008044),
    0 0 27px 9px var(--glow-c, #ffd70033),
    0 0 7px 2px var(--glow-a, #1ed760aa),
    0 2px 10px #0002;
  }
  66% { box-shadow:
    0 0 24px 7px var(--glow-c, #ffd70033),
    0 0 8px 3px var(--glow-a, #1ed760aa),
    0 0 13px 4px var(--glow-b, #40008044),
    0 2px 10px #0002;
  }
  100% { box-shadow:
    0 0 16px 2px var(--glow-a, #1ed760aa),
    0 0 24px 5px var(--glow-b, #40008044),
    0 0 29px 8px var(--glow-c, #ffd70033),
    0 2px 10px #0002;
  }
}

.cert-img img {
  width: 100%;
  border-radius: 0.9rem;
  object-fit: cover;
  margin-bottom: 1.1rem;
  box-shadow: 0 1.5px 12px #0003;
}

.cert-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.cert-category {
  font-weight: 800;
  color: var(--h2-color, #ffd700);
  font-size: 1.06rem;
  margin-bottom: 0.1em;
  letter-spacing: 0.03em;
  text-transform: uppercase;
}

.cert-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
}
.cert-year {
  color: #767676;
  font-size: 0.95rem;
  font-weight: 600;
}
.cert-desc {
  margin-top: 1em;
  color: var(--content-color, #232323);
  font-size: 1rem;
  opacity: 0.9;
  font-family: 'Montserrat', sans-serif;
}

@media (max-width: 900px) {
  .category-card {
    padding: 1.1rem 0.5rem 0.8rem 0.5rem;
    font-size: .97rem;
  }
  .certifications-grid {
    gap: 1.2rem;
  }
  .cert-card {
    width: 98vw;
    padding: 0.7rem 0.5rem 1.1rem 0.5rem;
  }
}
</style>