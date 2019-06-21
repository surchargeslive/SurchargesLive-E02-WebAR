console.log('Service worker ok =D');

var cacheAppShellStatic = [
  '/',
  '/offline.html',
  '/libs/aframe-ar.js',
  '/libs/aframe.min.js',
  '/models/cactus_A.stl.gltf',
  '/models/cactus_B.stl.gltf',
  '/models/cactus_C.stl.gltf',
  '/models/cactus_D.stl.gltf',
  '/models/cactus_E.stl.gltf',
  '/models/cactus_F.stl.gltf',
  '/models/Dino.stl.gltf',
  '/assets/pattern-offline.patt',
  '/main.js',
];

self.addEventListener('install', function(event) {
  console.log('event install');
  event.waitUntil(
    caches
      .open('cache-static')
      .then(function(cache) {
        return cache.addAll(cacheAppShellStatic);
      })
      .then(function() {
        return self.skipWaiting();
      })
  );
});

self.addEventListener('activate', function(event) {
  console.log('event activate');
  event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', function(event) {
  event.respondWith(
    fetch(event.request).catch(function(error) {
      return caches.open('cache-static').then(function(cache) {
        return cache.match('offline.html');
      });
    })
  );
});