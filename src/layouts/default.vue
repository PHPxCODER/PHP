<template>
  <div
    class="flex min-h-screen flex-col items-center bg-gray-200 scrollbar text-black dark:(bg-black text-gray-50)"
  >
    <div class="bg-green-600 h-2 w-full" />

    <transition name="fade" mode="out-in">
      <NavDefault class="sticky top-0 z-40" />
    </transition>

    <div
      class="flex flex-col w-11/12 md:w-7/12 my-6 z-10 h-full flex-grow items-center justify-center"
    >
      <Nuxt class="flex-grow" />
    </div>
    <NavFooter />
    <div class="bg-green-600 h-2 w-full" />
  </div>
</template>

<script>
export default {}
</script>

<style></style>
