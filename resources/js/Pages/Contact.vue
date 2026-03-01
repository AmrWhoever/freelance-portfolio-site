<template>
  <CyberneticLayout>
    <!-- Hero Section with Particles -->
    <section class="pt-32 pb-20 px-6 relative overflow-hidden">
      <!-- Animated Background Particles (Font Awesome Icons) -->
      <div class="absolute inset-0 opacity-10 pointer-events-none">
        <i
          v-for="particle in floatingParticles"
          :key="particle.id"
          :class="['absolute animate-float text-cyan-400', particle.iconClass]"
          :style="particle.style"
        ></i>
      </div>

      <!-- Hero Content -->
      <div class="max-w-6xl mx-auto text-center relative z-10">
        <h1 class="text-6xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
          <span
            class="bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent animate-gradient"
          >
            {{ t('pages.contactTitle') }}
          </span>
        </h1>
        <p class="text-xl text-white/70 mb-4 max-w-2xl mx-auto">
          {{ t('pages.contactSubtitle') }}
        </p>
        <p class="text-lg text-white/60">
          {{ contactContent.heroLine }}
        </p>
      </div>
    </section>

    <!-- Contact Dashboard Section -->
    <section class="py-16 px-6">
      <div class="max-w-4xl mx-auto">
        <!-- Main Contact Header -->
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-white mb-4">{{ contactContent.directTitle }}</h2>
          <p class="text-xl text-white/70">{{ contactContent.directSubtitle }}</p>
        </div>

        <!-- Primary Contact Methods -->
        <div class="grid md:grid-cols-2 gap-8 mb-12">
          <!-- WhatsApp Card -->
          <div
            class="group relative bg-gradient-to-br from-green-500/20 to-green-600/20 backdrop-blur-md rounded-2xl p-8 border border-green-400/30 hover:border-green-400/60 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20"
          >
            <div class="text-center">
              <!-- Icon -->
              <div
                class="w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-2xl shadow-green-500/30 relative"
              >
                <i class="fa-brands fa-whatsapp text-3xl text-white"></i>
                <span
                  class="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-emerald-400 flex items-center justify-center text-[11px] text-emerald-950 font-bold border border-white/70"
                >
                  <i class="fa-solid fa-check"></i>
                </span>
              </div>

              <!-- Content -->
              <h3 class="text-2xl font-bold text-white mb-3">{{ contactContent.whatsappTitle }}</h3>
              <p class="text-white/80 mb-2">{{ contactContent.whatsappLine1 }}</p>
              <p class="text-white/60 text-sm mb-1">{{ contactContent.whatsappLine2 }}</p>
              <p class="text-green-300 text-lg font-mono mb-6">
                +966 54 340 9536
              </p>

              <!-- Action Button -->
              <a
                href="https://wa.me/966543409536"
                target="_blank"
                class="inline-flex items-center space-x-2 space-x-reverse bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 group/btn"
              >
                <span>{{ contactContent.whatsappCta }}</span>
                <i
                  class="fa-solid fa-arrow-up-right-from-square text-sm group-hover/btn:translate-x-1 transition-transform"
                ></i>
              </a>
            </div>

            <!-- Hover Effect -->
            <div class="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
              <div
                class="absolute inset-0 bg-gradient-to-r from-green-500/0 via-green-500/10 to-green-500/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
              ></div>
            </div>
          </div>

          <!-- Email Card -->
          <div
            class="group relative bg-gradient-to-br from-blue-500/20 to-blue-600/20 backdrop-blur-md rounded-2xl p-8 border border-blue-400/30 hover:border-blue-400/60 transition-all duration-300 transform hover:scale-105 hover:shadow-2xl hover:shadow-blue-500/20"
          >
            <div class="text-center">
              <!-- Icon -->
              <div
                class="w-20 h-20 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 transform group-hover:scale-110 group-hover:rotate-6 transition-transform duration-300 shadow-2xl shadow-blue-500/30 relative"
              >
                <i class="fa-regular fa-envelope-open text-3xl text-white"></i>
                <span
                  class="absolute -top-1 -right-1 w-6 h-6 rounded-full bg-sky-400 flex items-center justify-center text-[11px] text-sky-950 font-bold border border-white/70"
                >
                  <i class="fa-solid fa-at"></i>
                </span>
              </div>

              <!-- Content -->
              <h3 class="text-2xl font-bold text-white mb-3">
                {{ contactContent.emailTitle }}
              </h3>
              <p class="text-white/80 mb-2">{{ contactContent.emailLine1 }}</p>
              <p class="text-white/60 text-sm mb-1">
                {{ contactContent.emailLine2 }}
              </p>
              <p class="text-blue-300 text-lg font-mono mb-6">
                Amrwhoever@gmail.com
              </p>

              <!-- Action Button -->
              <a
                href="mailto:Amrwhoever@gmail.com"
                class="inline-flex items-center space-x-2 space-x-reverse bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105 group/btn"
              >
                <span>{{ contactContent.emailCta }}</span>
                <i
                  class="fa-regular fa-paper-plane text-sm group-hover/btn:translate-x-1 transition-transform"
                ></i>
              </a>
            </div>

            <!-- Hover Effect -->
            <div class="absolute inset-0 rounded-2xl overflow-hidden pointer-events-none">
              <div
                class="absolute inset-0 bg-gradient-to-r from-blue-500/0 via-blue-500/10 to-blue-500/0 transform -translate-x-full group-hover:translate-x-full transition-transform duration-1000"
              ></div>
            </div>
          </div>
        </div>

        <!-- Contact Information Grid -->
        <div class="grid sm:grid-cols-3 gap-6 mb-12">
          <div
            v-for="info in contactInfo"
            :key="info.id"
            class="group text-center p-6 bg-white/5 backdrop-blur-md rounded-2xl border border-white/15 hover:border-cyan-400/60 transition-all duration-300 transform hover:scale-105 hover:-translate-y-1"
          >
            <div
              class="w-12 h-12 mx-auto mb-3 rounded-2xl flex items-center justify-center bg-gradient-to-br from-cyan-500/20 to-cyan-400/5 text-cyan-300 text-2xl group-hover:scale-110 transition-transform"
            >
              <i :class="info.iconClass"></i>
            </div>
            <h4 class="text-white font-semibold mb-1">
              {{ info.title }}
            </h4>
            <p class="text-white/75 text-sm mb-1">
              {{ info.value }}
            </p>
            <p class="text-cyan-400 text-xs mt-1">
              {{ info.subtitle }}
            </p>
          </div>
        </div>

        <!-- Quick Stats -->
        <div class="grid grid-cols-2 md:grid-cols-4 gap-6">
          <div
            v-for="stat in quickStats"
            :key="stat.id"
            class="text-center p-6 bg-white/5 rounded-2xl border border-white/10 hover:border-cyan-400/40 transition-all duration-300 transform hover:-translate-y-1"
          >
            <div class="text-2xl mb-2" :class="stat.color">
              <i :class="stat.iconClass"></i>
            </div>
            <div class="text-white font-bold text-lg mb-1">
              {{ stat.value }}
            </div>
            <div class="text-white/60 text-sm">
              {{ stat.label }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Availability & Process Section -->
    <section class="py-20 px-6">
      <div class="max-w-6xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-16">
          <!-- Availability Timeline -->
          <div class="cyber-panel">
            <h2 class="text-3xl font-bold text-cyan-300 text-center mb-8">
              {{ contactContent.availabilityTitle }}
            </h2>
            <div class="space-y-4">
              <div
                v-for="slot in availabilitySlots"
                :key="slot.id"
                class="flex items-center p-4 rounded-xl border border-cyan-500/30 bg-cyan-500/10 hover:bg-cyan-500/20 transition-all duration-300 group"
                :class="isEnglish ? 'flex-row gap-4' : 'flex-row-reverse space-x-4 space-x-reverse'"
              >
                <div
                  class="text-2xl transform group-hover:scale-110 transition-transform text-cyan-200"
                >
                  <i :class="slot.iconClass"></i>
                </div>
                <div class="flex-1" :class="isEnglish ? 'text-left' : 'text-right'">
                  <h4 class="text-white font-semibold">
                    {{ slot.title }}
                  </h4>
                  <p class="text-cyan-200 text-sm">
                    {{ slot.time }}
                  </p>
                </div>
                <div
                  class="px-3 py-1 bg-green-500/15 text-green-400 rounded-full text-xs border border-green-500/30"
                >
                  {{ slot.status }}
                </div>
              </div>
            </div>
          </div>

          <!-- Work Process -->
          <div class="cyber-panel">
            <h2 class="text-3xl font-bold text-cyan-300 text-center mb-8">
              {{ contactContent.processTitle }}
            </h2>
            <div class="space-y-6">
              <div
                v-for="step in workProcess"
                :key="step.id"
                class="flex items-start group"
                :class="isEnglish ? 'flex-row gap-4' : 'flex-row-reverse space-x-4 space-x-reverse'"
              >
                <div
                  class="flex-shrink-0 w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold transform group-hover:scale-110 transition-transform"
                >
                  {{ step.step }}
                </div>
                <div class="flex-1" :class="isEnglish ? 'text-left' : 'text-right'">
                  <h4 class="text-white font-semibold mb-1">
                    {{ step.title }}
                  </h4>
                  <p class="text-white/70 text-sm leading-relaxed">
                    {{ step.description }}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section
      class="py-20 px-6 bg-gradient-to-r from-cyan-800/40 to-blue-800/40 backdrop-blur-md border-t border-white/20"
    >
      <div class="max-w-4xl mx-auto text-center space-y-8">
        <!-- Main CTA -->
        <div>
          <h2 class="text-4xl font-bold text-white mb-6">
            {{ contactContent.ctaTitle }}
          </h2>
          <p class="text-xl text-white/70 mb-8">
            {{ contactContent.ctaSubtitle }}
          </p>
        </div>

        <!-- CTA Buttons -->
        <div
          class="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <a
            href="https://wa.me/966543409536"
            target="_blank"
            class="cyber-cta-btn cyber-cta-whatsapp group"
          >
            <span class="flex items-center space-x-3 space-x-reverse">
              <span>{{ contactContent.whatsappBigCta }}</span>
              <i
                class="fa-brands fa-whatsapp text-2xl group-hover:scale-110 transition-transform"
              ></i>
            </span>
          </a>

          <a
            href="mailto:Amrwhoever@gmail.com"
            class="cyber-cta-btn cyber-cta-email group"
          >
            <span class="flex items-center space-x-3 space-x-reverse">
              <span>{{ contactContent.emailBigCta }}</span>
              <i
                class="fa-regular fa-envelope text-2xl group-hover:scale-110 transition-transform"
              ></i>
            </span>
          </a>
        </div>

        <!-- Quick Contact Info -->
        <div
          class="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 border-t border-white/20"
        >
          <div class="text-center p-4">
            <i class="fa-brands fa-whatsapp text-2xl text-green-400 mb-2"></i>
            <div class="text-white font-mono text-lg">
              +966 54 340 9536
            </div>
            <div class="text-white/60 text-sm">{{ contactContent.whatsappLabel }}</div>
          </div>
          <div class="text-center p-4">
            <i class="fa-regular fa-envelope text-2xl text-blue-400 mb-2"></i>
            <div class="text-white font-mono text-lg">
              Amrwhoever@gmail.com
            </div>
            <div class="text-white/60 text-sm">{{ contactContent.emailLabel }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Floating Action Buttons -->
    <div class="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
      <a
        v-for="action in floatingActions"
        :key="action.id"
        :href="action.href"
        :target="action.target"
        :class="action.class"
        class="floating-action-btn group relative"
      >
        <i :class="['text-xl', action.iconClass]"></i>

        <!-- Tooltip -->
        <div
          class="absolute left-full ml-3 top-1/2 transform -translate-y-1/2 bg-black/90 text-white px-3 py-2 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        >
          {{ action.tooltip }}
          <div
            class="absolute right-full top-1/2 transform -translate-y-1/2 border-4 border-transparent border-r-black/90"
          ></div>
        </div>
      </a>
    </div>
  </CyberneticLayout>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import CyberneticLayout from '../Layouts/CyberneticLayout.vue'
import { useLocale } from '@/composables/useLocale'

const { t, isEnglish } = useLocale()

const contactContent = computed(() => {
  if (isEnglish.value) {
    return {
      heroLine: 'Ready to start your digital journey? Let’s build your next project together.',
      directTitle: 'Contact Me Directly',
      directSubtitle: 'Choose the communication method that works best for you.',
      whatsappTitle: 'WhatsApp',
      whatsappLine1: 'Instant and direct communication',
      whatsappLine2: 'Faster replies and easier follow-up',
      whatsappCta: 'Start Chat',
      emailTitle: 'Email',
      emailLine1: 'For official messages and projects',
      emailLine2: 'Best for detailed information and files',
      emailCta: 'Send Email',
      availabilityTitle: 'Availability Hours',
      processTitle: 'How We Work',
      ctaTitle: 'Are you ready to start your project?',
      ctaSubtitle: 'Contact me now and let’s create something remarkable together.',
      whatsappBigCta: 'Contact via WhatsApp',
      emailBigCta: 'Send an Email',
      whatsappLabel: 'WhatsApp',
      emailLabel: 'Email'
    }
  }

  return {
    heroLine: 'مستعد لبدء رحلتك الرقمية؟ دعنا نعمل معًا على مشروعك القادم',
    directTitle: 'تواصل معي مباشرة',
    directSubtitle: 'اختر الطريقة المناسبة لك للتواصل',
    whatsappTitle: 'واتساب',
    whatsappLine1: 'تواصل فوري ومباشر',
    whatsappLine2: 'رد أسرع ومتابعة أسهل',
    whatsappCta: 'ابدأ المحادثة',
    emailTitle: 'البريد الإلكتروني',
    emailLine1: 'للرسائل الرسمية والمشاريع',
    emailLine2: 'مناسب للتفاصيل الطويلة والملفات',
    emailCta: 'أرسل بريدًا',
    availabilityTitle: 'أوقات التوفر',
    processTitle: 'كيفية العمل',
    ctaTitle: 'هل أنت جاهز لبدء مشروعك؟',
    ctaSubtitle: 'تواصل معي الآن ودعنا نصنع شيئًا مميزًا معًا',
    whatsappBigCta: 'تواصل عبر واتساب',
    emailBigCta: 'أرسل بريدًا إلكترونيًا',
    whatsappLabel: 'واتساب',
    emailLabel: 'بريد إلكتروني'
  }
})

// Floating Particles (Font Awesome icons)
const floatingParticles = ref([])

// Contact Information
const contactInfo = computed(() => {
  if (isEnglish.value) {
    return [
      {
        id: 1,
        iconClass: 'fa-regular fa-clock',
        title: 'Response Time',
        value: 'Within 24 hours',
        subtitle: 'Maximum expected reply time'
      },
      {
        id: 2,
        iconClass: 'fa-solid fa-globe',
        title: 'Work Style',
        value: 'Remote',
        subtitle: 'Available for clients worldwide'
      },
      {
        id: 3,
        iconClass: 'fa-solid fa-laptop-code',
        title: 'Project Types',
        value: 'Websites and web apps',
        subtitle: 'Frontend design and development'
      }
    ]
  }

  return [
    {
      id: 1,
      iconClass: 'fa-regular fa-clock',
      title: 'وقت الاستجابة',
      value: 'خلال 24 ساعة',
      subtitle: 'أقصى حد للرد'
    },
    {
      id: 2,
      iconClass: 'fa-solid fa-globe',
      title: 'نمط العمل',
      value: 'عن بُعد',
      subtitle: 'متاح لعملاء من أي دولة'
    },
    {
      id: 3,
      iconClass: 'fa-solid fa-laptop-code',
      title: 'أنواع المشاريع',
      value: 'مواقع وتطبيقات ويب',
      subtitle: 'تطوير وتصميم واجهات'
    }
  ]
})

// Quick Stats
const quickStats = computed(() => {
  if (isEnglish.value) {
    return [
      {
        id: 1,
        iconClass: 'fa-regular fa-hourglass-half',
        value: '24h',
        label: 'Max response time',
        color: 'text-cyan-400'
      },
      {
        id: 2,
        iconClass: 'fa-regular fa-comments',
        value: 'Very Good',
        label: 'Communication quality',
        color: 'text-green-400'
      },
      {
        id: 3,
        iconClass: 'fa-solid fa-earth-americas',
        value: 'Global',
        label: 'Client range',
        color: 'text-purple-400'
      },
      {
        id: 4,
        iconClass: 'fa-solid fa-headset',
        value: 'Direct',
        label: 'Support mode',
        color: 'text-yellow-400'
      }
    ]
  }

  return [
    {
      id: 1,
      iconClass: 'fa-regular fa-hourglass-half',
      value: '24h',
      label: 'وقت الاستجابة الأقصى',
      color: 'text-cyan-400'
    },
    {
      id: 2,
      iconClass: 'fa-regular fa-comments',
      value: 'جيد جدًا',
      label: 'جودة التواصل',
      color: 'text-green-400'
    },
    {
      id: 3,
      iconClass: 'fa-solid fa-earth-americas',
      value: 'عالمي',
      label: 'نطاق العملاء',
      color: 'text-purple-400'
    },
    {
      id: 4,
      iconClass: 'fa-solid fa-headset',
      value: 'مباشر',
      label: 'نمط الدعم',
      color: 'text-yellow-400'
    }
  ]
})

// Availability Slots
const availabilitySlots = computed(() => {
  if (isEnglish.value) {
    return [
      {
        id: 1,
        iconClass: 'fa-solid fa-sun',
        title: 'Morning',
        time: '9:00 AM - 12:00 PM',
        status: 'Active'
      },
      {
        id: 2,
        iconClass: 'fa-regular fa-sun',
        title: 'Afternoon',
        time: '1:00 PM - 5:00 PM',
        status: 'Active'
      },
      {
        id: 3,
        iconClass: 'fa-regular fa-moon',
        title: 'Evening',
        time: '7:00 PM - 10:00 PM',
        status: 'Available'
      }
    ]
  }

  return [
    {
      id: 1,
      iconClass: 'fa-solid fa-sun',
      title: 'الصباح',
      time: '9:00 ص - 12:00 م',
      status: 'نشط'
    },
    {
      id: 2,
      iconClass: 'fa-regular fa-sun',
      title: 'الظهيرة',
      time: '1:00 م - 5:00 م',
      status: 'نشط'
    },
    {
      id: 3,
      iconClass: 'fa-regular fa-moon',
      title: 'المساء',
      time: '7:00 م - 10:00 م',
      status: 'متاح'
    }
  ]
})

// Work Process
const workProcess = computed(() => {
  if (isEnglish.value) {
    return [
      {
        id: 1,
        step: '1',
        title: 'Initial Contact',
        description:
          'We discuss your idea and project requirements via WhatsApp or email.'
      },
      {
        id: 2,
        step: '2',
        title: 'Analysis & Planning',
        description:
          'I analyze the project and share a plan, estimated timeline, and proposed cost.'
      },
      {
        id: 3,
        step: '3',
        title: 'Development Start',
        description:
          'We start building with clear progress updates in an organized workflow.'
      },
      {
        id: 4,
        step: '4',
        title: 'Delivery & Support',
        description:
          'Final delivery with technical support for an agreed period after handoff.'
      }
    ]
  }

  return [
    {
      id: 1,
      step: '1',
      title: 'التواصل الأولي',
      description:
        'نناقش فكرتك ومتطلبات المشروع عبر واتساب أو البريد الإلكتروني.'
    },
    {
      id: 2,
      step: '2',
      title: 'التحليل والتخطيط',
      description:
        'أقوم بتحليل المشروع وتقديم خطة عمل، مدة تقديرية، وتكلفة مقترحة.'
    },
    {
      id: 3,
      step: '3',
      title: 'بدء التطوير',
      description:
        'نبدأ في تطوير المشروع مع تحديثات مستمرة عن التقدم بشكل منظم.'
    },
    {
      id: 4,
      step: '4',
      title: 'التسليم والدعم',
      description:
        'تسليم المشروع النهائي مع دعم فني لفترة متفق عليها بعد التسليم.'
    }
  ]
})

// Floating Actions
const floatingActions = computed(() => {
  if (isEnglish.value) {
    return [
      {
        id: 1,
        iconClass: 'fa-brands fa-whatsapp',
        href: 'https://wa.me/966543409536',
        target: '_blank',
        class: 'bg-green-600 hover:bg-green-700',
        tooltip: 'Chat on WhatsApp'
      },
      {
        id: 2,
        iconClass: 'fa-regular fa-envelope',
        href: 'mailto:Amrwhoever@gmail.com',
        target: '_self',
        class: 'bg-blue-600 hover:bg-blue-700',
        tooltip: 'Send an email'
      }
    ]
  }

  return [
    {
      id: 1,
      iconClass: 'fa-brands fa-whatsapp',
      href: 'https://wa.me/966543409536',
      target: '_blank',
      class: 'bg-green-600 hover:bg-green-700',
      tooltip: 'تحدث معي على واتساب'
    },
    {
      id: 2,
      iconClass: 'fa-regular fa-envelope',
      href: 'mailto:Amrwhoever@gmail.com',
      target: '_self',
      class: 'bg-blue-600 hover:bg-blue-700',
      tooltip: 'أرسل بريدًا إلكترونيًا'
    }
  ]
})

// Initialize animations
const initializeParticles = () => {
  const iconClasses = [
    'fa-regular fa-comment-dots',
    'fa-regular fa-envelope',
    'fa-solid fa-mobile-screen',
    'fa-solid fa-globe',
    'fa-solid fa-bolt',
    'fa-solid fa-rocket',
    'fa-regular fa-lightbulb',
    'fa-regular fa-star',
    'fa-solid fa-code-branch',
    'fa-solid fa-wifi'
  ]

  floatingParticles.value = Array.from({ length: 10 }, (_, i) => ({
    id: i,
    iconClass: iconClasses[i % iconClasses.length],
    style: {
      left: Math.random() * 100 + '%',
      top: Math.random() * 100 + '%',
      animationDelay: Math.random() * 5 + 's',
      animationDuration: Math.random() * 10 + 12 + 's'
    }
  }))
}

onMounted(() => {
  initializeParticles()
})
</script>

<style scoped>
/* Gradient Animation */
.animate-gradient {
  background-size: 200% 200%;
  animation: gradient 3s ease infinite;
}

@keyframes gradient {
  0% {
    background-position: 0% 50%;
  }
  50% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0% 50%;
  }
}

/* Floating Animation */
.animate-float {
  animation: float linear infinite;
}

@keyframes float {
  0%,
  100% {
    transform: translateY(0px) rotate(0deg);
  }
  33% {
    transform: translateY(-20px) rotate(120deg);
  }
  66% {
    transform: translateY(10px) rotate(240deg);
  }
}

/* Cyber Panel */
.cyber-panel {
  background: rgba(17, 24, 39, 0.9);
  backdrop-filter: blur(16px);
  border-radius: 1.5rem;
  padding: 2rem;
  border: 1px solid rgba(34, 211, 238, 0.3);
  box-shadow: 0 25px 50px -12px rgba(34, 211, 238, 0.1);
  position: relative;
  overflow: hidden;
}

.cyber-panel::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 1px;
  background: linear-gradient(
    90deg,
    transparent,
    rgba(34, 211, 238, 0.5),
    transparent
  );
}

