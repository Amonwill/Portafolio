import { ref, onMounted, computed } from 'vue'
import { client, urlFor, getFileUrl } from '../../sanityClient'

type Author = {
  name?: string
  role?: string
  bio?: string
  detailedBio?: string
  linkedin?: string
  email?: string
  github?: string
  photo?: any
  cvEn?: { asset?: { _ref?: string } }
  cvEs?: { asset?: { _ref?: string } }
}

export default {
  name: 'AboutMe',
  setup() {
    const author = ref<Author | null>(null)
    const loading = ref(true)

    const normalize = (value: string) =>
      (value || '')
        .replace(/\r\n/g, '\n')
        .replace(/\r/g, '\n')
        .trim()

    const splitByLineBreaks = (value: string) =>
      normalize(value)
        .split(/\n+/)
        .map((p) => p.trim())
        .filter(Boolean)

    const plainTextFromPortableText = (value: any): string => {
      if (!Array.isArray(value)) return ''
      return value
        .map((block: any) => {
          if (!block || !Array.isArray(block.children)) return ''
          return block.children
            .map((child: any) => (typeof child?.text === 'string' ? child.text : ''))
            .join('')
        })
        .join('\n')
    }

    const detailedBioParagraphs = computed(() => {
      const raw = author.value?.detailedBio
      if (!raw) return []

      if (typeof raw === 'string') {
        return splitByLineBreaks(raw)
      }

      const portableText = plainTextFromPortableText(raw)
      return splitByLineBreaks(portableText)
    })

    const bioParagraphs = computed(() => {
      const rawBio = author.value?.bio ?? ''
      if (!rawBio.trim()) return []
      return splitByLineBreaks(rawBio)
    })

    const fetchAuthor = async () => {
      try {
        const query = `*[_type == "author"][0]`
        author.value = await client.fetch(query)
      } catch (error) {
        console.error('Error al cargar datos de Sanity:', error)
      } finally {
        loading.value = false
      }
    }

    onMounted(fetchAuthor)

    return {
      author,
      loading,
      urlFor,
      getFileUrl,
      bioParagraphs,
      detailedBioParagraphs,
    }
  },
}