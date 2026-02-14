export default defineNuxtConfig({
  srcDir: 'src',
  ssr: true,
  components: true,

  app: {
    head: {
      title: 'PHP',
      titleTemplate: '%s',
      charset: 'utf-8',
      viewport: 'width=device-width, initial-scale=1',
      meta: [
        {
          name: 'description',
          content:
            "My name is PHP. I'm full stack developer and student from India. Visit website and learn more about me.",
        },
        { name: 'twitter:card', content: 'summary' },
        { name: 'twitter:site', content: '@PHPxCODER' },
        { name: 'twitter:creator', content: '@PHPxCODER' },
        { name: 'twitter:title', content: 'phpxcoder.in' },
        {
          name: 'twitter:description',
          content:
            "My name is PHP. I'm full stack developer and student from India. Visit website and learn more about me.",
        },
        { name: 'twitter:image', content: '/php.png' },
        { property: 'og:title', content: 'PHP' },
        { property: 'og:type', content: 'website' },
        { property: 'og:site_name', content: 'phpxcoder.in' },
        {
          property: 'og:description',
          content:
            "My name is PHP. I'm full stack developer and student from India. Visit website and learn more about me.",
        },
        { property: 'og:image', content: '/php.png' },
        { name: 'theme-color', content: '#059669' },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
    },
  },

  runtimeConfig: {
    lastfmApiKey: process.env.LASTFM_APIKEY,
    public: {
      links: {
        Discord: 'https://discord.gg/GNPydYVRgP',
        Twitter: 'https://twitter.com/PHPxCODER?utm_source=phpxcoder.in',
        Github: 'https://github.com/PHPxCODER/?utm_source=phpxcoder.in',
        mail: 'mailto:support@codevizag.com',
      },
    },
  },

  modules: [
    '@nuxtjs/tailwindcss',
    '@nuxtjs/color-mode',
    '@nuxt/image',
    '@nuxtjs/robots',
    '@nuxtjs/sitemap',
    '@nuxtjs/google-fonts',
    'nuxt-gtag',
    '@vite-pwa/nuxt',
  ],

  css: ['~/public/fonts/stylesheet.css', '~/stylesheets/root.scss'],

  colorMode: {
    classSuffix: '',
  },

  googleFonts: {
    families: {
      'JetBrains Mono': [400, 700],
    },
  },

  gtag: {
    id: process.env.NUXT_PUBLIC_GTAG_ID || 'G-XXXXXXXXXX',
  },

  site: {
    url: 'https://phpxcoder.in',
  },

  sitemap: {},

  tailwindcss: {
    config: {
      darkMode: 'class',
    },
  },

  nitro: {
    prerender: {
      routes: ['/sitemap.xml'],
    },
  },

  compatibilityDate: '2024-11-01',
})
