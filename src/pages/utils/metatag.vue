<template>
  <div class="flex gap-3 flex-col w-full h-full">
    <p>Enter an URL to this textbox example is https://phpxcoder.in/</p>
    <input
      type="text"
      placeholder="Enter an URL"
      class="p-4 bg-gray-800 focus:outline-none rounded-md ring-2 placeholder-gray-400 dark:placeholder-gray-700 ring-green-600 bg-opacity-30"
      v-model="url"
    />
    <button
      class="focus:outline-none bg-green-600 p-2 w-full rounded-md font-bold text-2xl"
      @click="fetchMeta"
    >
      Fetch
    </button>
    <div class="text-2xl text-red-600 font-bold" v-if="fetchError">
      Fetching metatag is failed!
    </div>
    <div
      v-else-if="loading"
      class="font-bold text-2xl flex gap-2 items-center flex-wrap justify-center flex-grow"
    >
      <IconCircle class="animate-spin w-16 h-16" />
      Please wait, fetching now!
    </div>
    <div v-else-if="tag">
      <div class="flex flex-col gap-3">
        <div
          class="flex flex-col gap-3 p-4 rounded-md bg-gray-900 bg-opacity-30"
        >
          <a
            class="flex gap-2 flex-wrap text-blue-600"
            v-if="tag.metadata?.website"
            :href="tag.metadata.website"
            ><img
              :src="tag.favicons?.[1]"
              class="w-6 h-6 rounded-md"
            />{{ tag.metadata.website }}</a
          >
          <h1 v-if="tag.metadata?.title" class="font-bold text-lg">
            Title: {{ tag.metadata.title }}
          </h1>
          <Skeleton
            type="image"
            class="h-full min-h-96 rounded-md"
            :imageUrl="tag.metadata?.banner"
          />
          <div v-if="tag.metadata?.description">
            <h1 class="font-bold text-lg">Description:</h1>
            <p>{{ tag.metadata.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const url = ref('https://phpxcoder.in/')
const tag = ref(null)
const loading = ref(false)
const fetchError = ref(false)

async function fetchMeta() {
  loading.value = true
  fetchError.value = false
  try {
    const data = await $fetch('/api/metatag', {
      params: { url: url.value },
    })
    tag.value = data
  } catch (e) {
    fetchError.value = true
  } finally {
    loading.value = false
  }
}

const title = 'Metatag Viewer'
const description =
  'Fetch metatag from a website and display it in a simple way'

useHead({ title })
useSeoMeta({
  description,
  ogTitle: title,
  ogDescription: description,
  ogUrl: 'https://phpxcoder.in/utils/metatag',
  twitterTitle: title,
  twitterDescription: description,
})
</script>
