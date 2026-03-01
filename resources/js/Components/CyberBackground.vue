<template>
  <div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none">
    <!-- Base gradient -->
    <div class="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950"></div>

    <!-- Improvement: add a moving radial glow for depth, inspired by modern Nova-like ambient lighting. -->
    <div class="absolute inset-0" :style="ambientLightStyle"></div>

    <!-- Improvement: enable WebGL canvas only on capable devices; mobile/low-power uses graceful fallback layers. -->
    <canvas
      v-if="shouldUseThree"
      ref="threeCanvas"
      class="absolute inset-0 opacity-65"
    ></canvas>

    <!-- Particles layer -->
    <div class="absolute inset-0 opacity-60">
      <!-- Improvement: remove local particles init to avoid duplicate engine initialization (already global in app.js). -->
      <Particles id="tsparticles" :options="options" />
    </div>

    <!-- Improvement: add layered holographic rings with independent parallax motion for stronger 3D illusion. -->
    <div
      v-for="ring in rings"
      :key="ring.id"
      class="absolute rounded-full border"
      :style="ringStyle(ring)"
    ></div>

    <!-- 3D grid floor (parallax) -->
    <div
      class="absolute inset-x-[-20%] bottom-[-45%] h-[130%] origin-bottom"
      :style="gridWrapStyle"
    >
      <div class="w-full h-full" :style="gridStyle" />
    </div>

    <!-- Soft orbs -->
    <div
      v-for="orb in orbs"
      :key="orb.id"
      class="absolute rounded-full blur-3xl mix-blend-screen opacity-50"
      :style="orbStyle(orb)"
    ></div>

    <!-- HUD lines -->
    <div class="absolute inset-0 opacity-15">
      <div class="absolute inset-x-0 top-24 h-px bg-gradient-to-r from-transparent via-cyan-400 to-transparent"></div>
      <div class="absolute inset-y-0 right-16 w-px bg-gradient-to-b from-transparent via-cyan-400 to-transparent"></div>
      <div class="absolute inset-y-0 left-24 w-px bg-gradient-to-b from-transparent via-blue-400 to-transparent"></div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from 'vue'
import * as THREE from 'three'

const threeCanvas = ref(null)
const tiltX = ref(0)
const tiltY = ref(0)
const targetTiltX = ref(0)
const targetTiltY = ref(0)
const scrollDepth = ref(0)
const viewportWidth = ref(typeof window !== 'undefined' ? window.innerWidth : 1280)
const performanceMode = ref('high')

let rafId = null
let isReducedMotion = false
let frameIntervalMs = 1000 / 60
let lastFrameTime = 0
let slowFrameCount = 0

let scene = null
let camera = null
let renderer = null
let starField = null
let wireframeMesh = null
let haloRing = null

const shouldUseThree = computed(() => performanceMode.value === 'high')

// Improvement: classify device capability to automatically pick an effect profile (high vs fallback).
const detectPerformanceMode = () => {
  if (typeof window === 'undefined') return 'low'

  const isMobileViewport = window.innerWidth < 900
  const hardwareThreads = navigator.hardwareConcurrency || 4
  const memoryEstimate = navigator.deviceMemory || 4
  const isLowPowerDevice = hardwareThreads <= 4 || memoryEstimate <= 4

  if (isReducedMotion || isMobileViewport || isLowPowerDevice) {
    return 'low'
  }

  return 'high'
}

const applyPerformanceMode = () => {
  const nextMode = detectPerformanceMode()

  if (performanceMode.value === nextMode) return

  performanceMode.value = nextMode

  // Improvement: adapt frame pacing per mode to reduce battery/GPU pressure.
  frameIntervalMs = nextMode === 'high' ? 1000 / 60 : 1000 / 30
  slowFrameCount = 0

  if (nextMode === 'high') {
    initThreeScene()
  } else {
    disposeThreeScene()
  }
}

const handleVisibilityChange = () => {
  // Improvement: avoid rendering work while the tab is hidden.
  if (document.hidden) {
    if (rafId) {
      window.cancelAnimationFrame(rafId)
      rafId = null
    }
    return
  }

  if (!rafId && !isReducedMotion) {
    rafId = window.requestAnimationFrame(animateTilt)
  }
}

