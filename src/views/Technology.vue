<script setup>
import SectionNameCard from '../components/SectionNameCard.vue';

const techSections = [
  {
    title: "Languages",
    icons: [
      { name: "Kotlin",      src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/kotlin/kotlin-original.svg" },
      { name: "C++",         src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/cplusplus/cplusplus-original.svg" },
      { name: "C#",          src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/csharp/csharp-original.svg" },
      { name: "Python",      src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/python/python-original.svg" },
      { name: "PHP",         src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/php/php-original.svg" },
      { name: "JavaScript",  src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/javascript/javascript-original.svg" },
      { name: "HTML5",       src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/html5/html5-original.svg" },
      { name: "CSS3",        src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/css3/css3-original.svg" },
    ],
  },
  {
    title: "Databases",
    icons: [
      { name: "SQL Server", src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/microsoftsqlserver/microsoftsqlserver-plain-wordmark.svg" },
      { name: "PostgreSQL", src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/postgresql/postgresql-original.svg" },
      { name: "Firebase",   src: "https://www.vectorlogo.zone/logos/firebase/firebase-icon.svg" },
    ],
  },
  {
    title: "Frameworks",
    icons: [
      { name: "Laravel",     src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/laravel/laravel-original.svg" },
      { name: "Vue.js",      src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/vuejs/vuejs-original.svg" },
      { name: "Flutter",     src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/flutter/flutter-original.svg" },
      { name: ".NET Core",   src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/dotnetcore/dotnetcore-original.svg" },
      { name: "Node.js",     src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/nodejs/nodejs-original.svg" },
    ],
  },
  {
    title: "Library",
    icons: [
      { name: "Tensorflow", src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/tensorflow/tensorflow-original.svg" },
    ],
  },
  {
    title: "APIs",
    icons: [
      { name: "Keras", src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/keras/keras-original.svg" },
    ],
  },
  {
    title: "Tools",
    icons: [
      { name: "Git",           src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/git/git-original.svg" },
      { name: "GitHub",        src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/github/github-original.svg" },
      { name: "Postman",       src: "https://www.vectorlogo.zone/logos/getpostman/getpostman-icon.svg" },
      { name: "VS Code",       src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/vscode/vscode-original.svg" },
      { name: "Visual Studio", src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/visualstudio/visualstudio-original.svg" },
    ],
  },
  {
    title: "Others",
    icons: [
      { name: "Matlab", src: "https://raw.githubusercontent.com/devicons/devicon/master/icons/matlab/matlab-original.svg" },
      { name: "LaTeX",  src: "https://img.shields.io/badge/LaTeX-47AF11?style=for-the-badge&logo=LaTeX&logoColor=white" },
    ],
  }
];

const services = [
  {
    title: "Data Analysis & Machine Learning",
    description: `Power BI, Python and TensorFlow to analyze data, create predictive models and derive insights for informed decision-making.`,
  },
  {
    title: "Web Development",
    description: "Building responsive and dynamic websites with HTML, CSS, JavaScript, and frameworks such as Vue and .NET Core.",
  },
  {
    title: "Desktop Applications",
    description: "C#, Python (PyQt) and Java (JavaFX) to create user-friendly and efficient desktop applications for various purposes.",
  },
  {
    title: "Android Development",
    description: `Kotlin, Compose and Flutter to create modern, performant and user-friendly Android apps.`,
  },
];
</script>

<template>
  <section class="technologies-section">
    <SectionNameCard
      class="section-glow-card"
      title="Services & Technologies"
      subtitle="Stack, frameworks, databases & tools"
    />

    <div class="services-row">
      <div class="service-card" v-for="(srv,idx) in services" :key="idx">
        <h3 class="service-title">{{ srv.title }}</h3>
        <p 
          v-if="!srv.description.includes('<ul')" 
          class="service-desc" 
          v-html="srv.description"
        ></p>
        <div 
          v-else 
          class="service-desc" 
          v-html="srv.description"
        ></div>
      </div>
    </div>

    <div class="technologies-card card-hover-effect always-glow">
      <div class="tech-sections">
        <div 
          v-for="(section, idx) in techSections"
          :key="section.title"
          class="tech-section"
        >
          <h3>{{ section.title }}</h3>
          <div class="icons-list">
            <img 
              v-for="icon in section.icons"
              :key="icon.name"
              :src="icon.src"
              :alt="icon.name"
              :title="icon.name"
              class="tech-icon"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.technologies-section {
  max-width: 1000px;
  margin: 2.5rem auto;
  padding: 2rem 0 1rem 0;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.section-glow-card {
  margin-bottom: 2.8rem;
  position: relative;
  z-index: 2;
  box-shadow: none;
  animation: boxGlowSection 4s linear infinite;
}
@keyframes boxGlowSection {
  0% {
    box-shadow:
      0 0 10px 1.5px var(--glow-a, #1ed76099),
      0 0 22px 5.5px var(--glow-b, #40008066),
      0 0 36px 8.5px var(--glow-c, #ffd70044);
  }
  33% {
    box-shadow:
      0 0 18px 4px var(--glow-b, #40008077),
      0 0 30px 7px var(--glow-c, #ffd70033),
      0 0 10px 3px var(--glow-a, #1ed76099);
  }
  66% {
    box-shadow:
      0 0 25px 6px var(--glow-c, #ffd70033),
      0 0 12px 3px var(--glow-a, #1ed76099),
      0 0 22px 5px var(--glow-b, #40008066);
  }
  100% {
    box-shadow:
      0 0 10px 1.5px var(--glow-a, #1ed76099),
      0 0 22px 5.5px var(--glow-b, #40008066),
      0 0 36px 8.5px var(--glow-c, #ffd70044);
  }
}

.services-row {
  display: flex;
  gap: 2.2rem;
  justify-content: center;
  align-items: stretch;
  margin-bottom: 2.7rem;
  flex-wrap: wrap;
}
.service-card {
  background: var(--card-bg, #181818);
  border-radius: 1.2rem;
  box-shadow: 0 0 8px 1.5px var(--glow-a, #ffd70022), 0 2px 8px #0002;
  min-width: 240px;
  max-width: 332px;
  padding: 2.1em 1.38em 1.38em 1.38em;
  text-align: center;
  transition: 
    box-shadow 0.4s cubic-bezier(.29,.73,.44,1),
    transform 0.18s cubic-bezier(.45,.2,.34,1);
  position: relative;
  z-index: 1;
  margin-bottom: 1em;
}
.service-card:hover {
  transform: translateY(-7px) scale(1.033);
  box-shadow:
    0 0 15px 3px var(--glow-a, #1ed76055),
    0 0 25px 8px var(--glow-b, #40008033),
    0 0 19px 6px var(--glow-c, #ffd70022),
    0 2px 14px #0002;
  z-index: 2;
}

.service-title {
  font-size: 1.19rem;
  font-weight: 800;
  margin-bottom: .65em;
  background: var(--title-gradient);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
.service-desc {
  color: var(--content-color);
  opacity: .93;
  font-size: 1.07rem;
  font-family: inherit;
  line-height: 1.37;
  margin: 0 auto;
  max-width: 25em;
  word-break: break-word;
  text-align: center;
}
.service-desc ul {
  margin: .4em 0 0 1em; padding: 0;
  text-align: left;
}
.service-desc li {
  margin: .18em 0;
  font-size: 1.05em;
}

.technologies-card {
  background: var(--card-bg);
  color: var(--content-color);
  border-radius: 1.5rem;
  max-width: 880px;
  width: 100%;
  margin: 0 auto;
  padding: 2.7rem 2.2rem 1.7rem 2.2rem;
  position: relative;
  z-index: 1;
  box-sizing: border-box;
  overflow-x: clip;
}
@media (max-width: 1000px) {
  .technologies-card {
    min-width: 92vw;
    max-width: 97vw;
    padding: 1.5rem 1rem 1.2rem 1rem;
  }
}
@media (max-width: 600px) {
  .technologies-card {
    min-width: 98vw;
    max-width: 99vw;
    padding: 1.2rem 0.3rem 1.1rem 0.3rem;
  }
}
.card-hover-effect {
  box-shadow: 0 0 4px 0.5px var(--glow-a, #ffd70018), 0 2px 10px #0002;
  transition: box-shadow 0.45s cubic-bezier(.28,.84,.42,1), transform .16s;
}
.card-hover-effect.always-glow {
  animation: boxGlowTechnologiesSutil 4.2s linear infinite;
}

@keyframes boxGlowTechnologiesSutil {
  0% {
    box-shadow:
      0 0 7px 1.5px var(--glow-a, #1ed76033),
      0 0 14px 3.7px var(--glow-b, #40008022),
      0 0 16px 4.5px var(--glow-c, #ffd70012),
      0 2px 10px #0002;
  }
  33% {
    box-shadow:
      0 0 10px 2.5px var(--glow-b, #40008022),
      0 0 15px 4.2px var(--glow-c, #ffd70013),
      0 0 5px 1.2px var(--glow-a, #1ed76022),
      0 2px 10px #0002;
  }
  66% {
    box-shadow:
      0 0 14px 3px var(--glow-c, #ffd70013),
      0 0 7px 2px var(--glow-a, #1ed76033),
      0 0 11px 2.5px var(--glow-b, #40008022),
      0 2px 10px #0002;
  }
  100% {
    box-shadow:
      0 0 7px 1.5px var(--glow-a, #1ed76033),
      0 0 14px 3.7px var(--glow-b, #40008022),
      0 0 16px 4.5px var(--glow-c, #ffd70012),
      0 2px 10px #0002;
  }
}

.tech-sections {
  margin-top: 1rem;
}
.tech-section {
  margin-bottom: 1.7rem;
}
.tech-section h3 {
  color: var(--h2-color);
  margin-bottom: .55rem;
  margin-top: .5rem;
  font-size: 1.15rem;
  letter-spacing: .01em;
  font-weight: 600;
}
.icons-list {
  display: flex;
  gap: 1.4rem 1.2rem;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  margin-bottom: .8rem;
}
.tech-icon {
  width: 48px;
  height: 48px;
  background: #fff2;
  border-radius: .66rem;
  padding: .3rem;
  object-fit: contain;
  box-shadow: 0 1.5px 5px #3333;
  transition: box-shadow .18s, transform .17s, background .18s;
}
.tech-icon:hover {
  box-shadow: 0 0 12px 3px var(--card-glow), 0 2px 10px #1114;
  transform: scale(1.085);
  background: #fff5;
}

@media (max-width: 950px) {
  .services-row {
    flex-direction: column;
    gap: 1.2rem;
    align-items: center;
  }
}
@media (max-width: 600px) {
  .technologies-card {
    padding: 1.2rem .7rem;
  }
  .tech-icon {
    width: 38px;
    height: 38px;
    padding: .15rem;
  }
  .service-card {
    min-width: 96vw;
    max-width: 99vw;
    padding: 1.2em .8em;
  }
}
</style>