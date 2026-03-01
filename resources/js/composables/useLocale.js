import { computed, ref } from 'vue'

const LOCALE_KEY = 'site-locale'

const initialLocale =
  typeof window !== 'undefined' && localStorage.getItem(LOCALE_KEY)
    ? localStorage.getItem(LOCALE_KEY)
    : 'ar'

const locale = ref(initialLocale)

const messages = {
  ar: {
    nav: {
      home: 'الرئيسية',
      about: 'عني',
      projects: 'المشاريع',
      blog: 'المدونة',
      contact: 'اتصل بي',
    },
    common: {
      online: 'متصل',
      startProject: 'ابدأ مشروعك',
      services: 'خدماتي',
      contact: 'تواصل',
      allRights: 'جميع الحقوق محفوظة',
      language: 'اللغة',
      github: 'GitHub',
      whatsapp: 'واتساب',
      email: 'البريد الإلكتروني',
      backToBlog: 'العودة إلى المدونة',
      brandDescription: 'مطور واجهات أمامية أصمم وأبني تجارب ويب حديثة بتقنيات متقدمة.',
      serviceItems: ['تطوير الويب', 'واجهات المستخدم', 'تطبيقات تفاعلية', 'تحسين الأداء'],
    },
    home: {
      readyLine: '> النظام جاهز للعمل. ابدأ مشروعك الآن...',
      intro:
        'أصمم وأطور حلول ويب ذكية باستخدام أحدث التقنيات والذكاء الاصطناعي. حوّل رؤيتك إلى واقع رقمي استثنائي.',
      loading: 'جاري تحميل النظام...',
      dashboard: 'لوحة التحكم الرئيسية',
      dashboardSub: 'نظرة شاملة على أداء النظام وإمكانياته',
    },
    pages: {
      aboutTitle: 'عنّي',
      projectsTitle: 'مشاريعي',
      blogTitle: 'المدونة',
      contactTitle: 'اتصل بي',
      aboutSubtitle: 'خلف الكواليس الرقمية – أصنع حلول ويب مخصصة منذ 2021',
      projectsSubtitle: 'مجموعة من إبداعاتي الرقمية وتطبيقات الويب المميزة',
      blogSubtitle: 'رؤى تقنية، اكتشافات تكنولوجية، وأفكار في تطوير الويب',
      contactSubtitle: 'ابدأ تواصلك بخطوة بسيطة — وسأهتم بالباقي',
    },
  },
  en: {
    nav: {
      home: 'Home',
      about: 'About',
      projects: 'Projects',
      blog: 'Blog',
      contact: 'Contact',
    },
    common: {
      online: 'ONLINE',
      startProject: 'Start your project',
      services: 'Services',
      contact: 'Contact',
      allRights: 'All rights reserved',
      language: 'Language',
      github: 'GitHub',
      whatsapp: 'WhatsApp',
      email: 'Email',
      backToBlog: 'Back to blog',
      brandDescription: 'Frontend developer crafting modern web experiences with advanced technologies.',
      serviceItems: ['Web Development', 'User Interfaces', 'Interactive Apps', 'Performance Optimization'],
    },
    home: {
      readyLine: '> System ready for work. Start your project now...',
      intro:
        'I design and build smart web solutions using modern technologies and AI. Turn your vision into an exceptional digital experience.',
      loading: 'Loading system...',
      dashboard: 'Main Control Panel',
      dashboardSub: 'A complete view of system performance and capabilities',
    },
    pages: {
      aboutTitle: 'About Me',
      projectsTitle: 'My Projects',
      blogTitle: 'Blog',
      contactTitle: 'Contact Me',
      aboutSubtitle: 'Behind the digital scenes — building custom web solutions since 2021',
      projectsSubtitle: 'A selection of my digital work and featured web applications',
      blogSubtitle: 'Tech insights, discoveries, and thoughts on web development',
      contactSubtitle: 'Start with a simple message — I will take care of the rest',
    },
  },
}

const resolvePath = (source, path) => {
  return path.split('.').reduce((value, segment) => value?.[segment], source)
}

export const useLocale = () => {
  const isEnglish = computed(() => locale.value === 'en')
  const dir = computed(() => (isEnglish.value ? 'ltr' : 'rtl'))

  const setLocale = (nextLocale) => {
    locale.value = nextLocale === 'en' ? 'en' : 'ar'

    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCALE_KEY, locale.value)
    }
  }

  const toggleLocale = () => {
    setLocale(locale.value === 'ar' ? 'en' : 'ar')
  }

  const t = (path) => {
    return (
      resolvePath(messages[locale.value], path) ??
      resolvePath(messages.ar, path) ??
      path
    )
  }

  return {
    locale,
    dir,
    isEnglish,
    setLocale,
    toggleLocale,
    t,
  }
}
