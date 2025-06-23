const CACHE_NAME = 'iplus-v1.6.7';

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([
        "./",
        "./index.html",
        "./style.css",
        "./script.js"
      ]);
    })
  );
});

// Limpa caches antigos quando um novo service worker for ativado
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys =>
      Promise.all(
        keys
          .filter(key => key !== CACHE_NAME) // mantém só o cache atual
          .map(key => caches.delete(key))
      )
    )
  );
});

// Serve arquivos do cache ou faz fetch online se não tiver
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request);
    })
  );
});
