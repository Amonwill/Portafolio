import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { client, urlFor } from '../../sanityClient';
import { debounce } from '../../utils/debounce';

const AREAS = [
  { value: 'Web Development', label: 'Web Development' },
  { value: 'Software Development', label: 'Software Development' },
  { value: 'Data Science', label: 'Data Science' },
  { value: 'Data Analytics', label: 'Data Analytics' },
  { value: 'Artificial Intelligence', label: 'Artificial Intelligence' },
  { value: 'Cloud & DevOps', label: 'Cloud & DevOps' },
  { value: 'Databases', label: 'Databases' },
  { value: 'Cybersecurity', label: 'Cybersecurity' },
  { value: 'Project Management', label: 'Project Management' },
  { value: 'Essential Skills', label: 'Essential Skills' },
  { value: 'Other', label: 'Other' }
];

const BADGE_STEP = 12;
const CERT_STEP_MOBILE = 4;
const CERT_STEP_DESKTOP = 8;

const getMaxBadgeCols = (width: number) => {
  if (width <= 600) return 2;
  if (width <= 900) return 3;
  return 4;
};

const getCertStep = (width: number) => (width <= 768 ? CERT_STEP_MOBILE : CERT_STEP_DESKTOP);

const byRecency = (a: any, b: any) =>
  new Date(b._createdAt || 0).getTime() - new Date(a._createdAt || 0).getTime();

const processCertifications = (data: any[]) => {
  return data.map(cert => ({
    ...cert,
    category: cert.kind === 'badge' ? 'Badge' : 'Certificate'
  }));
};

export default {
  name: 'Certifications',
  setup() {
    const items = ref<any[]>([]);
    const activeArea = ref('all');
    const maxBadgeCols = ref(4);

    const certStep = ref(CERT_STEP_DESKTOP);
    const visibleBadgeCount = ref(BADGE_STEP);
    const visibleCertCount = ref(CERT_STEP_DESKTOP);

    const certificadoSeleccionado = ref<any>(null);
    const abrirModal = (cert: any) => {
      certificadoSeleccionado.value = cert;
      document.body.style.overflow = 'hidden';
    };
    const cerrarModal = () => {
      certificadoSeleccionado.value = null;
      document.body.style.overflow = '';
    };

    const updateMaxBadgeCols = () => {
      maxBadgeCols.value = getMaxBadgeCols(window.innerWidth);
      certStep.value = getCertStep(window.innerWidth);
    };

    const fetchCerts = async () => {
      const query = `*[_type == "certification"] | order(_createdAt desc) {
        _id, _createdAt, title, kind, category, area, year, description, credlyUrl,
        badgeImage,
        "badgeAspectRatio": badgeImage.asset->metadata.dimensions.aspectRatio,
        certificateImage,
        certificatePdf{ asset->{ url, originalFilename } }
      }`;
      const rawData = await client.fetch(query);
      items.value = processCertifications(rawData);
    };

    const rawBadges = computed(() =>
      items.value.filter((c: any) => c.kind === 'badge').slice().sort(byRecency)
    );

    const badges = computed(() =>
      rawBadges.value.map((b: any) => ({
        ...b,
        visual: b.badgeImage ? {
          type: 'image',
          src: urlFor(b.badgeImage).width(200).auto('format').quality(80).url(),
          aspectRatio: b.badgeAspectRatio || 1
        } : null
      }))
    );

    const badgeCertificates = computed(() =>
      rawBadges.value
        .filter((b: any) => b.certificateImage || b.certificatePdf?.asset)
        .map((b: any) => {
          const visual = b.certificateImage ? {
            type: 'image', src: urlFor(b.certificateImage).width(900).auto('format').quality(80).url()
          } : {
            type: 'pdf', href: b.certificatePdf.asset.url, name: b.certificatePdf.asset.originalFilename
          };
          return {
            _id: `${b._id}-cert`,
            title: b.title, category: b.category, area: b.area, year: b.year, description: b.description,
            visual
          };
        })
    );

    const standaloneCertificates = computed(() =>
      items.value
        .filter((c: any) => c.kind === 'certificate')
        .slice()
        .sort(byRecency)
        .map((c: any) => {
          const visual = c.certificateImage ? {
            type: 'image', src: urlFor(c.certificateImage).width(900).auto('format').quality(80).url()
          } : c.certificatePdf?.asset ? {
            type: 'pdf', href: c.certificatePdf.asset.url, name: c.certificatePdf.asset.originalFilename
          } : null;
          return { ...c, visual };
        })
    );

    const certificates = computed(() => [...badgeCertificates.value, ...standaloneCertificates.value]);

    const availableAreas = computed(() => {
      const used = new Set(certificates.value.map((c: any) => c.area).filter(Boolean));
      const options = AREAS.filter((a) => used.has(a.value));
      if (options.length === 0) return [];
      return [{ value: 'all', label: 'All Areas' }, ...options];
    });

    const setArea = (value: string) => {
      activeArea.value = value;
      visibleCertCount.value = certStep.value;
    };

    const areaFilteredCertificates = computed(() =>
      activeArea.value === 'all' ? certificates.value : certificates.value.filter((c: any) => c.area === activeArea.value)
    );

    const displayedBadges = computed(() => badges.value.slice(0, visibleBadgeCount.value));
    const hasMoreBadges = computed(() => visibleBadgeCount.value < badges.value.length);
    const hasLessBadges = computed(() => visibleBadgeCount.value > BADGE_STEP);

    const showMoreBadges = () => (visibleBadgeCount.value += BADGE_STEP);
    const showLessBadges = () => (visibleBadgeCount.value = Math.max(BADGE_STEP, visibleBadgeCount.value - BADGE_STEP));

    const badgeGridColumns = computed(() => Math.max(1, Math.min(displayedBadges.value.length || 1, maxBadgeCols.value)));

    const displayedCertifications = computed(() => areaFilteredCertificates.value.slice(0, visibleCertCount.value));
    const hasMoreCerts = computed(() => visibleCertCount.value < areaFilteredCertificates.value.length);
    const hasLessCerts = computed(() => visibleCertCount.value > certStep.value);

    const showMoreCerts = () => (visibleCertCount.value += certStep.value);
    const showLessCerts = () => (visibleCertCount.value = Math.max(certStep.value, visibleCertCount.value - certStep.value));

    const debouncedUpdateMaxBadgeCols = debounce(updateMaxBadgeCols, 150);

    onMounted(() => {
      fetchCerts();
      updateMaxBadgeCols();
      visibleCertCount.value = certStep.value;
      window.addEventListener('resize', debouncedUpdateMaxBadgeCols);
    });

    onBeforeUnmount(() => { window.removeEventListener('resize', debouncedUpdateMaxBadgeCols); });

    return {
      items, activeArea, availableAreas, setArea,
      badges, displayedBadges, hasMoreBadges, hasLessBadges, showMoreBadges, showLessBadges, badgeGridColumns,
      certificates, displayedCertifications, hasMoreCerts, hasLessCerts, showMoreCerts, showLessCerts,
      urlFor, certificadoSeleccionado, abrirModal, cerrarModal
    };
  }
};