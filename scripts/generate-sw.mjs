import { createHash } from 'node:crypto'
import { readdir, stat, writeFile } from 'node:fs/promises'
import { join, relative, sep } from 'node:path'

const DIST = 'dist'
const SW_REVISION = 2
const EXCLUDED_PREFIXES = ['/sound/']

async function collectFiles(directory) {
  const entries = await readdir(directory, { withFileTypes: true })
  const files = []

  for (const entry of entries) {
    const fullPath = join(directory, entry.name)
    if (entry.isDirectory()) {
      files.push(...(await collectFiles(fullPath)))
      continue
    }
    const info = await stat(fullPath)
    const url = `/${relative(DIST, fullPath).split(sep).join('/')}`
    files.push({ url, size: info.size })
  }

  return files
}

const files = (await collectFiles(DIST))
  .filter(file => file.url !== '/sw.js')
  .filter(file => !EXCLUDED_PREFIXES.some(prefix => file.url.startsWith(prefix)))
  .sort((a, b) => a.url.localeCompare(b.url))

const hash = createHash('sha256')
hash.update(`sw:${SW_REVISION};`)
for (const file of files) hash.update(`${file.url}:${file.size};`)
const version = `wordie-${hash.digest('hex').slice(0, 12)}`
const precache = files.map(file => file.url)

const serviceWorker = `/* Generado por scripts/generate-sw.mjs. No editar a mano. */
const VERSION = ${JSON.stringify(version)}
const PRECACHE = ${JSON.stringify(precache, null, 2)}

self.addEventListener('install', event => {
  event.waitUntil(
    caches
      .open(VERSION)
      .then(cache => cache.addAll(PRECACHE))
      .catch(() => undefined),
  )
})

self.addEventListener('activate', event => {
  event.waitUntil(
    caches
      .keys()
      .then(keys => Promise.all(keys.filter(key => key !== VERSION).map(key => caches.delete(key))))
      .then(() => self.clients.claim()),
  )
})

self.addEventListener('message', event => {
  if (event.data && event.data.type === 'SKIP_WAITING') self.skipWaiting()
})

function isSameOrigin(url) {
  return url.origin === self.location.origin
}

function isFont(url) {
  return url.hostname === 'fonts.googleapis.com' || url.hostname === 'fonts.gstatic.com'
}

async function cacheFirst(request) {
  const cached = await caches.match(request, { ignoreVary: true })
  if (cached) return cached

  const response = await fetch(request)
  if (response.ok) {
    const cache = await caches.open(VERSION)
    cache.put(request, response.clone())
  }
  return response
}

async function staleWhileRevalidate(request) {
  const cache = await caches.open(VERSION)
  const cached = await cache.match(request, { ignoreVary: true })
  const network = fetch(request)
    .then(response => {
      if (response.ok) cache.put(request, response.clone())
      return response
    })
    .catch(() => undefined)

  if (cached) {
    void network
    return cached
  }

  return (await network) || Response.error()
}

async function networkFirstNavigation(request) {
  try {
    const response = await fetch(request)
    if (response.ok) {
      const cache = await caches.open(VERSION)
      cache.put('/index.html', response.clone())
    }
    return response
  } catch {
    const cached = await caches.match('/index.html', { ignoreVary: true })
    return cached || Response.error()
  }
}

self.addEventListener('fetch', event => {
  const { request } = event
  if (request.method !== 'GET') return

  const url = new URL(request.url)

  if (request.mode === 'navigate') {
    event.respondWith(networkFirstNavigation(request))
    return
  }

  if (isFont(url)) {
    event.respondWith(staleWhileRevalidate(request))
    return
  }

  if (!isSameOrigin(url)) return

  if (url.pathname.startsWith('/data/')) {
    event.respondWith(staleWhileRevalidate(request))
    return
  }

  const isStatic =
    url.pathname.startsWith('/assets/') ||
    url.pathname.startsWith('/img/') ||
    url.pathname.startsWith('/sound/') ||
    url.pathname.startsWith('/icons/') ||
    url.pathname === '/manifest.webmanifest' ||
    url.pathname === '/favicon.svg' ||
    url.pathname === '/icons.svg'

  if (isStatic) event.respondWith(cacheFirst(request))
})
`

await writeFile(join(DIST, 'sw.js'), serviceWorker, 'utf8')
console.log(`sw.js generado | ${version} | ${precache.length} archivos precacheados`)
