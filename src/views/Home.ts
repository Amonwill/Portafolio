import { ref, onMounted } from 'vue'
import { client } from '../sanityClient'
import AboutMe from 'C:/Users/Wcruz/Downloads/Proyectos/Portafolio/src/components/AboutMe/AboutMe.vue'
import Projects from '../components/Projects/Projects.vue'
import Technology from '../components/Technology/Technology.vue'
import Certifications from '../components/Certifications/Certifications.vue'
import Contact from '../components/Contact/Contact.vue'

type Author = {
  name?: string
  role?: string
  bio?: string
}

export default {
  name: 'Home',
  components: { AboutMe, Projects, Technology, Certifications, Contact },
  setup() {
    const author = ref<Author | null>(null)
    const loading = ref(true)
    const shortBio = ref('')
    const heroOrb = ref<HTMLElement | null>(null)

    const normalize = (value: string) =>
      (value || '')
        .replace(/\r\n/g, '\n')
        .replace(/\r/g, '\n')
        .trim()

    const fetchAuthor = async () => {
      try {
        const query = `*[_type == "author"][0]{name, role, bio}`
        author.value = await client.fetch(query)
        const firstParagraph = normalize(author.value?.bio || '').split(/\n+/)[0] || ''
        shortBio.value = firstParagraph
      } catch (error) {
        console.error('Error al cargar datos de Sanity:', error)
      } finally {
        loading.value = false
      }
    }

    const scrollTo = (id: string) => {
      const el = document.getElementById(id)
      if (!el) return
      el.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }

    // Mini red decorativa (nodos + líneas), inspirada en el hero-orb de index.html
    const buildOrb = () => {
      if (!heroOrb.value) return
      const NS = 'http://www.w3.org/2000/svg'
      const svg = document.createElementNS(NS, 'svg')
      svg.setAttribute('viewBox', '0 0 300 300')

      const pts: [number, number][] = []
      for (let i = 0; i < 14; i++) {
        const a = (i / 14) * Math.PI * 2
        const r = 70 + Math.random() * 50
        pts.push([150 + Math.cos(a) * r, 150 + Math.sin(a) * r])
      }

      pts.forEach((p, i) => {
        for (let j = i + 1; j < pts.length; j++) {
          const d = Math.hypot(p[0] - pts[j][0], p[1] - pts[j][1])
          if (d < 110) {
            const line = document.createElementNS(NS, 'line')
            line.setAttribute('x1', String(p[0]))
            line.setAttribute('y1', String(p[1]))
            line.setAttribute('x2', String(pts[j][0]))
            line.setAttribute('y2', String(pts[j][1]))
            line.setAttribute('stroke', 'var(--glow-a, #1ed760)')
            line.setAttribute('stroke-opacity', '0.35')
            line.setAttribute('stroke-width', '1')
            svg.appendChild(line)
          }
        }
      })

      pts.forEach((p, i) => {
        const c = document.createElementNS(NS, 'circle')
        c.setAttribute('cx', String(p[0]))
        c.setAttribute('cy', String(p[1]))
        c.setAttribute('r', String(3 + Math.random() * 4))
        c.setAttribute('fill', i % 2 === 0 ? 'var(--glow-a, #1ed760)' : 'var(--glow-c, #ffd700)')
        svg.appendChild(c)
      })

      const center = document.createElementNS(NS, 'circle')
      center.setAttribute('cx', '150')
      center.setAttribute('cy', '150')
      center.setAttribute('r', '44')
      center.setAttribute('fill', 'none')
      center.setAttribute('stroke', 'var(--glow-b, #400080)')
      center.setAttribute('stroke-width', '1.4')
      center.setAttribute('stroke-dasharray', '4 5')
      svg.appendChild(center)

      heroOrb.value.appendChild(svg)
    }

    onMounted(async () => {
      await fetchAuthor()
      buildOrb()
    })

    return {
      author,
      loading,
      shortBio,
      scrollTo,
      heroOrb,
    }
  },
}
