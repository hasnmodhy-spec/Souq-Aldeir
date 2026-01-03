const CACHE_NAME = 'souq-deir-v2';
const urlsToCache = [
    '/',
    '/index.html',
    '/style.css',
    '/responsive.css',
    '/app.js',
    '/auth.js',
    '/ads.js',
    'https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css'
];

// التثبيت
self.addEventListener('install', event => {
    event.waitUntil(
        caches.open(CACHE_NAME)
            .then(cache => {
                console.log('تم تخزين الملفات في الكاش');
                return cache.addAll(urlsToCache);
            })
    );
});

// التنشيط
self.addEventListener('activate', event => {
    event.waitUntil(
        caches.keys().then(cacheNames => {
            return Promise.all(
                cacheNames.map(cache => {
                    if (cache !== CACHE_NAME) {
                        console.log('حذف الكاش القديم:', cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// الاستلام
self.addEventListener('fetch', event => {
    event.respondWith(
        caches.match(event.request)
            .then(response => {
                // إرجاع النسخة المخبأة أو جلبها من الشبكة
                return response || fetch(event.request)
                    .then(response => {
                        // لا تخزن البيانات الديناميكية
                        if (!event.request.url.includes('/api/')) {
                            return caches.open(CACHE_NAME)
                                .then(cache => {
                                    cache.put(event.request, response.clone());
                                    return response;
                                });
                        }
                        return response;
                    })
                    .catch(() => {
                        // صفحة عدم الاتصال
                        if (event.request.destination === 'document') {
                            return caches.match('/index.html');
                        }
                    });
            })
    );
});

// استلام الرسائل
self.addEventListener('message', event => {
    if (event.data.action === 'skipWaiting') {
        self.skipWaiting();
    }
});