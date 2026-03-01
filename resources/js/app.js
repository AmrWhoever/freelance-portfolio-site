import './bootstrap'
import '../css/app.css'

import { createApp, h } from 'vue'
import { createInertiaApp } from '@inertiajs/vue3'

import Particles from '@tsparticles/vue3'
import { loadSlim } from '@tsparticles/slim'

createInertiaApp({
  resolve: name => {
    // Improvement: lazy-load page components so each route can be code-split into smaller chunks.
    const pages = import.meta.glob('./Pages/**/*.vue')
    const page = pages[`./Pages/${name}.vue`]

    if (!page) {
      throw new Error(`Page not found: ${name}`)
    }

    // Improvement: return async module result for Inertia to avoid shipping all pages in the initial bundle.
    return page()
  },

  setup({ el, App, props, plugin }) {
    const vueApp = createApp({
      render: () => h(App, props),
    })

    // 🔹 Inertia
    vueApp.use(plugin)

    // 🔹 tsParticles (التسجيل الصح)
    vueApp.use(Particles, {
      init: async engine => {
        await loadSlim(engine)
      },
    })

    vueApp.mount(el)
  },
})
