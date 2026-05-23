const API_URL = 'https://api.cardity.org/v1/compile'

function corsHeaders() {
  return {
    'access-control-allow-origin': '*',
    'access-control-allow-methods': 'POST,OPTIONS',
    'access-control-allow-headers': 'content-type',
  }
}

export async function onRequestOptions() {
  return new Response(null, {
    status: 204,
    headers: corsHeaders(),
  })
}

export async function onRequestPost(context) {
  const response = await fetch(API_URL, {
    method: 'POST',
    headers: {
      'content-type': context.request.headers.get('content-type') || 'application/json',
    },
    body: await context.request.text(),
  })

  const headers = new Headers(corsHeaders())
  headers.set('content-type', response.headers.get('content-type') || 'application/json; charset=utf-8')
  headers.set('cache-control', 'no-store')

  return new Response(response.body, {
    status: response.status,
    headers,
  })
}

export async function onRequest() {
  return new Response(JSON.stringify({ ok: false, error: { message: 'Method not allowed' } }), {
    status: 405,
    headers: {
      ...corsHeaders(),
      'content-type': 'application/json; charset=utf-8',
    },
  })
}
