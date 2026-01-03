// service-worker.js
// إصدار التخزين المؤقت - يسمح بتحديث الملفات عند تغيير الرقم
const CACHE_NAME = 'souq-aldeir-v1.0.0';

// الملفات الأساسية التي سيتم تخزينها مؤقتاً عند التثبيت
const FILES_TO_CACHE = [
  '/',
  '/index.html',
  // CSS Files - اضبط الأسماء حسب ملفاتك الفعلية
  '/css/style.css',
  '/css/responsive.css',
  // JS Files - اضبط الأسماء حسب ملفاتك الفعلية
  '/js/main.js',
  '/js/app.js',
  // الصور والأيقونات
  '/icons/icon-72x72.png',
  '/icons/icon-96x96.png',
  '/icons/icon-128x128.png',
  '/icons/icon-144x144.png',
  '/icons/icon-152x152.png',
  '/icons/icon-192x192.png',
  '/icons/icon-384x384.png',
  '/icons/icon-512x512.png',
  '/images/logo.png',
  // صفحات HTML إضافية (إذا كنتَ تملكها)
  '/about.html',
  '/contact.html',
  '/privacy.html'
];

// ====== مرحلة التثبيت ======
// تحدث مرة واحدة عند تثبيت Service Worker لأول مرة
self.addEventListener('install', event => {
  console.log('[Service Worker] التثبيت');
  
  // تأخير إنهاء حدث التثبيت حتى اكتمال تخزين الملفات
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('[Service Worker] تخزين الملفات مؤقتاً');
        return cache.addAll(FILES_TO_CACHE);
      })
      .then(() => {
        console.log('[Service Worker] جميع الملفات تم تخزينها');
        // تخطي مرحلة الانتظار للانتقال فوراً إلى التنشيط
        return self.skipWaiting();
      })
      .catch(error => {
        console.error('[Service Worker] خطأ في التثبيت:', error);
      })
  );
});

// ====== مرحلة التنشيط ======
// تحدث بعد التثبيت مباشرة أو عند تحديث Service Worker
self.addEventListener('activate', event => {
  console.log('[Service Worker] التنشيط');
  
  event.waitUntil(
    // الحصول على أسماء جميع ذواكر التخزين المؤقت
    caches.keys().then(cacheNames => {
      return Promise.all(
        // حذف جميع ذواكر التخزين القديمة
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('[Service Worker] حذف التخزين المؤقت القديم:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
    .then(() => {
      console.log('[Service Worker] أصبح مسيطراً على جميع النوافذ');
      // المطالبة بالسيطرة على جميع النوافذ مباشرة
      return self.clients.claim();
    })
  );
});

// ====== مرحلة الاسترجاع ======
// اعتراض جميع طلبات الشبكة
self.addEventListener('fetch', event => {
  // استثناء طلبات POST وطلبات إلى واجهات برمجة خارجية
  if (event.request.method !== 'GET') {
    return;
  }
  
  // استثناء بعض الملفات التي لا نريد تخزينها (مثل طلبات التحليلات)
  const url = new URL(event.request.url);
  if (url.pathname.includes('/analytics') || 
      url.pathname.includes('/api/')) {
    return;
  }
  
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // إذا وجد الملف في التخزين المؤقت
        if (response) {
          console.log('[Service Worker] تم الاسترجاع من التخزين المؤقت:', event.request.url);
          return response;
        }
        
        // إذا لم يوجد في التخزين المؤقت، نطلبه من الشبكة
        console.log('[Service Worker] جلب من الشبكة:', event.request.url);
        return fetch(event.request)
          .then(networkResponse => {
            // التحقق من صحة الاستجابة
            if (!networkResponse || networkResponse.status !== 200 || 
                networkResponse.type !== 'basic') {
              return networkResponse;
            }
            
            // نسخ الاستجابة وتخزينها في الذاكرة المؤقتة
            const responseToCache = networkResponse.clone();
            caches.open(CACHE_NAME)
              .then(cache => {
                cache.put(event.request, responseToCache);
                console.log('[Service Worker] تم تخزين جديد:', event.request.url);
              });
            
            return networkResponse;
          })
          .catch(error => {
            // إذا فشل الاتصال بالشبكة، يمكن عرض صفحة بديلة
            console.error('[Service Worker] فشل الجلب:', error);
            
            // إذا كان طلب HTML، يمكن عرض صفحة "لا يوجد اتصال"
            if (event.request.headers.get('accept').includes('text/html')) {
              return caches.match('/offline.html')
                .then(offlineResponse => offlineResponse || 
                  new Response('لا يوجد اتصال بالإنترنت', {
                    status: 503,
                    headers: { 'Content-Type': 'text/html; charset=utf-8' }
                  })
                );
            }
            
            // للصور، يمكن عرض صورة بديلة
            if (event.request.url.match(/\.(jpg|png|gif)$/)) {
              return caches.match('/images/offline-image.png')
                .then(imageResponse => imageResponse);
            }
          });
      })
  );
});

// ====== معالجة رسائل التحديث ======
// لطلب تحديث المحتوى من الواجهة الأمامية
self.addEventListener('message', event => {
  if (event.data && event.data.type === 'UPDATE_CACHE') {
    console.log('[Service Worker] تحديث ذاكرة التخزين المطلوبة');
    
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(FILES_TO_CACHE);
      })
      .then(() => {
        // إرسال تأكيد التحديث
        event.ports[0].postMessage({ success: true });
      });
  }
});