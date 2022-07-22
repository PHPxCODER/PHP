const description =
  "My name is PHP. I'm full stack developer and student from India. Visit website and learn more about me."

  export default {
    title: "PHP",
    titleTemplate: "%s",
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      {
        hid: 'description',
        name: 'description',
        content: description,
      },
      /* Twitter */
      {
        hid: 'twitter:card',
        name: 'twitter:card',
        content: 'summary',
      },
      {
        hid: 'twitter:site',
        name: 'twitter:site',
        content: '@PHPxCODER',
      },
      {
        hid: 'twitter:creator',
        name: 'twitter:creator',
        content: '@PHPxCODER',
      },
      {
        hid: 'twitter:title',
        name: 'twitter:title',
        content: 'php.codevizag.com',
      },
      {
        hid: 'twitter:description',
        name: 'twitter:description',
        content: description,
      },
      {
        hid: 'twitter:image',
        name: 'twitter:image',
        content: '/php.png',
      },
      /* Open-Graph */
      {
        hid: 'og:title',
        name: 'og:title',
        content: 'PHP',
      },
      {
        hid: 'og:type',
        name: 'og:type',
        content: 'website',
      },
      {
        hid: 'og:site_name',
        name: 'og:site_name',
        content: 'php.codevizag.com',
      },
      {
        hid: 'og:description',
        name: 'og:description',
        content: description,
      },
      {
        hid: 'og:image',
        name: 'og:image',
        content: '/php.png',
      },
      /* Others */
      {
        hid: 'theme-color',
        name: 'theme-color',
        content: '#059669',
      },
    ].map((i) => {
      if (i.name && !i.property) i.property = i.name
      return i
    }),
    link: [
      {
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico',
      },
    ],
  }
