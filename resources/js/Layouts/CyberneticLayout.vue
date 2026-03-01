<template>
  <!-- Improvement: bind page direction to selected language so navigation and reading flow switch between RTL/LTR. -->
  <div class="min-h-screen bg-transparent text-white font-sans" :dir="dir">
    <!-- ===== CYBER BACKGROUND (Option C) ===== -->
    <CyberBackground />

    <!-- ===== HEADER ===== -->
    <header class="fixed top-0 inset-x-0 z-50">
      <nav
        class="backdrop-blur-md bg-black/60 border-b border-cyan-500/40 shadow-lg shadow-cyan-500/20"
      >
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-16">

            <!-- LOGO -->
            <!-- Improvement: switch logo/text order so text block stays on the right and icon on the left, as requested. -->
            <Link href="/" class="flex items-center gap-3 group" :class="isEnglish ? 'flex-row' : 'flex-row-reverse'">
              <div class="leading-tight" :class="isEnglish ? 'text-left' : 'text-right'">
                <div :class="isEnglish ? 'font-mono font-bold text-cyan-300' : 'font-mono text-cyan-300 font-bold tracking-wide text-lg'">
                  {{ brandTitle }}
                </div>
                <div :class="isEnglish ? 'text-xs font-mono text-cyan-500' : 'text-xs text-cyan-500 font-mono'">
                  {{ brandSubtitle }}
                </div>
              </div>
              <div
                class="rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600
                       flex items-center justify-center border border-cyan-400/60 transition-transform duration-700"
                :class="isEnglish ? 'w-10 h-10' : 'w-11 h-11 shadow-lg shadow-cyan-500/30 group-hover:rotate-180'"
              >
                <span class="bg-cyan-200 rounded-full animate-pulse" :class="isEnglish ? 'w-2.5 h-2.5' : 'w-3 h-3'"></span>
              </div>
            </Link>

            <div class="flex-1"></div>

            <!-- STATUS + CTA -->
            <div class="flex items-center gap-2 sm:gap-4">
              <!-- STATUS -->
              <div
                class="flex items-center gap-2 bg-black/40 px-3 py-1.5 rounded-lg
                       border border-cyan-500/30"
              >
                <span class="w-2 h-2 rounded-full bg-green-400 animate-pulse"></span>
                <span class="font-mono text-xs text-cyan-300">
                  {{ t('common.online') }}
                </span>
              </div>

              <!-- Improvement: add AR/EN language switch in header for quick page translation toggle. -->
              <button
                type="button"
                @click="toggleLocale"
                class="px-2.5 py-1.5 rounded-lg border border-cyan-500/40 bg-black/50 text-cyan-200 font-mono text-xs hover:bg-cyan-500/10 transition"
              >
                {{ locale.toUpperCase() === 'AR' ? 'AR / EN' : 'EN / AR' }}
              </button>

              <!-- CTA -->
              <Link
                href="/contact"
                class="flex items-center gap-2 px-4 py-2 rounded-lg font-mono text-sm
                       bg-gradient-to-r from-cyan-600 to-blue-700
                       border border-cyan-400/50
                       hover:from-cyan-500 hover:to-blue-600
                       transition-all shadow-md shadow-cyan-500/30"
              >
                <Icon name="zap" class="w-4 h-4" />
                {{ t('common.startProject') }}
              </Link>
            </div>

          </div>

          <!-- Improvement: dedicated navigation bar row below header controls for clear page-to-page navigation. -->
          <div class="border-t border-cyan-500/20 py-2.5">
            <div class="flex items-center justify-center gap-1 sm:gap-2 overflow-x-auto whitespace-nowrap">
              <Link
                v-for="item in navItems"
                :key="item.href"
                :href="item.href"
                class="px-2.5 sm:px-3.5 py-1.5 rounded-md font-mono text-xs sm:text-sm
                       text-cyan-100/90 hover:text-cyan-200
                       border border-transparent hover:border-cyan-500/30
                       hover:bg-cyan-500/10 transition"
              >
                {{ item.label }}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </header>

    <!-- ===== MAIN ===== -->
    <!-- Improvement: reduce top offset to remove visible gap between fixed header and first section. -->
    <main class="relative z-10 pt-28">
      <slot />
    </main>

    <!-- ===== FOOTER ===== -->
    <footer
      class="relative z-10 mt-24 border-t border-cyan-500/20
             bg-gradient-to-t from-black via-slate-900/80 to-transparent"
    >
      <div class="max-w-6xl mx-auto px-6 py-16">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-12">

          <!-- BRAND -->
          <div
            class="text-center"
            :class="isEnglish ? 'md:order-1 md:text-left' : 'md:text-right'"
          >
            <!-- Improvement: keep footer logo block on the right side in RTL. -->
            <div
              class="group flex items-center justify-center gap-2 mb-4"
              :class="isEnglish ? brandRowClassEn : brandRowClassAr"
            >
              <div
                class="rounded-xl bg-gradient-to-br from-cyan-500 via-blue-600 to-purple-600
                       flex items-center justify-center border border-cyan-400/60 transition-transform duration-700"
                :class="isEnglish ? 'w-10 h-10' : 'w-11 h-11 shadow-lg shadow-cyan-500/30 group-hover:rotate-180'"
              >
                <span class="bg-cyan-200 rounded-full animate-pulse" :class="isEnglish ? 'w-2.5 h-2.5' : 'w-3 h-3'"></span>
              </div>
              <div :class="isEnglish ? 'text-left' : 'text-right'">
                <div :class="isEnglish ? 'font-mono font-bold text-cyan-300' : 'font-mono text-cyan-300 font-bold tracking-wide text-lg'">{{ brandTitle }}</div>
                <div :class="isEnglish ? 'text-xs font-mono text-cyan-500' : 'text-xs text-cyan-500 font-mono'">{{ brandSubtitle }}</div>
              </div>
            </div>
            <p class="text-gray-400 text-sm max-w-xs mx-auto" :class="isEnglish ? 'md:mr-0 md:ml-0' : 'md:mr-0 md:ml-auto'">
              {{ t('common.brandDescription') }}
            </p>
          </div>

          <!-- CONTACT -->
          <div
            class="text-center"
            :class="isEnglish ? 'md:order-2 md:text-left' : 'md:text-center'"
          >
            <h3
              class="w-44 mx-auto font-mono text-cyan-300 mb-4"
              :class="isEnglish ? 'text-left' : 'text-right'"
            >
              {{ t('common.contact') }}
            </h3>
            <div class="space-y-3 text-sm">
              <a
                href="https://wa.me/966543409536"
                target="_blank"
                class="flex w-44 mx-auto items-center gap-2 text-gray-400 hover:text-cyan-300"
              >
                <span class="inline-flex w-5 justify-center">
                  <Icon name="phone" class="w-4 h-4" />
                </span>
                <span>{{ t('common.whatsapp') }}</span>
              </a>
              <a
                href="mailto:Amrwhoever@gmail.com"
                class="flex w-44 mx-auto items-center gap-2 text-gray-400 hover:text-cyan-300"
              >
                <span class="inline-flex w-5 justify-center">
                  <Icon name="envelope" :variant="'regular'" class="w-4 h-4" />
                </span>
                <span>{{ t('common.email') }}</span>
              </a>
              <a
                href="https://github.com/AmrWhoever"
                target="_blank"
                class="flex w-44 mx-auto items-center gap-2 text-gray-400 hover:text-cyan-300"
              >
                <span class="inline-flex w-5 justify-center">
                  <Icon name="github" :variant="'brands'" class="w-4 h-4" />
                </span>
                <span>{{ t('common.github') }}</span>
              </a>
            </div>
          </div>

          <!-- SERVICES -->
          <div
            class="text-center"
            :class="isEnglish ? 'md:order-3 md:text-left' : 'md:text-right'"
          >
            <h3 class="font-mono text-cyan-300 mb-4">{{ t('common.services') }}</h3>
            <ul class="text-sm text-gray-400 space-y-2">
              <li v-for="service in serviceItems" :key="service">{{ service }}</li>
            </ul>
          </div>

        </div>

        <div class="mt-12 pt-6 border-t border-cyan-500/20 text-center">
          <p class="text-xs text-gray-500 font-mono">
            © 2024 عمرو تك — {{ t('common.allRights') }}
          </p>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup>
import { computed } from 'vue'
import { Link } from '@inertiajs/vue3'
import CyberBackground from '@/Components/CyberBackground.vue'
import Icon from '@/Components/ui/Icon.vue'
import { useLocale } from '@/composables/useLocale'

const { locale, dir, isEnglish, toggleLocale, t } = useLocale()
const serviceItems = computed(() => t('common.serviceItems'))
const brandTitle = computed(() => (isEnglish.value ? 'Amro Tech' : 'عمرو تك'))
const brandSubtitle = computed(() => (isEnglish.value ? 'عمرو تك' : 'Amro Tech'))
const brandRowClassEn = 'flex-row md:justify-start'
const brandRowClassAr = 'flex-row-reverse md:justify-end'
const navItems = computed(() => [
  { href: '/', label: t('nav.home') },
  { href: '/about', label: t('nav.about') },
  { href: '/projects', label: t('nav.projects') },
  { href: '/blog', label: t('nav.blog') },
  { href: '/contact', label: t('nav.contact') },
])
</script>
