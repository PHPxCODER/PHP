<template>
  <div ref="containerRef" class="relative overflow-hidden">
    <!-- Hidden, unclipped copy used only to measure the content's natural width. -->
    <div
      ref="measureRef"
      class="invisible absolute left-0 top-0 whitespace-nowrap pointer-events-none"
      aria-hidden="true"
    >
      <slot />
    </div>

    <div
      v-if="isOverflowing"
      class="marquee-track inline-flex w-max whitespace-nowrap"
      :style="{ '--marquee-duration': `${duration}s` }"
    >
      <span class="pr-12"><slot /></span>
      <span class="pr-12" aria-hidden="true"><slot /></span>
    </div>
    <div v-else class="truncate">
      <slot />
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  // Scroll speed in pixels per second.
  speed: {
    type: Number,
    default: 20,
  },
})

const containerRef = ref(null)
const measureRef = ref(null)
const isOverflowing = ref(false)
const duration = ref(8)

let resizeObserver

const measure = () => {
  const container = containerRef.value
  const measurer = measureRef.value
  if (!container || !measurer) return

  const contentWidth = measurer.scrollWidth
  isOverflowing.value = contentWidth > container.clientWidth
  if (isOverflowing.value) {
    duration.value = Math.max(contentWidth / props.speed, 6)
  }
}

onMounted(() => {
  measure()
  resizeObserver = new ResizeObserver(() => measure())
  if (containerRef.value) resizeObserver.observe(containerRef.value)
  if (measureRef.value) resizeObserver.observe(measureRef.value)
})

onBeforeUnmount(() => {
  resizeObserver?.disconnect()
})
</script>

<style scoped>
.marquee-track {
  animation: marquee var(--marquee-duration, 8s) linear infinite;
}

.marquee-track:hover {
  animation-play-state: paused;
}

@keyframes marquee {
  from {
    transform: translateX(0);
  }
  to {
    transform: translateX(-50%);
  }
}

@media (prefers-reduced-motion: reduce) {
  .marquee-track {
    animation: none;
  }
}
</style>
