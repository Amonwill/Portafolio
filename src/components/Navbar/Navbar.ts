import { ref, onMounted, onUnmounted, defineComponent } from 'vue';

export default defineComponent({
  name: 'Navbar',
  setup() {
    const isDark = ref(false);
    const menuOpen = ref(false);
    const currentSection = ref('home');
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
        currentSection.value = id;
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
    let observer: IntersectionObserver | null = null;

    const setupObserver = () => {
      const options = {
        rootMargin: '-30% 0px -70% 0px', 
        threshold: 0 
      };
      observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            currentSection.value = entry.target.id;
          }
        });
      }, options);
      const sections = ['home', 'about', 'projects', 'technologies', 'certificates', 'contact'];
      
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) {
          observer?.observe(element);
        }
      });
    };
    onMounted(() => {
      const saved = localStorage.getItem('theme');
      applyTheme(saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches));
      window.addEventListener('resize', handleResize);
      setTimeout(() => {
        setupObserver();
      }, 100);
    });
    onUnmounted(() => {
      window.removeEventListener('resize', handleResize);
      if (observer) {
        observer.disconnect();
      }
    });
    return { 
      isDark, 
      menuOpen, 
      currentSection,
      scrollToSection, 
      toggleTheme, 
      toggleMenu: () => menuOpen.value = !menuOpen.value 
    };
  }
});