<template>
  <div :dir="dir" :class="dir === 'ltr' ? 'ltr' : 'rtl'">
    <!-- شاشة الإقلاع -->
    <div
      v-if="!isBooted"
      class="fixed inset-0 bg-gray-900 z-50 flex items-center justify-center"
    >
      <div class="text-center font-mono">
        <!-- الشعار -->
        <div class="mb-8 fade-in-up">
          <div
            class="w-20 h-20 bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600 rounded-xl flex items-center justify-center mx-auto border-2 border-cyan-400/60 mb-4 relative overflow-hidden boot-logo"
          >
            <div class="w-3 h-3 bg-cyan-300 rounded-full animate-pulse"></div>
            <div class="boot-orbit"></div>
          </div>
          <!-- Improvement: fix Arabic spelling in boot screen brand to "عمرو تك". -->
          <h1 class="text-2xl text-cyan-300 font-bold tracking-widest">
            {{ homeContent.brandName }}
          </h1>
        </div>

        <!-- سطور الإقلاع -->
        <div
          class="text-green-400 text-lg space-y-2 max-w-md mx-auto boot-terminal"
          :class="isEnglish ? 'text-left' : 'text-right'"
        >
          <div
            v-for="(line, index) in bootSequence"
            :key="index"
            class="terminal-line"
            :class="{ active: index === currentBootLine }"
          >
            <span class="text-cyan-400 mr-2">></span>
            {{ line.text }}
            <span v-if="index === currentBootLine" class="blinking-cursor">_</span>
          </div>
        </div>

        <!-- البار -->
        <div class="mt-8 max-w-xs mx-auto">
          <div class="w-full bg-gray-800 rounded-full h-2 overflow-hidden">
            <div
              class="bg-gradient-to-r from-green-400 to-cyan-400 h-2 rounded-full transition-all duration-300 progress-bar"
              :style="{ width: bootProgress + '%' }"
            ></div>
          </div>
          <p class="text-gray-400 text-sm mt-2">
            {{ t('home.loading') }} {{ Math.round(bootProgress) }}%
          </p>
        </div>
      </div>
    </div>

    <CyberneticLayout v-if="isBooted">
      <!-- الهيرو -->
      <section
        @mousemove="handleHeroMouseMove"
        @mouseleave="resetHeroMouse"
        class="section-shell min-h-screen flex items-center justify-center px-4 sm:px-6 pt-6 pb-8 bg-gradient-to-br from-gray-900/85 via-gray-900/70 to-gray-900/85"
      >
        <div class="max-w-6xl mx-auto text-center">
          <!-- عنوان هولوجرافي -->
          <div class="relative mb-8 hero-shell" :style="heroShellStyle">
            <div
              class="absolute -inset-3 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-500 rounded-2xl blur-xl opacity-20 animate-pulse"
            ></div>
            <h1
              class="text-5xl sm:text-7xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-purple-400 mb-4 font-mono tracking-tighter relative z-10 hero-title"
            >
              {{ homeContent.brandName }}
            </h1>
            <div
              class="text-cyan-400 font-mono text-lg sm:text-xl tracking-widest mb-4 relative z-10 hero-subtitle"
            >
              <span class="typing-animation">
                {{ t('home.readyLine') }}
              </span>
            </div>

            <!-- حالة الأونلاين -->
            <div
              class="absolute -top-3 left-4 bg-emerald-500/10 border border-emerald-400/60 text-emerald-300 text-xs font-mono px-3 py-1 rounded-full flex items-center gap-1 status-pill"
              :style="statusPillStyle"
            >
              <span class="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              {{ t('common.online') }}
            </div>
          </div>

          <p
            class="text-lg sm:text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed fade-in-up"
          >
            {{ t('home.intro') }}
          </p>

          <!-- أزرار الأوامر -->
          <div
            class="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12 fade-in-up delay-1"
          >
            <button
              @click="startProject"
              @mousemove="(event) => handleCtaMouseMove(event, 'primary')"
              @mouseleave="() => resetCtaMouse('primary')"
              :style="getCtaInteractiveStyle('primary')"
              class="cyber-button cyber-button-primary group"
            >
              <span
                class="relative z-10 flex items-center space-x-3 space-x-reverse"
              >
                <span class="text-shadow-glow">{{ t('common.startProject') }}</span>
                <span
                  class="group-hover:translate-x-1 transition-transform duration-300"
                >
                  <Icon name="bolt" variant="solid" />
                </span>
              </span>
              <span class="cyber-button-glow"></span>
            </button>

            <Link
              href="/projects"
              @mousemove="(event) => handleCtaMouseMove(event, 'secondary')"
              @mouseleave="() => resetCtaMouse('secondary')"
              :style="getCtaInteractiveStyle('secondary')"
              class="cyber-button cyber-button-secondary group"
            >
              <span
                class="relative z-10 flex items-center space-x-3 space-x-reverse"
              >
                <span class="text-shadow-glow">{{ t('nav.projects') }}</span>
                <span
                  class="group-hover:rotate-180 transition-transform duration-300"
                >
                  <Icon name="brain" variant="solid" />
                </span>
              </span>
              <span class="cyber-button-glow secondary"></span>
            </Link>
          </div>
        </div>
      </section>

      <!-- لوحة التحكم -->
      <section
        class="section-shell py-16 px-4 sm:px-6 bg-gradient-to-b from-gray-900/35 to-transparent"
      >
        <div class="max-w-6xl mx-auto">
          <div class="text-center mb-12">
            <h2
              class="text-3xl sm:text-4xl font-bold text-cyan-300 mb-4 font-mono fade-in-up"
            >
              {{ t('home.dashboard') }}
            </h2>
            <p class="text-gray-400 max-w-2xl mx-auto fade-in-up delay-1">
              {{ t('home.dashboardSub') }}
            </p>
          </div>

          <!-- التابات -->
          <div class="flex justify-center mb-8">
            <div
              class="bg-gray-800/60 backdrop-blur-md rounded-xl p-1 border border-cyan-500/30 tab-shell"
            >
              <button
                @click="activeTab = 'performance'"
                :class="[
                  'px-4 py-2 rounded-lg font-mono text-sm transition-all duration-300',
                  activeTab === 'performance'
                    ? 'cyber-tab-active'
                    : 'text-gray-400 hover:text-cyan-300'
                ]"
              >
                {{ homeContent.performanceTab }}
              </button>
              <button
                @click="activeTab = 'features'"
                :class="[
                  'px-4 py-2 rounded-lg font-mono text-sm transition-all duration-300',
                  activeTab === 'features'
                    ? 'cyber-tab-active'
                    : 'text-gray-400 hover:text-cyan-300'
                ]"
              >
                {{ homeContent.featuresTab }}
              </button>
            </div>
          </div>

          <!-- محتوى اللوحة -->
          <div class="cyber-panel relative overflow-hidden">
            <div class="scan-line"></div>

            <!-- تاب الأداء -->
            <div
              v-if="activeTab === 'performance'"
              class="grid grid-cols-1 lg:grid-cols-2 gap-6 p-4"
            >
              <div class="space-y-4">
                <h3
                  class="text-xl font-bold text-cyan-300 mb-4 font-mono section-subtitle"
                >
                  {{ homeContent.performanceStats }}
                </h3>
                <div
                  v-for="metric in performanceMetrics"
                  :key="metric.label"
                  class="cyber-metric-card group"
                >
                  <div class="flex items-center justify-between">
                    <div>
                      <div
                        class="text-2xl font-bold text-cyan-400 font-mono metric-value"
                      >
                        {{ metric.value }}
                      </div>
                      <div
                        class="text-gray-300 text-sm font-mono mt-1 metric-label"
                      >
                        {{ metric.label }}
                      </div>
                    </div>
                    <div
                      class="text-cyan-500 text-xs font-mono px-2 py-1 bg-cyan-400/10 rounded-full"
                    >
                      {{ metric.status }}
                    </div>
                  </div>
                  <div class="w-full bg-gray-700 rounded-full h-1.5 mt-2">
                    <div
                      class="bg-gradient-to-r from-cyan-400 to-blue-500 h-1.5 rounded-full transition-all duration-1000 metric-bar"
                      :style="{ width: metric.progress }"
                    ></div>
                  </div>
                </div>
              </div>

              <!-- النشاط -->
              <div>
                <h3
                  class="text-xl font-bold text-cyan-300 mb-4 font-mono section-subtitle"
                >
                  {{ homeContent.liveActivity }}
                </h3>
                <div class="cyber-terminal">
                  <div
                    v-for="log in activityLogs"
                    :key="log.id"
                    class="terminal-log-line"
                  >
                    <span class="text-cyan-400 mr-2">></span>
                    <span
                      :class="
                        log.type === 'success'
                          ? 'text-green-400'
                          : 'text-cyan-300'
                      "
                    >
                      {{ log.message }}
                    </span>
                    <span class="text-gray-500 text-xs mr-2">
                      {{ log.time }}
                    </span>
                  </div>
                  <div class="blinking-cursor mt-2 text-cyan-400">_</div>
                </div>
              </div>
            </div>

            <!-- تاب الميزات -->
            <div
              v-else
              class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4"
            >
              <div
                v-for="module in systemModules"
                :key="module.title"
                class="cyber-card group feature-card"
              >
                <div
                  class="text-2xl mb-3 text-cyan-400 group-hover:scale-110 transition-transform duration-300"
                >
                  <Icon :name="module.icon" :variant="module.variant" />
                </div>
                <h3
                  class="text-lg font-bold text-cyan-300 mb-2 font-mono feature-title"
                >
                  {{ module.title }}
                </h3>
                <p class="text-gray-400 text-sm leading-relaxed mb-3">
                  {{ module.description }}
                </p>

                <div
                  class="flex items-center justify-between text-cyan-400 font-mono text-xs"
                >
                  <span>{{ homeContent.efficiency }}</span>
                  <span>{{ module.efficiency }}</span>
                </div>
                <div class="w-full bg-gray-700 rounded-full h-1.5 mt-2">
                  <div
                    class="bg-gradient-to-r from-cyan-400 to-blue-500 h-1.5 rounded-full transition-all duration-1000 feature-bar"
                    :style="{ width: module.efficiency }"
                  ></div>
                </div>

                <div
                  class="absolute top-3 left-3 w-2 h-2 bg-cyan-400 rounded-full animate-pulse"
                ></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- التقنيات -->
      <section class="section-shell py-16 px-4 sm:px-6 bg-gray-900/25">
        <div class="max-w-5xl mx-auto">
          <div class="text-center mb-12">
            <h2
              class="text-3xl sm:text-4xl font-bold text-cyan-300 mb-4 font-mono fade-in-up"
            >
              {{ homeContent.techTitle }}
            </h2>
            <p class="text-gray-400 max-w-2xl mx-auto fade-in-up delay-1">
              {{ homeContent.techSubtitle }}
            </p>
          </div>

          <div class="grid grid-cols-3 md:grid-cols-6 gap-3">
            <div
              v-for="tech in techStack"
              :key="tech.name"
              class="tech-card group"
            >
              <div class="tech-icon">
                <div class="mb-2 float-icon">
                  <Icon
                    :name="tech.icon"
                    :variant="tech.variant"
                    wrapperClass="text-cyan-300"
                  />
                </div>
                <p class="text-cyan-300 text-xs font-mono">
                  {{ tech.name }}
                </p>
              </div>
              <div class="scan-animation"></div>
            </div>
          </div>
        </div>
      </section>

      <!-- خريطة الوحدات -->
      <section
        class="section-shell py-16 px-4 sm:px-6 bg-gradient-to-b from-gray-900/35 to-gray-900/15"
      >
        <div class="max-w-4xl mx-auto">
          <div class="text-center mb-12">
            <h2
              class="text-3xl sm:text-4xl font-bold text-cyan-300 mb-4 font-mono fade-in-up"
            >
              {{ homeContent.coreTitle }}
            </h2>
          <p class="text-gray-400 max-w-2xl mx-auto fade-in-up delay-1">
              {{ homeContent.coreSubtitle }}
            </p>
          </div>

          <div class="relative w-full h-80 sm:h-96 modules-shell">
            <!-- نواة الذكاء الاصطناعي -->
            <div
              class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
            >
              <div
                class="core-module central group"
                @mouseenter="hoveredModule = 'ai'"
                @mouseleave="hoveredModule = null"
              >
                <Icon name="brain" />
                <span class="text-cyan-300 font-mono text-xs mt-1">
                  {{ homeContent.aiCore }}
                </span>
              </div>
            </div>

            <!-- الوحدات المحيطة -->
            <div
              v-for="module in coreModules"
              :key="module.key"
              class="absolute core-module group"
              :class="module.position"
              @mouseenter="hoveredModule = module.key"
              @mouseleave="hoveredModule = null"
            >
              <Icon :name="module.icon" :variant="module.variant" />
              <span class="text-cyan-300 font-mono text-xs mt-1">
                {{ module.label }}
              </span>
            </div>

            <!-- خطوط الربط -->
            <svg class="absolute inset-0 w-full h-full pointer-events-none">
              <line
                v-for="(line, index) in connectionLines"
                :key="index"
                :x1="line.x1"
                :y1="line.y1"
                :x2="line.x2"
                :y2="line.y2"
                class="connection-line"
              />
            </svg>
          </div>

          <div v-if="hoveredModule" class="text-center mt-6">
            <div class="cyber-tooltip inline-block">
              <h4 class="text-cyan-300 font-mono font-bold mb-1 tooltip-title">
                {{ getModuleInfo(hoveredModule).title }}
              </h4>
              <p class="text-gray-300 text-sm tooltip-body">
                {{ getModuleInfo(hoveredModule).description }}
              </p>
            </div>
          </div>
        </div>
      </section>

      <!-- مشروع مميز -->
      <section class="section-shell py-16 px-4 sm:px-6 bg-gray-900/25">
        <div class="max-w-5xl mx-auto">
          <div class="text-center mb-12">
            <h2
              class="text-3xl sm:text-4xl font-bold text-cyan-300 mb-4 font-mono fade-in-up"
            >
              {{ homeContent.featuredProjectsTitle }}
            </h2>
            <p class="text-gray-400 max-w-2xl mx-auto fade-in-up delay-1">
              {{ homeContent.featuredProjectsSubtitle }}
            </p>
          </div>

          <div class="cyber-panel">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 items-center p-4">
              <!-- المعاينة -->
              <div class="project-preview group">
                <div class="project-image">
                  <div
                    class="project-frame w-full h-64 sm:h-80 lg:h-96 bg-gray-800 rounded-xl overflow-hidden relative border border-cyan-500/20"
                  >
                    <img
                      src="/storage/images/image.png"
                      :alt="isEnglish ? 'Featured project image' : 'صورة المشروع المميز'"
                      class="w-full h-full object-cover"
                      loading="lazy"
                    />

                    <div class="project-frame-glow"></div>

                    <div
                      class="absolute inset-0 bg-black/30 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                    >
                      <span class="text-white text-lg font-mono">
                        {{ homeContent.livePreview }}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- التفاصيل -->
              <div class="fade-in-up lg:delay-1">
                <h3
                  class="text-2xl font-bold text-cyan-300 mb-3 font-mono project-title"
                >
                  {{ homeContent.featuredProjectName }}
                </h3>
                <p
                  class="text-gray-300 mb-4 leading-relaxed text-sm project-body"
                >
                  {{ homeContent.featuredProjectDescription }}
                </p>
                <div class="flex flex-wrap gap-2 mb-4">
                  <span
                    class="px-2 py-1 bg-cyan-400/10 text-cyan-300 rounded text-xs font-mono"
                    >Vue.js</span
                  >
                  <span
                    class="px-2 py-1 bg-blue-400/10 text-blue-300 rounded text-xs font-mono"
                    >Laravel</span
                  >
                  <span
                    class="px-2 py-1 bg-green-400/10 text-green-300 rounded text-xs font-mono"
                    >E-commerce</span
                  >
                  <span
                    class="px-2 py-1 bg-purple-400/10 text-purple-300 rounded text-xs font-mono"
                    >Payment Gateway</span
                  >
                </div>
                <a
                  href="https://sakkbah.sa/"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="cyber-button cyber-button-primary text-sm inline-flex items-center gap-2"
                >
                  <span>{{ homeContent.visitLiveSite }}</span>
                  <Icon name="arrow-right" />
                  <span class="cyber-button-glow"></span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- آراء العملاء -->
      <section
        class="section-shell py-16 px-4 sm:px-6 bg-gradient-to-b from-gray-900/30 to-gray-900/10"
      >
        <div class="max-w-5xl mx-auto">
          <div class="text-center mb-12">
            <h2
              class="text-3xl sm:text-4xl font-bold text-cyan-300 mb-4 font-mono fade-in-up"
            >
              {{ homeContent.testimonialsTitle }}
            </h2>
            <p class="text-gray-400 max-w-2xl mx-auto fade-in-up delay-1">
              {{ homeContent.testimonialsSubtitle }}
            </p>
          </div>

          <div
            class="flex gap-4 overflow-x-auto snap-x py-6 px-2 -mx-2 testimonial-strip"
          >
            <div
              v-for="(testimonial, i) in testimonials"
              :key="testimonial.id"
              class="snap-center cyber-card testimonial-card flex-shrink-0 w-72"
              :style="{ animationDelay: i * 0.4 + 's' }"
            >
              <div class="text-cyan-400 text-2xl mb-3">
                <i class="fa-solid fa-quote-right"></i>
              </div>
              <p
                class="text-gray-300 mb-4 leading-relaxed text-sm flex-1 testimonial-text"
              >
                {{ testimonial.text }}
              </p>
              <div class="border-t border-cyan-500/20 pt-3">
                <p
                  class="text-cyan-300 font-semibold text-sm testimonial-author"
                >
                  {{ testimonial.author }}
                </p>
                <p class="text-gray-500 text-xs">
                  {{ testimonial.position }}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- التيرمنال -->
      <section class="section-shell py-16 px-4 sm:px-6 bg-gray-900/20">
        <div class="max-w-2xl mx-auto">
          <div class="text-center mb-12">
            <h2
              class="text-3xl sm:text-4xl font-bold text-cyan-300 mb-4 font-mono fade-in-up"
            >
              {{ homeContent.terminalTitle }}
            </h2>
            <p class="text-gray-400 fade-in-up delay-1">
              {{ homeContent.terminalSubtitle }}
            </p>
          </div>

          <div class="cyber-terminal-large">
            <div class="terminal-header">
              <div class="flex space-x-2 space-x-reverse">
                <div class="w-2 h-2 bg-red-400 rounded-full"></div>
                <div class="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <div class="w-2 h-2 bg-green-400 rounded-full"></div>
              </div>
              <span class="text-cyan-300 font-mono text-xs ltr">
                {{ homeContent.terminalHost }}
              </span>
            </div>

            <div class="terminal-body p-4">
              <p class="text-green-400 font-mono mb-3 text-sm">
                > {{ homeContent.commandPrompt }}:
              </p>

              <div class="command-input-group">
                <span class="text-cyan-400 font-mono">$</span>
                <input
                  v-model="command"
                  @keyup.enter="executeCommand"
                  :placeholder="homeContent.commandPlaceholder"
                  class="command-input text-sm"
                />
              </div>

              <div v-if="commandOutput" class="command-output mt-3 p-3">
                <p class="text-cyan-300 font-mono text-sm ltr">
                  {{ commandOutput }}
                </p>
              </div>

              <div class="available-commands mt-4">
                <p class="text-gray-400 font-mono text-xs mb-2">
                  {{ homeContent.availableCommands }}:
                </p>
                <div class="flex flex-wrap gap-1">
                  <span
                    v-for="cmd in availableCommands"
                    :key="cmd"
                    class="px-2 py-1 bg-cyan-400/10 text-cyan-300 rounded text-xs font-mono cursor-pointer hover:bg-cyan-400/20 transition-colors"
                    @click="command = cmd; executeCommand()"
                  >
                    {{ cmd }}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </CyberneticLayout>
  </div>
