<template>
  <CyberneticLayout>
    <section class="pt-32 pb-16 px-6">
      <div class="max-w-4xl mx-auto">
        <div class="mb-8" :class="isEnglish ? 'text-left' : 'text-right'">
          <Link href="/blog" class="text-cyan-300 hover:text-cyan-200 font-mono text-sm">
            {{ isEnglish ? '→' : '←' }} {{ t('common.backToBlog') }}
          </Link>
        </div>

        <article class="bg-black/40 border border-cyan-500/25 rounded-2xl p-6 sm:p-10 backdrop-blur-md">
          <!-- Improvement: fallback-safe title rendering to avoid empty heading when slug is unknown. -->
          <h1
            class="text-3xl sm:text-4xl font-bold text-cyan-300 mb-4 font-mono leading-snug"
            :class="isEnglish ? 'text-left' : 'text-right'"
          >
            {{ post.title }}
          </h1>

          <!-- Improvement: human-friendly metadata block for consistency with Blog page cards. -->
          <div class="flex items-center gap-3 text-xs font-mono mb-8" :class="isEnglish ? 'justify-start' : 'justify-end'">
            <span class="text-cyan-400">{{ post.date }}</span>
            <span class="text-gray-500">•</span>
            <span class="text-cyan-300">{{ post.readTime }}</span>
            <span class="text-gray-500">•</span>
            <span class="text-blue-300">{{ post.category }}</span>
          </div>

          <!-- Improvement: keep content structure RTL and readable with controlled prose width. -->
          <div
            class="prose prose-invert max-w-none"
            :class="isEnglish ? 'text-left' : 'text-right'"
            :dir="dir"
          >
            <div v-html="post.fullContent"></div>
          </div>

          <div class="mt-8 flex flex-wrap gap-2" :class="isEnglish ? 'justify-start' : 'justify-end'">
            <span
              v-for="tag in post.tags"
              :key="tag"
              class="bg-cyan-500/10 text-cyan-300 px-3 py-1 rounded-full text-xs font-mono border border-cyan-500/30"
            >
              #{{ tag }}
            </span>
          </div>
        </article>
      </div>
    </section>
  </CyberneticLayout>
</template>

<script setup>
import { computed } from 'vue'
import { Link } from '@inertiajs/vue3'
import CyberneticLayout from '@/Layouts/CyberneticLayout.vue'
import { useLocale } from '@/composables/useLocale'

const { t, isEnglish, dir } = useLocale()

const props = defineProps({
  slug: {
    type: String,
    required: true
  }
})

const blogPosts = {
  'vuejs-best-practices': {
    title: 'أفضل الممارسات في Vue.js',
    date: '2024-12-01',
    readTime: '8 دقائق',
    category: 'تطوير الويب',
    tags: ['Vue.js', 'أفضل الممارسات', 'JavaScript'],
    fullContent: `
      <p>في هذا المقال نستعرض أفضل ممارسات بناء مكونات Vue.js القابلة للصيانة مع مراعاة الأداء وقابلية الاختبار.</p>
      <h3>أهم النقاط</h3>
      <ul>
        <li>تقسيم المكونات حسب المسؤولية.</li>
        <li>استخدام Composition API في المنطق المشترك.</li>
        <li>تقليل الـ side effects غير الضرورية.</li>
      </ul>
    `
  },
  'responsive-design': {
    title: 'التصميم المتجاوب في 2024',
    date: '2024-11-28',
    readTime: '6 دقائق',
    category: 'تصميم',
    tags: ['Responsive', 'CSS', 'UI'],
    fullContent: `
      <p>التصميم المتجاوب الحديث يعتمد على Container Queries وFluid Typography للحصول على تجربة أفضل عبر مختلف الأجهزة.</p>
      <h3>ما الذي تغيّر؟</h3>
      <ul>
        <li>استخدام breakpoints بذكاء.</li>
        <li>تجنب القيم الثابتة قدر الإمكان.</li>
        <li>الاختبار على شاشات فعلية وليس المحاكاة فقط.</li>
      </ul>
    `
  }
}

const englishOverrides = {
  'vuejs-best-practices': {
    title: 'Best Practices in Vue.js',
    readTime: '8 min',
    category: 'Web Development',
    tags: ['Vue.js', 'Best Practices', 'JavaScript'],
    fullContent: `
      <p>This article covers practical patterns for writing maintainable Vue.js components with strong performance and readability.</p>
      <h3>Key Highlights</h3>
      <ul>
        <li>Split components by responsibility.</li>
        <li>Use Composition API for shared logic.</li>
        <li>Avoid unnecessary side effects.</li>
      </ul>
    `
  },
  'responsive-design': {
    title: 'Responsive Design in 2024',
    readTime: '6 min',
    category: 'Design',
    tags: ['Responsive', 'CSS', 'UI'],
    fullContent: `
      <p>Modern responsive design combines Container Queries, fluid typography, and practical breakpoints for better consistency across devices.</p>
      <h3>What changed?</h3>
      <ul>
        <li>Use breakpoints strategically.</li>
        <li>Avoid fixed values whenever possible.</li>
        <li>Test on real devices, not only simulators.</li>
      </ul>
    `
  }
}

const fallbackPost = computed(() => ({
  title: isEnglish.value ? 'Article not available right now' : 'المقال غير متوفر حالياً',
  date: '—',
  readTime: '—',
  category: isEnglish.value ? 'Blog' : 'المدونة',
  tags: ['blog'],
  fullContent: isEnglish.value
    ? '<p>The requested article is not available right now. Please return to the blog page to browse available posts.</p>'
    : '<p>المقال المطلوب غير موجود حالياً. يمكنك العودة إلى صفحة المدونة لعرض جميع المقالات المتاحة.</p>'
}))

// Improvement: compute resolved post from slug with a graceful fallback instead of crashing page rendering.
const post = computed(() => {
  const basePost = blogPosts[props.slug]
  if (!basePost) return fallbackPost.value
  if (!isEnglish.value) return basePost
  return {
    ...basePost,
    ...(englishOverrides[props.slug] || {})
  }
})
</script>
