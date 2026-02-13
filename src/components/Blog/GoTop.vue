<script setup>
const position = ref(0)

const isActive = computed(() => position.value > 100)

function updatePosition() {
  position.value = window.scrollY
}

function goTop() {
  window.scrollTo(0, 0)
}

onMounted(() => {
  window.addEventListener('scroll', updatePosition)
})

onBeforeUnmount(() => {
  window.removeEventListener('scroll', updatePosition)
})
</script>

<template>
  <transition name="fade">
    <div
      v-show="isActive"
      class="rounded-full cursor-pointer flex b p-2 text-white items-center bg-gray-900 bg-opacity-30 hover:shadow-md"
      @click="goTop"
    >
      <IconChevron up class="h-6 w-6" />
    </div>
  </transition>
</template>
