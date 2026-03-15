<script setup>
import yomero from '../assets/yomero.jpg';
import CVES from '../assets/CV/CV_ES.pdf';
import CVIN from '../assets/CV/CV_IN.pdf';
</script>

<template>
  <section class="about-me-card card-hover-effect">
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
  gap: 2rem;
  background: var(--card-bg);
  border-radius: 2rem;
  padding: 2.5rem 2rem;
  margin: 2rem auto;
  max-width: 1000px;
  align-items: center;
  color: var(--text-main);
  box-shadow: 0 2px 18px #0002;
}


.about-me-photo-img {
  width: 260px;
  height: 320px;
  border-radius: 2rem;
  object-fit: cover;
  box-shadow: 0 1.5px 12px #0004;
  transform: rotate(-6deg);
  transition: 
    box-shadow 0.18s, 
    transform 0.18s;
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
}
.about-me-info h1 {
  color: var(--h1-color);
  font-size: 2.5rem;
  font-weight: 800;
  margin-bottom: 0.2rem;
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
  line-height: 1.8;
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


.card-hover-effect {
  transition: transform .16s, box-shadow .16s;
}
.card-hover-effect:hover {
  transform: translateY(-8px) scale(1.04);
  box-shadow: 0 0 32px 7px var(--card-glow, #6a1b20), 0 4px 22px #0002;
  z-index: 2;
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
</style>