// ملف app.js - الوظائف الرئيسية

// تهيئة المتغيرات العامة
let currentUser = null;
let ads = [];
let categories = [];

// تهيئة التطبيق عند تحميل الصفحة
document.addEventListener('DOMContentLoaded', function() {
    console.log('سوق الدير الزور - التطبيق جاهز!');
    
    // تهيئة البيانات
    initializeData();
    
    // إعداد المستمعين للأحداث
    setupEventListeners();
    
    // تحميل الإعلانات
    loadAds();
    
    // تحميل الأقسام
    loadCategories();
    
    // التحقق من حالة تسجيل الدخول
    checkLoginStatus();
    
    // تحديث الإحصائيات
    updateStatistics();
});

// تهيئة البيانات الافتراضية
function initializeData() {
    // بيانات الأقسام الافتراضية
    categories = [
        { id: 1, name: 'سيارات', icon: 'fas fa-car', count: 245, color: '#3b82f6' },
        { id: 2, name: 'عقارات', icon: 'fas fa-home', count: 189, color: '#10b981' },
        { id: 3, name: 'هواتف', icon: 'fas fa-mobile-alt', count: 312, color: '#8b5cf6' },
        { id: 4, name: 'أجهزة كهربائية', icon: 'fas fa-plug', count: 156, color: '#f59e0b' },
        { id: 5, name: 'ملابس', icon: 'fas fa-tshirt', count: 423, color: '#ec4899' },
        { id: 6, name: 'أثاث', icon: 'fas fa-couch', count: 278, color: '#6366f1' },
        { id: 7, name: 'وظائف', icon: 'fas fa-briefcase', count: 89, color: '#14b8a6' },
        { id: 8, name: 'خدمات', icon: 'fas fa-concierge-bell', count: 134, color: '#f97316' },
        { id: 9, name: 'حيوانات', icon: 'fas fa-paw', count: 67, color: '#84cc16' },
        { id: 10, name: 'ألعاب', icon: 'fas fa-gamepad', count: 98, color: '#06b6d4' },
        { id: 11, name: 'كتب', icon: 'fas fa-book', count: 56, color: '#8b5cf6' },
        { id: 12, name: 'سفر', icon: 'fas fa-plane', count: 42, color: '#10b981' }
    ];
    
    // بيانات الإعلانات الافتراضية
    ads = [
        {
            id: 1,
            title: 'تويوتا كامري 2015 فل كامل',
            price: 45000,
            category: 'سيارات',
            location: 'الرياض',
            description: 'سيارة تويوتا كامري 2015 فل كامل، ماشية 120 ألف كم، صبغ الوكالة، لا تحتاج صيانة.',
            images: [],
            phone: '0551234567',
            userId: 1,
            userName: 'أحمد محمد',
            createdAt: '2024-01-15',
            views: 245
        },
        {
            id: 2,
            title: 'آيفون 13 برو ماكس 256 جيجا',
            price: 3800,
            category: 'هواتف',
            location: 'جدة',
            description: 'آيفون 13 برو ماكس بحالة ممتازة، شاشة سليمة، البطارية 95%، مع علبته الأصلية.',
            images: [],
            phone: '0557654321',
            userId: 2,
            userName: 'سارة علي',
            createdAt: '2024-01-14',
            views: 189
        },
        {
            id: 3,
            title: 'شقة للإيجار حي النخيل',
            price: 35000,
            category: 'عقارات',
            location: 'الدمام',
            description: 'شقة فاخرة للإيجار السنوي، 3 غرف نوم، صالة كبيرة، مطبخ أمريكي، مواقف متوفرة.',
            images: [],
            phone: '0559876543',
            userId: 3,
            userName: 'خالد عبدالله',
            createdAt: '2024-01-13',
            views: 312
        },
        {
            id: 4,
            title: 'ثلاجة سامسونج 20 قدم جديدة',
            price: 2200,
            category: 'أجهزة كهربائية',
            location: 'الرياض',
            description: 'ثلاجة سامسونج 20 قدم جديدة بالكرتونة، ضمان سنتين، طاقة موفرة.',
            images: [],
            phone: '0551122334',
            userId: 4,
            userName: 'فاطمة حسن',
            createdAt: '2024-01-12',
            views: 156
        }
    ];
}

