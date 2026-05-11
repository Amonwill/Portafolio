import { ref, onMounted } from 'vue';
import { client, urlFor, getFileUrl } from '../../sanityClient';

export default {
  name: 'AboutMe',
  setup() {
    const author = ref<any>(null);
    const loading = ref(true);

    const fetchAuthor = async () => {
      try {
        const query = `*[_type == "author"][0]`;
        author.value = await client.fetch(query);
      } catch (error) {
        console.error("Error al cargar datos de Sanity:", error);
      } finally {
        loading.value = false;
      }
    };

    onMounted(fetchAuthor);

    return { author, loading, urlFor, getFileUrl };
  }
};