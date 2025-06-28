const CACHE_NAME = 'iplus-v1.7.2';

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([
        "./",
        "./index.html",
        "./manifest.json",
        // JS
        "./db.js",
        "./script.js",
        // CSS
        "./style.css",
        // Imagens  
        "./images/cad_ico.png",
        "./images/calendar_ico.png",
        "./images/contability_ico.png",
        "./images/favicon.png",
        "./images/list_ico.png",
        "./images/logo.png",
        "./images/tasks_ico.png",
      ]);
    })
  )
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