// إعداد المستمعين للأحداث
function setupEventListeners() {
    // زر القائمة للجوال
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }
    
    // زر إضافة إعلان
    const postAdBtn = document.getElementById('postAdBtn');
    if (postAdBtn) {
        postAdBtn.addEventListener('click', showPostAdModal);
    }
    
    // زر إضافة إعلان للجوال
    const mobilePostAdBtn = document.getElementById('mobilePostAdBtn');
    if (mobilePostAdBtn) {
        mobilePostAdBtn.addEventListener('click', showPostAdModal);
    }
    
    // زر البحث
    const searchButton = document.getElementById('searchButton');
    if (searchButton) {
        searchButton.addEventListener('click', performSearch);
    }
    
    // زر تسجيل الدخول
    const loginBtn = document.getElementById('loginBtn');
    if (loginBtn) {
        loginBtn.addEventListener('click', showLoginModal);
    }
    
    // زر تسجيل الدخول للجوال
    const mobileLoginBtn = document.getElementById('mobileLoginBtn');
    if (mobileLoginBtn) {
        mobileLoginBtn.addEventListener('click', showLoginModal);
    }
    
    // زر إنشاء حساب
    const registerBtn = document.getElementById('registerBtn');
    if (registerBtn) {
        registerBtn.addEventListener('click', showRegisterModal);
    }
    
    // زر البدء بالتسوق
    const startShopping = document.getElementById('startShopping');
    if (startShopping) {
        startShopping.addEventListener('click', function() {
            document.getElementById('products').scrollIntoView({ behavior: 'smooth' });
        });
    }
    
    // الانتقال بين نماذج التسجيل والدخول
    const showRegisterForm = document.getElementById('showRegisterForm');
    if (showRegisterForm) {
        showRegisterForm.addEventListener('click', function(e) {
            e.preventDefault();
            $('#loginModal').modal('hide');
            $('#registerModal').modal('show');
        });
    }
    
    const showLoginForm = document.getElementById('showLoginForm');
    if (showLoginForm) {
        showLoginForm.addEventListener('click', function(e) {
            e.preventDefault();
            $('#registerModal').modal('hide');
            $('#loginModal').modal('show');
        });
    }
    
    // نموذج تسجيل الدخول
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // نموذج التسجيل
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
    
    // نموذج إضافة إعلان
    const postAdForm = document.getElementById('postAdForm');
    if (postAdForm) {
        postAdForm.addEventListener('submit', handlePostAd);
    }
}

// تحميل الإعلانات وعرضها
function loadAds() {
    const adsGrid = document.getElementById('adsGrid');
    if (!adsGrid) return;
    
    adsGrid.innerHTML = '';
    
    ads.forEach(ad => {
        const adCard = createAdCard(ad);
        adsGrid.appendChild(adCard);
    });
}

// إنشاء بطاقة إعلان
function createAdCard(ad) {
    const adCard = document.createElement('div');
    adCard.className = 'ad-card';
    adCard.setAttribute('data-ad-id', ad.id);
    
    // تنسيق السعر
    const formattedPrice = ad.price.toLocaleString('ar-SA');
    
    adCard.innerHTML = `
        <div class="ad-image">
            <i class="fas fa-image" style="font-size: 3rem; color: #9ca3af;"></i>
            <span class="ad-badge">${ad.category}</span>
        </div>
        <div class="ad-content">
            <h3 class="ad-title">${ad.title}</h3>
            <div class="ad-price">${formattedPrice} ر.س</div>
            <div class="ad-location">
                <i class="fas fa-map-marker-alt"></i>
                ${ad.location}
            </div>
            <p class="ad-description">${ad.description.substring(0, 100)}...</p>
            <div class="ad-footer">
                <div class="ad-user">
                    <div class="user-avatar">${ad.userName.charAt(0)}</div>
                    <span>${ad.userName}</span>
                </div>
                <div class="ad-time">
                    <i class="far fa-clock"></i>
                    ${formatDate(ad.createdAt)}
                </div>
            </div>
        </div>
    `;
    
    // إضافة حدث النقر
    adCard.addEventListener('click', function() {
        viewAdDetails(ad.id);
    });
    
    return adCard;
}

