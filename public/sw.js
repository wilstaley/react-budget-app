console.log('[Service Worker] Running 🏃‍♂️')

const CACHE_NAME = 'budget-pwa-v1'

const filesToCache = []

/*
/ Cache all files before the SW is installed
*/
self.addEventListener('install', (e) => {
  console.log('[Service Worker] Install')
  e.waitUntil(
    (async () => {
      const cache = await caches.open(CACHE_NAME)
      console.log('[Service Worker] Cache')
      await cache.addAll(filesToCache)
    })()
  )
})

/*
/ Return cached files when a network request is made
*/
self.addEventListener('fetch', (e) => {
  e.respondWith(
    (async () => {
      console.log(`[Service Worker] Fetching resource: ${e.request.url}`)
      const cachedResponse = await caches.match(e.request)
      if (cachedResponse) {
        return cachedResponse
      }
      const response = await fetch(e.request)
      const cache = await caches.open(CACHE_NAME)
      console.log(`[Service Worker] Caching new resource: ${e.request.url}`)
      cache.put(e.request, response.clone())
      return response
    })()
  )
})

/*
/ Delete any unused caches before activating the SW
*/
self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys().then((keyList) => {
      return Promise.all(
        keyList.map((key) => {
          if (key === CACHE_NAME) {
            return
          }
          return caches.delete(key)
        })
      )
    })
  )
})
