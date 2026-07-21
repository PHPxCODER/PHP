<template>
  <div
    v-if="!finished || !statusDetails || Object.keys(lanyard).length === 0"
    class="bg-emerald-500 dark:bg-emerald-600 w-full h-full flex items-center animate-pulse p-4 rounded-md"
  >
    <div class="w-16 h-16 rounded-md mr-4 bg-gray-900 outline-none" />
    <div class="flex flex-col justify-center space-y-2">
      <h1 class="h-4 w-24 bg-gray-900"></h1>
      <h1 class="h-4 w-36 bg-gray-900"></h1>
      <h1 class="h-4 w-48 bg-gray-900"></h1>
      <h1 class="h-4 w-40 bg-gray-900"></h1>
    </div>
  </div>

  <div
    v-else-if="
      lanyard.activities?.filter((activity) => activity.type === 2).length !== 0
    "
    class="h-full w-full"
  >
    <div
      class="bg-emerald-500 dark:bg-emerald-600 h-full bg-opacity-30 flex p-4 items-center rounded-md min-w-0"
    >
      <a
        :href="statusLink"
        title="View Song on Spotify"
        target="_blank"
        class="h-full items-center flex min-w-0 w-full"
      >
        <img
          class="w-20 h-20 rounded-md md:flex hidden mr-4 bg-gray-900 outline-none"
          alt
          :src="statusImage"
        />
        <div class="flex flex-col space-y-1 justify-center min-w-0 flex-1">
          <Marquee class="text-sm font-bold leading-tight">
            {{ statusDetails.details }}
          </Marquee>
          <Marquee class="text-sm leading-tight">
            {{ 'By ' + statusArtist }}
          </Marquee>
          <div class="text-sm leading-tight truncate">
            {{ 'From ' + statusDetails.assets?.large_text }}
          </div>
          <div class="text-sm leading-tight truncate">
            {{ 'Elapsed: ' + updatedTimestamp + ' / ' + endTimestamp }}
          </div>
        </div>
      </a>
    </div>
  </div>
  <div
    v-else
    class="w-full bg-gray-700 bg-opacity-30 items-center flex p-4 rounded-md"
  >
    <h1 class="font-bold text-xl">PHP isn't Listening !</h1>
  </div>
</template>

<script setup>
const finished = ref(false)
const lanyard = ref({})
const socket = ref(null)
const updatedTimestamp = ref('')

const statusDetails = computed(() => {
  return (
    lanyard.value.activities
      ?.filter((activity) => activity.type === 2)
      ?.pop() || {}
  )
})

const statusArtist = computed(() => {
  const filtered =
    lanyard.value.activities
      ?.filter((activity) => activity.type === 2)
      ?.pop() || null
  if (lanyard.value?.discord_status === 'offline') return 'Offline'
  else if (!filtered) return 'Online'
  else if (filtered.name === 'Spotify' && !!lanyard.value.spotify) {
    const { artist } = lanyard.value.spotify || {}
    const firstArtist = artist?.replaceAll(';', ',')
    return `${firstArtist || 'someone'}`
  }
  return ''
})

const statusLink = computed(() => {
  const filtered =
    lanyard.value.activities
      ?.filter((activity) => activity.type === 2)
      ?.pop() || null
  if (lanyard.value?.discord_status === 'offline') return 'Offline'
  else if (!filtered) return 'Online'
  else if (filtered.name === 'Spotify' && !!lanyard.value.spotify) {
    return `https://open.spotify.com/track/${filtered.sync_id}?si=d4270c86c37947d7`
  }
  return ''
})

const endTimestamp = computed(() => {
  const filtered =
    lanyard.value.activities
      ?.filter((activity) => activity.type === 2)
      ?.pop() || null
  if (lanyard.value?.discord_status === 'offline') return 'Offline'
  else if (!filtered) return 'Online'
  else if (filtered.name === 'Spotify' && !!lanyard.value.spotify) {
    const minute = Math.floor(
      (filtered.timestamps.end - filtered.timestamps.start) / 60000
    )
    const seconds = Math.floor(
      (filtered.timestamps.end - filtered.timestamps.start) / 1000 -
        minute * 60
    )
    return minute + ':' + (seconds < 10 ? '0' : '') + seconds
  }
  return ''
})

const statusImage = computed(() => {
  const filtered =
    lanyard.value.activities
      ?.filter((activity) => activity.type === 2)
      ?.pop() || {}
  if (filtered.assets == null) {
    return '/php.png'
  }
  return `${lanyard.value.spotify?.album_art_url}`
})

let heartbeatInterval
let timestampInterval

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

  timestampInterval = setInterval(() => {
    const filtered =
      lanyard.value.activities
        ?.filter((activity) => activity.type === 2)
        ?.pop() || null
    if (lanyard.value?.discord_status === 'offline') return
    else if (!filtered) return
    else if (filtered.name === 'Spotify' && !!lanyard.value.spotify) {
      const min = Math.floor((new Date() - filtered.timestamps.start) / 60000)
      const secs = Math.floor(
        (new Date() - filtered.timestamps.start) / 1000 - 60 * min
      )
      updatedTimestamp.value =
        min + ':' + (secs < 10 ? '0' : '') + secs
    }
  }, 1000)
})

onBeforeUnmount(() => {
  clearInterval(heartbeatInterval)
  clearInterval(timestampInterval)
  socket.value?.close()
})
</script>
