// ملف ads.js - إدارة الإعلانات

// بيانات الإعلانات
let ads = [];
let userAds = [];
let favoriteAds = [];

// تهيئة نظام الإعلانات
document.addEventListener('DOMContentLoaded', function() {
    // تحميل الإعلانات من التخزين المحلي
    loadAdsFromStorage();
    
    // تحميل الإعلانات المفضلة
    loadFavoritesFromStorage();
    
    // تحميل إعلانات المستخدم إذا كان مسجلاً دخوله
    if (typeof isLoggedIn === 'function' && isLoggedIn()) {
        loadUserAds();
    }
});

// تحميل الإعلانات من التخزين المحلي
function loadAdsFromStorage() {
    const storedAds = localStorage.getItem('souqAds');
    if (storedAds) {
        ads = JSON.parse(storedAds);
    } else {
        // بيانات الإعلانات الافتراضية
        ads = [
            {
                id: 1,
                title: 'تويوتا كامري 2015 فل كامل',
                price: 45000,
                category: 'سيارات',
                location: 'الرياض',
                description: 'سيارة تويوتا كامري 2015 فل كامل، ماشية 120 ألف كم، صبغ الوكالة، لا تحتاج صيانة. فحص كامل ومشتملات السياره كامله.',
                images: [],
                phone: '0551234567',
                userId: 1,
                userName: 'أحمد محمد',
                createdAt: '2024-01-15',
                views: 245,
                status: 'active',
                condition: 'مستعمل - جيد'
            },
            {
                id: 2,
                title: 'آيفون 13 برو ماكس 256 جيجا',
                price: 3800,
                category: 'هواتف',
                location: 'جدة',
                description: 'آيفون 13 برو ماكس بحالة ممتازة، شاشة سليمة، البطارية 95%، مع علبته الأصلية وملحقاته. الضمان باقي 3 أشهر.',
                images: [],
                phone: '0557654321',
                userId: 2,
                userName: 'سارة علي',
                createdAt: '2024-01-14',
                views: 189,
                status: 'active',
                condition: 'مستعمل - ممتاز'
            },
            {
                id: 3,
                title: 'شقة للإيجار حي النخيل',
                price: 35000,
                category: 'عقارات',
                location: 'الدمام',
                description: 'شقة فاخرة للإيجار السنوي، 3 غرف نوم، صالة كبيرة، مطبخ أمريكي، مواقف متوفرة. العمارة جديدة والتشطيب سوبر لوكس.',
                images: [],
                phone: '0559876543',
                userId: 3,
                userName: 'خالد عبدالله',
                createdAt: '2024-01-13',
                views: 312,
                status: 'active',
                condition: 'جديد'
            },
            {
                id: 4,
                title: 'ثلاجة سامسونج 20 قدم جديدة',
                price: 2200,
                category: 'أجهزة كهربائية',
                location: 'الرياض',
                description: 'ثلاجة سامسونج 20 قدم جديدة بالكرتونة، ضمان سنتين، طاقة موفرة. لم تستخدم أبداً ومعها فاتورة الشراء.',
                images: [],
                phone: '0551122334',
                userId: 4,
                userName: 'فاطمة حسن',
                createdAt: '2024-01-12',
                views: 156,
                status: 'active',
                condition: 'جديد'
            },
            {
                id: 5,
                title: 'مجموعة كتب علمية نادرة',
                price: 800,
                category: 'كتب',
                location: 'مكة',
                description: 'مجموعة كتب علمية نادرة في الفيزياء والرياضيات، إصدارات قديمة بحالة جيدة. تشمل كتب لعلماء مشهورين.',
                images: [],
                phone: '0555566778',
                userId: 5,
                userName: 'علي حسين',
                createdAt: '2024-01-11',
                views: 89,
                status: 'active',
                condition: 'مستعمل - جيد'
            },
            {
                id: 6,
                title: 'وظيفة مبرمج ويب',
                price: 0,
                category: 'وظائف',
                location: 'الرياض',
                description: 'مطلوب مبرمج ويب بخبرة 3 سنوات في تقنيات الويب الحديثة. راتب ممتاز ومزايا عديدة. العمل عن بعد متاح.',
                images: [],
                phone: '0559988776',
                userId: 6,
                userName: 'شركة التقنية',
                createdAt: '2024-01-10',
                views: 421,
                status: 'active',
                condition: 'جديد'
            }
        ];
        saveAdsToStorage();
    }
}

