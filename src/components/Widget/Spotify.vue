<template>
  <div
        v-if="
      finished === false ||
      !getStatusDetails ||
      Object.keys(lanyard).length === 0
    "
    class="bg-green-500 w-full h-full flex items-center animate-pulse p-4 rounded-md"
  >
    <div class="w-16 h-16 rounded-md mr-4 bg-gray-900 outline-none" />
    <div class="flex flex-col justify-center space-y-3">
      <h1 class="h-4 w-16 bg-gray-900"></h1>
      <h1 class="h-4 w-28 bg-gray-900"></h1>
    </div>
  </div>

  <div v-else-if=" Object.keys(
            lanyard.activities.filter((activity) => activity.type === 2)
          ).length !== 0" class="h-full w-full">
    <div
      class="bg-green-500 dark:bg-green-500 h-full bg-opacity-30 flex p-4 items-center rounded-md"
    >
      <a
        
        title="View song on LastFM"
        target="_blank"
        class="h-full items-center flex"
      >
        <img
          class="w-20 h-20 rounded-md md:flex hidden mr-4 bg-gray-900 outline-none"
          alt
          :src="getStatusImage"
        />
        <div class="flex flex-col space-y-1 justify-center">
          <div class="text-sm font-bold leading-tight truncate-ellipsis">
            {{ getStatusDetails.details }}
          </div>
          <div class="text-sm leading-tight truncate-ellipsis">
            {{ 'By ' + getStatusArtist }}
          </div>
          <div class="text-sm leading-tight truncate-ellipsis">
            {{ 'From ' + getStatusDetails.assets.large_text }}
          </div>
        </div>
      </a>
    </div>
  </div>
  <div
    v-else
    class="w-full bg-gray-900 bg-opacity-30 items-center flex p-4 rounded-md"
  >
    <h1 class="font-bold text-xl">PHP isn't Listening !</h1>
  </div>
</template>

<script>

export default {
  data() {
    return {
      finished: false,
      lanyard: {},
      socket: null,
    }
  },

  computed: {
    /**
     * Returns status detail as string.
     * @returns {string}
     */

    getStatusDetails() {
      const lanyard = this.lanyard
      const filtered =
        lanyard.activities?.filter((activity) => activity.type === 2)?.pop() ||
        {}
      if (!lanyard) return {}
      else {
        return filtered
      }
    },
    getStatusArtist() {
      const lanyard = this.lanyard
      const filtered =
        lanyard.activities?.filter((activity) => activity.type === 2)?.pop() ||
        null
     if (this.lanyard?.discord_status === "offline") return "Offline"
     else if (!filtered) return "Online"
     
     else if (filtered.name === "Spotify" && !!lanyard.spotify) {
      const { song, artist } = lanyard.spotify || {}
      const firstArtist = artist?.replace(";", ",")
      //const newstr = str.replace(";", ","); 
        
      return `${firstArtist || "someone"}`
        
      }
    },

    getDiscordStatus() {
      switch (this.lanyard.discord_status) {
        case 'online':
          return 'bg-green-500'
        case 'idle':
          return 'bg-yellow-500'
        case 'dnd':
          return 'bg-red-500'
        default:
          return 'bg-gray-500 dark:bg-gray-200'
      }
    },
    getStatusImage() {
      const lanyard = this.lanyard
      const filtered =
        lanyard.activities?.filter((activity) => activity.type === 2)?.pop() ||
        {}
     if (filtered.assets == null) {
        return '/php.png'
      } else {
        return `https://i.scdn.co/image/${filtered.assets.large_image.substring(8)}`
      }
    },
  },
  beforeDestroy() {
    this.socket?.close()
  },
  mounted() {
    /**
     * Connect to Lanyard Socket API, send heartbeat every 30 seconds and replace the Vue data value with the message
     */
    this.socket = new WebSocket('wss://api.codevizag.com/socket')
    this.socket.addEventListener('open', () => {
      // Subscribe to ID
      this.socket.send(
        JSON.stringify({
          op: 2,
          d: {
            subscribe_to_id: '697757845063729194',
          },
        })
      )
      // Send heartbeat every 30 seconds
      setInterval(() => {
        this.socket.send(
          JSON.stringify({
            op: 3,
          })
        )
      }, 30000)
    })
    this.socket.addEventListener('message', ({ data }) => {
      const { t: type, d: status } = JSON.parse(data)
      if (type === 'INIT_STATE' || type === 'PRESENCE_UPDATE')
        this.lanyard = status || {}
      this.finished = true
    })
  },
}
</script>
<style></style>
