self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate',  e => e.waitUntil(self.clients.claim()));

self.addEventListener('fetch', event => {
  console.log('event', event);

  if (event.request.mode !== 'navigate') return;          // интересует только навигация
  const { pathname } = new URL(event.request.url);
  console.log('event', event)
  if (pathname !== '/faq') return;                        // остальные страницы игнорируем

  event.respondWith(fetch(event.request));

  event.waitUntil(
    self.clients.get(event.clientId).then(c => c && c.navigate(c.url))
  );
});