// تحميل الأقسام وعرضها
function loadCategories() {
    const categoriesGrid = document.getElementById('categoriesGrid');
    if (!categoriesGrid) return;
    
    categoriesGrid.innerHTML = '';
    
    categories.forEach(category => {
        const categoryCard = createCategoryCard(category);
        categoriesGrid.appendChild(categoryCard);
    });
}

// إنشاء بطاقة قسم
function createCategoryCard(category) {
    const categoryCard = document.createElement('a');
    categoryCard.className = 'category-card';
    categoryCard.href = '#';
    categoryCard.setAttribute('data-category-id', category.id);
    
    categoryCard.innerHTML = `
        <div class="category-icon">
            <i class="${category.icon}" style="color: ${category.color};"></i>
        </div>
        <h4>${category.name}</h4>
        <div class="category-count">${category.count} إعلان</div>
    `;
    
    categoryCard.addEventListener('click', function(e) {
        e.preventDefault();
        filterByCategory(category.id);
    });
    
    return categoryCard;
}

// عرض تفاصيل الإعلان
function viewAdDetails(adId) {
    const ad = ads.find(a => a.id === adId);
    if (!ad) return;
    
    // زيادة عدد المشاهدات
    ad.views++;
    
    // عرض تفاصيل الإعلان في نافذة منبثقة
    const modalContent = `
        <div class="modal-header">
            <h5 class="modal-title">${ad.title}</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
            <div class="row">
                <div class="col-md-6">
                    <div class="ad-detail-image mb-3">
                        <i class="fas fa-image" style="font-size: 5rem; color: #9ca3af;"></i>
                    </div>
                </div>
                <div class="col-md-6">
                    <h3 class="text-success">${ad.price.toLocaleString('ar-SA')} ر.س</h3>
                    <p><strong>القسم:</strong> ${ad.category}</p>
                    <p><strong>المدينة:</strong> ${ad.location}</p>
                    <p><strong>رقم الهاتف:</strong> <a href="tel:${ad.phone}">${ad.phone}</a></p>
                    <p><strong>الناشر:</strong> ${ad.userName}</p>
                    <p><strong>تاريخ النشر:</strong> ${formatDate(ad.createdAt)}</p>
                    <p><strong>المشاهدات:</strong> ${ad.views}</p>
                </div>
            </div>
            <div class="mt-4">
                <h5>وصف الإعلان</h5>
                <p>${ad.description}</p>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">إغلاق</button>
            <a href="tel:${ad.phone}" class="btn btn-success">
                <i class="fas fa-phone"></i> اتصل بالبائع
            </a>
            <a href="https://wa.me/966${ad.phone.substring(1)}?text=مرحباً، أنا مهتم بإعلانك: ${ad.title}" 
               class="btn btn-success" target="_blank">
                <i class="fab fa-whatsapp"></i> واتساب
            </a>
        </div>
    `;
    
    // إنشاء وعرض النافذة المنبثقة
    const modalId = 'adDetailsModal';
    let modal = document.getElementById(modalId);
    
    if (!modal) {
        modal = document.createElement('div');
        modal.id = modalId;
        modal.className = 'modal fade';
        modal.tabIndex = -1;
        modal.innerHTML = `
            <div class="modal-dialog modal-dialog-centered modal-lg">
                <div class="modal-content">
                    ${modalContent}
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    } else {
        modal.querySelector('.modal-content').innerHTML = modalContent;
    }
    
    // عرض النافذة
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
}

// تصفية الإعلانات حسب القسم
function filterByCategory(categoryId) {
    const category = categories.find(c => c.id === categoryId);
    if (!category) return;
    
    const filteredAds = ads.filter(ad => {
        // هذا مثال بسيط، في التطبيق الحقيقي سيكون هناك تطابق أفضل
        return ad.category.includes(category.name) || 
               category.name.includes(ad.category);
    });
    
    // عرض الإعلانات المصفاة
    const adsGrid = document.getElementById('adsGrid');
    if (!adsGrid) return;
    
    adsGrid.innerHTML = '';
    
    if (filteredAds.length === 0) {
        adsGrid.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-inbox" style="font-size: 4rem; color: #9ca3af; margin-bottom: 20px;"></i>
                <h4>لا توجد إعلانات في هذا القسم</h4>
                <p class="text-muted">كن أول من ينشر إعلاناً في هذا القسم!</p>
                <button class="btn btn-primary" onclick="showPostAdModal()">
                    <i class="fas fa-plus-circle"></i> أضف إعلان الآن
                </button>
            </div>
        `;
        return;
    }
    
    filteredAds.forEach(ad => {
        const adCard = createAdCard(ad);
        adsGrid.appendChild(adCard);
    });
    
    // عرض رسالة للمستخدم
    showNotification(`تم عرض ${filteredAds.length} إعلان في قسم "${category.name}"`, 'success');
}

