// Kleaners Service Worker - Advanced Caching and Offline Support
const CACHE_NAME = 'kleaners-v1.0.0';
const STATIC_CACHE = 'kleaners-static-v1';
const DYNAMIC_CACHE = 'kleaners-dynamic-v1';
const IMAGE_CACHE = 'kleaners-images-v1';
const API_CACHE = 'kleaners-api-v1';

// Assets to cache immediately
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/manifest.json',
  '/favicon.ico',
  '/og-image.png',
  '/lovable-uploads/81a146c8-f4d6-4adf-8dd6-7d590780093e.png', // Logo
];

// API endpoints to cache with different strategies
const API_CACHE_PATTERNS = [
  /\/api\/services/,
  /\/api\/bookings/,
  /\/api\/providers/,
  /\/api\/clients/,
];

// Image patterns to cache
const IMAGE_PATTERNS = [
  /\.(?:png|jpg|jpeg|svg|gif|webp)$/,
  /\/lovable-uploads\//,
  /\/assets\//,
];

// Network-first patterns (always try network first)
const NETWORK_FIRST_PATTERNS = [
  /\/api\/auth/,
  /\/api\/payments/,
  /\/api\/notifications/,
];

// Cache-first patterns (serve from cache if available)
const CACHE_FIRST_PATTERNS = [
  /\.(?:js|css|woff|woff2|ttf|eot)$/,
  /\/static\//,
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    Promise.all([
      // Cache static assets
      caches.open(STATIC_CACHE).then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      }),
      
      // Skip waiting to activate immediately
      self.skipWaiting()
    ])
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    Promise.all([
      // Clean up old caches
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE && 
                cacheName !== DYNAMIC_CACHE && 
                cacheName !== IMAGE_CACHE && 
                cacheName !== API_CACHE) {
              console.log('Service Worker: Deleting old cache', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      }),
      
      // Take control of all clients
      self.clients.claim()
    ])
  );
});

// Fetch event - implement caching strategies
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Skip chrome-extension and other non-http requests
  if (!request.url.startsWith('http')) {
    return;
  }
  
  event.respondWith(handleRequest(request));
});

// Main request handler with different caching strategies
async function handleRequest(request) {
  const url = new URL(request.url);
  
  try {
    // Network-first strategy for critical APIs
    if (NETWORK_FIRST_PATTERNS.some(pattern => pattern.test(url.pathname))) {
      return await networkFirst(request, API_CACHE);
    }
    
    // Cache-first strategy for static assets
    if (CACHE_FIRST_PATTERNS.some(pattern => pattern.test(url.pathname))) {
      return await cacheFirst(request, STATIC_CACHE);
    }
    
    // Image caching strategy
    if (IMAGE_PATTERNS.some(pattern => pattern.test(url.pathname))) {
      return await cacheFirst(request, IMAGE_CACHE);
    }
    
    // API caching with stale-while-revalidate
    if (API_CACHE_PATTERNS.some(pattern => pattern.test(url.pathname))) {
      return await staleWhileRevalidate(request, API_CACHE);
    }
    
    // Default: Network-first with dynamic cache fallback
    return await networkFirst(request, DYNAMIC_CACHE);
    
  } catch (error) {
    console.error('Service Worker: Request failed', error);
    
    // Return offline fallback for navigation requests
    if (request.destination === 'document') {
      return await getOfflineFallback();
    }
    
    // Return cached version if available
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    
    // Return generic offline response
    return new Response('Offline', { 
      status: 503, 
      statusText: 'Service Unavailable' 
    });
  }
}

// Network-first strategy
async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    
    if (networkResponse.ok) {
      // Cache successful responses
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    
    return networkResponse;
  } catch (error) {
    // Fallback to cache
    const cachedResponse = await caches.match(request);
    if (cachedResponse) {
      return cachedResponse;
    }
    throw error;
  }
}

// Cache-first strategy
async function cacheFirst(request, cacheName) {
  const cachedResponse = await caches.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // Fetch and cache if not in cache
  const networkResponse = await fetch(request);
  
  if (networkResponse.ok) {
    const cache = await caches.open(cacheName);
    cache.put(request, networkResponse.clone());
  }
  
  return networkResponse;
}

// Stale-while-revalidate strategy
async function staleWhileRevalidate(request, cacheName) {
  const cachedResponse = await caches.match(request);
  
  // Fetch in background to update cache
  const fetchPromise = fetch(request).then(async (networkResponse) => {
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => {
    // Ignore network errors in background update
  });
  
  // Return cached version immediately if available
  if (cachedResponse) {
    return cachedResponse;
  }
  
  // Wait for network if no cache available
  return await fetchPromise;
}

// Get offline fallback page
async function getOfflineFallback() {
  const cache = await caches.open(STATIC_CACHE);
  return await cache.match('/') || new Response(`
    <!DOCTYPE html>
    <html>
    <head>
      <title>Kleaners - Offline</title>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <style>
        body { 
          font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
          text-align: center; 
          padding: 50px; 
          background: #f8f9fa;
        }
        .container { 
          max-width: 400px; 
          margin: 0 auto; 
          background: white; 
          padding: 40px; 
          border-radius: 8px; 
          box-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }
        h1 { color: #333; margin-bottom: 20px; }
        p { color: #666; line-height: 1.5; }
        .retry-btn {
          background: #007bff;
          color: white;
          border: none;
          padding: 12px 24px;
          border-radius: 4px;
          cursor: pointer;
          margin-top: 20px;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <h1>You're Offline</h1>
        <p>It looks like you're not connected to the internet. Some features may not be available.</p>
        <button class="retry-btn" onclick="window.location.reload()">Try Again</button>
      </div>
    </body>
    </html>
  `, {
    headers: { 'Content-Type': 'text/html' }
  });
}

// Background sync for failed requests
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  console.log('Service Worker: Performing background sync');
  // Implement background sync logic for failed API calls
}

// Push notification handling
self.addEventListener('push', (event) => {
  if (!event.data) return;
  
  const data = event.data.json();
  const options = {
    body: data.body,
    icon: '/favicon.ico',
    badge: '/favicon.ico',
    data: data.data,
    actions: data.actions || []
  };
  
  event.waitUntil(
    self.registration.showNotification(data.title, options)
  );
});

// Notification click handling
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow(event.notification.data?.url || '/')
  );
});

// Message handling for cache management
self.addEventListener('message', (event) => {
  if (event.data && event.data.type === 'SKIP_WAITING') {
    self.skipWaiting();
  }
  
  if (event.data && event.data.type === 'CLEAR_CACHE') {
    event.waitUntil(clearAllCaches());
  }
});

async function clearAllCaches() {
  const cacheNames = await caches.keys();
  await Promise.all(
    cacheNames.map(cacheName => caches.delete(cacheName))
  );
  console.log('Service Worker: All caches cleared');
}
