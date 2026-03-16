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
        <a :href="CVIN" download class="cv-btn">Download CV (English)</a>
        <a :href="CVES" download class="cv-btn">Descargar CV (Español)</a>
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

.about-me-photo-img {
  width: 300px;
  max-width: 100%;
  height: 500px;
  min-width: 160px;
  border-radius: 1.7rem;
  object-fit: cover;
  transition: box-shadow 0.18s, transform 0.18s;
  background: #fff;
  cursor: pointer;
}
.about-me-photo-img:hover {
  transform: rotate(-6deg) scale(1.054) translateY(-8px);
  box-shadow: 0 0 32px 7px var(--card-glow, #6a1b20), 0 4px 22px #0003;
  z-index: 2;
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
  line-height: 1.1;
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
  margin-top: 1rem;
  display: flex;
  gap: 1rem;
}
.cv-btn {
  display: inline-block;
  background: var(--cv-btn-bg);
  color: var(--cv-btn-text);
  padding: 0.8em 1.7em;
  border-radius: 8px;
  font-family: 'Fira Mono', monospace;
  text-decoration: none;
  font-size: 1.08rem;
  font-weight: 700;
  border: none;
  outline: none;
  margin-top: 0;
  letter-spacing: 0.04em;
  box-shadow: var(--cv-btn-shadow);
  transition: 
    background 0.18s, 
    color 0.17s, 
    transform 0.14s, 
    box-shadow 0.18s;
}
.cv-btn:hover, .cv-btn:focus {
  background: var(--cv-btn-bg-hover);
  color: var(--cv-btn-text-hover);
  transform: translateY(-3px) scale(1.04);
  box-shadow: var(--cv-btn-shadow-hover);
}

@media (max-width: 800px) {
  .about-me-card {
    flex-direction: column;
    align-items: flex-start;
    padding: 1.7rem 1rem;
  }
  .about-me-info {
    padding: 0;
  }
  .about-me-photo-img {
    width: 70vw;
    height: auto;
    margin-top: 1.2rem;
  }
}
@media (max-width: 700px) {
  .about-me-card {
    flex-direction: column;
    align-items: flex-start;
    padding: 1.5rem 1rem;
  }
  .about-me-photo-img {
    width: 180px;
    height: 210px;
    margin-top: 1rem;
  }
}
</style>