// البحث في الإعلانات
function performSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchCategory = document.getElementById('searchCategory');
    
    const query = searchInput.value.trim();
    const category = searchCategory.value;
    
    if (!query && !category) {
        showNotification('الرجاء إدخال كلمة بحث أو اختيار قسم', 'warning');
        return;
    }
    
    let filteredAds = ads;
    
    // التصفية حسب نص البحث
    if (query) {
        filteredAds = filteredAds.filter(ad => 
            ad.title.toLowerCase().includes(query.toLowerCase()) ||
            ad.description.toLowerCase().includes(query.toLowerCase())
        );
    }
    
    // التصفية حسب القسم
    if (category) {
        filteredAds = filteredAds.filter(ad => 
            ad.category.toLowerCase().includes(category.toLowerCase())
        );
    }
    
    // عرض نتائج البحث
    const adsGrid = document.getElementById('adsGrid');
    if (!adsGrid) return;
    
    adsGrid.innerHTML = '';
    
    if (filteredAds.length === 0) {
        adsGrid.innerHTML = `
            <div class="col-12 text-center py-5">
                <i class="fas fa-search" style="font-size: 4rem; color: #9ca3af; margin-bottom: 20px;"></i>
                <h4>لا توجد نتائج للبحث</h4>
                <p class="text-muted">حاول استخدام كلمات بحث أخرى أو تصفح جميع الإعلانات</p>
                <button class="btn btn-primary" onclick="resetSearch()">
                    <i class="fas fa-redo"></i> عرض جميع الإعلانات
                </button>
            </div>
        `;
        return;
    }
    
    filteredAds.forEach(ad => {
        const adCard = createAdCard(ad);
        adsGrid.appendChild(adCard);
    });
    
    // عرض رسالة بنتائج البحث
    const message = query && category 
        ? `تم العثور على ${filteredAds.length} إعلان للبحث "${query}" في قسم "${category}"`
        : query 
        ? `تم العثور على ${filteredAds.length} إعلان للبحث "${query}"`
        : `تم عرض ${filteredAds.length} إعلان في قسم "${category}"`;
    
    showNotification(message, 'success');
}

// إعادة تعيين البحث
function resetSearch() {
    const searchInput = document.querySelector('.search-input');
    const searchCategory = document.getElementById('searchCategory');
    
    searchInput.value = '';
    searchCategory.value = '';
    
    loadAds();
}

// عرض نافذة إضافة إعلان
function showPostAdModal() {
    if (!currentUser) {
        showNotification('يجب تسجيل الدخول أولاً لنشر إعلان', 'warning');
        showLoginModal();
        return;
    }
    
    $('#postAdModal').modal('show');
}

// التعامل مع إضافة إعلان جديد
function handlePostAd(e) {
    e.preventDefault();
    
    const title = document.getElementById('adTitle').value;
    const category = document.getElementById('adCategory').value;
    const price = parseInt(document.getElementById('adPrice').value);
    const description = document.getElementById('adDescription').value;
    const city = document.getElementById('adCity').value;
    const phone = document.getElementById('adPhone').value;
    
    // التحقق من البيانات
    if (!title || !category || !price || !description || !city || !phone) {
        showNotification('الرجاء ملء جميع الحقول المطلوبة', 'error');
        return;
    }
    
    if (price <= 0) {
        showNotification('السعر يجب أن يكون أكبر من صفر', 'error');
        return;
    }
    
    // إنشاء إعلان جديد
    const newAd = {
        id: ads.length + 1,
        title: title,
        price: price,
        category: category,
        location: city,
        description: description,
        images: [],
        phone: phone,
        userId: currentUser.id,
        userName: currentUser.name,
        createdAt: new Date().toISOString().split('T')[0],
        views: 0
    };
    
    // إضافة الإعلان إلى القائمة
    ads.unshift(newAd);
    
    // تحديث عرض الإعلانات
    loadAds();
    
    // إغلاق النافذة
    $('#postAdModal').modal('hide');
    
    // إعادة تعيين النموذج
    e.target.reset();
    
    // عرض رسالة النجاح
    showNotification('تم نشر إعلانك بنجاح!', 'success');
    
    // تحديث الإحصائيات
    updateStatistics();
}

