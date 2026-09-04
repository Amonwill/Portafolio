import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { client, urlFor } from '../../sanityClient';
import ProjectModal from './ProjectModal.vue';

const FILTERS = [
  { value: 'all', label: 'All' },
  { value: 'web', label: 'Web' },
  { value: 'data-science', label: 'Data Science' },
  { value: 'mobile', label: 'Mobile App' }
];

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

    const availableFilters = computed(() => {
      const typesInUse = new Set(projects.value.map((p: any) => p.projectType).filter(Boolean));
      return FILTERS.filter((f) => f.value === 'all' || typesInUse.has(f.value));
    });

    const filteredProjects = computed(() => {
      if (activeFilter.value === 'all') return projects.value;
      return projects.value.filter((p: any) => p.projectType === activeFilter.value);
    });


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

    onMounted(() => {
      fetchProjects();
      updateMaxCols();
      window.addEventListener('resize', updateMaxCols);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('resize', updateMaxCols);
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