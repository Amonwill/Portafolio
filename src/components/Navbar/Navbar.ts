import { ref, onMounted, onUnmounted, defineComponent } from 'vue';

export default defineComponent({
  name: 'Navbar',
  setup() {
    const isDark = ref(false);
    const menuOpen = ref(false);
    const currentSection = ref('home');
    const currentLang = ref<'en' | 'es'>('en');

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

    const TRANSLATE_COOKIE = 'googtrans';
    const ONE_YEAR_SECONDS = 60 * 60 * 24 * 365;

    const getCookie = (name: string): string | null => {
      const match = document.cookie.match(new RegExp('(?:^|; )' + name + '=([^;]*)'));
      return match ? decodeURIComponent(match[1]) : null;
    };

    const writeCookie = (value: string | null) => {
      const host = window.location.hostname;
      const maxAge = value === null ? 0 : ONE_YEAR_SECONDS;
      const cookieValue = value === null ? '' : value;

      const attrs = `path=/; max-age=${maxAge};`;

      document.cookie = `${TRANSLATE_COOKIE}=${cookieValue}; ${attrs}`;
      if (host && host !== 'localhost') {
        document.cookie = `${TRANSLATE_COOKIE}=${cookieValue}; ${attrs} domain=${host};`;
        document.cookie = `${TRANSLATE_COOKIE}=${cookieValue}; ${attrs} domain=.${host};`;
      }
    };

    const loadGoogleTranslate = () => {
      if (document.getElementById('google_translate_script')) return;

      (window as any).googleTranslateElementInit = () => {
        new (window as any).google.translate.TranslateElement(
          {
            pageLanguage: 'en',
            includedLanguages: 'es',
            autoDisplay: false
          },
          'google_translate_element'
        );
      };

      const script = document.createElement('script');
      script.id = 'google_translate_script';
      script.src = '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      document.body.appendChild(script);
    };

    const toggleLanguage = () => {
      if (currentLang.value === 'en') {
        writeCookie('/en/es');
      } else {
        writeCookie(null);
      }
      window.location.reload();
    };

    onMounted(() => {
      const saved = localStorage.getItem('theme');
      applyTheme(saved === 'dark' || (!saved && window.matchMedia('(prefers-color-scheme: dark)').matches));
      window.addEventListener('resize', handleResize);
      setTimeout(() => {
        setupObserver();
      }, 100);

      const cookieValue = getCookie(TRANSLATE_COOKIE);
      currentLang.value = cookieValue && cookieValue.endsWith('/es') ? 'es' : 'en';

      loadGoogleTranslate();
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
      currentLang,
      scrollToSection,
      toggleTheme,
      toggleLanguage,
      toggleMenu: () => menuOpen.value = !menuOpen.value
    };
  }
});