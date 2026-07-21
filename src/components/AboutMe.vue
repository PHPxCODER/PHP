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

// Birthday math is anchored to IST (+05:30) so the age flips over at IST
// midnight for every visitor, regardless of their local timezone. Age is
// derived from the exact real span between the last and next IST birthday
// (not an average year length), so it lands on a whole number precisely
// at the anniversary instead of drifting by up to ~half a day.
const BIRTH_YEAR = 2004
const BIRTH_MONTH_DAY = '07-21'
const IST_OFFSET_MS = 5.5 * 60 * 60 * 1000

const istBirthdayInstant = (year) => new Date(`${year}-${BIRTH_MONTH_DAY}T00:00:00+05:30`)

const computeAge = (now) => {
  const istYear = new Date(now.getTime() + IST_OFFSET_MS).getUTCFullYear()
  const birthdayThisYear = istBirthdayInstant(istYear)
  const hasHadBirthdayThisYear = now >= birthdayThisYear
  const lastBirthdayYear = hasHadBirthdayThisYear ? istYear : istYear - 1
  const lastBirthday = hasHadBirthdayThisYear ? birthdayThisYear : istBirthdayInstant(lastBirthdayYear)
  const nextBirthday = hasHadBirthdayThisYear ? istBirthdayInstant(istYear + 1) : birthdayThisYear

  const integerAge = lastBirthdayYear - BIRTH_YEAR
  const fraction = (now - lastBirthday) / (nextBirthday - lastBirthday)
  return integerAge + fraction
}

const age = ref(computeAge(new Date()))

const calculateAge = computed(() => Math.floor(age.value))

const calculateAgeDecimals = computed(() => {
  return age.value
})

let ageInterval
onMounted(() => {
  ageInterval = setInterval(() => {
    age.value = computeAge(new Date())
  }, 500)
})

onBeforeUnmount(() => {
  clearInterval(ageInterval)
})
</script>
