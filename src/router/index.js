// src/router/index.js
import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import AboutMe from '../views/AboutMe.vue'
import Projects from '../views/Projects.vue'
import Technology from '../views/Technology.vue'
import Certifications from '../views/Certifications.vue'

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home',         component: Home },
  { path: '/aboutme',      component: AboutMe },
  { path: '/projects',     component: Projects },
  { path: '/technology',  component: Technology }, 
  { path: '/certificates', component: Certifications },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router