
export default async function () {
  const { $content } = require("@nuxt/content")
  const posts = await $content().fetch()

  const routes = []
  for (const post of posts) {
    routes.push(`blog/${post.slug}`)
  }

  return {
    hostname: "https://phpxcoder.in",
    gzip: true,
    routes,
  }
}
