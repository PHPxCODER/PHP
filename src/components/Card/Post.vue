<template>
  <NuxtLink
    v-if="type == 'latest'"
    :to="postMeta.path || `/blog/${postMeta.slug}`"
    class="bg-gray-900 scale-up flex justify-start bg-opacity-30 items-center rounded-md px-6 py-4"
  >
    <img
      :src="postMeta.image"
      class="rounded-md h-16 w-20 object-cover mr-3"
    />
    <div class="flex flex-col">
      <h1 class="font-semibold text-lg">{{ postMeta.title }}</h1>
      <p class="line-clamp-2 text-sm text-left">
        {{ postMeta.description }}
      </p>
    </div>
  </NuxtLink>
  <NuxtLink
    v-else
    :to="postMeta.path || `/blog/${postMeta.slug}`"
    class="bg-gray-900 flex bg-opacity-30 items-center rounded-md px-6 py-4"
  >
    <div class="flex flex-col">
      <h1 class="font-semibold text-lg">{{ postMeta.title }}</h1>
      <p class="line-clamp-2 text-sm text-left">
        {{ postMeta.description }}
      </p>
    </div>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  post: {
    type: Object,
    required: true,
    default: () => ({}),
  },
  type: {
    type: String,
    default: 'normal',
  },
})

const postMeta = computed(() => {
  const slug =
    props.post._path?.replace('/blog/', '') || props.post.slug || ''
  const image =
    props.post.image || `/assets/images/posts/${slug}.jpg` || ''
  return {
    title: props.post.title || '',
    description: props.post.description || '',
    slug,
    path: props.post._path || '',
    special: props.post.special || false,
    tag: props.post.tags?.[0] || '',
    image,
  }
})
</script>
