<template>
  <div
    v-if="!finished || !statusDetails || Object.keys(lanyard).length === 0"
    class="bg-gray-900 bg-opacity-30 w-full flex animate-pulse p-4 rounded-md"
  >
    <div class="w-16 h-16 rounded-md mr-4 bg-gray-800 outline-none" />
    <div class="flex flex-col justify-center space-y-3">
      <h1 class="h-4 w-16 bg-gray-800"></h1>
      <h1 class="h-4 w-28 bg-gray-800"></h1>
      <h1 class="h-4 w-28 bg-gray-800"></h1>
    </div>
  </div>

  <div v-else class="w-full h-full">
    <div
      class="bg-gray-700 bg-opacity-30 h-full flex flex-col justify-center gap-2 p-4 rounded-md"
    >
      <div class="flex space-x-2 items-center">
        <img
          :src="`https://cdn.discordapp.com/avatars/697757845063729194/${lanyard.discord_user?.avatar}`"
          class="w-9 h-9 rounded-full"
          alt
          v-tooltip="'Profile Pic'"
        />
        <div
          :class="`h-3 w-3 rounded-full flex-shrink-0 ${discordStatus}`"
          v-tooltip="`${lanyard.discord_status}`"
        />
        <h1 class="font-bold truncate">
          {{
            lanyard.discord_user?.username +
            '#' +
            lanyard.discord_user?.discriminator
          }}
        </h1>
      </div>

      <div
        v-if="
          lanyard.activities?.filter((activity) => activity.type === 0)
            .length !== 0
        "
        class="flex gap-2"
      >
        <img
          class="w-16 h-16 relative rounded-md md:flex hidden outline-none"
          alt
          :src="statusImage"
        />

        <div class="flex flex-col space-y-1 justify-center">
          <div class="text-sm font-bold leading-tight truncate">
            {{ statusDetails.name }}
          </div>
          <div class="text-sm leading-tight truncate">
            {{ statusDetails.details }}
          </div>
          <div class="text-sm leading-tight truncate">
            {{ statusDetails.state }}
          </div>
        </div>
      </div>
      <div v-else>
        <h1 class="font-bold text-sm leading-tight truncate">
          I'm not Doing Anything
        </h1>
      </div>
    </div>
  </div>
</template>

<script setup>
const finished = ref(false)
const lanyard = ref({})
const socket = ref(null)

const statusDetails = computed(() => {
  const filtered =
    lanyard.value.activities
      ?.filter((activity) => activity.type === 0)
      ?.pop() || {}
  return filtered
})

const discordStatus = computed(() => {
  switch (lanyard.value.discord_status) {
    case 'online':
      return 'bg-emerald-500'
    case 'idle':
      return 'bg-yellow-500'
    case 'dnd':
      return 'bg-red-500'
    default:
      return 'bg-gray-500 dark:bg-gray-200'
  }
})

const statusImage = computed(() => {
  const filtered =
    lanyard.value.activities
      ?.filter((activity) => activity.type === 0)
      ?.pop() || {}

  if (filtered.name === 'Spotify' && filtered.assets?.large_image) {
    return `https://media.discordapp.net/external/${filtered.assets.large_image.substring(12)}`
  }
  if (filtered.name === 'VALORANT') {
    return 'https://cdn.discordapp.com/app-icons/700136079562375258/e55fc8259df1548328f977d302779ab7.webp'
  }
  if (filtered.name === 'Grand Theft Auto V') {
    return 'https://cdn.discordapp.com/app-icons/356876176465199104/069d9f4871b5ebd2f62bd342ce6ba77f.webp'
  }
  if (filtered.name === 'PUBG') {
    return 'https://cdn.discordapp.com/app-icons/356873622985506820/d8cd6c5b1fe5b64ad2e0f660238eb43e.webp'
  }
  if (filtered.name === 'PUBG LITE') {
    return 'https://cdn.discordapp.com/app-icons/597588168178663434/8ecc61c6b6ddbb017fe82342192054c0.webp'
  }
  if (filtered.name === 'Counter-Strike: Global Offensive') {
    return 'https://cdn.discordapp.com/app-icons/356875057940791296/782a3bb612c6f1b3f7deed554935f361.webp'
  }
  if (filtered.name === 'FORTNITE') {
    return 'https://cdn.discordapp.com/app-icons/432980957394370572/09120a438d2c5429242f0f0ab862fb28.webp'
  }
  if (filtered.name === 'The Sims 4') {
    return 'https://cdn.discordapp.com/app-icons/359509007423242240/912bd1dd19dfd2ef3b0191985f942a40.webp'
  }
  if (filtered.name === 'YouTube') {
    return 'https://cdn.discordapp.com/app-assets/463097721130188830/513734690272968717.webp'
  }
  if (
    (filtered.name === 'YouTube Music' || filtered.name === 'Visual Studio Code') &&
    filtered.assets?.large_image
  ) {
    return `https://media.discordapp.net/external/${filtered.assets.large_image.substring(12)}`
  }
  if (filtered.name === 'Prime Video') {
    return 'https://cdn.discordapp.com/app-assets/705139844883677224/705140011946737806.webp'
  }
  if (filtered.name === 'Netflix' && filtered.assets?.large_image) {
    return `https://media.discordapp.net/external/${filtered.assets.large_image.substring(12)}`
  }
  if (filtered.name === 'GitHub' && filtered.assets) {
    return 'https://cdn.discordapp.com/app-assets/607587875122446359/607911518234869760.png'
  }
  if (filtered.name === 'Uncrashed : FPV Drone Simulator') {
    return 'https://yt3.ggpht.com/KaHU3tbhahqfV9G6X-qmBooE6B1ML8a0st9XxnWBTbGa1OLn55uOAKFTrMlncVCPNoMooxYY=s900-c-k-c0x00ffffff-no-rj'
  }
  if (filtered.assets == null) {
    return '/php.png'
  }
  return `https://cdn.discordapp.com/app-assets/${filtered.application_id}/${filtered.assets.large_image}`
})

let heartbeatInterval

onMounted(() => {
  socket.value = new WebSocket('wss://api.phpxcoder.in/socket')
  socket.value.addEventListener('open', () => {
    socket.value.send(
      JSON.stringify({
        op: 2,
        d: { subscribe_to_id: '697757845063729194' },
      })
    )
    heartbeatInterval = setInterval(() => {
      socket.value.send(JSON.stringify({ op: 3 }))
    }, 30000)
  })
  socket.value.addEventListener('message', ({ data }) => {
    const { t: type, d: status } = JSON.parse(data)
    if (type === 'INIT_STATE' || type === 'PRESENCE_UPDATE')
      lanyard.value = status || {}
    finished.value = true
  })
})

onBeforeUnmount(() => {
  clearInterval(heartbeatInterval)
  socket.value?.close()
})
</script>
