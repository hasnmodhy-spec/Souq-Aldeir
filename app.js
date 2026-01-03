    // ملف app.js

// تهيئة التطبيق
document.addEventListener('DOMContentLoaded', function() {
    console.log('سوق الدير الزور - التطبيق جاهز');
    
    // تهيئة البيانات
    initData();
    
    // تحميل الإعلانات
    loadAdsFromStorage();
    
    // إعداد الأحداث
    setupEventListeners();
    
    // تحديث الإحصائيات
    updateStats();
});// نظام تسجيل الأخطاء للهاتف
const errorLog = [];
const originalConsoleError = console.error;

console.error = function(...args) {
    errorLog.push(args.join(' '));
    if (errorLog.length > 10) errorLog.shift(); // حفظ آخر 10 أخطاء فقط
    originalConsoleError.apply(console, args);
    
    // عرض تحذير بصري
    showErrorNotification(args[0]);
};

function showErrorNotification(error) {
    if (!document.getElementById('errorToast')) {
        const toast = document.createElement('div');
        toast.id = 'errorToast';
        toast.style = 'position:fixed; top:20px; right:20px; background:#ef4444; color:white; padding:10px; border-radius:5px; z-index:10000; max-width:300px;';
        document.body.appendChild(toast);
    }
    
    const toast = document.getElementById('errorToast');
    toast.innerHTML = `⚠️ ${error.toString().substring(0, 50)}...`;
    toast.style.display = 'block';
    
    setTimeout(() => {
        toast.style.display = 'none';
    }, 5000);
}

// زر لعرض جميع الأخطاء
const debugBtn = document.createElement('button');
debugBtn.innerHTML = '🐛';
debugBtn.style = 'position:fixed; bottom:20px; right:20px; width:40px; height:40px; border-radius:50%; background:#3b82f6; color:white; border:none; z-index:9999; font-size:20px;';
debugBtn.onclick = () => {
    alert('آخر الأخطاء:\n\n' + errorLog.join('\n\n'));
};
document.body.appendChild(debugBtn);

// تهيئة البيانات
function initData() {
    if (!localStorage.getItem('souq_ads')) {
        const defaultAds = [
            {
                id: 1,
                title: 'تويوتا كامري 2015 فل كامل',
                price: 45000,
                category: 'سيارات',
                location: 'الرياض',
                description: 'سيارة بحالة ممتازة، ماشية 120 ألف كم، صبغ الوكالة، لا تحتاج صيانة',
                phone: '0551234567',
                user: 'أحمد محمد',
                date: 'منذ يومين',
                views: 125
            },
            {
                id: 2,
                title: 'آيفون 13 برو ماكس 256 جيجا',
                price: 3800,
                category: 'هواتف',
                location: 'جدة',
                description: 'بحالة ممتازة، شاشة سليمة، البطارية 95%، مع علبته الأصلية',
                phone: '0557654321',
                user: 'سارة علي',
                date: 'منذ 3 أيام',
                views: 89
            }
        ];
        localStorage.setItem('souq_ads', JSON.stringify(defaultAds));
    }
    
    if (!localStorage.getItem('souq_users')) {
        const defaultUsers = [
            {
                id: 1,
                name: 'أحمد محمد',
                email: 'ahmed@example.com',
                phone: '0551234567',
                password: '123456',
                ads: [1]
            },
            {
                id: 2,
                name: 'سارة علي',
                email: 'sara@example.com',
                phone: '0557654321',
                password: '123456',
                ads: [2]
            }
        ];
        localStorage.setItem('souq_users', JSON.stringify(defaultUsers));
    }
}

// تحميل الإعلانات من التخزين
function loadAdsFromStorage() {
    const ads = JSON.parse(localStorage.getItem('souq_ads') || '[]');
    displayAds(ads);
    return ads;
}

// عرض الإعلانات
function displayAds(ads) {
    const container = document.getElementById('adsContainer');
    if (!container) return;
    
    container.innerHTML = '';
    
    ads.forEach(ad => {
        const adElement = createAdElement(ad);
        container.appendChild(adElement);
    });
}

// إنشاء عنصر إعلان
function createAdElement(ad) {
    const col = document.createElement('div');
    col.className = 'col-md-4 col-sm-6 mb-4';
    
    const priceText = ad.price > 0 ? `${ad.price.toLocaleString()} ر.س` : 'تواصل';
    
    col.innerHTML = `
        <div class="ad-card" onclick="showAdDetails(${ad.id})">
            <div class="ad-image">
                <i class="fas fa-image fa-3x"></i>
                <div class="ad-price">${priceText}</div>
            </div>
            <div class="ad-content">
                <h5 class="ad-title">${ad.title}</h5>
                <div class="ad-location">
                    <i class="fas fa-map-marker-alt"></i> ${ad.location}
                </div>
                <p class="text-muted mb-3 small">${ad.description.substring(0, 80)}...</p>
                <div class="ad-user">
                    <div class="user-avatar">${ad.user.charAt(0)}</div>
                    <div>
                        <div class="small">${ad.user}</div>
                        <div class="text-muted small">${ad.date}</div>
                    </div>
                </div>
            </div>
        </div>
    `;
    
    return col;
}

