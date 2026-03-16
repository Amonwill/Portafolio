<script setup>
import yomero from '../assets/yomero.jpg';
import CVES from '../assets/CV/CV_ES.pdf';
import CVIN from '../assets/CV/CV_IN.pdf';
</script>

<template>
  <section class="about-me-card card-hover-effect always-glow">
    <div class="about-me-info">
      <h1>William Cruz Hernandez</h1>
      <h2>Student at IPN ESIME CULHUACAN</h2>
      <p>
        I specialize in web development and data analysis where I combine my technical skills with a passion for solving complex problems.
      </p>
      <p>
        I have experience with <strong>c++, c#, java, css3, html5, vue.js, SQL SERVER</strong>, postgresql and other programming languages.
        <br />
        My dreaming is to become a data analyst, making use of my programming skills and my passion for data to help organizations make informed decisions.
        I have experience in programming languages such as Python and R, and I'm proficient in data visualization tools like Tableau and Power BI.
        I am eager to apply my knowledge and skills in real-world projects, and am always looking for opportunities to learn and grow in the field of data analysis.
      </p>
      <div class="about-me-links">
        <a href="https://www.linkedin.com/in/william-cruz-hernandez-7942a6187" target="_blank" rel="noopener">
          <i class="fab fa-linkedin"></i>
        </a>
        <a href="mailto:wcruzhernandez59@gmail.com" target="_blank" rel="noopener">
          <i class="fas fa-envelope"></i>
        </a>
        <a href="https://github.com/Amonwill" target="_blank" rel="noopener">
          <i class="fab fa-github"></i>
        </a>
      </div>
      <div class="cv-download-group">
        <a :href="CVIN" download class="cv-btn cv-btn-primary">Download CV (English)</a>
        <a :href="CVES" download class="cv-btn cv-btn-secondary">Descargar CV (Español)</a>
      </div>
    </div>
    <div class="about-me-photo">
      <img class="about-me-photo-img" :src="yomero" alt="Foto personal" />
    </div>
  </section>
</template>

<style scoped>
.about-me-card {
  display: flex;
  gap: 2.5rem;
  background: var(--card-bg);
  border-radius: 2.1rem;
  padding: 3rem 2rem;
  margin: 2rem auto;
  max-width: 980px;
  align-items: center;
  color: var(--text-main);
  position: relative;
  z-index: 1;
  transition: padding .25s;
}

