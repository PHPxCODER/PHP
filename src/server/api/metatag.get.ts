import { resolve as dnsResolve } from 'node:dns/promises'
import { isIP } from 'node:net'
import metaFetcher from 'meta-fetcher'

const PRIVATE_RANGES = [
  /^127\./,
  /^10\./,
  /^172\.(1[6-9]|2\d|3[01])\./,
  /^192\.168\./,
  /^169\.254\./,
  /^0\./,
  /^::1$/,
  /^fe80:/i,
  /^fc00:/i,
  /^fd00:/i,
]

function isPrivateIP(ip: string): boolean {
  return PRIVATE_RANGES.some((range) => range.test(ip))
}

export default defineEventHandler(async (event) => {
  const query = getQuery(event)
  const url = (query.url as string) || ''

  if (!url) {
    throw createError({ statusCode: 400, statusMessage: 'Missing url parameter' })
  }

  let parsed: URL
  try {
    parsed = new URL(url)
  } catch {
    throw createError({ statusCode: 400, statusMessage: 'Invalid URL' })
  }

  if (!['http:', 'https:'].includes(parsed.protocol)) {
    throw createError({ statusCode: 400, statusMessage: 'Only http and https URLs are allowed' })
  }

  const hostname = parsed.hostname

  if (hostname === 'localhost' || hostname === '[::1]') {
    throw createError({ statusCode: 400, statusMessage: 'Blocked host' })
  }

  // Check if hostname is a raw IP
  if (isIP(hostname) && isPrivateIP(hostname)) {
    throw createError({ statusCode: 400, statusMessage: 'Blocked host' })
  }

  // Resolve DNS and check all addresses
  try {
    const addresses = await dnsResolve(hostname)
    if (addresses.some(isPrivateIP)) {
      throw createError({ statusCode: 400, statusMessage: 'Blocked host' })
    }
  } catch (err: any) {
    if (err.statusCode) throw err
    throw createError({ statusCode: 400, statusMessage: 'Could not resolve hostname' })
  }

  try {
    const meta = await metaFetcher(url)
    return meta
  } catch {
    throw createError({ statusCode: 502, statusMessage: 'Failed to fetch metadata from target URL' })
  }
})
