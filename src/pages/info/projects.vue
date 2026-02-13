<template>
  <div class="flex flex-col items-start">
    <div class="grid">
      <h1 class="text-xl font-bold">Projects are made by me</h1>
      <div class="grid gap-3 sm:grid-cols-2 mt-2">
        <CardProject
          :project="project"
          v-for="(project, index) in projects"
          :key="`project-${index}`"
        />
      </div>
      <WidgetTechnologies class="mt-2" />
    </div>
  </div>
</template>

<script setup>
const projects = [
  {
    title: '345 Launcher',
    image: 'https://i.vgy.me/4oVLsP.png',
    description: 'Lightweight and advanced Minecraft Launcher',
    link: 'https://github.com/mehmetali345dev/345-launcher',
  },
  {
    title: 'RepeatPay',
    image: 'https://repeatpay.ga/icon.png',
    description:
      'New open-source donate system for community. Easy, fast and secure.',
    link: 'https://repeatpay.ga',
  },
  {
    title: 'This website',
    image: 'https://345dev.me/icon.png',
    description: 'My personal portfolio made with NuxtJS and TailwindCSS',
    link: '/',
  },
  {
    title: 'MADE',
    image: 'https://made.345dev.me/icon.png',
    description:
      "Awesome showcase for dotfiles and a wiki for ricing and for intruducing WM/DE's and ricing releated software to new users.",
    link: 'https://made.345dev.me',
  },
]

const title = 'Projects'
const description = 'You can see my projects and works from here.'

useHead({ title })
useSeoMeta({
  description,
  ogTitle: title,
  ogDescription: description,
  ogUrl: 'https://phpxcoder.in/info/projects',
  twitterTitle: title,
  twitterDescription: description,
})
</script>