// حفظ الإعلانات في التخزين المحلي
function saveAdsToStorage() {
    localStorage.setItem('souqAds', JSON.stringify(ads));
}

// تحميل الإعلانات المفضلة
function loadFavoritesFromStorage() {
    const storedFavorites = localStorage.getItem('souqFavorites');
    if (storedFavorites) {
        favoriteAds = JSON.parse(storedFavorites);
    }
}

// حفظ الإعلانات المفضلة
function saveFavoritesToStorage() {
    localStorage.setItem('souqFavorites', JSON.stringify(favoriteAds));
}

// تحميل إعلانات المستخدم
function loadUserAds() {
    if (typeof getCurrentUser !== 'function') return;
    
    const user = getCurrentUser();
    if (!user) return;
    
    userAds = ads.filter(ad => ad.userId === user.id);
}

// الحصول على جميع الإعلانات
function getAllAds() {
    return ads;
}

// الحصول على إعلانات المستخدم
function getUserAds() {
    return userAds;
}

// الحصول على الإعلانات المفضلة
function getFavoriteAds() {
    return favoriteAds;
}

// إضافة إعلان جديد
function addNewAd(adData) {
    // إنشاء ID جديد
    const newId = ads.length > 0 ? Math.max(...ads.map(ad => ad.id)) + 1 : 1;
    
    // إنشاء الإعلان
    const newAd = {
        id: newId,
        title: adData.title,
        price: adData.price,
        category: adData.category,
        location: adData.location,
        description: adData.description,
        images: adData.images || [],
        phone: adData.phone,
        userId: adData.userId,
        userName: adData.userName,
        createdAt: new Date().toISOString().split('T')[0],
        views: 0,
        status: 'active',
        condition: adData.condition || 'مستعمل - جيد'
    };
    
    // إضافة الإعلان إلى القائمة
    ads.unshift(newAd);
    
    // حفظ في التخزين المحلي
    saveAdsToStorage();
    
    // تحديث إعلانات المستخدم إذا كان هو الناشر
    if (typeof getCurrentUser === 'function') {
        const user = getCurrentUser();
        if (user && user.id === adData.userId) {
            userAds.unshift(newAd);
            
            // زيادة عدد إعلانات المستخدم
            if (typeof incrementUserAdsCount === 'function') {
                incrementUserAdsCount();
            }
        }
    }
    
    return newAd;
}

// تحديث إعلان
function updateAd(adId, updatedData) {
    const adIndex = ads.findIndex(ad => ad.id === adId);
    if (adIndex === -1) return false;
    
    // تحديث البيانات
    ads[adIndex] = { ...ads[adIndex], ...updatedData };
    
    // حفظ في التخزين المحلي
    saveAdsToStorage();
    
    // تحديث إعلانات المستخدم إذا لزم
    if (typeof getCurrentUser === 'function') {
        const user = getCurrentUser();
        if (user && user.id === ads[adIndex].userId) {
            const userAdIndex = userAds.findIndex(ad => ad.id === adId);
            if (userAdIndex !== -1) {
                userAds[userAdIndex] = ads[adIndex];
            }
        }
    }
    
    return true;
}

// حذف إعلان
function deleteAd(adId) {
    const adIndex = ads.findIndex(ad => ad.id === adId);
    if (adIndex === -1) return false;
    
    // التحقق من صلاحيات المستخدم
    if (typeof isLoggedIn === 'function' && isLoggedIn()) {
        const user = getCurrentUser();
        if (user && user.id !== ads[adIndex].userId) {
            showNotification('ليس لديك صلاحية لحذف هذا الإعلان', 'error');
            return false;
        }
    }
    
    // حذف الإعلان
    ads.splice(adIndex, 1);
    
    // حذف من إعلانات المستخدم
    const userAdIndex = userAds.findIndex(ad => ad.id === adId);
    if (userAdIndex !== -1) {
        userAds.splice(userAdIndex, 1);
    }
    
    // حذف من المفضلة
    const favoriteIndex = favoriteAds.findIndex(id => id === adId);
    if (favoriteIndex !== -1) {
        favoriteAds.splice(favoriteIndex, 1);
        saveFavoritesToStorage();
    }
    
    // حفظ في التخزين المحلي
    saveAdsToStorage();
    
    return true;
}

