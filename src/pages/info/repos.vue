<template>
  <div class="flex flex-col w-full items-start">
    <div class="grid w-full">
      <h1 class="text-xl font-bold">My repos</h1>
      <div v-if="pending" class="grid gap-3 sm:grid-cols-2 mt-2">
        <Skeleton
          type="repository"
          v-for="index in 9"
          :key="index"
          class="w-full h-full"
        />
      </div>
      <div v-else-if="error">Couldn't load GitHub repositories.</div>

      <div
        v-else-if="repos && repos.length > 0"
        class="grid gap-3 grid-cols-1 sm:grid-cols-2 mt-2"
      >
        <a
          v-for="(repo, index) in repos"
          :key="`repo-${index}`"
          :href="repo.html_url"
          target="_blank"
          class="w-full"
          rel="noreferrer"
          title="Click here to visit this repository"
        >
          <CardRepo :repo="repo" class="h-full w-full" />
        </a>
      </div>
    </div>
  </div>
</template>

<script setup>
const {
  data: repos,
  pending,
  error,
} = useLazyFetch(
  'https://api.github.com/users/phpxcoder/repos?per_page=100',
  {
    server: false,
    transform: (data) =>
      data?.sort((a, b) => b?.stargazers_count - a?.stargazers_count),
  }
)

const title = 'Repos'
const description = 'You can see my repos from here.'

useHead({ title })
useSeoMeta({
  description,
  ogTitle: title,
  ogDescription: description,
  ogUrl: 'https://phpxcoder.in/info/repos',
  twitterTitle: title,
  twitterDescription: description,
})
</script>
