const CACHE_NAME = 'version-1';
const urlsToCache = ['index.html', 'offline.html' ] //offline.html - page shows when offline

const self = this;

//Install service worker
self.addEventListener('install', (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then((cache) => {
                console.log("open cache");
                return cache.addAll(urlsToCache);
            })
    )
});

//Listen for requests
// This is based on a weather API - but i think it may be good for any fetch requests etc to out DB
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request)
            .then(() => {
                return fetch(event.request)
                    .catch(() => caches.match('offline.html')) //if an error occurs i.e. fetch request not fullfilled use cache HTML
            })
    )
});


//Activate the SW
self.addEventListener('activate', (event) => {
    const cacheWhiteList = [];
    cacheWhiteList.push(CACHE_NAME);

    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cacheName) => {
                if(!cacheWhiteList.includes(cacheName)){
                    return caches.delete(cacheName);
                }
            })
        ))
    )
});