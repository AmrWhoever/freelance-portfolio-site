<template>
  <CyberneticLayout>
    <!-- Blog Header -->
    <section class="pt-32 pb-10 px-6">
      <div class="max-w-6xl mx-auto text-center">
        <div
          class="inline-flex items-center px-4 py-1 mb-4 rounded-full border border-cyan-500/40 bg-black/40 text-xs font-mono text-cyan-300 gap-2"
        >
          <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span>> system.log :: blog initialized</span>
        </div>

        <h1
          class="text-5xl md:text-7xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 mb-4 font-mono tracking-tighter"
        >
          {{ t('pages.blogTitle') }}
        </h1>
        <p class="text-xl text-gray-400 mb-8 max-w-2xl mx-auto font-light">
          {{ t('pages.blogSubtitle') }}
        </p>

        <!-- Blog Stats -->
        <div
          class="flex flex-wrap justify-center gap-6 text-cyan-400 font-mono text-sm"
        >
          <div class="flex items-center space-x-2 space-x-reverse">
            <div class="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
            <span>{{ posts.length }} {{ blogUi.articleLabel }}</span>
          </div>
          <div class="flex items-center space-x-2 space-x-reverse">
            <div
              class="w-2 h-2 bg-green-400 rounded-full animate-pulse"
              style="animation-delay: .2s"
            ></div>
            <span>{{ blogUi.systemStatus }}</span>
          </div>
        </div>
      </div>
    </section>

    <!-- Toolbar: Search + Filters -->
    <section class="pb-6 px-6">
      <div class="max-w-6xl mx-auto">
        <div
          class="flex flex-col gap-4 md:flex-row md:items-center md:justify-between bg-black/40 border border-cyan-500/20 rounded-2xl px-4 py-4 backdrop-blur-md"
        >
          <!-- Search -->
          <div
            class="flex items-center gap-2 bg-gray-900/70 border border-cyan-500/30 rounded-xl px-3 py-2 flex-1 max-w-xl"
          >
            <span class="text-cyan-400 font-mono text-sm">{{ blogUi.searchLabel }}</span>
            <input
              v-model="searchQuery"
              type="text"
              :placeholder="blogUi.searchPlaceholder"
              class="bg-transparent border-none outline-none text-sm text-gray-200 placeholder:text-gray-500 flex-1"
              :class="isEnglish ? 'text-left' : 'text-right'"
            />
          </div>

          <!-- Category Filters -->
          <div class="flex flex-wrap justify-end gap-2">
            <button
              v-for="category in categories"
              :key="category"
              @click="activeCategory = category"
              :class="[
                'px-3 py-1.5 rounded-full text-xs font-mono transition-all duration-300',
                activeCategory === category
                  ? 'bg-cyan-500 text-black border border-cyan-300 shadow-md shadow-cyan-500/40'
                  : 'bg-black/40 text-gray-300 border border-cyan-500/20 hover:border-cyan-400 hover:text-cyan-200'
              ]"
            >
              {{ category }}
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- Blog Content -->
    <section class="py-10 px-6">
      <div class="max-w-6xl mx-auto">
        <!-- Featured Post -->
        <div v-if="featuredPost" class="mb-16 group">
          <div
            class="bg-black/50 backdrop-blur-md rounded-2xl overflow-hidden border border-cyan-500/30 hover:border-cyan-400/60 transition-all duration-500 transform hover:scale-[1.02] hover:-translate-y-1 cursor-pointer"
            @click="openBlogModal(featuredPost)"
          >
            <div class="grid lg:grid-cols-2 gap-0">
              <!-- Featured Image -->
              <div class="relative h-64 lg:h-full overflow-hidden order-2">
                <img
                  :src="featuredPost.image"
                  :alt="featuredPost.title"
                  class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
                />
                <div
                  class="absolute inset-0 bg-gradient-to-r from-cyan-500/25 to-blue-500/25 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                ></div>
                <div class="absolute top-4 right-4 flex gap-2">
                  <span
                    class="bg-cyan-500 text-cyan-900 px-3 py-1 rounded-full text-xs font-mono font-bold shadow-md"
                  >
                    {{ blogUi.featuredLabel }}
                  </span>
                  <span
                    class="bg-black/70 text-cyan-200 px-3 py-1 rounded-full text-xs font-mono border border-cyan-500/30"
                  >
                    {{ featuredPost.category }}
                  </span>
                </div>
              </div>

              <!-- Featured Content -->
              <div class="p-8 flex flex-col justify-center order-1">
                <div
                  class="flex items-center mb-4 text-xs font-mono text-gray-400"
                  :class="isEnglish ? 'justify-start gap-4' : 'justify-end space-x-4 space-x-reverse'"
                >
                  <span class="text-cyan-400">{{ featuredPost.date }}</span>
                  <span class="text-gray-500">•</span>
                  <span class="text-cyan-300">{{ featuredPost.readTime }}</span>
                </div>

                <h2
                  class="text-2xl lg:text-3xl font-bold text-cyan-300 mb-4 font-mono group-hover:text-cyan-200 transition-colors leading-snug"
                  :class="isEnglish ? 'text-left' : 'text-right'"
                >
                  {{ featuredPost.title }}
                </h2>

                <p
                  class="text-gray-300 mb-6 leading-relaxed text-sm md:text-base"
                  :class="isEnglish ? 'text-left' : 'text-right'"
                >
                  {{ featuredPost.excerpt }}
                </p>

                <!-- Tags -->
                <div class="flex flex-wrap gap-2 mb-6 justify-end">
                  <span
                    v-for="tag in featuredPost.tags"
                    :key="tag"
                    class="bg-cyan-500/10 text-cyan-300 px-3 py-1 rounded-full text-xs font-mono border border-cyan-500/30"
                  >
                    #{{ tag }}
                  </span>
                </div>

                <div
                  class="inline-flex items-center text-cyan-400 font-mono transition-colors group/btn justify-end text-sm"
                  :class="isEnglish ? 'gap-2' : 'space-x-2 space-x-reverse'"
                >
                  <span>> {{ blogUi.readFull }}</span>
                  <span
                    class="transition-transform"
                    :class="isEnglish ? 'group-hover/btn:translate-x-1' : 'group-hover/btn:-translate-x-1'"
                  >
                    {{ isEnglish ? '{' : '}' }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- No results state -->
        <div
          v-if="filteredPosts.length === 0"
          class="py-20 text-center text-gray-400 font-mono space-y-3"
        >
          <p>{{ blogUi.noResultsTitle }}</p>
          <p class="text-sm text-gray-500">
            {{ blogUi.noResultsSubtitle }}
          </p>
        </div>

        <!-- Blog Grid -->
        <div
          v-else
          class="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          <div
            v-for="post in regularPosts"
            :key="post.id"
            class="group relative bg-black/40 backdrop-blur-md rounded-xl overflow-hidden border border-cyan-500/20 hover:border-cyan-400/60 transition-all duration-500 transform hover:-translate-y-2 hover:shadow-xl hover:shadow-cyan-500/20 cursor-pointer"
            @click="openBlogModal(post)"
          >
            <!-- Post Image -->
            <div class="relative h-48 overflow-hidden">
              <img
                :src="post.image"
                :alt="post.title"
                class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700"
              />
              <div
                class="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              ></div>
              <div class="absolute top-4 left-4">
                <span
                  class="bg-blue-500/80 text-blue-100 px-2 py-1 rounded text-xs font-mono"
                >
                  {{ post.category }}
                </span>
              </div>
            </div>

            <!-- Post Content -->
            <div class="p-6">
              <div
                class="flex items-center justify-between mb-3 text-xs font-mono"
              >
                <span class="text-cyan-400">{{ post.date }}</span>
                <span class="text-gray-500">{{ post.readTime }}</span>
              </div>

              <h3
                class="text-lg font-bold text-cyan-300 mb-3 font-mono group-hover:text-cyan-200 transition-colors leading-tight"
                :class="isEnglish ? 'text-left' : 'text-right'"
              >
                {{ post.title }}
              </h3>

              <p
                class="text-gray-400 text-sm mb-4 leading-relaxed line-clamp-3"
                :class="isEnglish ? 'text-left' : 'text-right'"
              >
                {{ post.excerpt }}
              </p>

              <!-- Tags -->
              <div class="flex flex-wrap gap-1 mb-4 justify-end">
                <span
                  v-for="tag in post.tags.slice(0, 2)"
                  :key="tag"
                  class="bg-gray-800/80 text-gray-200 px-2 py-1 rounded text-xs font-mono"
                >
                  #{{ tag }}
                </span>
                <span
                  v-if="post.tags.length > 2"
                  class="text-gray-500 text-xs font-mono"
                >
                  +{{ post.tags.length - 2 }}
                </span>
              </div>

              <div
                class="inline-flex items-center text-cyan-400 font-mono text-sm transition-colors group/read justify-end"
                :class="isEnglish ? 'gap-1' : 'space-x-1 space-x-reverse'"
              >
                <span>> {{ blogUi.readMore }}</span>
                <span
                  class="transition-transform"
                  :class="isEnglish ? 'group-hover/read:translate-x-1' : 'group-hover/read:-translate-x-1'"
                >
                  {{ isEnglish ? '→' : '←' }}
                </span>
              </div>
            </div>

            <!-- Hover Glow Effect -->
            <div
              class="absolute inset-0 rounded-xl bg-cyan-500/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"
            ></div>
          </div>
        </div>

        <!-- Load More -->
        <div class="text-center mt-16">
          <button
            @click="loadMore"
            class="bg-gradient-to-r from-cyan-600 to-blue-700 text-cyan-100 px-8 py-3 rounded-lg border border-cyan-500/50 hover:border-cyan-300 transition-all duration-300 transform hover:scale-105 font-mono text-sm inline-flex items-center gap-2"
          >
            <span>> {{ blogUi.loadMore }}</span>
            <span class="text-lg">⟳</span>
          </button>
        </div>
      </div>
    </section>

    <!-- Blog Modal -->
    <transition name="modal">
      <div
        v-if="selectedBlog"
        class="fixed inset-0 z-50 flex items-center justify-center p-6 bg-black/80 backdrop-blur-md"
        @click.self="closeBlogModal"
      >
        <div
          class="relative max-w-4xl w-full max-h-[90vh] overflow-hidden bg-gradient-to-br from-gray-900 to-black rounded-3xl border border-cyan-500/30 shadow-2xl shadow-cyan-500/20"
        >
          <!-- Modal Header -->
          <div
            class="relative p-6 border-b border-cyan-500/30 bg-black/40 flex flex-col gap-4"
          >
            <div class="flex items-center justify-between gap-4">
              <h2
                class="text-2xl font-bold text-cyan-300 font-mono flex-1 mr-4 leading-snug"
                :class="isEnglish ? 'text-left' : 'text-right'"
              >
                {{ selectedBlog.title }}
              </h2>
              <button
                @click="closeBlogModal"
                class="flex-shrink-0 w-10 h-10 bg-cyan-500/20 hover:bg-cyan-500/30 border border-cyan-500/50 rounded-xl flex items-center justify-center transition-all duration-300 transform hover:scale-110 hover:rotate-90 group"
              >
                <span
                  class="text-cyan-300 group-hover:text-cyan-200 transition-colors"
                  >✕</span
                >
              </button>
            </div>
            <div
              class="flex items-center mt-1 text-xs font-mono"
              :class="isEnglish ? 'justify-start gap-4' : 'justify-end space-x-4 space-x-reverse'"
            >
              <span class="text-cyan-400">{{ selectedBlog.date }}</span>
              <span class="text-gray-500">•</span>
              <span class="text-cyan-300">{{ selectedBlog.readTime }}</span>
              <span class="text-gray-500">•</span>
              <span class="text-blue-400">{{ selectedBlog.category }}</span>
            </div>
          </div>

          <!-- Modal Content -->
          <div class="overflow-y-auto max-h-[calc(90vh-200px)]">
            <div class="p-8">
              <!-- Blog Image -->
              <div class="relative h-64 mb-8 rounded-2xl overflow-hidden">
                <img
                  :src="selectedBlog.image"
                  :alt="selectedBlog.title"
                  class="w-full h-full object-cover"
                />
                <div
                  class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent"
                ></div>
              </div>

              <!-- Blog Content -->
              <div
                class="prose prose-invert max-w-none"
                :class="isEnglish ? 'text-left' : 'text-right'"
                :dir="dir"
              >
                <div
                  v-html="selectedBlog.fullContent"
                  class="text-gray-300 leading-relaxed space-y-6"
                ></div>
              </div>

              <!-- Tags -->
              <div class="flex flex-wrap gap-2 mt-8 justify-end">
                <span
                  v-for="tag in selectedBlog.tags"
                  :key="tag"
                  class="bg-cyan-500/10 text-cyan-400 px-3 py-1 rounded-full text-sm font-mono border border-cyan-500/30 hover:bg-cyan-500/20 transition-all duration-300 cursor-pointer"
                >
                  #{{ tag }}
                </span>
              </div>
            </div>
          </div>

          <!-- Modal Footer -->
          <div
            class="p-6 border-t border-cyan-500/30 bg-black/40 flex items-center justify-between"
          >
            <div class="flex items-center space-x-4 space-x-reverse">
              <button
                @click="shareBlog"
                class="flex items-center space-x-2 space-x-reverse text-cyan-400 hover:text-cyan-300 transition-colors group text-sm font-mono"
              >
                <span>{{ blogUi.share }}</span>
                <span class="group-hover:scale-110 transition-transform"
                  >📤</span
                >
              </button>
            </div>
            <button
              @click="closeBlogModal"
              class="bg-gradient-to-r from-cyan-600 to-blue-700 text-cyan-100 px-6 py-2 rounded-lg border border-cyan-500/50 hover:border-cyan-300 transition-all duration-300 transform hover:scale-105 font-mono text-sm"
            >
              {{ blogUi.close }}
            </button>
          </div>

          <!-- Cybernetic Effects -->
          <div
            class="absolute top-4 left-4 w-3 h-3 bg-cyan-400 rounded-full animate-pulse shadow-lg shadow-cyan-400"
          ></div>
          <div
            class="absolute bottom-4 right-4 w-3 h-3 bg-blue-400 rounded-full animate-pulse shadow-lg shadow-blue-400"
            style="animation-delay: 0.5s"
          ></div>
        </div>
      </div>
    </transition>
  </CyberneticLayout>
</template>

<script setup>
import CyberneticLayout from '../Layouts/CyberneticLayout.vue'
import { ref, computed, onMounted, onUnmounted, watch } from 'vue'
import { useLocale } from '@/composables/useLocale'

const { t, isEnglish, dir } = useLocale()

const selectedBlog = ref(null)
const showModal = ref(false)
const searchQuery = ref('')
const activeCategory = ref('')

const posts = ref([
  {
    id: 1,
    slug: 'vuejs-best-practices',
    title: 'أفضل الممارسات في Vue.js',
    excerpt:
      'استكشاف أفضل الطرق والممارسات لكتابة كود نظيف وفعال باستخدام Vue.js',
    fullContent: `
      <h3 class="text-2xl font-bold text-cyan-300 mb-4">مقدمة في Vue.js</h3>
      <p class="mb-4">Vue.js هو إطار عمل تقدمي لبناء واجهات المستخدم. على عكس الأطر الأخرى الأحادية، تم تصميم Vue.js من الأسفل إلى الأعلى لتطوير تدريجي. تعتبر المكتبة الأساسية تركز فقط على طبقة العرض، ويسهل دمجها مع مكتبات أو مشاريع موجودة.</p>

      <h4 class="text-xl font-bold text-cyan-200 mb-3 mt-6">المزايا الرئيسية</h4>
      <ul class="list-disc pr-6 mb-4 space-y-2">
        <li>منحنى تعلم سهل ومتدرج</li>
        <li>أداء عالي وسريع</li>
        <li>مرونة في التطوير</li>
        <li>مجتمع نشط ودعم قوي</li>
      </ul>

      <h4 class="text-xl font-bold text-cyan-200 mb-3 mt-6">أفضل الممارسات</h4>
      <div class="bg-gray-800 rounded-xl p-4 mb-4 border border-cyan-500/20">
        <pre class="text-cyan-300 text-sm"><code>// مثال على كود نظيف
export default {
  name: 'UserProfile',
  props: {
    user: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      isLoading: false,
      userData: null
    }
  },
  computed: {
    fullName() {
      return \`\${this.user.firstName} \${this.user.lastName}\`
    }
  },
  methods: {
    async fetchUserData() {
      this.isLoading = true
      try {
        this.userData = await api.getUser(this.user.id)
      } catch (error) {
        console.error('Error:', error)
      } finally {
        this.isLoading = false
      }
    }
  }
}</code></pre>
      </div>

      <h4 class="text-xl font-bold text-cyan-200 mb-3 mt-6">نصائح للتطوير</h4>
      <p class="mb-4">استخدم Composition API للمشاريع الكبيرة، حافظ على المكونات صغيرة ومتخصصة، استخدم Vuex لإدارة الحالة، وطبق مبدأ Single Responsibility Principle.</p>
    `,
    image:
      'https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    date: '2024-12-01',
    readTime: '8 دقائق',
    category: 'تطوير الويب',
    tags: ['Vue.js', 'أفضل الممارسات', 'JavaScript', 'تطوير الواجهات'],
    featured: true
  },
  {
    id: 2,
    slug: 'responsive-design',
    title: 'التصميم المتجاوب في 2024',
    excerpt:
      'أحدث تقنيات وأساليب التصميم المتجاوب لمواكبة تطور الأجهزة المختلفة',
    fullContent: `
      <h3 class="text-2xl font-bold text-cyan-300 mb-4">ثورة التصميم المتجاوب</h3>
      <p class="mb-4">التصميم المتجاوب لم يعد رفاهية بل أصبح ضرورة في عالم يزداد فيه استخدام الأجهزة المحمولة. في 2024، نشهد تطورات كبيرة في هذا المجال.</p>

      <h4 class="text-xl font-bold text-cyan-200 mb-3 mt-6">أحدث التقنيات</h4>
      <ul class="list-disc pr-6 mb-4 space-y-2">
        <li>CSS Container Queries</li>
        <li>CSS Subgrid</li>
        <li>Viewport Units الجديدة</li>
        <li>تحسينات في Flexbox و Grid</li>
      </ul>

      <h4 class="text-xl font-bold text-cyan-200 mb-3 mt-6">أفضل الممارسات</h4>
      <div class="bg-gray-800 rounded-xl p-4 mb-4 border border-cyan-500/20">
        <pre class="text-cyan-300 text-sm"><code>/* مثال على CSS حديث */
.container {
  container-type: inline-size;
}

@container (min-width: 400px) {
  .card {
    grid-template-columns: 1fr 2fr;
  }
}

.responsive-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1rem;
}

.fluid-typography {
  font-size: clamp(1rem, 2.5vw, 2rem);
}</code></pre>
      </div>

      <h4 class="text-xl font-bold text-cyan-200 mb-3 mt-6">استراتيجيات التطبيق</h4>
      <p class="mb-4">ابدأ بتصميم Mobile First، استخدم نظام Grid مرن، طبق Fluid Typography، واختبر على أجهزة متعددة.</p>
    `,
    image:
      'https://images.unsplash.com/photo-1635070041078-e363dbe005cb?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    date: '2024-11-28',
    readTime: '6 دقائق',
    category: 'تصميم',
    tags: ['تصميم متجاوب', 'CSS', 'موبايل', 'تجربة المستخدم'],
    featured: false
  },
  {
    id: 3,
    slug: 'web-performance',
    title: 'تحسين أداء المواقع',
    excerpt:
      'استراتيجيات وأدوات فعالة لتحسين سرعة وأداء مواقع الويب',
    fullContent: `
      <h3 class="text-2xl font-bold text-cyan-300 mb-4">أهمية أداء المواقع</h3>
      <p class="mb-4">أداء الموقع يؤثر مباشرة على تجربة المستخدم، تحسين محركات البحث، ومعدلات التحويل. كل ثانية تأخير يمكن أن تكلفك عملاء محتملين.</p>

      <h4 class="text-xl font-bold text-cyan-200 mb-3 mt-6">استراتيجيات التحسين</h4>
      <ul class="list-disc pr-6 mb-4 space-y-2">
        <li>تحسين الصور والفيديو</li>
        <li>تقليل طلبات HTTP</li>
        <li>استخدام التخزين المؤقت</li>
        <li>تحسين JavaScript و CSS</li>
        <li>استخدام CDN</li>
      </ul>

      <h4 class="text-xl font-bold text-cyan-200 mb-3 mt-6">أدوات القياس</h4>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div class="bg-gray-800 rounded-lg p-4 border border-cyan-500/20">
          <h5 class="text-cyan-300 font-bold mb-2">Google PageSpeed</h5>
          <p class="text-sm text-gray-300">أداة مجانية لتحليل أداء المواقع وتقديم توصيات التحسين.</p>
        </div>
        <div class="bg-gray-800 rounded-lg p-4 border border-cyan-500/20">
          <h5 class="text-cyan-300 font-bold mb-2">GTmetrix</h5>
          <p class="text-sm text-gray-300">تحليل شامل للأداء مع تقارير مفصلة واقتراحات عملية.</p>
        </div>
      </div>

      <h4 class="text-xl font-bold text-cyan-200 mb-3 mt-6">نصائح فورية</h4>
      <p class="mb-4">استخدم lazy loading للصور، قلل من استخدام المكتبات الخارجية، طبق code splitting، واحرص على ضغط الملفات.</p>
    `,
    image:
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    date: '2024-11-25',
    readTime: '10 دقائق',
    category: 'أداء',
    tags: ['أداء', 'تحسين', 'سرعة', 'SEO'],
    featured: false
  },
  {
    id: 4,
    slug: 'tailwind-css',
    title: 'إتقان Tailwind CSS',
    excerpt:
      'كيفية الاستفادة القصوى من Tailwind CSS في مشاريعك التالية',
    fullContent: `
      <h3 class="text-2xl font-bold text-cyan-300 mb-4">ما هو Tailwind CSS؟</h3>
      <p class="mb-4">Tailwind CSS هو إطار عمل CSS من فئة Utility-First يسمح لك ببناء تصاميم مخصصة مباشرة في ملف HTML الخاص بك.</p>

      <h4 class="text-xl font-bold text-cyan-200 mb-3 mt-6">المزايا الرئيسية</h4>
      <ul class="list-disc pr-6 mb-4 space-y-2">
        <li>لا حاجة لكتابة CSS مخصص</li>
        <li>تصاميم متسقة وسريعة</li>
        <li>مرونة عالية في التصميم</li>
        <li>حجم ملف صغير بعد البناء</li>
      </ul>

      <h4 class="text-xl font-bold text-cyan-200 mb-3 mt-6">أمثلة عملية</h4>
      <div class="bg-gray-800 rounded-xl p-4 mb-4 border border-cyan-500/20">
        <pre class="text-cyan-300 text-sm"><code>&lt;!-- زر باستخدام Tailwind --&gt;
&lt;button class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded transition-colors duration-200"&gt;
  انقر هنا
&lt;/button&gt;

&lt;!-- بطاقة منتج --&gt;
&lt;div class="max-w-sm rounded-lg overflow-hidden shadow-lg bg-white"&gt;
  &lt;img class="w-full" src="/img/card-top.jpg" alt="Product"&gt;
  &lt;div class="px-6 py-4"&gt;
    &lt;div class="font-bold text-xl mb-2"&gt;اسم المنتج&lt;/div&gt;
    &lt;p class="text-gray-700 text-base"&gt;وصف المنتج...&lt;/p&gt;
  &lt;/div&gt;
&lt;/div&gt;</code></pre>
      </div>

      <h4 class="text-xl font-bold text-cyan-200 mb-3 mt-6">نصائح متقدمة</h4>
      <p class="mb-4">استخدم @apply لإنشاء مكونات مخصصة، طبق التخصيص عبر tailwind.config.js، استخدم Plugins للإضافات، واحرص على PurgeCSS للإنتاج.</p>
    `,
    image:
      'https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80',
    date: '2024-11-20',
    readTime: '7 دقائق',
    category: 'CSS',
    tags: ['Tailwind', 'CSS', 'إطار عمل', 'تصميم'],
    featured: false
  }
])

const englishOverrides = {
  'vuejs-best-practices': {
    title: 'Best Practices in Vue.js',
    excerpt: 'A practical guide to writing clean and scalable Vue.js code.',
    fullContent: `
      <h3 class="text-2xl font-bold text-cyan-300 mb-4">Introduction to Vue.js</h3>
      <p class="mb-4">Vue.js is a progressive framework for building user interfaces with great developer experience and flexible architecture.</p>
      <h4 class="text-xl font-bold text-cyan-200 mb-3 mt-6">Core Benefits</h4>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Easy learning curve</li>
        <li>Excellent rendering performance</li>
        <li>High flexibility and ecosystem support</li>
        <li>Strong community and documentation</li>
      </ul>
      <h4 class="text-xl font-bold text-cyan-200 mb-3 mt-6">Development Tips</h4>
      <p class="mb-4">Use Composition API in shared logic, keep components focused, and optimize reactive data flow for maintainability.</p>
    `,
    readTime: '8 min',
    category: 'Web Development',
    tags: ['Vue.js', 'Best Practices', 'JavaScript', 'Frontend']
  },
  'responsive-design': {
    title: 'Responsive Design in 2024',
    excerpt: 'Modern responsive techniques to support all current device sizes.',
    fullContent: `
      <h3 class="text-2xl font-bold text-cyan-300 mb-4">Responsive Design Evolution</h3>
      <p class="mb-4">Responsive design is no longer optional. It is required for accessibility, usability, and better conversion outcomes.</p>
      <h4 class="text-xl font-bold text-cyan-200 mb-3 mt-6">New Techniques</h4>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>CSS Container Queries</li>
        <li>Fluid typography with clamp()</li>
        <li>Modern Grid and Flex patterns</li>
      </ul>
      <h4 class="text-xl font-bold text-cyan-200 mb-3 mt-6">Practical Advice</h4>
      <p class="mb-4">Start with mobile-first strategy, avoid fixed dimensions, and test on real devices.</p>
    `,
    readTime: '6 min',
    category: 'Design',
    tags: ['Responsive', 'CSS', 'Mobile', 'UX']
  },
  'web-performance': {
    title: 'Website Performance Optimization',
    excerpt: 'Effective strategies and tools to improve speed and user experience.',
    fullContent: `
      <h3 class="text-2xl font-bold text-cyan-300 mb-4">Why Performance Matters</h3>
      <p class="mb-4">Performance directly impacts user engagement, SEO outcomes, and conversion rates.</p>
      <h4 class="text-xl font-bold text-cyan-200 mb-3 mt-6">Optimization Strategies</h4>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Optimize media assets</li>
        <li>Reduce HTTP requests</li>
        <li>Enable caching and compression</li>
        <li>Use code splitting and lazy loading</li>
      </ul>
    `,
    readTime: '10 min',
    category: 'Performance',
    tags: ['Performance', 'Optimization', 'Speed', 'SEO']
  },
  'tailwind-css': {
    title: 'Mastering Tailwind CSS',
    excerpt: 'How to get the most from Tailwind CSS in production projects.',
    fullContent: `
      <h3 class="text-2xl font-bold text-cyan-300 mb-4">What is Tailwind CSS?</h3>
      <p class="mb-4">Tailwind is a utility-first CSS framework that helps teams ship consistent interfaces faster.</p>
      <h4 class="text-xl font-bold text-cyan-200 mb-3 mt-6">Key Advantages</h4>
      <ul class="list-disc pl-6 mb-4 space-y-2">
        <li>Rapid UI implementation</li>
        <li>Design consistency</li>
        <li>Minimal final bundle with purge</li>
      </ul>
    `,
    readTime: '7 min',
    category: 'CSS',
    tags: ['Tailwind', 'CSS', 'Framework', 'Design']
  }
}

const blogUi = computed(() => {
  if (isEnglish.value) {
    return {
      all: 'All',
      articleLabel: 'Articles',
      systemStatus: 'System operating at optimal status',
      searchLabel: 'Search:',
      searchPlaceholder: 'Search article titles and topics...',
      featuredLabel: 'Featured',
      readFull: 'Read full article',
      noResultsTitle: 'No articles match your search right now.',
      noResultsSubtitle: 'Try removing filters or changing your keyword.',
      readMore: 'Read more',
      loadMore: 'Load more',
      share: 'Share',
      close: 'Close',
      copiedMsg: 'Article link copied to clipboard!',
      copyFailMsg: 'Copy failed automatically. Please copy the link manually.',
      shareManual: 'Share this link manually:\n'
    }
  }

  return {
    all: 'الكل',
    articleLabel: 'مقالة',
    systemStatus: 'النظام يعمل بأفضل حال',
    searchLabel: 'بحث:',
    searchPlaceholder: 'ابحث في عناوين ومواضيع المقالات...',
    featuredLabel: 'مميز',
    readFull: 'اقرأ المقال كاملاً',
    noResultsTitle: 'لا توجد مقالات مطابقة لبحثك حالياً.',
    noResultsSubtitle: 'جرّب إزالة الفلتر أو تغيير كلمة البحث.',
    readMore: 'اقرأ المزيد',
    loadMore: 'تحميل المزيد',
    share: 'مشاركة',
    close: 'إغلاق',
    copiedMsg: 'تم نسخ رابط المقال إلى الحافظة!',
    copyFailMsg: 'تعذر النسخ تلقائياً، يمكنك نسخ الرابط يدوياً.',
    shareManual: 'شارك الرابط يدويًا:\n'
  }
})

const localizedPosts = computed(() => {
  if (!isEnglish.value) return posts.value
  return posts.value.map((post) => ({
    ...post,
    ...(englishOverrides[post.slug] || {})
  }))
})

const categories = computed(() => {
  const base = [blogUi.value.all]
  const unique = new Set(localizedPosts.value.map((p) => p.category))
  return base.concat([...unique])
})

watch(categories, (newCategories) => {
  if (!newCategories.includes(activeCategory.value)) {
    activeCategory.value = newCategories[0] || ''
  }
}, { immediate: true })

// Filtered posts based on search + category
const filteredPosts = computed(() => {
  const query = searchQuery.value.trim().toLowerCase()

  return localizedPosts.value.filter((post) => {
    const matchCategory =
      activeCategory.value === blogUi.value.all ||
      post.category === activeCategory.value

    if (!matchCategory) return false

    if (!query) return true

    const haystack = (
      post.title +
      ' ' +
      post.excerpt +
      ' ' +
      post.tags.join(' ')
    ).toLowerCase()

    return haystack.includes(query)
  })
})

const featuredPost = computed(() => {
  // Featured within the filtered list
  const candidate = filteredPosts.value.find((p) => p.featured)
  return candidate || filteredPosts.value[0] || null
})

const regularPosts = computed(() => {
  if (!featuredPost.value) return filteredPosts.value
  return filteredPosts.value.filter((p) => p.id !== featuredPost.value.id)
})

const openBlogModal = (blog) => {
  selectedBlog.value = blog
  showModal.value = true
  if (typeof document !== 'undefined') {
    document.body.style.overflow = 'hidden'
  }
}

const closeBlogModal = () => {
  showModal.value = false
  if (typeof document !== 'undefined') {
    setTimeout(() => {
      selectedBlog.value = null
      document.body.style.overflow = 'auto'
    }, 200)
  } else {
    selectedBlog.value = null
  }
}

const shareBlog = () => {
  if (!selectedBlog.value) return

  const url = `${window.location.origin}/blog/${selectedBlog.value.slug}`

  if (navigator.share) {
    navigator
      .share({
        title: selectedBlog.value.title,
        text: selectedBlog.value.excerpt,
        url
      })
      .catch(() => {
        // user cancelled share, ignore
      })
  } else if (navigator.clipboard && window.isSecureContext) {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert(blogUi.value.copiedMsg)
      })
      .catch(() => {
        alert(blogUi.value.copyFailMsg)
      })
  } else {
    alert(blogUi.value.shareManual + url)
  }
}