</template>

<script setup>
import { Link } from '@inertiajs/vue3'
import { ref, computed, watch, onMounted, onUnmounted } from 'vue'
import CyberneticLayout from '@/Layouts/CyberneticLayout.vue'
import Icon from '@/Components/ui/Icon.vue'
import { useLocale } from '@/composables/useLocale'

const { dir, t, isEnglish } = useLocale()

const homeContent = computed(() => {
  if (isEnglish.value) {
    return {
      brandName: 'Amro Tech',
      performanceTab: 'Performance',
      featuresTab: 'Features',
      performanceStats: 'Performance Stats',
      liveActivity: 'Live Activity',
      efficiency: 'Efficiency',
      techTitle: 'Technologies Used',
      techSubtitle: 'Modern tools and technologies for quality and performance',
      coreTitle: 'Core System',
      coreSubtitle: 'An integrated architecture of connected modules for the best output',
      aiCore: 'AI Core',
      featuredProjectsTitle: 'Featured Projects',
      featuredProjectsSubtitle: 'Selected work that reflects quality and execution',
      livePreview: 'Live Preview',
      featuredProjectName: 'E-commerce Platform - Sakkbah',
      featuredProjectDescription:
        'A complete e-commerce platform with a modern interface, smooth browsing, and secure checkout tailored for the Saudi market.',
      visitLiveSite: 'Visit website',
      testimonialsTitle: 'Client Testimonials',
      testimonialsSubtitle: 'Client trust is our strongest proof',
      terminalTitle: 'Contact Terminal',
      terminalSubtitle: 'Enter a command to connect with the system',
      terminalHost: 'terminal@amrotech:~',
      commandPrompt: 'Enter command to connect',
      commandPlaceholder: 'Type help to list available commands',
      availableCommands: 'Available commands',
    }
  }

  return {
    brandName: 'عمرو تك',
    performanceTab: 'الأداء',
    featuresTab: 'الميزات',
    performanceStats: 'إحصائيات الأداء',
    liveActivity: 'النشاط المباشر',
    efficiency: 'الكفاءة',
    techTitle: 'التقنيات المستخدمة',
    techSubtitle: 'أحدث الأدوات والتقنيات لضمان الجودة والأداء المتميز',
    coreTitle: 'النظام الأساسي',
    coreSubtitle: 'هيكل متكامل من الوحدات المتصلة لضمان أفضل النتائج',
    aiCore: 'الذكاء الاصطناعي',
    featuredProjectsTitle: 'مشاريع مميزة',
    featuredProjectsSubtitle: 'أبرز الأعمال التي تعكس مستوى التميز والاحترافية',
    livePreview: 'عرض مباشر',
    featuredProjectName: 'منصة تسوق إلكتروني - سكبّة',
    featuredProjectDescription:
      'منصة تسوق إلكتروني متكاملة تقدم تجربة فريدة للمستخدمين، مع واجهة عصرية وسهولة في التصفح والشراء. تم تصميمها لتلبية احتياجات السوق السعودي وتوفير تجربة تسوق سلسة وآمنة.',
    visitLiveSite: 'زيارة الموقع',
    testimonialsTitle: 'آراء العملاء',
    testimonialsSubtitle: 'ثقة عملائنا هي شهادتنا الحقيقية',
    terminalTitle: 'محطة الاتصال',
    terminalSubtitle: 'أدخل الأمر للاتصال بالنظام',
    terminalHost: 'terminal@amrotech:~',
    commandPrompt: 'أدخل الأمر للاتصال',
    commandPlaceholder: 'اكتب help للحصول على القائمة',
    availableCommands: 'الأوامر المتاحة',
  }
})

