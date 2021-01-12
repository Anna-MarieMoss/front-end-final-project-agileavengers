const { clientsClaim } = require('workbox-core');

const CACHE_NAME = 'version-1';
const urlsToCache = ['index.html', 'offline.html']; //offline.html - page shows when offline
// should add all the apges to cache here - may have to do this for every page on the app

const self = this;

//Install service worker
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('open cache');
      return cache.addAll(urlsToCache);
    })
  );
});

//Listen for requests
// This is based on a weather API - but i think it may be good for any fetch requests etc to out DB
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then(() => {
      return fetch(event.request).catch(() => caches.match('offline.html')); //if an error occurs i.e. fetch request not fullfilled use cache HTML
    }) // if want to respond with app pages change 'offline.html' to event.request - but need to add these pages to urls to cache
  );
});

//Activate the SW
self.addEventListener('activate', (event) => {
  const cacheWhiteList = [];
  cacheWhiteList.push(CACHE_NAME);
  // remove unwanted caches
  event.waitUntil(
    caches.keys().then((cacheNames) =>
      Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhiteList.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});

// Getting the service worker to listen for events relating to the push notifications

// Close notification event listener
self.addEventListener('notificationclose', function (e) {
  var notification = e.notification;
  var primaryKey = notification.data.primaryKey;

  console.log('Closed notification: ' + primaryKey);
});

// Notification click event
self.addEventListener('notificationclick', function (e) {
  var notification = e.notification;
  var primaryKey = notification.data.primaryKey;
  var action = e.action;

  if (action === 'close') {
    notification.close();
  } else {
    // Open a new window and take them to the journal website so that they can make an entry -
    clientsClaim.openWindow('http://localhost:3000/'); // need to programme this with the proper url when the site is deployed.
    notification.close();
  }
});

// Handling the push event in the service worker
// Push event listener in the service worker to respond to a push event

self.addEventListener('push', function (e) {
  var body;

  if (e.data) {
    body = e.data.text();
  } else {
    body = 'Push message no payload';
  }

  var options = {
    body: body,
    icon:
      'https://d33wubrfki0l68.cloudfront.net/e6fddcbea146f91d2f3c160f7d56a9391a4740b0/4e758/static/logo-51c754388b198e5bbb0d08a971ebbfa2.png',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: '2',
    },
    actions: [
      {
        action: 'explore',
        title: 'Explore this new world',
        icon: 'https://webstockreview.net/images/check-mark-icon-png-3.png',
      },
      {
        action: 'close',
        title: 'Close',
        icon:
          'https://uxwing.com/wp-content/themes/uxwing/download/01-user_interface/red-x.png',
      },
    ],
  };
  e.waitUntil(self.registration.showNotification('SoC Journal', options)); // this method extends the lifetime of the push event until the showNotification promise resolves.
});
