const CACHE_NAME = 'iplus-v1.7.0';

self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return cache.addAll([
        "./",
        "./index.html",
        "./tasks.html",
        "./manifest.json",
        // JS
        "./db/db_tasks.js",
        "./script/script_tasks.js",
        // CSS
        "./style/style_calendar.css",
        "./style/style_tasks.css",
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
