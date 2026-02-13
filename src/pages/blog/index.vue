<template>
  <div class="flex flex-col space-y-2">
    <h1 class="font-bold text-2xl">Son Gönderiler</h1>
    <div v-if="pending" class="items-center">Gönderiler alınıyor</div>
    <div class="grid md:grid-cols-2 w-full gap-3">
      <CardPost
        type="latest"
        v-for="(post, index) in latestPosts"
        :key="`latest-${index}`"
        :post="post"
        class="w-full"
      />
    </div>
    <h1 v-if="allPosts && allPosts.length > 0" class="font-bold text-xl mt-4">
      Diğer Gönderiler
    </h1>
    <div
      v-if="allPosts && allPosts.length > 0"
      class="grid sm:grid-cols-3 w-full gap-3 mt-4"
    >
      <CardPost
        type="rest"
        v-for="(post, index) in allPosts"
        :key="`all-${index}`"
        :post="post"
        class="w-full"
      />
    </div>
  </div>
</template>

<script setup>
const { data: latestPosts, pending } = await useAsyncData('latest-posts', () =>
  queryContent('blog')
    .sort({ date: -1 })
    .limit(4)
    .without(['body'])
    .find()
)

const { data: allPosts } = await useAsyncData('all-posts', () =>
  queryContent('blog')
    .sort({ date: -1 })
    .skip(4)
    .without(['body'])
    .find()
)

const title = 'Blog'
const description =
  "Mehmetali345Dev'in projelerini konuştuğu ve boş yaptığı blog sayfası."

useHead({ title })
useSeoMeta({
  description,
  ogTitle: title,
  ogDescription: description,
  ogUrl: 'https://phpxcoder.in/blog',
  twitterTitle: title,
  twitterDescription: description,
})
</script>
