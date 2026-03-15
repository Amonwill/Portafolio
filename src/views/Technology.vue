<script setup>
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
</script>

<template>
  <section class="technologies-card card-hover-effect">
    <h2>Technologies &amp; Tools</h2>
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
  </section>
</template>

<style scoped>
.technologies-card {
  background: var(--card-bg);
  color: var(--content-color);
  border-radius: 1.5rem;
  box-shadow: 0 2px 18px #0002;
  max-width: 880px;
  margin: 2.5rem auto;
  padding: 2.7rem 2.2rem 1.7rem 2.2rem;
  transition: transform .16s, box-shadow .16s;
}
.technologies-card:hover {
  transform: translateY(-8px) scale(1.04);
  box-shadow: 0 0 32px 7px var(--card-glow, #6a1b20), 0 4px 22px #0002;
  z-index: 2;
}
.technologies-card h2 {
  text-align: center;
  color: var(--h1-color);
  margin-bottom: 1.5rem;
  font-size: 2rem;
  font-weight: bold;
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
  gap: 1.3rem;
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
  transition: box-shadow .18s, transform .17s;
}
.tech-icon:hover {
  box-shadow: 0 0 12px 3px var(--card-glow), 0 2px 10px #1114;
  transform: scale(1.085);
  background: #fff5;
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
}
</style>