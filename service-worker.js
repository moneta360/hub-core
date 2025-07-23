self.addEventListener('install', e => {
  e.waitUntil(
    caches.open('evo-store').then(cache => {
      return cache.addAll([
        'index.html',
        'style.css',
        'main.js',
        'canvas.js',
        'genome.js',
        'manifest.json',
        'icon-192.png',
        'icon-512.png'
      ]);
    })
  );
});

self.addEventListener('fetch', e => {
  e.respondWith(
    caches.match(e.request).then(response => {
      return response || fetch(e.request);
    })
  );
});