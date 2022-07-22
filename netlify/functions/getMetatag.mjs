import metaFetcher from 'meta-fetcher'

exports.handler = async function (event, context) {
  // your server-side functionality

  const url = event.queryStringParameters.url || "https://php.codevizag.com";

  const meta = await metaFetcher(url)

  return {
    statusCode: 200,
    body: JSON.stringify(meta),
  }
}
