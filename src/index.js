export default {
  async fetch(request) {
    const url = new URL(request.url)
    const target = url.searchParams.get("target")

    if (!target) {
      return new Response("Missing ?target= param", { status: 400 })
    }

    // Clone original request, but replace the URL
    const proxyRequest = new Request(target, {
      method: request.method,
      headers: request.headers,
      body: request.method !== 'GET' && request.method !== 'HEAD' ? request.body : null,
      redirect: 'follow'
    })

    const response = await fetch(proxyRequest)

    // Return the response as-is with status and headers
    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: {
        ...Object.fromEntries(response.headers),
        'Access-Control-Allow-Origin': '*', // CORS fix
      }
    })
  }
}
