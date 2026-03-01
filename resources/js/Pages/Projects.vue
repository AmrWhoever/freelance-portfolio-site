<template>
  <CyberneticLayout>
    <!-- Hero Section -->
    <section class="pt-32 pb-20 px-6">
      <div class="max-w-6xl mx-auto text-center">
        <h1 class="text-6xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl">
          <span
            class="bg-gradient-to-r from-purple-400 via-pink-400 to-red-400 bg-clip-text text-transparent animate-gradient"
          >
            {{ t('pages.projectsTitle') }}
          </span>
        </h1>
        <p class="text-xl text-white/80 mb-8 max-w-2xl mx-auto">
          {{ t('pages.projectsSubtitle') }}
        </p>
      </div>
    </section>

    <!-- Interactive Filter -->
    <section class="py-8 px-6">
      <div class="max-w-6xl mx-auto">
        <div class="flex flex-wrap justify-center gap-4 mb-12">
          <button
            v-for="filter in filters"
            :key="filter.key"
            @click="activeFilter = filter.key"
            :class="[
              'px-6 py-3 rounded-full border transition-all duration-300 transform hover:scale-105 font-mono text-sm',
              activeFilter === filter.key
                ? 'bg-cyan-500 text-white border-cyan-400 shadow-lg shadow-cyan-500/25'
                : 'bg-white/10 text-white/80 border-white/20 hover:bg-white/20'
            ]"
          >
            {{ filter.label }}
          </button>
        </div>
      </div>
    </section>

    <!-- Projects Grid -->
    <section class="py-16 px-6">
      <div class="max-w-7xl mx-auto">
        <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div
            v-for="project in filteredProjects"
            :key="project.id"
            class="group relative bg-white/10 backdrop-blur-md rounded-3xl overflow-hidden border border-white/20 hover:border-cyan-400/60 transition-all duration-700 transform hover:-translate-y-2 hover:scale-105"
          >
            <!-- Project Image with Overlay -->
            <div class="relative h-48 overflow-hidden">
              <img
                :src="project.image"
                :alt="project.title"
                class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>

              <!-- Category + Status -->
              <div
                class="absolute top-4 left-4 right-4 flex items-center justify-between gap-2"
              >
                <span
                  class="bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-mono shadow-lg"
                >
                  {{ project.category }}
                </span>

                <span
                  :class="[
                    'px-3 py-1 rounded-full text-xs font-mono shadow-lg',
                    statusStyles[project.statusKey] || 'bg-slate-500/80 text-white'
                  ]"
                >
                  {{ project.statusLabel }}
                </span>
              </div>

              <!-- Animated Elements -->
              <div
                class="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              >
                <div
                  v-for="i in 8"
                  :key="i"
                  class="absolute w-2 h-2 bg-yellow-300 rounded-full animate-ping"
                  :style="{
                    left: Math.random() * 100 + '%',
                    top: Math.random() * 100 + '%',
                    animationDelay: Math.random() * 2 + 's'
                  }"
                ></div>
              </div>
            </div>

            <!-- Project Content -->
            <div class="p-6 relative z-10">
              <h3
                class="text-xl font-bold text-white mb-2 group-hover:text-cyan-300 transition-colors text-right"
              >
                {{ project.title }}
              </h3>
              <p class="text-white/70 mb-4 text-sm text-right">
                {{ project.description }}
              </p>

              <!-- Tech Stack -->
              <div class="flex flex-wrap gap-2 mb-4 justify-end">
                <span
                  v-for="tech in project.tech"
                  :key="tech"
                  class="bg-white/10 text-white/90 px-3 py-1 rounded-full text-xs border border-white/20 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all duration-300"
                >
                  {{ tech }}
                </span>
              </div>

              <!-- Action Buttons -->
              <div class="flex space-x-3 space-x-reverse">
                <a
                  v-if="project.liveUrl"
                  :href="project.liveUrl"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="flex-1 bg-gradient-to-r from-cyan-500 to-blue-500 text-white py-2 px-4 rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 group/btn text-center"
                >
                  <span
                    class="flex items-center justify-center space-x-2 space-x-reverse"
                  >
                    <span>{{ isEnglish ? 'View project' : 'عرض المشروع' }}</span>
                    <span
                      class="group-hover/btn:rotate-180 transition-transform"
                    >
                      🔮
                    </span>
                  </span>
                </a>

                <button
                  @click="viewDetails(project)"
                  class="px-4 bg-gradient-to-r from-purple-500 to-pink-500 text-white rounded-lg hover:from-purple-600 hover:to-pink-600 transition-all duration-300 transform hover:scale-105"
                >
                  ✨
                </button>
              </div>
            </div>

            <!-- Glow Effect -->
            <div
              class="absolute inset-0 rounded-3xl bg-cyan-500/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
            ></div>
          </div>
        </div>
      </div>
    </section>

    <!-- Call to Action -->
    <section class="py-20 px-6">
      <div class="max-w-4xl mx-auto text-center">
        <div
          class="bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-3xl p-12 backdrop-blur-md border border-white/20"
        >
          <h2 class="text-4xl font-bold text-white mb-6">
            {{ isEnglish ? 'Ready to start your project?' : 'مستعد لبدء مشروعك؟' }}
          </h2>
          <p class="text-xl text-white/80 mb-8">
            {{ isEnglish ? 'Let us build something exceptional together.' : 'دعنا نعمل معًا لبناء شيء استثنائي' }}
          </p>
          <a
            href="/contact"
            class="inline-block bg-gradient-to-r from-cyan-500 to-blue-500 text-white px-8 py-4 rounded-xl hover:from-cyan-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-2xl hover:shadow-cyan-500/25"
          >
            <span class="flex items-center space-x-2 space-x-reverse">
              <span>{{ t('common.startProject') }}</span>
              <span class="animate-bounce">🚀</span>
            </span>
          </a>
        </div>
      </div>
    </section>
  </CyberneticLayout>
