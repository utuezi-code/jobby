const CACHE_NAME = 'vitib-v1'
const OFFLINE_URL = '/offline'

const PRECACHE_URLS = [
  '/',
  '/interet',
  '/quiz',
  '/merci',
  '/offline',
  '/icons/icon.svg',
]

self.addEventListener('install', (event) => {
  event.waitUntil(
    caches
      .open(CACHE_NAME)
      .then((cache) =>
        cache.addAll(
          PRECACHE_URLS.map(
            (url) =>
              new Request(url, { cache: 'reload', credentials: 'same-origin' }),
          ),
        ),
      )
      .catch(() => {}),
  )
  self.skipWaiting()
})

self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE_NAME).map((k) => caches.delete(k)),
        ),
      ),
  )
  self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  if (event.request.method !== 'GET') return

  const url = new URL(event.request.url)

  // Skip non-same-origin and browser extensions
  if (url.origin !== self.location.origin) return

  // Network-first for API calls
  if (url.pathname.startsWith('/api/')) {
    event.respondWith(
      fetch(event.request).catch(
        () =>
          new Response(JSON.stringify({ error: 'Hors ligne' }), {
            status: 503,
            headers: { 'Content-Type': 'application/json' },
          }),
      ),
    )
    return
  }

  // Cache-first for static Next.js assets
  if (
    url.pathname.startsWith('/_next/static/') ||
    url.pathname.startsWith('/icons/')
  ) {
    event.respondWith(
      caches.match(event.request).then(
        (cached) => cached ?? fetch(event.request),
      ),
    )
    return
  }

  // Network-first with offline fallback for navigation
  if (event.request.mode === 'navigate') {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          if (response.ok) {
            const clone = response.clone()
            caches.open(CACHE_NAME).then((c) => c.put(event.request, clone))
          }
          return response
        })
        .catch(() =>
          caches
            .match(event.request)
            .then((cached) => cached ?? caches.match(OFFLINE_URL))
            .then(
              (res) =>
                res ??
                new Response('<h1>Hors ligne</h1>', {
                  headers: { 'Content-Type': 'text/html' },
                }),
            ),
        ),
    )
    return
  }

  // Default: stale-while-revalidate
  event.respondWith(
    caches.open(CACHE_NAME).then((cache) =>
      cache.match(event.request).then((cached) => {
        const networkFetch = fetch(event.request).then((response) => {
          if (response.ok) cache.put(event.request, response.clone())
          return response
        })
        return cached ?? networkFetch
      }),
    ),
  )
})
