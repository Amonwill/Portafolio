import { ref, onMounted, onUnmounted } from 'vue';

export default {
  name: 'Navbar',
  setup() {
    const isDark = ref(false);
    const menuOpen = ref(false);

    const scrollToSection = (id: string) => {
      const element = document.getElementById(id);
      if (element) {
        const headerOffset = 70;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

        window.scrollTo({
          top: offsetPosition,
          behavior: "smooth"
        });
        menuOpen.value = false;
      }
    };

    const applyTheme = (dark: boolean) => {
      if (dark) {
        document.documentElement.classList.add('dark');
        localStorage.setItem('theme', 'dark');
      } else {
        document.documentElement.classList.remove('dark');
        localStorage.setItem('theme', 'light');
      }
      isDark.value = dark;
    };

    const toggleTheme = () => applyTheme(!isDark.value);

    const handleResize = () => {
      if (window.innerWidth > 900) menuOpen.value = false;
    };

    onMounted(() => {
      const saved = localStorage.getItem('theme');
      applyTheme(saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches));
      window.addEventListener('resize', handleResize);
    });

    onUnmounted(() => window.removeEventListener('resize', handleResize));

    return { isDark, menuOpen, scrollToSection, toggleTheme, toggleMenu: () => menuOpen.value = !menuOpen.value };
  }
};