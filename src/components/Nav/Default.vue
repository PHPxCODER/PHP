<template>
  <div
    class="w-full flex flex-col bg-gray-200 dark:bg-black bg-opacity-60 dark:bg-opacity-60 items-end p-4"
  >
    <div class="w-full flex items-center justify-center">
      <div class="flex w-full md:w-9/12 items-center justify-between">
        <NuxtLink to="/">
          <div class="flex items-center">
            <NuxtImg
              src="/php2.png"
              alt="PHP"
              format="webp"
              class="w-10 h-10 rounded-md"
            />
            <h1 class="font-bold hidden sm:block text-2xl ml-4">PHPxCODER</h1>
          </div>
        </NuxtLink>
        <div class="flex gap-2 items-center">
          <NuxtLink
            v-if="currentPath"
            to="/"
            class="font-bold text-lg text-black dark:text-white"
            >Go back</NuxtLink
          >
          <NuxtLink
            v-if="route.params.slug"
            to="/blog"
            class="font-bold text-lg text-black dark:text-white"
            >Geri dön</NuxtLink
          >
          <Color />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const route = useRoute()

const paths = [
  'info-projects',
  'info-repos',
  'info-whoami',
  'dictionary',
  'recommends',
  'donate',
  'blog',
]

const currentPath = computed(() => {
  return paths.includes(route.name)
})
</script>