const loadMore = () => {
  // Placeholder – later can hook to backend / pagination
  console.log(isEnglish.value ? 'Loading more articles...' : 'جاري تحميل المزيد من المقالات...')
}

// Close modal on ESC key
const handleKeydown = (event) => {
  if (event.key === 'Escape' && selectedBlog.value) {
    closeBlogModal()
  }
}

onMounted(() => {
  if (typeof window !== 'undefined') {
    window.addEventListener('keydown', handleKeydown)
  }
})

onUnmounted(() => {
  if (typeof window !== 'undefined') {
    window.removeEventListener('keydown', handleKeydown)
  }
})
</script>

<style scoped>
/* Custom scrollbar for modal content only */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: rgba(15, 23, 42, 0.9);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb {
  background: rgba(34, 211, 238, 0.4);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: rgba(34, 211, 238, 0.7);
}

/* Modal transitions (used by <transition name="modal">) */
.modal-enter-active,
.modal-leave-active {
  transition: all 0.25s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
  transform: scale(0.95);
}

/* Clamp excerpt lines */
.line-clamp-3 {
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Respect reduced motion */
@media (prefers-reduced-motion: reduce) {
  .transition-all,
  .transition-colors,
  .transition-transform {
    transition: none !important;
  }

  .transform,
  .hover\\:scale-105,
  .hover\\:scale-110,
  .hover\\:-translate-y-1,
  .hover\\:-translate-y-2 {
    transform: none !important;
  }

  .animate-pulse {
    animation: none !important;
  }
}
</style>