// Improvement: track every timeout to cancel pending async UI actions when page unmounts.
const activeTimeouts = []

// Improvement: centralize timeout scheduling for consistent cleanup.
const scheduleTimeout = (callback, delay) => {
  const timerId = window.setTimeout(callback, delay)
  activeTimeouts.push(timerId)
  return timerId
}

// حالة الإقلاع
const isBooted = ref(false)
const currentBootLine = ref(0)
const bootProgress = ref(0)
const bootSequence = computed(() => {
  if (isEnglish.value) {
    return [
      { text: 'Initializing core system...', delay: 800 },
      { text: 'Loading UI modules...', delay: 600 },
      { text: 'Starting graphics engine...', delay: 700 },
      { text: 'Connecting to database...', delay: 500 },
      { text: 'Activating AI modules...', delay: 900 },
      { text: 'Running security checks...', delay: 600 },
      { text: 'System ready ✅', delay: 1000 }
    ]
  }

  return [
    { text: 'تهيئة النظام الأساسي...', delay: 800 },
    { text: 'تحميل وحدات الواجهة...', delay: 600 },
    { text: 'تشغيل المحرك الرسومي...', delay: 700 },
    { text: 'الاتصال بقاعدة البيانات...', delay: 500 },
    { text: 'تفعيل وحدات الذكاء الاصطناعي...', delay: 900 },
    { text: 'جاري التحقق من الأمان...', delay: 600 },
    { text: 'النظام جاهز للعمل ✅', delay: 1000 }
  ]
})