</template>

<script setup>
import CyberneticLayout from '../Layouts/CyberneticLayout.vue'
import { computed, ref } from 'vue'
import { useLocale } from '@/composables/useLocale'

const { t, isEnglish } = useLocale()

const activeFilter = ref('all')

const filters = computed(() => [
  { key: 'all', label: isEnglish.value ? 'All' : 'الكل' },
  { key: 'web', label: isEnglish.value ? 'Websites' : 'مواقع ويب' },
  { key: 'ecommerce', label: isEnglish.value ? 'E-commerce' : 'متاجر إلكترونية' },
  { key: 'app', label: isEnglish.value ? 'Web Apps' : 'تطبيقات ويب' },
  { key: 'ui', label: isEnglish.value ? 'UI Design' : 'تصميم واجهات' }
])

// Status styles (for the badge)
const statusStyles = {
  done: 'bg-emerald-500/90 text-white',
  wip: 'bg-amber-400/90 text-black'
}

const projects = computed(() => {
  const categoryLabel = {
    web: isEnglish.value ? 'Website' : 'موقع ويب',
    ecommerce: isEnglish.value ? 'E-commerce' : 'متجر إلكتروني',
    app: isEnglish.value ? 'Web App' : 'تطبيق ويب'
  }
  const statusLabel = {
    done: isEnglish.value ? 'Completed' : 'مكتمل',
    wip: isEnglish.value ? 'In Progress' : 'قيد التطوير'
  }

  return [
    {
      id: 1,
      title: isEnglish.value ? 'Sakkbah' : 'سكبة',
      description: isEnglish.value
        ? 'A complete e-commerce platform with a smooth UX tailored to the Saudi market.'
        : 'منصة تسوق إلكتروني متكاملة مع تجربة مستخدم سلسة ومناسبة للسوق السعودي.',
      categoryKey: 'web',
      category: categoryLabel.web,
      statusKey: 'done',
      statusLabel: statusLabel.done,
      tech: ['Vue.js', 'Tailwind CSS', 'JavaScript', 'Responsive'],
      image:
        'https://images.unsplash.com/photo-1441986300917-64674bd600d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      liveUrl: 'https://sakkbah.sa/'
    },
    {
      id: 2,
      title: isEnglish.value ? 'Sanadeeq' : 'صناديق',
      description: isEnglish.value
        ? 'A focused online store with CMS workflows and improved browsing experience.'
        : 'متجر إلكتروني متخصص مع نظام إدارة محتوى متكامل وتجربة مستخدم محسنة.',
      categoryKey: 'ecommerce',
      category: categoryLabel.ecommerce,
      statusKey: 'done',
      statusLabel: statusLabel.done,
      tech: ['Vue.js', 'CSS3', 'UI/UX', 'E-commerce'],
      image:
        'https://images.unsplash.com/photo-1563013544-824ae1b704d3?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      liveUrl: 'https://sanadeeq.sa/'
    },
    {
      id: 3,
      title: isEnglish.value ? 'Learning Platform' : 'منصة تعليمية',
      description: isEnglish.value
        ? 'A remote-learning platform with student tracking and course management (in progress).'
        : 'منصة للتعلم عن بعد مع نظام متابعة الطلاب وإدارة المحتوى التعليمي (تحت التطوير).',
      categoryKey: 'app',
      category: categoryLabel.app,
      statusKey: 'wip',
      statusLabel: statusLabel.wip,
      tech: ['Vue.js', 'Firebase', 'Real-time', 'PWA'],
      image:
        'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      liveUrl: null
    },
    {
      id: 4,
      title: isEnglish.value ? 'Booking System' : 'نظام حجوزات',
      description: isEnglish.value
        ? 'An integrated appointment and booking system with an easy admin interface (planned).'
        : 'نظام متكامل لإدارة الحجوزات والمواعيد مع واجهة إدارة سهلة الاستخدام (قيد التخطيط).',
      categoryKey: 'app',
      category: categoryLabel.app,
      statusKey: 'wip',
      statusLabel: statusLabel.wip,
      tech: ['React', 'Node.js', 'MongoDB', 'REST API'],
      image:
        'https://images.unsplash.com/photo-1432888622747-4eb9a8efeb07?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      liveUrl: null
    },
    {
      id: 5,
      title: isEnglish.value ? 'Corporate Website' : 'موقع شركة',
      description: isEnglish.value
        ? 'A professional corporate website for services and consultation requests (in execution).'
        : 'موقع مؤسسي احترافي لعرض الخدمات وطلب الاستشارات (نموذج قيد التنفيذ).',
      categoryKey: 'web',
      category: categoryLabel.web,
      statusKey: 'wip',
      statusLabel: statusLabel.wip,
      tech: ['HTML5', 'CSS3', 'JavaScript', 'SEO'],
      image:
        'https://images.unsplash.com/photo-1460925895917-afdab827c52f?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      liveUrl: null
    },
    {
      id: 6,
      title: isEnglish.value ? 'Dashboard' : 'لوحة تحكم',
      description: isEnglish.value
        ? 'An advanced dashboard for content and analytics with interactive charts (in progress).'
        : 'لوحة تحكم متقدمة لإدارة المحتوى والبيانات مع رسوم بيانية تفاعلية (قيد التطوير).',
      categoryKey: 'app',
      category: categoryLabel.app,
      statusKey: 'wip',
      statusLabel: statusLabel.wip,
      tech: ['Vue.js', 'Chart.js', 'Admin', 'Dashboard'],
      image:
        'https://images.unsplash.com/photo-1551288049-bebda4e38f71?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
      liveUrl: null
    }
  ]
})

const filteredProjects = computed(() => {
  if (activeFilter.value === 'all') return projects.value
  if (activeFilter.value === 'ui') return projects.value.filter((project) => project.categoryKey === 'web')
  return projects.value.filter((project) => project.categoryKey === activeFilter.value)
})

const viewDetails = (project) => {
  console.log('عرض تفاصيل المشروع:', project.title)
}
</script>

<style scoped>
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
</style>
