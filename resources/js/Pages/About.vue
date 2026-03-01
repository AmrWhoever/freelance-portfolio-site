<template>
  <CyberneticLayout>
    <!-- Hero Section -->
    <section class="pt-32 pb-12 px-6">
      <div class="max-w-6xl mx-auto text-center">
        <h1
          class="text-5xl sm:text-6xl md:text-7xl font-bold text-white mb-6 drop-shadow-2xl"
        >
          <span
            class="bg-gradient-to-r from-green-400 via-yellow-400 to-orange-400 bg-clip-text text-transparent animate-gradient"
          >
            {{ t('pages.aboutTitle') }}
          </span>
        </h1>
        <p class="text-lg sm:text-xl text-white/80 mb-8 max-w-2xl mx-auto">
          {{ t('pages.aboutSubtitle') }}
        </p>

        <!-- Small hero stats row -->
        <div
          class="grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-sm"
        >
          <div
            class="bg-white/5 border border-white/10 rounded-2xl px-3 py-2 text-white/80 backdrop-blur-md"
          >
            <div class="text-cyan-300 font-bold text-lg">2+</div>
            <div>{{ isEnglish ? 'Years of practical experience' : 'سنوات خبرة عملية' }}</div>
          </div>
          <div
            class="bg-white/5 border border-white/10 rounded-2xl px-3 py-2 text-white/80 backdrop-blur-md"
          >
            <div class="text-cyan-300 font-bold text-lg">2</div>
            <div>{{ isEnglish ? 'Completed projects' : 'مشاريع مكتملة' }}</div>
          </div>
          <div
            class="bg-white/5 border border-white/10 rounded-2xl px-3 py-2 text-white/80 backdrop-blur-md"
          >
            <div class="text-cyan-300 font-bold text-lg">2</div>
            <div>{{ isEnglish ? 'Clients so far' : 'عملاء حتى الآن' }}</div>
          </div>
          <div
            class="bg-white/5 border border-white/10 rounded-2xl px-3 py-2 text-white/80 backdrop-blur-md"
          >
            <div class="text-cyan-300 font-bold text-lg">2021</div>
            <div>{{ isEnglish ? 'Learning started' : 'بداية التعلم' }}</div>
          </div>
        </div>
      </div>
    </section>

    <!-- Story Section -->
    <section class="py-20 px-6">
      <div class="max-w-6xl mx-auto">
        <div class="grid lg:grid-cols-2 gap-16 items-center">
          <!-- Animated Profile -->
          <div class="relative group">
            <div
              class="relative z-10 bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-3xl p-8 backdrop-blur-md border border-white/20 transform group-hover:scale-105 transition-all duration-500"
            >
              <div class="text-center">
                <div class="w-32 h-32 mx-auto mb-6 relative">
                  <img
                    src="/storage/images/1.jpeg"
                    :alt="isEnglish ? 'Profile photo' : 'صورة شخصية'"
                    class="w-full h-full rounded-full object-cover border-4 border-white/20"
                  />
                  <div
                    class="absolute inset-0 rounded-full bg-gradient-to-r from-cyan-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300"
                  ></div>
                </div>
                <h3 class="text-2xl font-bold text-white mb-2">{{ profileName }}</h3>
                <p class="text-cyan-300 font-medium">{{ profilePrimaryRole }}</p>
                <p class="text-xs text-white/50 mt-2 font-mono">
                  {{ profileRoleLine }}
                </p>
              </div>
            </div>
            <!-- Floating Elements -->
            <div
              class="absolute -top-4 -left-4 w-20 h-20 bg-yellow-400 rounded-full blur-xl opacity-30 animate-pulse"
            ></div>
            <div
              class="absolute -bottom-4 -right-4 w-24 h-24 bg-pink-400 rounded-full blur-xl opacity-30 animate-pulse"
              style="animation-delay: 1s"
            ></div>
          </div>

          <!-- Story Content -->
          <div class="space-y-6 text-right">
            <h2 class="text-3xl sm:text-4xl font-bold text-white mb-4">
              {{ isEnglish ? 'My Journey in Web Development' : 'رحلتي في عالم الويب' }}
            </h2>
            <p class="text-lg text-white/80 leading-relaxed">
              {{ isEnglish
                ? 'I started my web development journey in 2021 by learning HTML and CSS and building my first simple pages.'
                : 'بدأت رحلتي في تطوير الويب في 2021، مع اكتشاف عالم HTML و CSS وبناء أول الصفحات البسيطة.' }}
            </p>
            <p class="text-lg text-white/80 leading-relaxed">
              {{ isEnglish
                ? 'Across about two years of practical work, I moved from static pages to interactive interfaces with Vue.js and React, with strong focus on UX and performance.'
                : 'خلال حوالي سنتين من الخبرة العملية، تطورت من مجرد صفحات ثابتة إلى بناء واجهات تفاعلية باستخدام Vue.js و React، مع تركيز كبير على تجربة المستخدم والأداء.' }}
            </p>
            <p class="text-lg text-white/80 leading-relaxed">
              {{ isEnglish
                ? 'In 2024, I started freelance work with real clients and delivered websites that reflect their brand and goals, not just ready-made templates.'
                : 'في 2024 بدأت العمل الحر فعليًا مع عملاء حقيقيين، وبناء مواقع تعكس هويتهم وتدعم أهدافهم، وليس مجرد قالب جاهز.' }}
            </p>

            <div class="flex flex-wrap gap-3 mt-8 justify-end">
              <span
                v-for="skill in technicalSkills"
                :key="skill"
                class="bg-white/10 text-white/90 px-4 py-2 rounded-full border border-white/20 hover:bg-cyan-500/20 hover:border-cyan-400 transition-all duration-300 cursor-pointer transform hover:scale-105 text-sm"
              >
                {{ skill }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Technical Skills -->
    <section class="py-20 px-6 bg-white/5 backdrop-blur-md">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl sm:text-4xl font-bold text-center text-white mb-16">
          {{ isEnglish ? 'Technical Skills' : 'مهاراتي التقنية' }}
        </h2>
        <div class="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div
            v-for="skill in skills"
            :key="skill.name"
            class="group text-center p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 hover:border-cyan-400/50 transition-all duration-500 transform hover:-translate-y-2"
          >
            <div
              class="text-5xl mb-4 transform group-hover:scale-110 group-hover:rotate-12 transition-transform duration-300"
            >
              {{ skill.icon }}
            </div>
            <h3 class="text-xl font-bold text-white mb-3">
              {{ skill.name }}
            </h3>
            <p class="text-white/70 text-sm">
              {{ skill.description }}
            </p>
            <div class="mt-4 w-full bg-white/20 rounded-full h-2">
              <div
                class="bg-gradient-to-r from-cyan-400 to-blue-500 h-2 rounded-full transition-all duration-1000"
                :style="{ width: skill.level }"
              ></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Timeline -->
    <section class="py-20 px-6">
      <div class="max-w-4xl mx-auto">
        <h2 class="text-3xl sm:text-4xl font-bold text-center text-white mb-16">
          {{ isEnglish ? 'Career Timeline' : 'خط الزمن المهني' }}
        </h2>
        <div class="space-y-8 relative">
          <!-- vertical line (center-right) -->
          <div
            class="hidden md:block absolute right-10 top-0 bottom-0 w-px bg-gradient-to-b from-cyan-400/40 via-cyan-400/10 to-purple-400/40"
          ></div>

          <div
            v-for="event in timeline"
            :key="event.year"
            class="group relative flex flex-row-reverse items-center space-x-6 space-x-reverse p-6 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 hover:border-purple-400/50 transition-all duration-300"
          >
            <div
              class="flex-shrink-0 w-20 h-20 bg-gradient-to-br from-cyan-500 to-purple-500 rounded-2xl flex items-center justify-center transform group-hover:scale-110 transition-transform duration-300 shadow-lg shadow-cyan-500/30"
            >
              <span class="text-white font-bold text-lg">
                {{ event.year }}
              </span>
            </div>
            <div class="flex-1 text-right">
              <h3 class="text-xl font-bold text-white mb-2">
                {{ event.title }}
              </h3>
              <p class="text-white/70 text-sm sm:text-base">
                {{ event.description }}
              </p>
            </div>
            <div
              class="text-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"
            >
              {{ event.icon }}
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="py-20 px-6 bg-gradient-to-b from-transparent to-black/30">
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl sm:text-4xl font-bold text-center text-white mb-16">
          {{ isEnglish ? 'My Stats' : 'إحصائياتي' }}
        </h2>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div
            v-for="stat in stats"
            :key="stat.title"
            class="group text-center p-8 rounded-3xl bg-white/10 backdrop-blur-md border border-white/20 hover:border-cyan-400/50 transition-all duration-500 transform hover:-translate-y-2"
          >
            <div
              class="text-4xl mb-4 text-cyan-400 transform group-hover:scale-110 transition-transform duration-300"
            >
              {{ stat.icon }}
            </div>
            <div
              class="text-3xl font-bold text-white mb-2 font-mono tracking-wider"
            >
              {{ stat.value }}
            </div>
            <p class="text-white/70 text-sm">
              {{ stat.title }}
            </p>
          </div>
        </div>
      </div>
    </section>
  </CyberneticLayout>
</template>

<script setup>
import CyberneticLayout from '../Layouts/CyberneticLayout.vue'
import { computed } from 'vue'
import { useLocale } from '@/composables/useLocale'

const { t, isEnglish } = useLocale()

const profileName = computed(() =>
  isEnglish.value ? 'Amr' : 'عمرو'
)

const profilePrimaryRole = computed(() =>
  isEnglish.value ? 'Frontend Developer' : 'مطور واجهات أمامية'
)

const profileRoleLine = computed(() =>
  isEnglish.value
    ? 'Frontend Developer · Backend Developer · App Developer'
    : 'مطور واجهات أمامية · مطور واجهات خلفية · مطور تطبيقات'
)

const technicalSkills = computed(() => [
  'Vue.js',
  'React',
  'JavaScript',
  'CSS3',
  'HTML5',
  'Tailwind CSS',
  'Responsive Design',
  'UI / UX'
])

const skills = computed(() => {
  if (isEnglish.value) {
    return [
      { name: 'Frontend Development', icon: '🎨', level: '95%', description: 'Building clean and user-friendly interfaces' },
      { name: 'Interactivity', icon: '⚡', level: '90%', description: 'Fast and interactive web experiences' },
      { name: 'Responsive Design', icon: '📱', level: '92%', description: 'Consistent layout across all screen sizes' },
      { name: 'Performance', icon: '🚀', level: '88%', description: 'Optimizing speed and perceived performance' }
    ]
  }

  return [
    { name: 'تطوير الواجهات', icon: '🎨', level: '95%', description: 'تصميم واجهات مستخدم جذابة وسهلة الاستخدام' },
    { name: 'التفاعلية', icon: '⚡', level: '90%', description: 'تطبيقات ويب تفاعلية وسريعة الاستجابة' },
    { name: 'التصميم المتجاوب', icon: '📱', level: '92%', description: 'تصميم متكامل لجميع أحجام الشاشات' },
    { name: 'أداء الموقع', icon: '🚀', level: '88%', description: 'تحسين سرعة وأداء المواقع لتجربة سلسة' }
  ]
})

// Updated timeline based on your info:
// - Started learning: 2021
// - Freelance: 2024
const timeline = computed(() => {
  if (isEnglish.value) {
    return [
      { year: '2021', title: 'Learning Started', description: 'Started learning web fundamentals and building first pages.', icon: '📚' },
      { year: '2022', title: 'JavaScript Focus', description: 'Strengthened programming fundamentals and interactive UI logic.', icon: '⚡' },
      { year: '2023', title: 'Frameworks Stage', description: 'Adopted Vue.js and React through advanced personal projects.', icon: '🧩' },
      { year: '2024', title: 'Freelance Launch', description: 'Started freelancing with first clients and tailored deliverables.', icon: '🎯' },
      { year: '2025', title: 'Experience Maturity', description: 'Focused on UX quality, performance, and digital brand consistency.', icon: '👑' }
    ]
  }

  return [
    { year: '2021', title: 'بداية التعلم', description: 'بداية تعلم أساسيات تطوير الويب وبناء أول الصفحات البسيطة.', icon: '📚' },
    { year: '2022', title: 'التعمق في JavaScript', description: 'تقوية الأساس البرمجي والتركيز على JavaScript لصناعة واجهات أكثر تفاعلية.', icon: '⚡' },
    { year: '2023', title: 'الدخول لعالم الأُطر', description: 'التعرف على Vue.js و React وتجربة بناء مشاريع شخصية متقدمة.', icon: '🧩' },
    { year: '2024', title: 'العمل الحر', description: 'بداية العمل الحر مع أول عميلين وبناء مواقع مخصصة تناسب احتياجهم.', icon: '🎯' },
    { year: '2025', title: 'ترسيخ الخبرة', description: 'التركيز على صقل تجربة المستخدم وتحسين الأداء وبناء هوية رقمية احترافية للعملاء.', icon: '👑' }
  ]
})

// Updated stats based on what you said:
// 2 clients, 2 finished projects, 2 years experience
const stats = computed(() => {
  if (isEnglish.value) {
    return [
      { icon: '🚀', value: '2', title: 'Completed Projects' },
      { icon: '👥', value: '2', title: 'Clients So Far' },
      { icon: '📅', value: '2+', title: 'Years of Experience' },
      { icon: '📚', value: '2021', title: 'Web Learning Started' }
    ]
  }

  return [
    { icon: '🚀', value: '2', title: 'مشاريع مكتملة' },
    { icon: '👥', value: '2', title: 'عملاء حتى الآن' },
    { icon: '📅', value: '2+', title: 'سنوات خبرة عملية' },
    { icon: '📚', value: '2021', title: 'بداية تعلم تطوير الويب' }
  ]
})
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