// تحديث الإحصائيات
function updateStatistics() {
    // تحديث عدد الإعلانات
    const totalAdsElement = document.getElementById('totalAds');
    if (totalAdsElement) {
        totalAdsElement.textContent = ads.length.toLocaleString('ar-SA');
    }
    
    // تحديث عدد المستخدمين (افتراضي)
    const totalUsersElement = document.getElementById('totalUsers');
    if (totalUsersElement) {
        // في التطبيق الحقيقي، هذا سيأتي من قاعدة البيانات
        const userCount = 5678 + Math.floor(Math.random() * 100);
        totalUsersElement.textContent = userCount.toLocaleString('ar-SA');
    }
    
    // تحديث عدد الصفقات الناجحة (افتراضي)
    const successDealsElement = document.getElementById('successDeals');
    if (successDealsElement) {
        // في التطبيق الحقيقي، هذا سيأتي من قاعدة البيانات
        const dealsCount = 3421 + Math.floor(Math.random() * 50);
        successDealsElement.textContent = dealsCount.toLocaleString('ar-SA');
    }
}

// وظائف مساعدة
function formatDate(dateString) {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now - date);
    const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 0) return 'اليوم';
    if (diffDays === 1) return 'أمس';
    if (diffDays < 7) return `قبل ${diffDays} أيام`;
    if (diffDays < 30) return `قبل ${Math.floor(diffDays / 7)} أسابيع`;
    
    return date.toLocaleDateString('ar-SA');
}

function showNotification(message, type = 'info') {
    // إنشاء عنصر الإشعار
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">&times;</button>
    `;
    
    // إضافة CSS للإشعار إذا لم يكن موجوداً
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                left: 50%;
                transform: translateX(-50%);
                background: white;
                padding: 15px 20px;
                border-radius: 8px;
                box-shadow: 0 5px 15px rgba(0,0,0,0.2);
                display: flex;
                align-items: center;
                gap: 10px;
                z-index: 9999;
                animation: slideDown 0.3s ease;
            }
            .notification-success {
                border-right: 4px solid #10b981;
            }
            .notification-error {
                border-right: 4px solid #ef4444;
            }
            .notification-warning {
                border-right: 4px solid #f59e0b;
            }
            .notification-content {
                display: flex;
                align-items: center;
                gap: 10px;
            }
            .notification-close {
                background: none;
                border: none;
                font-size: 1.5rem;
                cursor: pointer;
                color: #6b7280;
            }
            @keyframes slideDown {
                from { top: -100px; }
                to { top: 20px; }
            }
        `;
        document.head.appendChild(style);
    }
    
    // إضافة الإشعار إلى الصفحة
    document.body.appendChild(notification);
    
    // إضافة حدث الإغلاق
    notification.querySelector('.notification-close').addEventListener('click', function() {
        notification.style.animation = 'slideUp 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    });
    
    // إزالة الإشعار تلقائياً بعد 5 ثوانٍ
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideUp 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }
    }, 5000);
}

// تبديل القائمة المتنقلة
function toggleMobileMenu() {
    const mobileMenu = document.getElementById('mobileMenu');
    if (mobileMenu) {
        if (mobileMenu.style.display === 'flex') {
            mobileMenu.style.display = 'none';
        } else {
            mobileMenu.style.display = 'flex';
        }
    }
}

// إغلاق القائمة المتنقلة عند النقر خارجها
document.addEventListener('click', function(e) {
    const mobileMenu = document.getElementById('mobileMenu');
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    
    if (mobileMenu && mobileMenu.style.display === 'flex' && 
        !mobileMenu.contains(e.target) && 
        !mobileMenuBtn.contains(e.target)) {
        mobileMenu.style.display = 'none';
    }
});

// تصدير الوظائف للاستخدام العالمي
window.resetSearch = resetSearch;
window.showPostAdModal = showPostAdModal;
window.filterByCategory = filterByCategory;