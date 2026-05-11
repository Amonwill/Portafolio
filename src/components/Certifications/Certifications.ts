import { ref, onMounted, computed } from 'vue';
import { client, urlFor } from '../../sanityClient';

export default {
  name: 'Certifications',
  setup() {
    const certifications = ref([]);
    const visibleCount = ref(6); 

    const fetchCerts = async () => {
      const query = `*[_type == "certification"] | order(year desc)`;
      certifications.value = await client.fetch(query);
    };

    const displayedCertifications = computed(() => {
      return certifications.value.slice(0, visibleCount.value);
    });

    const hasMore = computed(() => visibleCount.value < certifications.value.length);
    const hasLess = computed(() => visibleCount.value > 6);

    const showMore = () => {
      visibleCount.value += 6;
    };

    const showLess = () => {
      visibleCount.value = Math.max(6, visibleCount.value - 6);
    };

    onMounted(fetchCerts);
    
    return { 
      certifications, 
      displayedCertifications, 
      showMore, 
      showLess, 
      hasMore, 
      hasLess, 
      urlFor 
    };
  }
};