import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { client, urlFor } from '../../sanityClient';
import { debounce } from '../../utils/debounce';
import ProjectModal from './ProjectModal.vue';

// Keep this in sync with the `projectType` options defined in the Sanity schema.
const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'web', label: 'Web' },
  { value: 'data-science', label: 'Data Science' },
  { value: 'mobile', label: 'Mobile App' }
];

// Max columns the grid is allowed to use at each viewport tier.
// Keep these breakpoints in sync with the media queries in Projects.css.
const getMaxColsForWidth = (width: number) => {
  if (width <= 600) return 1;
  if (width <= 900) return 2;
  return 3;
};

export default {
  name: 'Projects',
  components: {
    ProjectModal
  },
  setup() {
    const projects = ref([]);
    const selectedProject = ref(null);
    const activeFilter = ref('all');
    const maxCols = ref(3);

    const updateMaxCols = () => {
      maxCols.value = getMaxColsForWidth(window.innerWidth);
    };

    const fetchProjects = async () => {
      const query = `*[_type == "projects"] | order(_createdAt desc) {
        title, 
        desc, 
        detailedDesc, 
        status, 
        projectType,
        github, 
        liveUrl, 
        image, 
        gallery, 
        slug,
        tech[]{ name, iconType, iconClass, emoji, image, color }
      }`;
      projects.value = await client.fetch(query);
    };

    // Only show filter buttons for types that actually have projects, plus "All".
    const availableFilters = computed(() => {
      const typesInUse = new Set(projects.value.map((p: any) => p.projectType).filter(Boolean));
      return FILTERS.filter((f) => f.value === 'all' || typesInUse.has(f.value));
    });

    const filteredProjects = computed(() => {
      if (activeFilter.value === 'all') return projects.value;
      return projects.value.filter((p: any) => p.projectType === activeFilter.value);
    });

    // Number of columns the grid should render right now: never more columns
    // than the viewport comfortably fits, and never more than there are
    // results, so a partial row always sits centered instead of pinned
    // to one side.
    const gridColumns = computed(() => {
      const count = filteredProjects.value.length || 1;
      return Math.max(1, Math.min(count, maxCols.value));
    });

    const setFilter = (value: string) => {
      activeFilter.value = value;
    };

    const typeLabel = (value: string) => {
      const match = FILTERS.find((f) => f.value === value);
      return match ? match.label : value;
    };

    const openProject = (proj: any) => {
      selectedProject.value = proj;
      document.documentElement.classList.add('modal-active');
      document.body.style.overflow = 'hidden';
    };

    const closeProject = () => {
      selectedProject.value = null;
      document.documentElement.classList.remove('modal-active');
      document.body.style.overflow = 'auto';
    };

    const debouncedUpdateMaxCols = debounce(updateMaxCols, 150);

    onMounted(() => {
      fetchProjects();
      updateMaxCols();
      window.addEventListener('resize', debouncedUpdateMaxCols);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', debouncedUpdateMaxCols);
    });

    return {
      projects,
      filteredProjects,
      availableFilters,
      activeFilter,
      setFilter,
      typeLabel,
      gridColumns,
      selectedProject,
      openProject,
      closeProject,
      urlFor
    };
  }
};