// Improvement: initialize a lightweight Three.js scene tuned for portfolio backgrounds.
const initThreeScene = () => {
  if (!threeCanvas.value || renderer || !shouldUseThree.value) return

  try {
    scene = new THREE.Scene()

    camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      100
    )
    camera.position.set(0, 0, 18)

    renderer = new THREE.WebGLRenderer({
      canvas: threeCanvas.value,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    // Improvement: cap pixel ratio for stable FPS while keeping visuals sharp enough.
    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6))
    renderer.setSize(window.innerWidth, window.innerHeight, false)
    renderer.setClearColor(0x000000, 0)

    const pointsCount = window.innerWidth < 1200 ? 1200 : 1600
    const positions = new Float32Array(pointsCount * 3)
    const colors = new Float32Array(pointsCount * 3)

    for (let i = 0; i < pointsCount; i += 1) {
      const i3 = i * 3
      positions[i3] = (Math.random() - 0.5) * 55
      positions[i3 + 1] = (Math.random() - 0.5) * 30
      positions[i3 + 2] = (Math.random() - 0.5) * 35

      colors[i3] = 0.13 + Math.random() * 0.35
      colors[i3 + 1] = 0.58 + Math.random() * 0.35
      colors[i3 + 2] = 0.72 + Math.random() * 0.25
    }

    const starsGeometry = new THREE.BufferGeometry()
    starsGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3))
    starsGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3))

    const starsMaterial = new THREE.PointsMaterial({
      size: 0.055,
      vertexColors: true,
      transparent: true,
      opacity: 0.65,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    })

    starField = new THREE.Points(starsGeometry, starsMaterial)
    scene.add(starField)

    const knotGeometry = new THREE.TorusKnotGeometry(5.7, 0.06, 180, 20, 2, 7)
    const wireGeometry = new THREE.WireframeGeometry(knotGeometry)
    const wireMaterial = new THREE.LineBasicMaterial({
      color: 0x22d3ee,
      transparent: true,
      opacity: 0.2,
    })

    wireframeMesh = new THREE.LineSegments(wireGeometry, wireMaterial)
    wireframeMesh.rotation.x = Math.PI * 0.2
    scene.add(wireframeMesh)

    const ringGeometry = new THREE.RingGeometry(7.1, 7.16, 128)
    const ringMaterial = new THREE.MeshBasicMaterial({
      color: 0x60a5fa,
      transparent: true,
      opacity: 0.22,
      side: THREE.DoubleSide,
      blending: THREE.AdditiveBlending,
    })

    haloRing = new THREE.Mesh(ringGeometry, ringMaterial)
    haloRing.rotation.x = Math.PI / 2.75
    scene.add(haloRing)
  } catch (error) {
    // Improvement: fail gracefully if WebGL is unavailable without breaking the rest of the background.
    scene = null
    camera = null
    renderer = null
    starField = null
    wireframeMesh = null
    haloRing = null
  }
}

const resizeThreeScene = () => {
  if (!renderer || !camera) return

  camera.aspect = window.innerWidth / window.innerHeight
  camera.updateProjectionMatrix()

  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.6))
  renderer.setSize(window.innerWidth, window.innerHeight, false)
}

const disposeObject3D = (object) => {
  if (!object) return

  if (object.geometry) {
    object.geometry.dispose()
  }

  if (Array.isArray(object.material)) {
    object.material.forEach((material) => material.dispose())
  } else if (object.material) {
    object.material.dispose()
  }
}

// Improvement: explicitly dispose WebGL resources on unmount to avoid memory leaks across Inertia route changes.
const disposeThreeScene = () => {
  disposeObject3D(starField)
  disposeObject3D(wireframeMesh)
  disposeObject3D(haloRing)

  if (scene) {
    scene.clear()
  }

  if (renderer) {
    renderer.dispose()
  }

  scene = null
  camera = null
  renderer = null
  starField = null
  wireframeMesh = null
  haloRing = null
}

