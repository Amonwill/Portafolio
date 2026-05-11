import { createRouter, createWebHashHistory } from 'vue-router' // <---- AQUÍ

import Home from '../views/Home.vue'
import AboutMe from '../components/AboutMe/AboutMe.vue'
import Projects from '../components/Projects/Projects.vue'
import Technology from '../components/Technology/Technology.vue'
import Certifications from '../components/Certifications/Certifications.vue'

const routes = [
  { path: '/', redirect: '/home' },
  { path: '/home',         component: Home },
  { path: '/aboutme',      component: AboutMe },
  { path: '/projects',     component: Projects },
  { path: '/technology',  component: Technology }, 
  { path: '/certificates', component: Certifications },
]

const router = createRouter({
  history: createWebHashHistory(), 
  routes
})

export default router