.card-hover-effect {
  position: relative;
  transition: box-shadow 0.45s cubic-bezier(.28,.84,.42,1), transform .16s;
  box-shadow:
    0 0 18px 2px var(--glow-a, #1ed760),
    0 0 36px 6px var(--glow-b, #400080),
    0 0 74px 14px var(--glow-c, #ffd700);
}
.card-hover-effect.always-glow {
  animation: boxGlowAnimate 3.2s linear infinite;
}
@keyframes boxGlowAnimate {
  0% {
    box-shadow:
      0 0 16px 2px var(--glow-a, #1ed760),
      0 0 44px 13px var(--glow-b, #400080),
      0 0 88px 24px var(--glow-c, #ffd700);
  }
  33% {
    box-shadow:
      0 0 28px 5px var(--glow-b, #400080),
      0 0 60px 19px var(--glow-c, #ffd700),
      0 0 18px 7px var(--glow-a, #1ed760);
  }
  66% {
    box-shadow:
      0 0 52px 13px var(--glow-c, #ffd700),
      0 0 24px 4px var(--glow-a, #1ed760),
      0 0 43px 12px var(--glow-b, #400080);
  }
  100% {
    box-shadow:
      0 0 16px 2px var(--glow-a, #1ed760),
      0 0 44px 13px var(--glow-b, #400080),
      0 0 88px 24px var(--glow-c, #ffd700);
  }
}

.about-me-photo {
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  width: 100%;
}
.about-me-photo-img {
  width: 300px;
  max-width: 100%;
  height: 500px;
  min-width: 160px;
  border-radius: 1.7rem;
  object-fit: cover;
  transition: box-shadow 0.18s, transform 0.18s, width 0.24s, height 0.24s;
  background: #fff;
  cursor: pointer;
  display: block;
  aspect-ratio: 3/5;
}

.about-me-info {
  flex: 2;
  text-align: left;
  padding-left: 0.6rem;
}
.about-me-info h1 {
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.2rem;
  background: var(--title-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.about-me-info h2 {
  font-family: 'Fira Mono', 'Courier New', monospace;
  font-size: 1.4rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
  color: var(--h2-color);
}
.about-me-info p {
  color: var(--content-color);
  line-height: 1.25;
  font-size: 1.08rem;
}
.about-me-info strong {
  font-weight: 700;
}
.about-me-links {
  margin-top: 1.7rem;
  font-size: 2rem;
}
.about-me-links a {
  margin-right: 1.2rem;
  color: var(--link-color);
  transition: color 0.2s;
}
.about-me-links a:hover {
  color: var(--link-color-hover);
}
.cv-download-group {
  margin-top: 1.3rem;
  display: flex;
  gap: 1.15rem;
  justify-content: flex-start;
  flex-wrap: wrap;
}

.cv-btn {
  display: inline-block;
  min-width: 260px;
  background: var(--cv-btn-bg);
  color: var(--cv-btn-text);
  padding: 1.1em 2.2em;
  border-radius: 12px;
  font-family: var(--cv-btn-font, 'Fira Mono', monospace);
  text-decoration: none;
  font-size: 1.09rem;
  font-weight: 700;
  border: none;
  outline: none;
  margin-top: 0;
  letter-spacing: 0.04em;
  box-shadow: var(--cv-btn-shadow);
  transition: background 0.19s, color 0.17s, box-shadow 0.22s, transform 0.13s;
  cursor: pointer;
}
.cv-btn-primary {
  background: var(--cv-btn-bg-main, #1a1a1a);
  color: var(--cv-btn-text-main, #1ed760);
  box-shadow: 0 8px 24px #1ed76035, 0 1.5px 9px #ffd70022;
}
.cv-btn-secondary {
  background: var(--cv-btn-bg-alt, #232323);
  color: var(--cv-btn-text-alt, #7ee1ff);
  box-shadow: 0 3px 12px #7ee1ff19;
}
.cv-btn:hover, .cv-btn:focus {
  background: var(--cv-btn-bg-hover);
  color: var(--cv-btn-text-hover);
  box-shadow: var(--cv-btn-shadow-hover);
  transform: translateY(-4px) scale(1.05);
}
@media (max-width: 900px) {
  .about-me-card {
    flex-direction: column;
    align-items: center;
    padding: 2.3rem 0.7rem 1.7rem 0.7rem;
    max-width: 99vw;
    gap: 1.3rem;
  }
  .about-me-info {
    padding: 0;
    width: 100%;
    text-align: left;
  }
  .about-me-photo {
    width: 100%;
    margin-top: 0.6rem;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .about-me-photo-img {
    width: 78vw;
    max-width: 420px;
    height: auto;
    min-width: 120px;
    display: block;
    aspect-ratio: 3/4;
  }
}
@media (max-width: 600px) {
  .about-me-card {
    flex-direction: column;
    align-items: center;
    padding: 1.1rem 0.1rem 1.1rem 0.1rem;
    gap: 1.15rem;
    max-width: 100vw;
    margin: 0.8rem auto 0 auto;
  }
  .about-me-info {
    width: 100%;
    padding: 0;
    text-align: left;
  }
  .about-me-photo {
    width: 100vw;
    margin-top: 0;
    margin-bottom: 0.7em;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .about-me-photo-img {
    width: 96vw !important;
    max-width: 96vw !important;
    min-width: 0;
    height: auto !important;
    margin: 0 auto;
    border-radius: 1.5rem;
    display: block;
    aspect-ratio: 1/1.13;
  }
  .cv-btn {
    min-width: unset;
    width: 97vw;
    max-width: 98vw;
    font-size: 1.04rem;
    padding: 0.8em 0.3em;
    margin-bottom: 0.6em;
  }
  .cv-download-group {
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
    align-items: stretch;
  }
}
</style>