// التابات
const activeTab = ref('performance')

// الوحدات الأساسية
const hoveredModule = ref(null)

// التيرمنال
const command = ref('')
const commandOutput = ref('')

// أداء النظام
const performanceMetrics = computed(() => {
  if (isEnglish.value) {
    return [
      { value: '99.99%', label: 'System Uptime', progress: '100%', status: 'Optimal' },
      { value: '24+', label: 'Completed Projects', progress: '100%', status: 'Done' },
      { value: '0.01s', label: 'Response Time', progress: '95%', status: 'Fast' },
      { value: '100%', label: 'Client Satisfaction', progress: '100%', status: 'Excellent' }
    ]
  }

  return [
    { value: '99.99%', label: 'جاهزية النظام', progress: '100%', status: 'مثالي' },
    { value: '24+', label: 'مشروع مكتمل', progress: '100%', status: 'مكتمل' },
    { value: '0.01s', label: 'زمن الاستجابة', progress: '95%', status: 'سريع' },
    { value: '100%', label: 'رضا العملاء', progress: '100%', status: 'ممتاز' }
  ]
})

// وحدات النظام (التاب الثاني)
const systemModules = computed(() => {
  if (isEnglish.value) {
    return [
      {
        icon: 'shield-halved',
        variant: 'solid',
        title: 'Advanced Security',
        description: 'Modern security protocols with end-to-end encryption',
        efficiency: '99.9%'
      },
      {
        icon: 'gauge-high',
        variant: 'solid',
        title: 'High Performance',
        description: 'Fast loading with optimized resource efficiency',
        efficiency: '98%'
      },
      {
        icon: 'robot',
        variant: 'solid',
        title: 'Artificial Intelligence',
        description: 'AI model integration to improve user experience',
        efficiency: '95%'
      }
    ]
  }

  return [
    {
      icon: 'shield-halved',
      variant: 'solid',
      title: 'أمان متقدم',
      description: 'بروتوكولات أمان متقدمة مع تشفير من الطرف إلى الطرف',
      efficiency: '99.9%'
    },
    {
      icon: 'gauge-high',
      variant: 'solid',
      title: 'أداء فائق',
      description: 'تحميل فائق السرعة مع تحسين كفاءة الموارد',
      efficiency: '98%'
    },
    {
      icon: 'robot',
      variant: 'solid',
      title: 'ذكاء اصطناعي',
      description: 'دمج نماذج الذكاء الاصطناعي لتحسين التجربة',
      efficiency: '95%'
    }
  ]
})

