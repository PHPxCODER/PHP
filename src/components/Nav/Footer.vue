<template>
  <div class="w-full flex justify-center p-4">
    <div
      class="md:w-9/12 flex flex-col md:flex-row justify-between items-start gap-2 md:items-center"
    >
      <a
        href="https://github.com/PHPxCODER/PHP"
        class="font-bold text-xl"
        target="_blank"
        rel="noreferrer noopener"
        >{{ text }}</a
      >
      <Contact />
    </div>
  </div>
</template>

<script setup>
const text = 'This Website is Open Source on Github'
</script>
