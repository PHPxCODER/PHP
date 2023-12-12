<template>
  <div
    v-if="
      finished === false ||
      !getStatusDetails ||
      Object.keys(lanyard).length === 0
    "
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
    <div class="bg-gray-700 bg-opacity-30 h-full flex flex-col justify-center gap-2 p-4 rounded-md">
      <div class="flex space-x-2 items-center">
        <img
          :src="`https://cdn.discordapp.com/avatars/697757845063729194/${this.lanyard.discord_user.avatar}`"
          class="w-9 h-9 rounded-full"
          alt
          v-tooltip="'Profile Pic'"
        />
        <div :class="`h-3 w-3 rounded-full flex-shrink-0 ${getDiscordStatus}`" v-tooltip="`${this.lanyard.discord_status}`"/>
        <h1 class="font-bold truncate">
          {{
            this.lanyard.discord_user.username +
              '#' +
              this.lanyard.discord_user.discriminator
          }}
        </h1>
      </div>

      <div
        v-if="
          Object.keys(
            lanyard.activities.filter((activity) => activity.type === 0)
          ).length !== 0
        "
        class="flex gap-2"
      >
        <img
          class="w-16 h-16 relative rounded-md md:flex hidden outline-none"
          alt
          :src="getStatusImage"
        />

        <div class="flex flex-col space-y-1 justify-center">
          <div class="text-sm font-bold leading-tight truncate">{{ getStatusDetails.name }}</div>
          <div class="text-sm leading-tight truncate">{{ getStatusDetails.details }}</div>
          <div class="text-sm leading-tight truncate">{{ getStatusDetails.state }}</div>
        </div>
      </div>
      <div v-else>
        <h1 class="font-bold text-sm leading-tight truncate">I'm not Doing Anything</h1>
      </div>
    </div>
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
        lanyard.activities?.filter((activity) => activity.type === 0)?.pop() ||
        {}
      if (!lanyard) return {}
      else {
        return filtered
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
        lanyard.activities?.filter((activity) => activity.type === 0)?.pop() ||
        {}
        // Spotify
        if (filtered.name === "Spotify" && filtered.assets) {
        return `https://media.discordapp.net/external/${filtered.assets.large_image.substring(12)}`
      }
      // Valorant
      if (filtered.name == 'VALORANT') {
        return 'https://cdn.discordapp.com/app-icons/700136079562375258/e55fc8259df1548328f977d302779ab7.webp'
      }
      // GTA 5
      if (filtered.name === "Grand Theft Auto V") {
        return `https://cdn.discordapp.com/app-icons/356876176465199104/069d9f4871b5ebd2f62bd342ce6ba77f.webp`
      }
      //PUBG PC
      if (filtered.name === "PUBG") {
        return `https://cdn.discordapp.com/app-icons/356873622985506820/d8cd6c5b1fe5b64ad2e0f660238eb43e.webp`
      }
      //PUBG PC LITE
      if (filtered.name === "PUBG LITE") {
        return `https://cdn.discordapp.com/app-icons/597588168178663434/8ecc61c6b6ddbb017fe82342192054c0.webp`
      }
      // CS:GO
      if (filtered.name === "Counter-Strike: Global Offensive") {
        return `https://cdn.discordapp.com/app-icons/356875057940791296/782a3bb612c6f1b3f7deed554935f361.webp`
      }
      // FORTNITE
      if (filtered.name === "FORTNITE") {
        return `https://cdn.discordapp.com/app-icons/432980957394370572/09120a438d2c5429242f0f0ab862fb28.webp`
      }
      // The Sims 4
      if (filtered.name === "The Sims 4") {
        return `https://cdn.discordapp.com/app-icons/359509007423242240/912bd1dd19dfd2ef3b0191985f942a40.webp`
      }
      // YouTube
      if (filtered.name === "YouTube") {
        return `https://cdn.discordapp.com/app-assets/463097721130188830/513734690272968717.webp`
      } 
      // YouTube Music
      if (filtered.name === "YouTube Music" && filtered.assets) {
        return `https://media.discordapp.net/external/${filtered.assets.large_image.substring(12)}`
      }
      // Prime Video
      if (filtered.name === "Prime Video") {
        return `https://cdn.discordapp.com/app-assets/705139844883677224/705140011946737806.webp`
      }
      // Netflix
      if (filtered.name === "Netflix") {
        return `https://media.discordapp.net/external/${filtered.assets.large_image.substring(12)}`
      }
      // Github
      if (filtered.name === "GitHub" && filtered.assets) {
        return `https://cdn.discordapp.com/app-assets/607587875122446359/607911518234869760.png`
      }
      //Uncrashed : FPV Drone Simulator
      if (filtered.name === "Uncrashed : FPV Drone Simulator") {
        return `https://yt3.ggpht.com/KaHU3tbhahqfV9G6X-qmBooE6B1ML8a0st9XxnWBTbGa1OLn55uOAKFTrMlncVCPNoMooxYY=s900-c-k-c0x00ffffff-no-rj`
      }
      

      // Else
        else if (filtered.assets == null) {
         return '/php.png'
      } else {
        return `https://cdn.discordapp.com/app-assets/${filtered.application_id}/${filtered.assets.large_image}`
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
    this.socket = new WebSocket('wss://api.phpxcoder.in/socket')
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