// التقنيات
const techStack = ref([
  { name: 'Vue.js', icon: 'vuejs', variant: 'brands' },
  { name: 'Laravel', icon: 'laravel', variant: 'brands' },
  { name: 'Tailwind CSS', icon: 'css3-alt', variant: 'brands' },
  { name: 'Node.js', icon: 'node-js', variant: 'brands' },
  { name: 'AI', icon: 'brain', variant: 'solid' },
  { name: 'Database', icon: 'database', variant: 'solid' }
])

// خريطة الوحدات
const coreModules = computed(() => {
  if (isEnglish.value) {
    return [
      { key: 'frontend', label: 'Frontend', icon: 'display', variant: 'solid', position: 'top-module' },
      { key: 'backend', label: 'Backend', icon: 'server', variant: 'solid', position: 'left-module' },
      { key: 'database', label: 'Database', icon: 'database', variant: 'solid', position: 'right-module' },
      { key: 'security', label: 'Security', icon: 'shield-halved', variant: 'solid', position: 'bottom-left-module' },
      { key: 'api', label: 'API', icon: 'sitemap', variant: 'solid', position: 'bottom-right-module' }
    ]
  }

  return [
    { key: 'frontend', label: 'الواجهة الأمامية', icon: 'display', variant: 'solid', position: 'top-module' },
    { key: 'backend', label: 'الخلفية', icon: 'server', variant: 'solid', position: 'left-module' },
    { key: 'database', label: 'قاعدة البيانات', icon: 'database', variant: 'solid', position: 'right-module' },
    { key: 'security', label: 'الأمان', icon: 'shield-halved', variant: 'solid', position: 'bottom-left-module' },
    { key: 'api', label: 'API', icon: 'sitemap', variant: 'solid', position: 'bottom-right-module' }
  ]
})

// خطوط الربط
const connectionLines = computed(() => [
  { x1: '50%', y1: '50%', x2: '50%', y2: '20%' },
  { x1: '50%', y1: '50%', x2: '20%', y2: '50%' },
  { x1: '50%', y1: '50%', x2: '80%', y2: '50%' },
  { x1: '50%', y1: '50%', x2: '30%', y2: '80%' },
  { x1: '50%', y1: '50%', x2: '70%', y2: '80%' }
])

// اللوجات
const activityLogs = ref([])

const createLocalizedActivityLogs = () => {
  if (isEnglish.value) {
    return [
      { id: 1, message: 'Loading system modules...', time: '10:30:01', type: 'info' },
      { id: 2, message: 'Connecting to AI services...', time: '10:30:03', type: 'info' },
      { id: 3, message: 'Running security scan...', time: '10:30:05', type: 'info' },
      { id: 4, message: 'All systems operational ✅', time: '10:30:07', type: 'success' }
    ]
  }

  return [
    { id: 1, message: 'جاري تحميل وحدات النظام...', time: '10:30:01', type: 'info' },
    { id: 2, message: 'الاتصال بخوادم الذكاء الاصطناعي...', time: '10:30:03', type: 'info' },
    { id: 3, message: 'فحص أمان النظام...', time: '10:30:05', type: 'info' },
    { id: 4, message: 'جميع الأنظمة تعمل بشكل طبيعي ✅', time: '10:30:07', type: 'success' }
  ]
}

watch(isEnglish, () => {
  activityLogs.value = createLocalizedActivityLogs()
}, { immediate: true })

// آراء العملاء
const testimonials = computed(() => {
  if (isEnglish.value) {
    return [
      {
        id: 1,
        text: 'Outstanding professionalism and delivery speed. The result exceeded our expectations.',
        author: 'Ahmed Mohammed',
        position: 'IT Director'
      },
      {
        id: 2,
        text: 'Attention to detail and execution quality made the collaboration smooth and effective.',
        author: 'Fatimah Abdullah',
        position: 'Marketing Manager'
      },
      {
        id: 3,
        text: 'Fast response and high-quality technical support were beyond expectations.',
        author: 'Khaled Al-Harbi',
        position: 'Entrepreneur'
      }
    ]
  }

  return [
    {
      id: 1,
      text: 'مستوى احترافي متميز وسرعة في التنفيذ. المشروع تجاوز توقعاتنا بكثير!',
      author: 'أحمد محمد',
      position: 'مدير تقنية المعلومات'
    },
    {
      id: 2,
      text: 'الاهتمام بالتفاصيل والدقة في العمل جعلوا التعاون تجربة رائعة.',
      author: 'فاطمة عبدالله',
      position: 'مديرة التسويق'
    },
    {
      id: 3,
      text: 'سرعة الاستجابة والدعم الفني المتميز كانا فوق التوقعات.',
      author: 'خالد الحربي',
      position: 'رائد أعمال'
    }
  ]
})

// أوامر التيرمنال
const availableCommands = ref([
  'contact --email',
  'contact --whatsapp',
  'view --projects',
  'view --github',
  'system --status',
  'help'
])

// Improvement: track pointer on hero area to drive subtle 3D tilt micro-interactions.
const heroPointer = ref({ x: 0, y: 0 })

// Improvement: keep separate micro-interaction state per CTA button for magnetic movement and focused glow.
const ctaPointer = ref({
  primary: { x: 0, y: 0, glowX: 50, glowY: 20 },
  secondary: { x: 0, y: 0, glowX: 50, glowY: 20 },
})

const handleHeroMouseMove = (event) => {
  const target = event.currentTarget
  const rect = target.getBoundingClientRect()
  const dx = (event.clientX - rect.left) / rect.width - 0.5
  const dy = (event.clientY - rect.top) / rect.height - 0.5

  heroPointer.value = { x: dx * 12, y: dy * 10 }
}

const resetHeroMouse = () => {
  heroPointer.value = { x: 0, y: 0 }
}

const heroShellStyle = computed(() => ({
  transform: `perspective(900px) rotateY(${heroPointer.value.x * 0.55}deg) rotateX(${-heroPointer.value.y * 0.55}deg)`,
}))

const statusPillStyle = computed(() => ({
  transform: `translate3d(${heroPointer.value.x * 0.35}px, ${heroPointer.value.y * 0.2}px, 0)`,
}))

