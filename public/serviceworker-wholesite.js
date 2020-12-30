const CACHE_NAME = 'version-2';
const urlsToCache = ['index.html', 'offline.html' ] //offline.html - page shows when offline
// should add all the apges to cache here - may have to do this for every page on the app

const self = this;

//Install service worker
// self.addEventListener('install', (event) => {
//     event.waitUntil(
//         caches.open(CACHE_NAME)
//             .then((cache) => {
//                 console.log("open cache");
//                 return cache.addAll(urlsToCache);
//             })
//     )
// });

// Install Service - smaller with the self loading cache
self.addEventListener('install', (event) => {
    console.log('Service Worker: cache installed')
});


//Listen for requests
// This is based on a weather API - but i think it may be good for any fetch requests etc to out DB
// self.addEventListener('fetch', (event) => {
//     event.respondWith(
//         caches.match(event.request)
//             .then(() => {
//                 return fetch(event.request)
//                     .catch(() => caches.match('offline.html')) //if an error occurs i.e. fetch request not fullfilled use cache HTML
//             }) // if want to respond with app pages change 'offline.html' to event.request - but need to add these pages to urls to cache
//     )
// });


//Activate the SW
self.addEventListener('activate', (event) => {
    event.waitUntil(
        caches.keys().then((cacheNames) => Promise.all(
            cacheNames.map((cache) => {
                if(cache !== CACHE_NAME){
                    return caches.delete(cache);
                }
            })
        ))
    )
});

//listen for requests and set the cache to be all the pages on the website that are visited - means you dont have to ist all pages on website
self.addEventListener('fetch', (event) => {
    event.respondWith(
        fetch(event.request)
            .then(res => {
                //Make copy/clone of response
                const resClone = res.clone();
                //Open Cache
                caches
                    .open(CACHE_NAME)
                    .then(cache => {
                        //Add response to cache
                        cache.put(event.request, resClone);
                    })
                    return res;
            }).catch(err => caches.match(event.request).then(res => res))
            );
        });