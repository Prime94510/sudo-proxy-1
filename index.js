export default {
  async fetch(request) {
    const url = new URL(request.url)
    const target = url.searchParams.get("target")

    if (!target) {
      return new Response("Missing ?target= URL param", { status: 400 })
    }

    const res = await fetch(target)
    const body = await res.text()

    return new Response(body, {
      headers: { 'Content-Type': 'text/plain' }
    })
  }
}
