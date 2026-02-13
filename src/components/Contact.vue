<template>
  <div>
    <div
      class="flex items-center md:justify-start w-full justify-between gap-2"
    >
      <a
        v-for="(link, index) in links"
        :key="`links-${index}`"
        :title="link.title"
        :href="link.url"
        target="_blank"
      >
        <IconBrand :name="link.icon" class="dark:text-white h-8 w-8" />
      </a>
      <a
        title="Send me an e-mail!"
        :href="isLoaded ? config.public.links.mail : undefined"
      >
        <IconAt class="h-8 w-8" />
      </a>
      <BlogGoTop v-if="route.path.includes('blog')" />
    </div>
  </div>
</template>

<script setup>
const config = useRuntimeConfig()
const route = useRoute()
const isLoaded = ref(false)

onMounted(() => {
  isLoaded.value = true
})

const links = computed(() => {
  const configLinks = config.public.links
  const titles = {
    discord: 'Join my Discord server!',
    twitter: 'Follow me on Twitter!',
    github: 'Follow me on GitHub!',
  }
  const array = []
  for (const item in configLinks) {
    if (item === 'mail') continue
    array.push({
      url: configLinks[item],
      title: titles[item.toLowerCase()] || `Visit ${item}!`,
      icon: item,
    })
  }
  return array
})
</script>
