const CACHE_NAME = 'medigo-healthcare-v1';
const STATIC_CACHE_NAME = 'medigo-static-v1';
const DYNAMIC_CACHE_NAME = 'medigo-dynamic-v1';

// Static assets to cache
const STATIC_ASSETS = [
  '/',
  '/index.html',
  '/favicon.svg',
  '/logo.png',
  '/assets/index-BSNeIHAu.js',
  '/assets/index-BJtqo69E.css',
  '/assets/vendor-D2v-36np.js',
  '/assets/animations-DLt5HYUn.js'
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker: Installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE_NAME)
      .then((cache) => {
        console.log('Service Worker: Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .then(() => {
        console.log('Service Worker: Static assets cached');
        return self.skipWaiting();
      })
  );
});

// Activate event - clean up old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker: Activating...');
  
  event.waitUntil(
    caches.keys()
      .then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== STATIC_CACHE_NAME && 
                cacheName !== DYNAMIC_CACHE_NAME &&
                cacheName !== CACHE_NAME) {
              console.log('Service Worker: Clearing old cache:', cacheName);
              return caches.delete(cacheName);
            }
          })
        );
      })
      .then(() => {
        console.log('Service Worker: Activated');
        return self.clients.claim();
      })
  );
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);
  
  // Skip non-GET requests
  if (request.method !== 'GET') {
    return;
  }
  
  // Handle different types of requests
  if (url.origin === self.location.origin) {
    // Same-origin requests
    if (STATIC_ASSETS.some(asset => request.url.includes(asset))) {
      // Static assets - cache first strategy
      event.respondWith(
        caches.match(request)
          .then((response) => {
            if (response) {
              return response;
            }
            
            return fetch(request)
              .then((response) => {
                // Cache successful responses
                if (response.status === 200) {
                  const responseClone = response.clone();
                  caches.open(STATIC_CACHE_NAME)
                    .then((cache) => {
                      cache.put(request, responseClone);
                    });
                }
                return response;
              })
              .catch(() => {
                // Return offline page if available
                return caches.match('/offline.html');
              });
          })
      );
    } else {
      // Dynamic content - network first strategy
      event.respondWith(
        fetch(request)
          .then((response) => {
            // Cache successful GET requests
            if (response.status === 200) {
              const responseClone = response.clone();
              caches.open(DYNAMIC_CACHE_NAME)
                .then((cache) => {
                  cache.put(request, responseClone);
                });
            }
            return response;
          })
          .catch(() => {
            // Try cache if network fails
            return caches.match(request);
          })
      );
    }
  } else {
    // Cross-origin requests (API calls, external resources)
    event.respondWith(
      fetch(request)
        .then((response) => {
          // Cache API responses for 5 minutes
          if (request.url.includes('/api/') && response.status === 200) {
            const responseClone = response.clone();
            caches.open(DYNAMIC_CACHE_NAME)
              .then((cache) => {
                cache.put(request, responseClone);
              });
          }
          return response;
        })
        .catch(() => {
          // For API calls, return a cached response or error
          if (request.url.includes('/api/')) {
            return caches.match(request)
              .then((cachedResponse) => {
                if (cachedResponse) {
                  return cachedResponse;
                }
                
                // Return a generic error response
                return new Response(
                  JSON.stringify({ 
                    error: 'Network unavailable', 
                    message: 'Please check your internet connection' 
                  }),
                  {
                    status: 503,
                    statusText: 'Service Unavailable',
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  }
                );
              });
          }
          
          // For images, try cache or return placeholder
          if (request.url.match(/\.(jpg|jpeg|png|gif|svg|webp)$/i)) {
            return caches.match('/logo.png');
          }
          
          // For other external resources, just fail
          throw new Error('Network request failed');
        })
    );
  }
});

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(
      // Handle offline actions here
      console.log('Service Worker: Background sync triggered')
    );
  }
});

// Push notifications
self.addEventListener('push', (event) => {
  const options = {
    body: event.data ? event.data.text() : 'New notification from Medigo Healthcare',
    icon: '/logo.png',
    badge: '/favicon.svg',
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1
    },
    actions: [
      {
        action: 'explore',
        title: 'View',
        icon: '/logo.png'
      },
      {
        action: 'close',
        title: 'Close',
        icon: '/favicon.svg'
      }
    ]
  };
  
  event.waitUntil(
    self.registration.showNotification('Medigo Healthcare', options)
  );
});

// Notification click handler
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  if (event.action === 'explore') {
    event.waitUntil(
      clients.openWindow('/')
    );
  }
});

// Message handler with proper error handling
self.addEventListener('message', (event) => {
  try {
    if (event.data && event.data.type === 'SKIP_WAITING') {
      self.skipWaiting();
    }
    
    if (event.data && event.data.type === 'CACHE_CLEANUP') {
      event.waitUntil(
        caches.keys().then((cacheNames) => {
          return Promise.all(
            cacheNames.map((cacheName) => {
              if (cacheName.startsWith('medigo-')) {
                return caches.open(cacheName).then((cache) => {
                  return cache.keys().then((requests) => {
                    return Promise.all(
                      requests.map((request) => {
                        // Check if the cached item is older than 7 days
                        return caches.match(request).then((response) => {
                          if (response && response.headers.has('date')) {
                            const cacheDate = new Date(response.headers.get('date'));
                            const now = new Date();
                            const ageInDays = (now - cacheDate) / (1000 * 60 * 60 * 24);
                            
                            if (ageInDays > 7) {
                              return cache.delete(request);
                            }
                          }
                        });
                      })
                    );
                  });
                });
              }
            })
          );
        }).catch((error) => {
          console.warn('Cache cleanup failed:', error);
        })
      );
    }
  } catch (error) {
    console.warn('Message handling error:', error);
    // Don't try to respond if the message channel is closed
  }
});

// Performance monitoring
self.addEventListener('fetch', (event) => {
  if (event.request.url.includes('/api/')) {
    const start = performance.now();
    
    event.respondWith(
      fetch(event.request).then((response) => {
        const end = performance.now();
        const duration = end - start;
        
        // Log slow API calls
        if (duration > 1000) {
          console.warn(`Slow API call: ${event.request.url} took ${duration.toFixed(2)}ms`);
        }
        
        return response;
      })
    );
  }
});

export default null;