const renderThreeFrame = () => {
  if (!shouldUseThree.value || !renderer || !scene || !camera) return

  const time = performance.now() * 0.00035

  if (starField) {
    starField.rotation.y = time * 0.18 + tiltY.value * 0.0016
    starField.rotation.x = time * 0.08 + tiltX.value * 0.0014
    starField.position.z = -scrollDepth.value * 0.03
  }

  if (wireframeMesh) {
    wireframeMesh.rotation.y = time * 0.45 + tiltY.value * 0.008
    wireframeMesh.rotation.x = Math.PI * 0.2 + tiltX.value * 0.004
  }

  if (haloRing) {
    haloRing.rotation.z = time * 0.55
    haloRing.position.y = -scrollDepth.value * 0.02
  }

  camera.position.x = tiltY.value * 0.02
  camera.position.y = -tiltX.value * 0.02
  camera.lookAt(0, 0, 0)

  renderer.render(scene, camera)
}

// Improvement: keep effect smooth and premium by easing pointer movement instead of snapping transforms directly.
const animateTilt = (timestamp = 0) => {
  // Improvement: throttle render/update loop by target frame interval for adaptive performance.
  if (timestamp - lastFrameTime < frameIntervalMs) {
    rafId = window.requestAnimationFrame(animateTilt)
    return
  }

  const delta = timestamp - lastFrameTime
  lastFrameTime = timestamp

  // Improvement: if runtime gets slow, auto-step down from 60fps to 30fps.
  if (performanceMode.value === 'high') {
    if (delta > 34) {
      slowFrameCount += 1
    } else {
      slowFrameCount = Math.max(0, slowFrameCount - 1)
    }

    if (slowFrameCount > 20) {
      frameIntervalMs = 1000 / 30
      slowFrameCount = 0

      if (renderer) {
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.25))
      }
    }
  }

  tiltX.value += (targetTiltX.value - tiltX.value) * 0.08
  tiltY.value += (targetTiltY.value - tiltY.value) * 0.08

  renderThreeFrame()
  rafId = window.requestAnimationFrame(animateTilt)
}

const handleMouseMove = (event) => {
  const cx = window.innerWidth / 2
  const cy = window.innerHeight / 2
  const dx = (event.clientX - cx) / cx
  const dy = (event.clientY - cy) / cy

  targetTiltY.value = dx * 10
  targetTiltX.value = dy * 14
}

// Improvement: bind subtle depth to scroll so background feels spatial during navigation.
const handleScroll = () => {
  const maxDepth = 26
  scrollDepth.value = Math.min(maxDepth, window.scrollY * 0.04)
}

const handleResize = () => {
  viewportWidth.value = window.innerWidth
  applyPerformanceMode()
  resizeThreeScene()
}

onMounted(() => {
  const media = window.matchMedia('(prefers-reduced-motion: reduce)')
  isReducedMotion = media.matches

  // Improvement: sync mode immediately at startup so low-power devices skip heavy WebGL work.
  performanceMode.value = detectPerformanceMode()
  frameIntervalMs = performanceMode.value === 'high' ? 1000 / 60 : 1000 / 30

  window.addEventListener('mousemove', handleMouseMove)
  window.addEventListener('scroll', handleScroll, { passive: true })
  window.addEventListener('resize', handleResize)
  document.addEventListener('visibilitychange', handleVisibilityChange)

  initThreeScene()
  renderThreeFrame()

  if (!isReducedMotion) {
    rafId = window.requestAnimationFrame(animateTilt)
  }
})

onUnmounted(() => {
  window.removeEventListener('mousemove', handleMouseMove)
  window.removeEventListener('scroll', handleScroll)
  window.removeEventListener('resize', handleResize)
  document.removeEventListener('visibilitychange', handleVisibilityChange)

  if (rafId) {
    window.cancelAnimationFrame(rafId)
  }

  disposeThreeScene()
})

const gridWrapStyle = computed(() => ({
  perspective: '1000px',
  transform: `rotateX(70deg) rotateZ(${tiltY.value * 0.5}deg) translateX(${tiltX.value * 0.9}px) translateY(${scrollDepth.value}px)`,
}))

const gridStyle = computed(() => ({
  backgroundImage:
    'linear-gradient(rgba(34,211,238,0.22) 1px, transparent 1px), linear-gradient(90deg, rgba(34,211,238,0.18) 1px, transparent 1px)',
  backgroundSize: '90px 70px',
  borderTop: '1px solid rgba(34,211,238,0.30)',
  maskImage: 'linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))',
  WebkitMaskImage: 'linear-gradient(to top, rgba(0,0,0,1), rgba(0,0,0,0))',
}))