// إضافة إعلان إلى المفضلة
function addToFavorites(adId) {
    if (typeof isLoggedIn !== 'function' || !isLoggedIn()) {
        showNotification('يجب تسجيل الدخول لإضافة إعلان إلى المفضلة', 'warning');
        return false;
    }
    
    if (favoriteAds.includes(adId)) {
        showNotification('هذا الإعلان مضاف بالفعل إلى المفضلة', 'info');
        return false;
    }
    
    favoriteAds.push(adId);
    saveFavoritesToStorage();
    
    showNotification('تمت إضافة الإعلان إلى المفضلة', 'success');
    return true;
}

// إزالة إعلان من المفضلة
function removeFromFavorites(adId) {
    const index = favoriteAds.findIndex(id => id === adId);
    if (index === -1) return false;
    
    favoriteAds.splice(index, 1);
    saveFavoritesToStorage();
    
    showNotification('تمت إزالة الإعلان من المفضلة', 'info');
    return true;
}

// التحقق مما إذا كان الإعلان في المفضلة
function isFavorite(adId) {
    return favoriteAds.includes(adId);
}

// زيادة عدد مشاهدات الإعلان
function incrementAdViews(adId) {
    const ad = ads.find(a => a.id === adId);
    if (!ad) return;
    
    ad.views++;
    saveAdsToStorage();
}

// البحث في الإعلانات
function searchAds(query, category = '', location = '', minPrice = 0, maxPrice = 999999999) {
    let results = ads.filter(ad => ad.status === 'active');
    
    // التصفية حسب نص البحث
    if (query) {
        results = results.filter(ad => 
            ad.title.toLowerCase().includes(query.toLowerCase()) ||
            ad.description.toLowerCase().includes(query.toLowerCase())
        );
    }
    
    // التصفية حسب القسم
    if (category) {
        results = results.filter(ad => 
            ad.category.toLowerCase().includes(category.toLowerCase())
        );
    }
    
    // التصفية حسب الموقع
    if (location) {
        results = results.filter(ad => 
            ad.location.toLowerCase().includes(location.toLowerCase())
        );
    }
    
    // التصفية حسب السعر
    results = results.filter(ad => 
        ad.price >= minPrice && ad.price <= maxPrice
    );
    
    return results;
}

// الحصول على الإعلانات حسب الفئة
function getAdsByCategory(category, limit = 20) {
    return ads
        .filter(ad => ad.category === category && ad.status === 'active')
        .slice(0, limit);
}

// الحصول على أحدث الإعلانات
function getLatestAds(limit = 12) {
    return ads
        .filter(ad => ad.status === 'active')
        .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
        .slice(0, limit);
}

// الحصول على أكثر الإعلانات مشاهدة
function getMostViewedAds(limit = 8) {
    return ads
        .filter(ad => ad.status === 'active')
        .sort((a, b) => b.views - a.views)
        .slice(0, limit);
}

