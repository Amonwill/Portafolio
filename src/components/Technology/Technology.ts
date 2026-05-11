import { ref, onMounted, computed } from 'vue';
import { client, urlFor } from '../../sanityClient';

export default {
  name: 'Technology',
  setup() {
    const skills = ref([]);

    const fetchSkills = async () => {
      const query = `*[_type == "habilidades"]`;
      skills.value = await client.fetch(query);
    };
    const groupedSkills = computed(() => {
      const groups: any = {};
      skills.value.forEach((skill: any) => {
        if (!groups[skill.category]) groups[skill.category] = [];
        groups[skill.category].push(skill);
      });
      return groups;
    });

    onMounted(fetchSkills);
    return { groupedSkills, urlFor };
  }
};