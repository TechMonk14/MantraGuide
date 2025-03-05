// service-worker.js

const CACHE_NAME = "study-timer-cache-v1";
const urlsToCache = [
  "./index.html",
  "./manifest.json",
  '/icons/icon-192x192.png', // App icon
  '/icons/icon-512x512.png', // App icon
  // MP3 files in the audio folder
  '/audio/Shri_Hanuman_Chalisa.mp3',
  // Images in images/english folder
  '/images/English/HC_English-1.jpg',
  '/images/English/HC_English-2.jpg',
  '/images/English/HC_English-3.jpg',
  '/images/English/HC_English-4.jpg',
  '/images/English/HC_English-5.jpg',
  '/images/English/HC_English-6.jpg',
  '/images/English/HC_English-7.jpg',
  '/images/English/HC_English-8.jpg',
  // Images in images/hindi folder
  '/images/Hindi/HC_Hindi-1.jpg',
  '/images/Hindi/HC_Hindi-2.jpg',
  '/images/Hindi/HC_Hindi-3.jpg',
  '/images/Hindi/HC_Hindi-4.jpg',
  '/images/Hindi/HC_Hindi-5.jpg',
  '/images/Hindi/HC_Hindi-6.jpg',
  '/images/Hindi/HC_Hindi-7.jpg',
  '/images/Hindi/HC_Hindi-8.jpg',
  // Images in images/kannada folder
  '/images/Kannada/HC_Kannada-1.jpg',
  '/images/Kannada/HC_Kannada-2.jpg',
  '/images/Kannada/HC_Kannada-3.jpg',
  '/images/Kannada/HC_Kannada-4.jpg',
  '/images/Kannada/HC_Kannada-5.jpg',
  '/images/Kannada/HC_Kannada-6.jpg',
  '/images/Kannada/HC_Kannada-7.jpg',
  '/images/Kannada/HC_Kannada-8.jpg'
];

// Install event: cache resources
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Opened cache");
      return cache.addAll(urlsToCache);
    })
  );
});

// Fetch event: serve cached resources when offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Activate event: clean up old caches if needed
self.addEventListener("activate", (event) => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