// عرض صفحة إعلانات المستخدم
function showUserAdsPage() {
    if (typeof isLoggedIn !== 'function' || !isLoggedIn()) {
        showNotification('يجب تسجيل الدخول لعرض إعلاناتك', 'warning');
        return;
    }
    
    loadUserAds();
    
    if (userAds.length === 0) {
        return `
            <div class="text-center py-5">
                <i class="fas fa-bullhorn fa-3x text-muted mb-3"></i>
                <h4>لا توجد لديك إعلانات بعد</h4>
                <p class="text-muted mb-4">ابدأ بنشر أول إعلان لك</p>
                <button class="btn btn-primary" onclick="showPostAdModal()">
                    <i class="fas fa-plus-circle"></i> أضف إعلان جديد
                </button>
            </div>
        `;
    }
    
    let html = `
        <div class="d-flex justify-content-between align-items-center mb-4">
            <h4>إعلاناتي (${userAds.length})</h4>
            <button class="btn btn-primary" onclick="showPostAdModal()">
                <i class="fas fa-plus-circle"></i> إعلان جديد
            </button>
        </div>
        <div class="row">
    `;
    
    userAds.forEach(ad => {
        const statusClass = ad.status === 'active' ? 'success' : 'secondary';
        const statusText = ad.status === 'active' ? 'نشط' : 'مغلق';
        
        html += `
            <div class="col-md-6 mb-4">
                <div class="card h-100">
                    <div class="card-body">
                        <div class="d-flex justify-content-between align-items-start mb-2">
                            <h5 class="card-title">${ad.title}</h5>
                            <span class="badge bg-${statusClass}">${statusText}</span>
                        </div>
                        <p class="card-text text-muted mb-2">${ad.description.substring(0, 100)}...</p>
                        <div class="d-flex justify-content-between align-items-center mb-3">
                            <strong class="text-success">${ad.price.toLocaleString('ar-SA')} ر.س</strong>
                            <small class="text-muted">
                                <i class="fas fa-eye"></i> ${ad.views} مشاهدة
                            </small>
                        </div>
                        <div class="btn-group w-100">
                            <button class="btn btn-outline-primary btn-sm" onclick="editAd(${ad.id})">
                                <i class="fas fa-edit"></i> تعديل
                            </button>
                            <button class="btn btn-outline-secondary btn-sm" onclick="toggleAdStatus(${ad.id})">
                                <i class="fas fa-toggle-${ad.status === 'active' ? 'on' : 'off'}"></i> ${ad.status === 'active' ? 'إغلاق' : 'تفعيل'}
                            </button>
                            <button class="btn btn-outline-danger btn-sm" onclick="deleteAdWithConfirm(${ad.id})">
                                <i class="fas fa-trash"></i> حذف
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        `;
    });
    
    html += `</div>`;
    return html;
}

// تبديل حالة الإعلان (نشط/مغلق)
function toggleAdStatus(adId) {
    const ad = ads.find(a => a.id === adId);
    if (!ad) return false;
    
    // التحقق من صلاحيات المستخدم
    if (typeof isLoggedIn === 'function' && isLoggedIn()) {
        const user = getCurrentUser();
        if (user && user.id !== ad.userId) {
            showNotification('ليس لديك صلاحية لتعديل هذا الإعلان', 'error');
            return false;
        }
    }
    
    ad.status = ad.status === 'active' ? 'inactive' : 'active';
    saveAdsToStorage();
    
    const statusText = ad.status === 'active' ? 'نشط' : 'مغلق';
    showNotification(`تم تغيير حالة الإعلان إلى "${statusText}"`, 'success');
    
    return true;
}

// حذف الإعلان مع طلب تأكيد
function deleteAdWithConfirm(adId) {
    if (!confirm('هل أنت متأكد من حذف هذا الإعلان؟ لا يمكن التراجع عن هذا الإجراء.')) {
        return;
    }
    
    if (deleteAd(adId)) {
        showNotification('تم حذف الإعلان بنجاح', 'success');
        
        // إعادة تحميل صفحة إعلانات المستخدم إذا كانت معروضة
        const userAdsContainer = document.getElementById('userAdsContainer');
        if (userAdsContainer) {
            userAdsContainer.innerHTML = showUserAdsPage();
        }
    }
}

