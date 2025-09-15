// Service Worker for PWA functionality
const CACHE_NAME = "pen-tech-solutions-v1.0.0"
const STATIC_CACHE_NAME = "pen-tech-static-v1.0.0"
const DYNAMIC_CACHE_NAME = "pen-tech-dynamic-v1.0.0"

// Assets to cache immediately
const STATIC_ASSETS = [
    "/",
    "/offline",
    "/manifest.json",
    "/icons/icon-192x192.png",
    "/icons/icon-512x512.png",
    "/_next/static/css/app.css",
    "/_next/static/js/app.js",
]

// Install event - cache static assets
self.addEventListener("install", (event) => {
    event.waitUntil(
        caches
            .open(STATIC_CACHE_NAME)
            .then((cache) => {
                return cache.addAll(STATIC_ASSETS)
            })
            .then(() => {
                return self.skipWaiting()
            }),
    )
})

// Activate event - clean up old caches
self.addEventListener("activate", (event) => {
    event.waitUntil(
        caches
            .keys()
            .then((cacheNames) => {
                return Promise.all(
                    cacheNames.map((cacheName) => {
                        if (cacheName !== STATIC_CACHE_NAME && cacheName !== DYNAMIC_CACHE_NAME) {
                            return caches.delete(cacheName)
                        }
                    }),
                )
            })
            .then(() => {
                return self.clients.claim()
            }),
    )
})

// Fetch event - serve from cache, fallback to network
self.addEventListener("fetch", (event) => {
    const { request } = event
    const url = new URL(request.url)

    // Handle navigation requests
    if (request.mode === "navigate") {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    // Cache successful navigation responses
                    if (response.status === 200) {
                        const responseClone = response.clone()
                        caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
                            cache.put(request, responseClone)
                        })
                    }
                    return response
                })
                .catch(() => {
                    // Serve cached version or offline page
                    return caches.match(request).then((cachedResponse) => {
                        return cachedResponse || caches.match("/offline")
                    })
                }),
        )
        return
    }

    // Handle static assets
    if (
        url.pathname.startsWith("/_next/static/") ||
        url.pathname.startsWith("/icons/") ||
        url.pathname === "/manifest.json"
    ) {
        event.respondWith(
            caches.match(request).then((cachedResponse) => {
                return (
                    cachedResponse ||
                    fetch(request).then((response) => {
                        const responseClone = response.clone()
                        caches.open(STATIC_CACHE_NAME).then((cache) => {
                            cache.put(request, responseClone)
                        })
                        return response
                    })
                )
            }),
        )
        return
    }

    // Handle API requests with network-first strategy
    if (url.pathname.startsWith("/api/")) {
        event.respondWith(
            fetch(request)
                .then((response) => {
                    if (response.status === 200) {
                        const responseClone = response.clone()
                        caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
                            cache.put(request, responseClone)
                        })
                    }
                    return response
                })
                .catch(() => {
                    return caches.match(request)
                }),
        )
        return
    }

    // Handle other requests with cache-first strategy
    event.respondWith(
        caches.match(request).then((cachedResponse) => {
            return (
                cachedResponse ||
                fetch(request).then((response) => {
                    if (response.status === 200) {
                        const responseClone = response.clone()
                        caches.open(DYNAMIC_CACHE_NAME).then((cache) => {
                            cache.put(request, responseClone)
                        })
                    }
                    return response
                })
            )
        }),
    )
})

// Handle background sync
self.addEventListener("sync", (event) => {
    if (event.tag === "background-sync") {
        event.waitUntil(
            // Handle background sync tasks
            handleBackgroundSync(),
        )
    }
})

// Handle push notifications
self.addEventListener("push", (event) => {
    if (event.data) {
        const data = event.data.json()
        const options = {
            body: data.body,
            icon: "/icons/icon-192x192.png",
            badge: "/icons/icon-72x72.png",
            vibrate: [100, 50, 100],
            data: {
                dateOfArrival: Date.now(),
                primaryKey: data.primaryKey || 1,
            },
            actions: [
                {
                    action: "explore",
                    title: "View Details",
                    icon: "/icons/action-explore.png",
                },
                {
                    action: "close",
                    title: "Close",
                    icon: "/icons/action-close.png",
                },
            ],
        }

        event.waitUntil(self.registration.showNotification(data.title, options))
    }
})

// Handle notification clicks
self.addEventListener("notificationclick", (event) => {
    event.notification.close()

    if (event.action === "explore") {
        event.waitUntil(clients.openWindow("/"))
    }
})

// Handle skip waiting message
self.addEventListener("message", (event) => {
    if (event.data && event.data.type === "SKIP_WAITING") {
        self.skipWaiting()
    }
})

// Background sync handler
async function handleBackgroundSync() {
    try {
        // Handle any pending background tasks
        console.log("Background sync completed")
    } catch (error) {
        console.error("Background sync failed:", error)
    }
}
