<template>
  <header class="w-full flex gap-2 flex-col items-start">
    <div class="flex items-center gap-2">
      <div class="grid items-center about mt-2">
        <h1 class="font-bold text-2xl">Hello, I'm PHP</h1>
        <p>
          PHP a
          <span v-tooltip="`${calculateAgeDecimals}`">{{ calculateAge }}</span>
          Years Old Self-Taught Student from India, Who's Currently Learning
          Backend Web Development To Create Stunning User Experiences on the
          Front-End, Scalable and Secure Infrastructure.
        </p>
      </div>
      <NuxtImg src="/php.png" class="rounded-md w-32 h-32" alt="PHP" />
    </div>
    <div class="flex flex-col md:grid md:grid-cols-2 gap-2 w-full">
      <WidgetDiscord />
      <WidgetSpotify class="h-full" />
    </div>

    <div class="flex flex-col">
      <h1 class="font-bold text-lg">Technologies I Use</h1>
      <div class="h-full my-2 grid sm:grid-cols-2 md:grid-cols-4 gap-3">
        <div
          v-for="(tech, index) in technologies"
          :key="`tech-${index}`"
          class="bg-gray-900 rounded-md bg-opacity-30 flex items-center justify-between p-4"
        >
          <IconBrand :name="tech" class="w-10 h-10" />
          <h1 class="bold">{{ tech }}</h1>
        </div>
      </div>
    </div>
  </header>
</template>

<script setup>
const technologies = [
  'Node.js',
  'JavaScript',
  'TypeScript',
  'Vue.js',
  'Python',
  'Firebase',
  'React',
  'Nuxt.js',
  'PHP',
  'Figma',
  'Sass',
  'TailwindCSS',
  'Github',
  'Vercel',
  'Docker',
  'NGINX',
  'Elixir',
  'AWS',
  'Digital Ocean',
]

const age = ref((new Date() - new Date('2004/07/21')) / 31557600000)

const calculateAge = computed(() => {
  const currentDate = new Date()
  const birthDate = new Date('2004/07/21')
  const difference = currentDate - birthDate
  return Math.floor(difference / 31557600000)
})

const calculateAgeDecimals = computed(() => {
  return age.value
})

let ageInterval
onMounted(() => {
  ageInterval = setInterval(() => {
    age.value = (new Date() - new Date('2004/07/21')) / 31557600000
  }, 500)
})

onBeforeUnmount(() => {
  clearInterval(ageInterval)
})
</script>
