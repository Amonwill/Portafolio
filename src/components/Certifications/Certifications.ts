import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { client, urlFor } from '../../sanityClient';

// Agregamos la opción 'all' para la vista principal combinada
const KINDS = [
  { value: 'all', label: 'Todos' },
  { value: 'badge', label: 'Insignias' },
  { value: 'certificate', label: 'Certificados' }
];

const BADGE_STEP = 12;
const CERT_STEP = 6;

const getMaxBadgeCols = (width: number) => {
  if (width <= 600) return 2;
  if (width <= 900) return 3;
  return 4;
};

export default {
  name: 'Certifications',
  setup() {
    const items = ref([]);
    // Cambiamos el valor por defecto a 'all' para mostrar ambas secciones
    const activeKind = ref('all');
    const maxBadgeCols = ref(4);

    const visibleBadgeCount = ref(BADGE_STEP);
    const visibleCertCount = ref(CERT_STEP);

    const updateMaxBadgeCols = () => {
      maxBadgeCols.value = getMaxBadgeCols(window.innerWidth);
    };

    const fetchCerts = async () => {
      const query = `*[_type == "certification"] | order(year desc) {
        title,
        kind,
        category,
        year,
        description,
        image
      }`;
      items.value = await client.fetch(query);
    };

    const badges = computed(() => items.value.filter((c: any) => c.kind === 'badge'));
    const certificates = computed(() => items.value.filter((c: any) => c.kind === 'certificate'));

    // Solo muestra pestañas si realmente hay opciones válidas
    const availableKinds = computed(() => {
      const hasBadges = badges.value.length > 0;
      const hasCerts = certificates.value.length > 0;
      
      const options = [];
      // Solo mostramos "Todos" si existen de ambos tipos
      if (hasBadges && hasCerts) {
        options.push(KINDS.find(k => k.value === 'all'));
      }
      if (hasBadges) {
        options.push(KINDS.find(k => k.value === 'badge'));
      }
      if (hasCerts) {
        options.push(KINDS.find(k => k.value === 'certificate'));
      }
      return options;
    });

    const setKind = (value: string) => {
      activeKind.value = value;
    };

    const displayedBadges = computed(() => badges.value.slice(0, visibleBadgeCount.value));
    const hasMoreBadges = computed(() => visibleBadgeCount.value < badges.value.length);
    const hasLessBadges = computed(() => visibleBadgeCount.value > BADGE_STEP);
    
    const showMoreBadges = () => visibleBadgeCount.value += BADGE_STEP;
    const showLessBadges = () => visibleBadgeCount.value = Math.max(BADGE_STEP, visibleBadgeCount.value - BADGE_STEP);

    const badgeGridColumns = computed(() =>
      Math.max(1, Math.min(displayedBadges.value.length || 1, maxBadgeCols.value))
    );

    const displayedCertifications = computed(() => certificates.value.slice(0, visibleCertCount.value));
    const hasMoreCerts = computed(() => visibleCertCount.value < certificates.value.length);
    const hasLessCerts = computed(() => visibleCertCount.value > CERT_STEP);
    
    const showMoreCerts = () => visibleCertCount.value += CERT_STEP;
    const showLessCerts = () => visibleCertCount.value = Math.max(CERT_STEP, visibleCertCount.value - CERT_STEP);

    onMounted(() => {
      fetchCerts();
      updateMaxBadgeCols();
      window.addEventListener('resize', updateMaxBadgeCols);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', updateMaxBadgeCols);
    });

    return {
      items,
      activeKind,
      availableKinds,
      setKind,

      badges,
      displayedBadges,
      hasMoreBadges,
      hasLessBadges,
      showMoreBadges,
      showLessBadges,
      badgeGridColumns,

      certificates,
      displayedCertifications,
      hasMoreCerts,
      hasLessCerts,
      showMoreCerts,
      showLessCerts,

      urlFor
    };
  }
};