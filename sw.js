/* YaYa Chicken · Кабинет — service worker (v3)
   Манифест и страница ВСЕГДА берутся из сети, чтобы Chrome видел свежий
   манифест и предлагал установку. Кэш — только как офлайн-запаска. */

const CACHE = 'yaya-kabinet-v7';
const SHELL = ['./', './index.html', './manifest.json', './icon-192.png', './icon-512.png'];

self.addEventListener('install', (e) => {
  e.waitUntil(
    caches.open(CACHE)
      .then((c) => Promise.allSettled(SHELL.map((u) => c.add(u))))
      .then(() => self.skipWaiting())
  );
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);

  // Внешние домены (API, шрифты, карты) — не трогаем
  if (url.origin !== self.location.origin) return;

  // Манифест, страница, навигация — ТОЛЬКО из сети (при офлайне — из кэша)
  const isCore =
    req.mode === 'navigate' ||
    url.pathname.endsWith('/manifest.json') ||
    url.pathname.endsWith('/index.html') ||
    url.pathname.endsWith('/');
  if (isCore) {
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put(req, copy)).catch(() => {});
          return res;
        })
        .catch(() => caches.match(req).then((h) => h || caches.match('./index.html')))
    );
    return;
  }

  // Иконки и прочая своя статика — сеть, с запаской из кэша
  e.respondWith(fetch(req).catch(() => caches.match(req)));
});

self.addEventListener('push', (e) => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (err) { d = { title: 'YaYa', body: e.data ? e.data.text() : '' }; }
  const opts = {
    body: d.body || '',
    icon: './icon-192.png',
    badge: './icon-192.png',
    tag: d.tag || undefined,
    renotify: !!d.tag,
    data: { url: d.url || './' }
  };
  e.waitUntil(self.registration.showNotification(d.title || 'YaYa Chicken', opts));
  if (typeof d.count === 'number' && self.navigator && self.navigator.setAppBadge) {
    self.navigator.setAppBadge(d.count).catch(() => {});
  }
});
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  const url = (e.notification.data && e.notification.data.url) || './';
  e.waitUntil((async () => {
    const all = await clients.matchAll({ type: 'window', includeUncontrolled: true });
    for (const c of all) { if ('focus' in c) return c.focus(); }
    if (clients.openWindow) return clients.openWindow(url);
  })());
});
