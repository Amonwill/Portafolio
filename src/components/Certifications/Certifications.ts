import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { client, urlFor } from '../../sanityClient';

// Keep in sync with the `kind` options defined in the Sanity `certification` schema.
const KINDS = [
  { value: 'badge', label: 'Badges' },
  { value: 'certificate', label: 'Certificates' }
];

// Badges are lighter/smaller cards, so a "page" of them can comfortably show more items.
const BADGE_STEP = 12;
const CERT_STEP = 6;

// Max columns the badge grid uses per viewport tier (badges are compact, so more fit per row).
const getMaxBadgeCols = (width: number) => {
  if (width <= 600) return 2;
  if (width <= 900) return 3;
  return 4;
};

export default {
  name: 'Certifications',
  setup() {
    const items = ref([]);
    // Badges are the main/default view.
    const activeKind = ref('badge');
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

    // Only show a tab for a kind that actually has content.
    const availableKinds = computed(() =>
      KINDS.filter((k) => (k.value === 'badge' ? badges.value.length : certificates.value.length))
    );

    const setKind = (value: string) => {
      activeKind.value = value;
    };

    const displayedBadges = computed(() => badges.value.slice(0, visibleBadgeCount.value));
    const hasMoreBadges = computed(() => visibleBadgeCount.value < badges.value.length);
    const hasLessBadges = computed(() => visibleBadgeCount.value > BADGE_STEP);
    const showMoreBadges = () => {
      visibleBadgeCount.value += BADGE_STEP;
    };
    const showLessBadges = () => {
      visibleBadgeCount.value = Math.max(BADGE_STEP, visibleBadgeCount.value - BADGE_STEP);
    };

    // Never more columns than there are visible badges, so a partial last row stays centered.
    const badgeGridColumns = computed(() =>
      Math.max(1, Math.min(displayedBadges.value.length || 1, maxBadgeCols.value))
    );

    const displayedCertifications = computed(() => certificates.value.slice(0, visibleCertCount.value));
    const hasMoreCerts = computed(() => visibleCertCount.value < certificates.value.length);
    const hasLessCerts = computed(() => visibleCertCount.value > CERT_STEP);
    const showMoreCerts = () => {
      visibleCertCount.value += CERT_STEP;
    };
    const showLessCerts = () => {
      visibleCertCount.value = Math.max(CERT_STEP, visibleCertCount.value - CERT_STEP);
    };

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

      // Badges (main view)
      badges,
      displayedBadges,
      hasMoreBadges,
      hasLessBadges,
      showMoreBadges,
      showLessBadges,
      badgeGridColumns,

      // Certificates (unchanged behavior)
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