<template>
  <div class="flex gap-4 flex-wrap justify-start sm:justify-between">
    <div class="flex gap-3">
      <button
        @click="share('https://api.whatsapp.com/send?text=')"
        class="button"
      >
        <IconBrand name="Whatsapp" class="text-[#25D366] h-7 w-7" />
      </button>
      <button
        @click="share('https://telegram.me/share/url?url=')"
        class="button"
      >
        <IconBrand name="Telegram" class="h-7 w-7 text-[#2EAADE]" />
      </button>
      <button
        @click="
          share('https://twitter.com/intent/tweet?via=AnakinS07677978&text=')
        "
        class="button"
      >
        <IconBrand name="Twitter" class="text-[#1DA1F2] h-7 w-7" />
      </button>
    </div>
    <div
      class="flex-grow flex items-center gap-2 rounded-lg bg-gray-900 ring-2 ring-green-600 text-lg bg-opacity-30"
      v-tooltip="{ content: 'Kopyala!' }"
    >
      <input
        type="text"
        class="w-full bg-transparent rounded-lg focus:outline-none p-4"
        readonly
        :value="`https://phpxcoder.in${path}`"
        @click="copy()"
      />
      <div
        class="p-4 rounded-r-lg bg-gray-900 bg-opacity-30 h-full flex items-center justify-center"
        @click="copy()"
      >
        <transition v-if="copied" name="fade" mode="out-in">
          <IconCheck class="text-green-600 h-7 w-7" />
        </transition>
        <transition v-else name="fade" mode="out-in">
          <IconLink class="text-gray-200 h-7 w-7" />
        </transition>
      </div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  path: {
    type: String,
  },
})

const copied = ref(false)

function copy() {
  copied.value = true
  navigator.clipboard.writeText(`https://phpxcoder.in${props.path}`)
  setTimeout(() => (copied.value = false), 3000)
}

function share(url) {
  window.open(
    `${url}https://phpxcoder.in${props.path}`,
    '_blank',
    'width=400,height=550'
  )
}
</script>

<style lang="scss" scoped>
.button {
  @apply bg-gray-900 bg-opacity-30 ring-2 ring-green-600 p-4 flex cursor-pointer items-center justify-center rounded-lg;
}
</style>