const handleCtaMouseMove = (event, key) => {
  const target = event.currentTarget
  const rect = target.getBoundingClientRect()
  const nx = (event.clientX - rect.left) / rect.width
  const ny = (event.clientY - rect.top) / rect.height

  ctaPointer.value[key] = {
    x: (nx - 0.5) * 8,
    y: (ny - 0.5) * 8,
    glowX: nx * 100,
    glowY: ny * 100,
  }
}

const resetCtaMouse = (key) => {
  ctaPointer.value[key] = { x: 0, y: 0, glowX: 50, glowY: 20 }
}

const getCtaInteractiveStyle = (key) => {
  const state = ctaPointer.value[key]

  return {
    '--cta-x': `${state.x}px`,
    '--cta-y': `${state.y}px`,
    '--glow-x': `${state.glowX}%`,
    '--glow-y': `${state.glowY}%`,
  }
}

const getModuleInfo = (moduleName) => {
  const modules = {
    ai: isEnglish.value
      ? { title: 'AI Core', description: 'Advanced machine learning and natural language models' }
      : { title: 'الذكاء الاصطناعي', description: 'نماذج متقدمة للتعلم الآلي ومعالجة اللغة الطبيعية' },
    frontend: isEnglish.value
      ? { title: 'Frontend', description: 'Interactive interfaces using modern web technologies' }
      : { title: 'الواجهة الأمامية', description: 'تصميمات تفاعلية باستخدام أحدث تقنيات الويب' },
    backend: isEnglish.value
      ? { title: 'Backend', description: 'Secure and scalable server architecture' }
      : { title: 'الخلفية', description: 'هيكل قوي وآمن لإدارة البيانات والعمليات' },
    database: isEnglish.value
      ? { title: 'Database', description: 'Reliable and efficient storage with fast retrieval' }
      : { title: 'قاعدة البيانات', description: 'تخزين آمن وفعال للبيانات مع استرجاع سريع' },
    security: isEnglish.value
      ? { title: 'Security', description: 'Comprehensive protection against threats and attacks' }
      : { title: 'الأمان', description: 'حماية شاملة من التهديدات والاختراقات' },
    api: isEnglish.value
      ? { title: 'API', description: 'Seamless integration between systems and applications' }
      : { title: 'واجهة البرمجة', description: 'ربط سلس بين الأنظمة والتطبيقات المختلفة' }
  }
  return modules[moduleName] || {
    title: moduleName,
    description: isEnglish.value ? 'Information not available' : 'معلومات غير متوفرة'
  }
}

const executeCommand = () => {
  const value = command.value.toLowerCase().trim()

  switch (value) {
    case 'contact --email':
      commandOutput.value = isEnglish.value
        ? '📧 Email: Amrwhoever@gmail.com'
        : '📧 البريد الإلكتروني: Amrwhoever@gmail.com'
      break
    case 'contact --whatsapp':
      commandOutput.value = isEnglish.value
        ? '📱 WhatsApp: +966543409536'
        : '📱 واتساب: +966543409536'
      break
    case 'view --projects':
      commandOutput.value = isEnglish.value
        ? '🌐 Loading projects...'
        : '🌐 جاري تحميل المشاريع...'
      scheduleTimeout(() => {
        window.location.href = '/projects'
      }, 800)
      break
    case 'view --github':
      commandOutput.value = isEnglish.value
        ? '⚡ Opening GitHub...'
        : '⚡ جاري فتح GitHub...'
      scheduleTimeout(() => {
        window.open('https://github.com/AmrWhoever', '_blank')
      }, 800)
      break
    case 'system --status':
      commandOutput.value = isEnglish.value
        ? '✅ All systems operational - Uptime: 100% | Response time: 0.01s'
        : '✅ جميع الأنظمة تعمل بشكل طبيعي - الجاهزية: 100% | زمن الاستجابة: 0.01s'
      break
    case 'help':
      commandOutput.value = isEnglish.value
        ? 'Available commands: contact --email, contact --whatsapp, view --projects, view --github, system --status'
        : 'الأوامر المتاحة: contact --email, contact --whatsapp, view --projects, view --github, system --status'
      break
    default:
      commandOutput.value = isEnglish.value
        ? '❌ Unknown command. Type "help" to list commands.'
        : '❌ أمر غير معروف. اكتب "help" للحصول على قائمة الأوامر.'
  }
}

const startProject = () => {
  const newLog = {
    id: Date.now(),
    message: isEnglish.value
      ? 'Starting new project... initializing development environment'
      : 'بدء مشروع جديد... تهيئة البيئة التطويرية',
    time: new Date().toLocaleTimeString(isEnglish.value ? 'en-US' : 'ar-SA'),
    type: 'info'
  }
  activityLogs.value.push(newLog)
}

// أنيميشن الإقلاع
const startBootSequence = () => {
  let totalDelay = 0
  bootSequence.value.forEach((line, index) => {
    totalDelay += line.delay
    scheduleTimeout(() => {
      currentBootLine.value = index
      bootProgress.value = ((index + 1) / bootSequence.value.length) * 100
      if (index === bootSequence.value.length - 1) {
        scheduleTimeout(() => {
          isBooted.value = true
        }, 800)
      }
    }, totalDelay)
  })
}

onMounted(() => {
  startBootSequence()
})

onUnmounted(() => {
  // Improvement: clear queued timers to avoid memory leaks and delayed state updates after route changes.
  activeTimeouts.forEach((timerId) => window.clearTimeout(timerId))
  activeTimeouts.length = 0
})
</script>

<style scoped>
:root {
  --cyber-cyan: #22d3ee;
  --cyber-blue: #3b82f6;
  --cyber-purple: #8b5cf6;
  --cyber-green: #10b981;
}

.rtl {
  direction: rtl;
  text-align: right;
}
.ltr {
  direction: ltr;
  text-align: left;
}

/* دخول السكاشن */
.section-shell {
  opacity: 0;
  transform: translateY(24px);
  animation: sectionIn 0.8s ease-out forwards;
}
section.section-shell:nth-of-type(1) {
  animation-delay: 0.15s;
}
section.section-shell:nth-of-type(2) {
  animation-delay: 0.3s;
}
section.section-shell:nth-of-type(3) {
  animation-delay: 0.45s;
}
section.section-shell:nth-of-type(4) {
  animation-delay: 0.6s;
}
section.section-shell:nth-of-type(5) {
  animation-delay: 0.75s;
}
section.section-shell:nth-of-type(6) {
  animation-delay: 0.9s;
}
section.section-shell:nth-of-type(7) {
  animation-delay: 1.05s;
}