// عرض تفاصيل الإعلان
function showAdDetails(adId) {
    const ads = JSON.parse(localStorage.getItem('souq_ads') || '[]');
    const ad = ads.find(a => a.id === adId);
    
    if (!ad) {
        alert('الإعلان غير موجود');
        return;
    }
    
    // زيادة عدد المشاهدات
    ad.views = (ad.views || 0) + 1;
    localStorage.setItem('souq_ads', JSON.stringify(ads));
    
    const priceText = ad.price > 0 ? `${ad.price.toLocaleString()} ر.س` : 'مجاناً';
    
    const modalContent = `
        <div class="modal-header">
            <h5 class="modal-title">${ad.title}</h5>
            <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
            <div class="text-center mb-4">
                <div style="height: 200px; background: #f3f4f6; display: flex; align-items: center; justify-content: center; border-radius: 10px;">
                    <i class="fas fa-image fa-5x text-muted"></i>
                </div>
                <h3 class="text-success mt-3">${priceText}</h3>
            </div>
            
            <div class="row mb-3">
                <div class="col-6">
                    <strong><i class="fas fa-tag"></i> القسم:</strong>
                    <p class="mt-1">${ad.category}</p>
                </div>
                <div class="col-6">
                    <strong><i class="fas fa-map-marker-alt"></i> المدينة:</strong>
                    <p class="mt-1">${ad.location}</p>
                </div>
            </div>
            
            <div class="mb-3">
                <strong><i class="fas fa-phone"></i> رقم الهاتف:</strong>
                <div class="mt-2">
                    <a href="tel:${ad.phone}" class="btn btn-primary me-2">
                        <i class="fas fa-phone"></i> ${ad.phone}
                    </a>
                    <a href="https://wa.me/966${ad.phone.substring(1)}?text=مرحباً، أنا مهتم بإعلانك: ${ad.title}" 
                       class="btn btn-success" target="_blank">
                        <i class="fab fa-whatsapp"></i> واتساب
                    </a>
                </div>
            </div>
            
            <div class="mb-3">
                <strong><i class="fas fa-info-circle"></i> الوصف:</strong>
                <p class="mt-2">${ad.description}</p>
            </div>
            
            <div class="mb-3">
                <strong><i class="fas fa-user"></i> الناشر:</strong>
                <p class="mt-1">${ad.user}</p>
            </div>
            
            <div class="row">
                <div class="col-6">
                    <strong><i class="far fa-clock"></i> تاريخ النشر:</strong>
                    <p class="mt-1">${ad.date}</p>
                </div>
                <div class="col-6">
                    <strong><i class="far fa-eye"></i> المشاهدات:</strong>
                    <p class="mt-1">${ad.views || 0}</p>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">إغلاق</button>
            <a href="tel:${ad.phone}" class="btn btn-success">
                <i class="fas fa-phone"></i> اتصل الآن
            </a>
        </div>
    `;
    
    // إنشاء وعرض النافذة
    const modalId = 'adDetailsModal';
    let modal = document.getElementById(modalId);
    
    if (!modal) {
        modal = document.createElement('div');
        modal.id = modalId;
        modal.className = 'modal fade';
        modal.tabIndex = -1;
        modal.innerHTML = `
            <div class="modal-dialog modal-dialog-centered">
                <div class="modal-content">
                    ${modalContent}
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    } else {
        modal.querySelector('.modal-content').innerHTML = modalContent;
    }
    
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
}

// إعداد الأحداث
function setupEventListeners() {
    // البحث
    const searchInput = document.querySelector('.search-input');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
    
    // إضافة إعلان
    const postAdForm = document.getElementById('postAdForm');
    if (postAdForm) {
        postAdForm.addEventListener('submit', handlePostAd);
    }
    
    // تسجيل الدخول
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', handleLogin);
    }
    
    // التسجيل
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', handleRegister);
    }
}

// البحث
function handleSearch(e) {
    const query = e.target.value.toLowerCase();
    const ads = JSON.parse(localStorage.getItem('souq_ads') || '[]');
    
    if (query.length > 2) {
        const filteredAds = ads.filter(ad => 
            ad.title.toLowerCase().includes(query) ||
            ad.description.toLowerCase().includes(query) ||
            ad.category.toLowerCase().includes(query)
        );
        displayAds(filteredAds);
    } else if (query.length === 0) {
        displayAds(ads);
    }
}

// إضافة إعلان جديد
function handlePostAd(e) {
    e.preventDefault();
    
    const form = e.target;
    const ads = JSON.parse(localStorage.getItem('souq_ads') || '[]');
    
    const newAd = {
        id: ads.length > 0 ? Math.max(...ads.map(a => a.id)) + 1 : 1,
        title: form.querySelector('[placeholder*="عنوان"]').value,
        price: parseInt(form.querySelector('[placeholder*="السعر"]').value) || 0,
        category: form.querySelector('select').value,
        location: form.querySelector('[placeholder*="المدينة"]').value,
        description: form.querySelector('textarea').value,
        phone: form.querySelector('[placeholder*="رقم الهاتف"]').value,
        user: 'مستخدم جديد',
        date: 'الآن',
        views: 0
    };
    
    ads.unshift(newAd);
    localStorage.setItem('souq_ads', JSON.stringify(ads));
    
    // تحديث العرض
    displayAds(ads);
    
    // إغلاق النافذة
    const modal = bootstrap.Modal.getInstance(document.getElementById('postAdModal'));
    modal.hide();
    
    // إعادة تعيين النموذج
    form.reset();
    
    // عرض رسالة النجاح
    showMessage('تم نشر إعلانك بنجاح!', 'success');
    
    // تحديث الإحصائيات
    updateStats();
}

// تسجيل الدخول
function handleLogin(e) {
    e.preventDefault();
    
    const form = e.target;
    const email = form.querySelector('input[type="text"]').value;
    const password = form.querySelector('input[type="password"]').value;
    
    const users = JSON.parse(localStorage.getItem('souq_users') || '[]');
    const user = users.find(u => 
        (u.email === email || u.phone === email) && 
        u.password === password
    );
    
    if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        showMessage('تم تسجيل الدخول بنجاح!', 'success');
        
        const modal = bootstrap.Modal.getInstance(document.getElementById('loginModal'));
        modal.hide();
        
        updateUserUI(user);
    } else {
        showMessage('البريد الإلكتروني أو كلمة المرور غير صحيحة', 'error');
    }
}

// التسجيل
function handleRegister(e) {
    e.preventDefault();
    
    const form = e.target;
    const firstName = form.querySelector('[placeholder*="الاسم الأول"]').value;
    const lastName = form.querySelector('[placeholder*="اسم العائلة"]').value;
    const email = form.querySelector('[type="email"]').value;
    const phone = form.querySelector('[type="tel"]').value;
    const password = form.querySelector('[type="password"]').value;
    
    const users = JSON.parse(localStorage.getItem('souq_users') || '[]');
    
    // التحقق من عدم وجود مستخدم مسجل بنفس البريد
    if (users.some(u => u.email === email)) {
        showMessage('البريد الإلكتروني مسجل مسبقاً', 'error');
        return;
    }
    
    const newUser = {
        id: users.length + 1,
        name: `${firstName} ${lastName}`,
        email: email,
        phone: phone,
        password: password,
        ads: []
    };
    
    users.push(newUser);
    localStorage.setItem('souq_users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(newUser));
    
    showMessage('تم إنشاء حسابك بنجاح!', 'success');
    
    const modal = bootstrap.Modal.getInstance(document.getElementById('registerModal'));
    modal.hide();
    
    updateUserUI(newUser);
}

// تحديث واجهة المستخدم بعد التسجيل
function updateUserUI(user) {
    const userButtons = document.querySelectorAll('[data-bs-target="#loginModal"]');
    userButtons.forEach(btn => {
        btn.innerHTML = `<i class="fas fa-user"></i> ${user.name.split(' ')[0]}`;
        btn.setAttribute('data-bs-toggle', 'dropdown');
        
        // إنشاء قائمة منسدلة
        const dropdown = document.createElement('ul');
        dropdown.className = 'dropdown-menu';
        dropdown.innerHTML = `
            <li><a class="dropdown-item" href="#"><i class="fas fa-user-circle"></i> حسابي</a></li>
            <li><a class="dropdown-item" href="#"><i class="fas fa-bullhorn"></i> إعلاناتي</a></li>
            <li><hr class="dropdown-divider"></li>
            <li><a class="dropdown-item text-danger" href="#" onclick="logout()"><i class="fas fa-sign-out-alt"></i> تسجيل الخروج</a></li>
        `;
        
        btn.parentNode.appendChild(dropdown);
    });
}

// تسجيل الخروج
function logout() {
    localStorage.removeItem('currentUser');
    location.reload();
}

// تحديث الإحصائيات
function updateStats() {
    const ads = JSON.parse(localStorage.getItem('souq_ads') || '[]');
    const users = JSON.parse(localStorage.getItem('souq_users') || '[]');
    
    // يمكن إضافة عرض الإحصائيات في المستقبل
    console.log(`عدد الإعلانات: ${ads.length}`);
    console.log(`عدد المستخدمين: ${users.length}`);
}

// عرض رسالة
function showMessage(message, type = 'info') {
    // إنشاء عنصر الرسالة
    const messageDiv = document.createElement('div');
    messageDiv.className = `alert alert-${type === 'error' ? 'danger' : type} position-fixed`;
    messageDiv.style.cssText = `
        top: 20px;
        left: 50%;
        transform: translateX(-50%);
        z-index: 9999;
        min-width: 300px;
        text-align: center;
    `;
    messageDiv.textContent = message;
    
    document.body.appendChild(messageDiv);
    
    // إزالة الرسالة بعد 3 ثوانٍ
    setTimeout(() => {
        messageDiv.remove();
    }, 3000);
}

// تصدير الدوال للاستخدام العالمي
window.showAdDetails = showAdDetails;
window.logout = logout;