/* CTA Buttons */
.cyber-cta-btn {
  padding: 1.25rem 2.5rem;
  border-radius: 1rem;
  font-weight: 600;
  font-family: monospace;
  transition: all 0.3s;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 250px;
  text-align: center;
  font-size: 1.1rem;
}

.cyber-cta-whatsapp {
  background: linear-gradient(135deg, #25d366, #128c7e);
  color: white;
  border: none;
}

.cyber-cta-whatsapp:hover {
  transform: translateY(-3px);
  box-shadow: 0 20px 40px -10px rgba(37, 211, 102, 0.4);
}

.cyber-cta-email {
  background: linear-gradient(135deg, #ea4335, #4285f4);
  color: white;
  border: none;
}

.cyber-cta-email:hover {
  transform: translateY(-3px);
  box-shadow: 0 20px 40px -10px rgba(66, 133, 244, 0.4);
}

/* Floating Action Buttons */
.floating-action-btn {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  text-decoration: none;
  transition: all 0.3s;
  box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.3);
}

.floating-action-btn:hover {
  transform: scale(1.1) translateY(-2px);
  box-shadow: 0 15px 30px -5px rgba(0, 0, 0, 0.4);
}

/* Mobile Optimizations */
@media (max-width: 768px) {
  .cyber-cta-btn {
    min-width: 200px;
    padding: 1rem 2rem;
    font-size: 1rem;
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .animate-gradient,
  .animate-float {
    animation: none;
  }

  .cyber-cta-btn:hover,
  .floating-action-btn:hover {
    transform: none;
  }
}
</style>
