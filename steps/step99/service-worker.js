console.log('Service worker ok =D');

var cacheAppShellStatic = [
  '/offline.html',
  '/node_modules/aframe/dist/aframe-v0.9.2.js',
  '/node_modules/ar.js/aframe/build/aframe-ar.js',
  '/node_modules/ar.js/data/data/camera_para.dat',
  '/models/cactus_A.gltf',
  '/models/cactus_B.gltf',
  '/models/cactus_C.gltf',
  '/models/cactus_D.gltf',
  '/models/cactus_E.gltf',
  '/models/cactus_F.gltf',
  '/models/Dino.gltf',
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
  if (event.request.method === 'GET'){
    event.respondWith(
      caches.match(event.request).then((response) =>
      response ||
      fetch(event.request)
        .catch(() => caches.match(new Request('offline.html')).then((resp)=> {
            console.log(resp);
            return resp;
          })
        )
      )
    );
  }
});