@keyframes sectionIn {
  0% {
    opacity: 0;
    transform: translateY(24px) scale(0.98);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

.fade-in-up {
  opacity: 0;
  transform: translateY(12px);
  animation: fadeInUp 0.7s ease-out forwards;
}
.fade-in-up.delay-1 {
  animation-delay: 0.25s;
}
.lg\:delay-1 {
  animation-delay: 0.2s;
}

/* الإقلاع */
.terminal-line {
  opacity: 0;
  transform: translateY(8px);
  animation: fadeInUp 0.5s ease-out forwards;
}
.terminal-line.active {
  opacity: 1;
}

.blinking-cursor {
  animation: blink 1s infinite;
}

.boot-terminal {
  background: radial-gradient(circle at top, rgba(34, 197, 235, 0.08), transparent);
  padding: 1rem 1.25rem;
  border-radius: 0.75rem;
  border: 1px solid rgba(34, 211, 238, 0.2);
}

.boot-logo {
  box-shadow: 0 0 40px rgba(56, 189, 248, 0.4);
}

.boot-orbit {
  position: absolute;
  width: 130%;
  height: 130%;
  border-radius: 9999px;
  border: 1px dashed rgba(34, 211, 238, 0.4);
  animation: orbit 4s linear infinite;
}

.progress-bar {
  position: relative;
  background-size: 24px 24px;
  background-image: linear-gradient(
    135deg,
    rgba(15, 118, 110, 0.3) 25%,
    transparent 25%,
    transparent 50%,
    rgba(15, 118, 110, 0.3) 50%,
    rgba(15, 118, 110, 0.3) 75%,
    transparent 75%,
    transparent
  );
  animation: moveStripes 1s linear infinite;
}

/* الهيرو */
.hero-shell {
  animation: fadeInUp 0.9s ease-out forwards;
}
.hero-title {
  text-shadow: 0 0 30px rgba(56, 189, 248, 0.3);
}
.hero-subtitle {
  opacity: 0.9;
}

.status-pill {
  box-shadow: 0 0 20px rgba(16, 185, 129, 0.3);
}

/* الأزرار */
.cyber-button {
  position: relative;
  padding: 0.75rem 1.5rem;
  border-radius: 0.75rem;
  border-width: 2px;
  transition: all 0.3s;
  font-family: monospace;
  font-weight: 600;
  overflow: hidden;
  transform: translate3d(var(--cta-x, 0px), var(--cta-y, 0px), 0);
}
.cyber-button:hover {
  transform: translate3d(var(--cta-x, 0px), var(--cta-y, 0px), 0) translateY(-2px) scale(1.03);
}

.cyber-button-primary {
  background: linear-gradient(to right, #155e75, #1e40af);
  color: #cffafe;
  border-color: rgba(34, 211, 238, 0.5);
}
.cyber-button-primary:hover {
  background: linear-gradient(to right, #0891b2, #1d4ed8);
  border-color: rgba(34, 211, 238, 1);
}

.cyber-button-secondary {
  background: linear-gradient(to right, #7e22ce, #3730a3);
  color: #e9d5ff;
  border-color: rgba(192, 132, 252, 0.5);
}
.cyber-button-secondary:hover {
  background: linear-gradient(to right, #9333ea, #4338ca);
  border-color: rgba(192, 132, 252, 1);
}

.cyber-button-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(circle at var(--glow-x, 50%) var(--glow-y, 20%), rgba(34, 211, 238, 0.35), transparent 60%);
  opacity: 0;
  pointer-events: none;
  transition: opacity 0.25s ease-out;
}
.cyber-button-glow.secondary {
  background: radial-gradient(circle at var(--glow-x, 50%) var(--glow-y, 20%), rgba(192, 132, 252, 0.4), transparent 60%);
}
.cyber-button:hover .cyber-button-glow {
  opacity: 1;
}

/* البانلز والكروت */
.cyber-panel {
  background: rgba(17, 24, 39, 0.9);
  backdrop-filter: blur(18px);
  border-radius: 1rem;
  border: 1px solid rgba(34, 211, 238, 0.3);
  box-shadow: 0 20px 45px -12px rgba(0, 0, 0, 0.9);
  position: relative;
  overflow: hidden;
}
.cyber-panel::before {
  content: '';
  position: absolute;
  inset: 0;
  border-radius: inherit;
  border: 1px solid rgba(59, 130, 246, 0.1);
  pointer-events: none;
}

.cyber-card {
  position: relative;
  background: rgba(17, 24, 39, 0.7);
  backdrop-filter: blur(12px);
  border-radius: 0.9rem;
  padding: 1rem;
  border: 1px solid rgba(34, 211, 238, 0.2);
  transition: all 0.3s;
}
.cyber-card:hover {
  border-color: rgba(34, 211, 238, 0.6);
  transform: translateY(-3px);
  box-shadow: 0 12px 30px -10px rgba(34, 211, 238, 0.4);
}

.cyber-metric-card {
  padding: 1rem;
  border-radius: 0.75rem;
  background: radial-gradient(circle at top, rgba(34, 211, 238, 0.1), rgba(17, 24, 39, 0.9));
  backdrop-filter: blur(12px);
  border: 1px solid rgba(34, 211, 238, 0.25);
  transition: all 0.3s;
}
.cyber-metric-card:hover {
  border-color: rgba(34, 211, 238, 0.6);
  transform: translateY(-2px) scale(1.01);
}

.metric-bar {
  box-shadow: 0 0 12px rgba(59, 130, 246, 0.4);
}

/* التيرمنال */
.cyber-terminal {
  font-family: monospace;
  color: #10b981;
  font-size: 0.75rem;
  background: radial-gradient(
    circle at top left,
    rgba(16, 185, 129, 0.12),
    rgba(17, 24, 39, 0.9)
  );
  padding: 1rem;
  border-radius: 0.5rem;
  border: 1px solid rgba(34, 211, 238, 0.2);
  height: 10rem;
  overflow: hidden;
  position: relative;
}

.cyber-terminal-large {
  background: rgba(17, 24, 39, 0.9);
  backdrop-filter: blur(16px);
  border-radius: 1rem;
  border: 1px solid rgba(34, 211, 238, 0.3);
  overflow: hidden;
  box-shadow: 0 20px 40px -16px rgba(15, 23, 42, 0.9);
}

.terminal-header {
  background: rgba(0, 0, 0, 0.85);
  padding: 0.5rem 1rem;
  border-bottom: 1px solid rgba(34, 211, 238, 0.3);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.terminal-body {
  background: radial-gradient(circle at top, rgba(15, 118, 110, 0.12), transparent);
}

.command-input-group {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  background: rgba(0, 0, 0, 0.4);
  border-radius: 0.375rem;
  padding: 0.5rem 0.75rem;
  border: 1px solid rgba(34, 211, 238, 0.3);
}
.command-input-group:focus-within {
  border-color: var(--cyber-cyan);
  box-shadow: 0 0 18px rgba(34, 211, 238, 0.35);
}

.command-input {
  background: transparent;
  border: none;
  outline: none;
  color: #bae6fd;
  width: 100%;
  font-family: monospace;
}
.command-input::placeholder {
  color: rgba(34, 211, 238, 0.5);
}

.command-output {
  background: rgba(0, 0, 0, 0.4);
  border-radius: 0.375rem;
  padding: 0.75rem;
  border: 1px solid rgba(16, 185, 129, 0.5);
}

/* التابات */
.cyber-tab-active {
  background: linear-gradient(to right, #155e75, #1e40af);
  color: #cffafe;
  box-shadow: 0 0 18px rgba(34, 211, 238, 0.4);
}

/* أسطر المسح */
.scan-line {
  position: absolute;
  inset: 0;
  background: linear-gradient(
    to bottom,
    transparent,
    rgba(34, 211, 238, 0.08),
    transparent
  );
  animation: scan 3s linear infinite;
  mix-blend-mode: screen;
}

/* كروت التقنيات */
.tech-card {
  position: relative;
  background: rgba(17, 24, 39, 0.75);
  backdrop-filter: blur(12px);
  border-radius: 0.6rem;
  padding: 1rem 0.5rem;
  border: 1px solid rgba(34, 211, 238, 0.2);
  transition: all 0.25s;
  text-align: center;
  overflow: hidden;
}
.tech-card:hover {
  border-color: rgba(34, 211, 238, 0.7);
  transform: translateY(-4px);
  box-shadow: 0 12px 28px -10px rgba(34, 211, 238, 0.45);
}
.float-icon {
  animation: float 4s ease-in-out infinite;
}

.scan-animation {
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 1px;
  background: linear-gradient(to right, transparent, var(--cyber-cyan), transparent);
  animation: scanHorizontal 2s linear infinite;
}

/* خريطة الوحدات */
.core-module {
  background: rgba(17, 24, 39, 0.9);
  backdrop-filter: blur(12px);
  border-radius: 0.75rem;
  padding: 0.75rem;
  border: 1px solid rgba(34, 211, 238, 0.3);
  transition: all 0.3s;
  text-align: center;
  width: 5rem;
  height: 5rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 12px 24px -14px rgba(15, 23, 42, 0.8);
}
.core-module:hover {
  border-color: rgba(34, 211, 238, 0.8);
  transform: scale(1.1) translateY(-4px);
  box-shadow: 0 16px 40px -18px rgba(34, 211, 238, 0.5);
}

.core-module.central {
  width: 6rem;
  height: 6rem;
  background: radial-gradient(
    circle at top,
    rgba(34, 211, 238, 0.18),
    rgba(17, 24, 39, 0.9)
  );
}

.core-module.top-module {
  top: 10%;
  left: 50%;
  transform: translateX(-50%);
}
.core-module.left-module {
  top: 50%;
  left: 10%;
  transform: translateY(-50%);
}
.core-module.right-module {
  top: 50%;
  right: 10%;
  transform: translateY(-50%);
}
.core-module.bottom-left-module {
  bottom: 10%;
  left: 25%;
  transform: translateX(-50%);
}
.core-module.bottom-right-module {
  bottom: 10%;
  right: 25%;
  transform: translateX(50%);
}

.connection-line {
  stroke: var(--cyber-cyan);
  stroke-width: 1.5;
  stroke-dasharray: 4;
  animation: dash 3s linear infinite;
  opacity: 0.45;
}

/* كادر المشروع */
.project-frame {
  transform-origin: center;
  transition: transform 0.4s ease, box-shadow 0.4s ease, border-color 0.3s ease;
  box-shadow: 0 18px 40px -20px rgba(15, 23, 42, 0.9);
}
.project-preview:hover .project-frame {
  transform: perspective(900px) rotateX(6deg) rotateY(-6deg) scale(1.01);
  border-color: rgba(34, 211, 238, 0.5);
  box-shadow: 0 24px 60px -22px rgba(34, 211, 238, 0.6);
}
.project-frame-glow {
  position: absolute;
  inset: 0;
  background: radial-gradient(
    circle at top,
    rgba(56, 189, 248, 0.12),
    transparent 65%
  );
  mix-blend-mode: screen;
  pointer-events: none;
}

/* آراء العملاء */
.testimonial-strip {
  scrollbar-width: thin;
}
.testimonial-strip::-webkit-scrollbar {
  height: 6px;
}
.testimonial-strip::-webkit-scrollbar-track {
  background: rgba(15, 23, 42, 0.8);
}
.testimonial-strip::-webkit-scrollbar-thumb {
  background: rgba(34, 211, 238, 0.6);
  border-radius: 999px;
}

.testimonial-card {
  animation: floatSoft 6s ease-in-out infinite;
}
.testimonial-text {
  font-size: 0.85rem;
}

/* التولتيب */
.cyber-tooltip {
  background: rgba(0, 0, 0, 0.9);
  backdrop-filter: blur(16px);
  border-radius: 0.6rem;
  padding: 0.75rem;
  border: 1px solid rgba(34, 211, 238, 0.5);
  max-width: 16rem;
  box-shadow: 0 14px 30px -18px rgba(15, 23, 42, 0.9);
}

/* اللوج */
.terminal-log-line {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.125rem 0;
}

/* أنيميشن */
@keyframes blink {
  0%,
  50% {
    opacity: 1;
  }
  51%,
  100% {
    opacity: 0;
  }
}

@keyframes fadeInUp {
  0% {
    opacity: 0;
    transform: translateY(16px);
  }
  100% {
    opacity: 1;
    transform: translateY(0);
  }
}

@keyframes scan {
  0% {
    transform: translateY(-100%);
  }
  100% {
    transform: translateY(100%);
  }
}

@keyframes scanHorizontal {
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
}

@keyframes dash {
  to {
    stroke-dashoffset: -8;
  }
}

@keyframes moveStripes {
  0% {
    background-position: 0 0;
  }
  100% {
    background-position: 24px 0;
  }
}

@keyframes float {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-6px);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes floatSoft {
  0% {
    transform: translateY(0);
  }
  50% {
    transform: translateY(-4px);
  }
  100% {
    transform: translateY(0);
  }
}

@keyframes orbit {
  0% {
    transform: rotate(0deg) scale(1);
  }
  100% {
    transform: rotate(360deg) scale(1);
  }
}

/* جلو للنص */
.text-shadow-glow {
  text-shadow: 0 0 8px rgba(34, 211, 238, 0.7);
}

/* موبايل */
@media (max-width: 640px) {
  .core-module {
    width: 4rem;
    height: 4rem;
    padding: 0.5rem;
    font-size: 0.75rem;
  }
  .core-module.central {
    width: 5rem;
    height: 5rem;
  }
}

/* تقليل الحركة */
@media (prefers-reduced-motion: reduce) {
  .typing-animation,
  .transition-all,
  .scan-line,
  .scan-animation,
  .blinking-cursor,
  .connection-line,
  .testimonial-card,
  .float-icon,
  .progress-bar,
  .section-shell {
    animation: none !important;
    transition: none !important;
  }
}
</style>
