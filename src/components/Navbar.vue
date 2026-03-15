<script setup>
import { ref, onMounted } from 'vue'

const isDark = ref(false)


function applyTheme(dark) {
  if (dark) {
    document.documentElement.classList.add('dark')
    localStorage.setItem('theme', 'dark')
  } else {
    document.documentElement.classList.remove('dark')
    localStorage.setItem('theme', 'light')
  }
  isDark.value = dark
}
function toggleTheme() {
  applyTheme(!isDark.value)
}

onMounted(() => {
  const saved = localStorage.getItem('theme')
  if (saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
    applyTheme(true)
  } else {
    applyTheme(false)
  }
})
</script>

<template>
  <nav class="navbar">
    <div class="nav-links">
      <router-link to="/home" exact-active-class="active-link">Home</router-link>
      <router-link to="/aboutme" exact-active-class="active-link">About Me</router-link>
      <router-link to="/projects" exact-active-class="active-link">Projects</router-link>
      <router-link to="/technology" exact-active-class="active-link">Technologies</router-link>
      <router-link to="/certificates" exact-active-class="active-link">Certificates</router-link>
    </div>
    <div class="navbar-right">

      <a href="https://github.com/Amonwill" target="_blank" class="github-btn">GitHub</a>

      <div class="dark-toggle">
        <label class="switch" :title="isDark ? 'Modo claro' : 'Modo oscuro'">
          <input
            type="checkbox"
            :checked="isDark"
            @change="toggleTheme"
          />
          <span class="slider">
            <span v-if="isDark" class="mode-icon">🌙</span>
            <span v-else class="mode-icon">☀️</span>
          </span>
        </label>
      </div>
    </div>
  </nav>
</template>

<style scoped>

.navbar {
  position: sticky;
  top: 0;
  z-index: 100;
  width: 100%;
  min-height: 56px;
  background: var(--Navbar-bg, #fff);
  color: var(--Navbar-text, #000);
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0 2.5rem 0 1.5rem;
  box-sizing: border-box;
  font-family: 'Fira Mono', 'Courier New', monospace;
  border-bottom: 1.5px solid #222;
}

.nav-links {
  display: flex;
  gap: 2rem;
  flex: 1;
  justify-content: flex-start;
}
.nav-links a {
  color: var(--Navbar-text, #000);
  font-weight: normal;
  text-decoration: none;
  font-size: 1.08rem;
  transition: color 0.2s;
  letter-spacing: 0.5px;
}
.nav-links .active-link,
.nav-links a:hover {
  color: var(--Navbar-hover, #1ed760);
}

.navbar-right {
  display: flex;
  align-items: center;
  gap: 1.1rem;
}
.github-btn {
  background: #181818;
  border-radius: 6px;
  color: #fff;
  padding: 6px 18px;
  text-decoration: none;
  font-weight: bold;
  transition: background 0.2s;
}
.github-btn:hover {
  background: #24292e;
}

.dark-toggle {
  display: flex;
  align-items: center;
  margin-left: 0.5rem;
}

.switch {
  position: relative;
  display: inline-block;
  width: 42px;
  height: 22px;
}
.switch input {
  opacity: 0;
  width: 0;
  height: 0;
}
.slider {
  position: absolute;
  cursor: pointer;
  top: 1px;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #222;
  border-radius: 34px;
  transition: 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
}
.slider:before {
  position: absolute;
  content: "";
  height: 18px;
  width: 18px;
  left: 2px;
  bottom: 2px;
  background-color: #fff;
  border-radius: 50%;
  transition: 0.3s;
}
input:checked + .slider {
  background-color: #ea0000;
}
input:checked + .slider:before {
  transform: translateX(20px);
  background: #fff;
}
.mode-icon {
  position: relative;
  z-index: 2;
  font-size: 1.05rem;
  margin-left: 4px;
}

@media (max-width: 800px) {
  .nav-links {
    gap: 1rem;
    margin-left: 0.7rem;
  }
  .navbar {
    padding: 0 0.6rem;
  }
}
</style>