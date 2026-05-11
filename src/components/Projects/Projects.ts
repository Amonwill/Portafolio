import { ref, onMounted } from 'vue';
import { client, urlFor } from '../../sanityClient';
import ProjectModal from './ProjectModal.vue';

export default {
  name: 'Projects',
  components: {
    ProjectModal
  },
  setup() {
    const projects = ref([]);
    const selectedProject = ref(null);

    const fetchProjects = async () => {
      const query = `*[_type == "projects"] | order(_createdAt desc) {
        title, 
        desc, 
        detailedDesc, 
        status, 
        github, 
        liveUrl, 
        image, 
        gallery, 
        slug,
        tech[]{ name, iconType, iconClass, emoji, image, color }
      }`;
      projects.value = await client.fetch(query);
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

    onMounted(fetchProjects);

    return { projects, selectedProject, openProject, closeProject, urlFor };
  }
};