const ambientLightStyle = computed(() => {
  const x = 50 + tiltY.value * 1.7
  const y = 28 + tiltX.value * 1.2

  return {
    background: `radial-gradient(circle at ${x}% ${y}%, rgba(56,189,248,0.22), rgba(99,102,241,0.12) 28%, transparent 62%)`,
  }
})

const rings = ref(
  Array.from({ length: 3 }, (_, index) => ({
    id: index,
    size: 360 + index * 170,
    top: 16 + index * 10,
    left: 50,
    opacity: 0.12 - index * 0.02,
    hue: index % 2 === 0 ? '34,211,238' : '129,140,248',
  }))
)

const ringStyle = (ring) => ({
  width: `${ring.size}px`,
  height: `${ring.size}px`,
  top: `${ring.top}%`,
  left: `${ring.left}%`,
  borderColor: `rgba(${ring.hue},${ring.opacity})`,
  transform: `translate(-50%, -50%) rotateX(${64 + tiltX.value * 0.2}deg) rotateY(${tiltY.value * 0.2}deg)`,
  boxShadow: `0 0 40px rgba(${ring.hue},0.18)`,
})

const orbs = ref(
  Array.from({ length: 5 }, (_, i) => ({
    id: i,
    size: 220 + Math.random() * 160,
    top: 5 + Math.random() * 60,
    left: -20 + Math.random() * 140,
    color:
      i % 2 === 0
        ? 'radial-gradient(circle at 30% 30%, rgba(34,211,238,0.75), transparent 60%)'
        : 'radial-gradient(circle at 30% 30%, rgba(129,140,248,0.75), transparent 60%)',
    delay: `${i * 1.5}s`,
    drift: `${10 + Math.random() * 8}s`,
    depth: (i + 1) * 0.8,
  }))
)

const orbStyle = (orb) => ({
  width: `${orb.size}px`,
  height: `${orb.size}px`,
  top: `${orb.top}%`,
  left: `${orb.left}%`,
  backgroundImage: orb.color,
  // Improvement: apply parallax offset per-orb depth so each layer moves differently in 3D space.
  transform: `translate3d(${tiltY.value * orb.depth}px, ${tiltX.value * orb.depth}px, 0)`,
  animation: `orbFloat ${orb.drift} ease-in-out infinite`,
  animationDelay: orb.delay,
})

// Improvement: reduce particle workload on fallback mode while preserving cyber look.
const particleCount = computed(() => {
  if (performanceMode.value === 'low') {
    return viewportWidth.value < 768 ? 16 : 24
  }

  return viewportWidth.value < 768 ? 36 : 55
})

const particlesFpsLimit = computed(() => (performanceMode.value === 'low' ? 30 : 60))

const options = computed(() => ({
  fullScreen: { enable: false },
  background: { color: { value: 'transparent' } },
  fpsLimit: particlesFpsLimit.value,
  detectRetina: true,

  particles: {
    number: { value: particleCount.value, density: { enable: true, area: 900 } },
    color: { value: ['#22d3ee', '#60a5fa', '#a78bfa'] },
    links: {
      enable: true,
      distance: 150,
      color: '#22d3ee',
      opacity: 0.22,
      width: 1,
    },
    move: {
      enable: true,
      speed: 0.9,
      direction: 'none',
      outModes: { default: 'out' },
    },
    opacity: { value: 0.45 },
    size: { value: { min: 1, max: 2.5 } },
  },

  interactivity: {
    // Improvement: disable expensive pointer reactions in low-power mode.
    detectsOn: 'window',
    events: {
      onHover: { enable: performanceMode.value === 'high', mode: ['grab', 'repulse'] },
      onClick: { enable: performanceMode.value === 'high', mode: 'push' },
    },
    modes: {
      grab: { distance: 180, links: { opacity: 0.35 } },
      repulse: { distance: 140, duration: 0.25 },
      push: { quantity: 3 },
    },
  },
}))
</script>

<style scoped>
@keyframes orbFloat {
  0%,
  100% {
    opacity: 0.45;
  }
  50% {
    opacity: 0.7;
  }
}

@media (prefers-reduced-motion: reduce) {
  * {
    animation: none !important;
    transition: none !important;
  }
}
</style>
  