// تعديل إعلان
function editAd(adId) {
    const ad = ads.find(a => a.id === adId);
    if (!ad) return;
    
    // التحقق من صلاحيات المستخدم
    if (typeof isLoggedIn === 'function' && isLoggedIn()) {
        const user = getCurrentUser();
        if (user && user.id !== ad.userId) {
            showNotification('ليس لديك صلاحية لتعديل هذا الإعلان', 'error');
            return;
        }
    }
    
    // عرض نموذج التعديل
    const modalContent = `
        <div class="modal-header">
            <h5 class="modal-title"><i class="fas fa-edit"></i> تعديل الإعلان</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal"></button>
        </div>
        <div class="modal-body">
            <form id="editAdForm">
                <div class="mb-3">
                    <label class="form-label">عنوان الإعلان</label>
                    <input type="text" class="form-control" id="editAdTitle" value="${ad.title}" required>
                </div>
                <div class="row">
                    <div class="col-md-6 mb-3">
                        <label class="form-label">القسم</label>
                        <select class="form-select" id="editAdCategory" required>
                            <option value="سيارات" ${ad.category === 'سيارات' ? 'selected' : ''}>سيارات</option>
                            <option value="عقارات" ${ad.category === 'عقارات' ? 'selected' : ''}>عقارات</option>
                            <option value="هواتف" ${ad.category === 'هواتف' ? 'selected' : ''}>هواتف</option>
                            <option value="أجهزة كهربائية" ${ad.category === 'أجهزة كهربائية' ? 'selected' : ''}>أجهزة كهربائية</option>
                            <option value="ملابس" ${ad.category === 'ملابس' ? 'selected' : ''}>ملابس</option>
                            <option value="أثاث" ${ad.category === 'أثاث' ? 'selected' : ''}>أثاث</option>
                            <option value="وظائف" ${ad.category === 'وظائف' ? 'selected' : ''}>وظائف</option>
                        </select>
                    </div>
                    <div class="col-md-6 mb-3">
                        <label class="form-label">السعر (ريال سعودي)</label>
                        <input type="number" class="form-control" id="editAdPrice" value="${ad.price}" required>
                    </div>
                </div>
                <div class="mb-3">
                    <label class="form-label">الوصف التفصيلي</label>
                    <textarea class="form-control" id="editAdDescription" rows="4" required>${ad.description}</textarea>
                </div>
                <div class="mb-3">
                    <label class="form-label">المدينة</label>
                    <input type="text" class="form-control" id="editAdCity" value="${ad.location}" required>
                </div>
                <div class="mb-3">
                    <label class="form-label">رقم الهاتف للتواصل</label>
                    <input type="tel" class="form-control" id="editAdPhone" value="${ad.phone}" required>
                </div>
                <button type="submit" class="btn btn-primary w-100">
                    <i class="fas fa-save"></i> حفظ التعديلات
                </button>
            </form>
        </div>
    `;
    
    // إنشاء وعرض النافذة المنبثقة
    const modalId = 'editAdModal';
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
    
    // إعداد حدث إرسال النموذج
    const editForm = modal.querySelector('#editAdForm');
    if (editForm) {
        editForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const updatedData = {
                title: document.getElementById('editAdTitle').value,
                category: document.getElementById('editAdCategory').value,
                price: parseInt(document.getElementById('editAdPrice').value),
                description: document.getElementById('editAdDescription').value,
                location: document.getElementById('editAdCity').value,
                phone: document.getElementById('editAdPhone').value
            };
            
            if (updateAd(adId, updatedData)) {
                showNotification('تم تحديث الإعلان بنجاح', 'success');
                
                // إغلاق النافذة
                const bsModal = bootstrap.Modal.getInstance(modal);
                bsModal.hide();
                
                // إعادة تحميل صفحة إعلانات المستخدم إذا كانت معروضة
                const userAdsContainer = document.getElementById('userAdsContainer');
                if (userAdsContainer) {
                    userAdsContainer.innerHTML = showUserAdsPage();
                }
                
                // إعادة تحميل الإعلانات في الصفحة الرئيسية
                if (typeof loadAds === 'function') {
                    loadAds();
                }
            }
        });
    }
    
    // عرض النافذة
    const bsModal = new bootstrap.Modal(modal);
    bsModal.show();
}

// عرض الإشعارات
function showNotification(message, type = 'info') {
    if (typeof window.showNotification === 'function') {
        window.showNotification(message, type);
    } else {
        alert(message);
    }
}

// تصدير الوظائف للاستخدام العالمي
window.addNewAd = addNewAd;
window.updateAd = updateAd;
window.deleteAd = deleteAd;
window.deleteAdWithConfirm = deleteAdWithConfirm;
window.addToFavorites = addToFavorites;
window.removeFromFavorites = removeFromFavorites;
window.isFavorite = isFavorite;
window.getLatestAds = getLatestAds;
window.showUserAdsPage = showUserAdsPage;
window.toggleAdStatus = toggleAdStatus;
window.editAd = editAd;
window.searchAds = searchAds;
window.getAllAds = getAllAds;