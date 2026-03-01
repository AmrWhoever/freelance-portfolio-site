<template>
    <span
      class="inline-flex items-center justify-center"
      :class="wrapperClass"
      aria-hidden="true"
    >
      <!-- أيقونة Font Awesome -->
      <i :class="[styleClass, `fa-${name}`, 'icon-base']"></i>
    </span>
  </template>
  
  <script setup>
  import { computed } from 'vue'
  
  const props = defineProps({
    // اسم الأيقونة بدون fa-
    name: { type: String, required: true },
  
    // solid | brands | regular
    variant: {
      type: String,
      default: 'solid'
    },
  
    // كلاس Tailwind إضافي للّون/الحجم
    wrapperClass: {
      type: String,
      default: 'text-cyan-300'
    }
  })
  
  const styleClass = computed(() => {
    if (props.variant === 'brands') return 'fa-brands'
    if (props.variant === 'regular') return 'fa-regular'
    return 'fa-solid'
  })
  </script>
  
  <style scoped>
  .icon-base {
    font-size: 1.25rem;
    text-shadow: 0 0 8px rgba(34, 211, 238, 0.55);
  }
  </style>
  