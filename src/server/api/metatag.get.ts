import metaFetcher from 'meta-fetcher'

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const url = (query.url as string) || 'https://phpxcoder.in'
  const meta = await metaFetcher(url)
  return meta
})
