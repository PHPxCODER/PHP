<template>
  <div
    v-if="error"
    class="p-4 flex flex-col justify-center items-center w-full space-y-4"
  >
    <h1 class="font-bold">Gönderi bulunamadı...</h1>
    <NuxtLink
      to="/blog"
      class="bg-gray-900 bg-opacity-30 rounded-md p-4 flex justify-center text-xl font-bold"
      >Nası ya?</NuxtLink
    >
  </div>
  <div v-else-if="post" class="flex-col items-center w-full flex">
    <header class="flex flex-col items-center">
      <div class="relative">
        <Skeleton
          type="image"
          :imageUrl="post.banner"
          class="h-60 rounded md:w-full -mx-[4.25vw] md:mx-0 filter dark:brightness-75"
        />
        <div
          class="absolute flex gap-2 text-white -mx-[4.25vw] md:mx-0 bottom-5 left-5"
        >
          <div
            class="bg-black bg-opacity-50 font-bold p-4 flex gap-2 items-center rounded"
          >
            <IconCalendar class="h-6 w-6" />
            {{ getReadableDate(post.date) }}
          </div>
          <NuxtLink
            :to="$route.path + '#share'"
            class="bg-green-600 rounded p-4 bg-opacity-50 font-bold"
            >Paylaş</NuxtLink
          >
        </div>
      </div>
      <div class="w-full mt-4 bg-gray-900 bg-opacity-30 p-4 rounded">
        <h1 class="text-2xl font-bold">{{ post.title }}</h1>
        <p>{{ post.description }}</p>
      </div>
    </header>
    <article class="w-full">
      <ContentRenderer :value="post" class="my-8 nuxt-content" />
    </article>
    <div class="w-full mt-4" v-if="related && related.length > 0">
      <h1 class="text-2xl font-bold">Benzer Gönderiler</h1>
      <div class="grid grid-cols-2">
        <CardPost
          type="rest"
          v-for="(relPost, index) in related"
          :key="`related-${index}`"
          :post="relPost"
          class="w-full"
        />
      </div>
    </div>
    <div class="w-full mt-4" id="share">
      <h1 class="text-2xl font-bold">Paylaş</h1>
      <BlogShare class="mt-2" :path="$route.path" />
    </div>
    <div class="w-full mt-4" v-if="post.tags && post.tags.length > 0">
      <h1 class="text-2xl font-bold">Etiketler</h1>
      <div class="flex flex-wrap mt-2 gap-2">
        <div
          class="bg-gray-900 flex justify-center items-center rounded-md p-4 bg-opacity-30"
          v-for="(tag, index) in post.tags"
          :key="`tag-${index}`"
        >
          {{ tag }}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import dayjs from 'dayjs'

const route = useRoute()
const slug = route.params.slug

const { data: post, error } = await useAsyncData(`blog-${slug}`, () =>
  queryContent('blog', slug).findOne()
)

const { data: related } = await useAsyncData(`related-${slug}`, async () => {
  if (!post.value?.related) return []
  const keys = post.value.related.split(', ')
  const results = []
  for (const key of keys) {
    const content = await queryContent('blog', key)
      .only(['title', 'slug', 'description', '_path'])
      .findOne()
    if (content) results.push(content)
  }
  return results
})

if (post.value) {
  const title = `${post.value.title} | Blog`
  const description =
    post.value.description || 'Bu yazıyı okumaya davet edildin..'
  const image = post.value.banner || false
  const href = `https://phpxcoder.in${route.path}`

  useHead({ title })
  useSeoMeta({
    description,
    keywords: `${(post.value.tags || []).join(', ')}, phpxcoder, blog, linux, vue, nuxt`,
    ogTitle: title,
    ogDescription: description,
    ogUrl: href,
    ogImage: image,
    twitterTitle: title,
    twitterDescription: description,
    twitterImage: image,
    articlePublishedTime: post.value.date || null,
  })
}

function getReadableDate(data) {
  const now = dayjs()
  const createdAt = dayjs(data)
  const diff = now.diff(createdAt, 'day')
  if (diff === 0) return 'Bugün'
  else if (diff === 1) return 'Dün'
  else if (diff <= 30) return `${diff} gün önce`
  else if (diff >= 30 && diff <= 90)
    return `${Math.floor(diff / 30)} ay önce`
  else return createdAt.format('DD/MM/YYYY')
}
</script>
