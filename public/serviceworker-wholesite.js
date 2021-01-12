const CACHE_NAME = 'version-2';
const urlsToCache = ['index.html', 'offline.html']; //offline.html - page shows when offline
// should add all the apges to cache here - may have to do this for every page on the app

const self = this;

// Install Service - smaller with the self loading cache
self.addEventListener('install', (event) => {
  console.log('Service Worker: cache installed');
});

//Activate the SW
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            return caches.delete(cache);
          }
        })
      )
    )
  );
});

//listen for requests and set the cache to be all the pages on the website that are visited - means you dont have to ist all pages on website
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request)
      .then((res) => {
        //Make copy/clone of response
        const resClone = res.clone();
        //Open Cache
        caches.open(CACHE_NAME).then((cache) => {
          //Add response to cache
          cache.put(event.request, resClone);
        });
        return res;
      })
      .catch((err) => caches.match(event.request).then((res) => res))
  );
});
