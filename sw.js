const CACHE_NAME = 'v2'; 
const CACHE_ASSETS = [
  '/',
  '/index.html',
  '/genres.html',
  '/platforms.html',
  '/games.html',
  '/about.html',
  '/materialize.min.css',
  '/style.css?v=2',  // Added versioning to style.css
  '/materialize.min.js',
  '/games.js',
  '/genres.js',
  '/platforms.js',
  '/sync.js',
  '/indexedDB.js',
  '/firebaseDB.js',
  '/game1.jfif',
  '/game2.jfif',
  '/game3.jfif',
  '/icon-192x192.png',
  '/icon-512x512.png'
];

// Install event to cache assets
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('Caching assets during install...');
      return cache.addAll(CACHE_ASSETS);
    })
  );
  self.skipWaiting();  // Activate the new service worker immediately
});

// Fetch event to serve assets from cache first, and fallback to network
self.addEventListener('fetch', (event) => {
  // Force revalidation for all files
  event.respondWith(
    fetch(event.request).catch(() => {
      return caches.match(event.request);
    })
  );
});

// Activate event to clean up old caches
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log('Deleting old cache:', cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});
