// التطبيق الرئيسي
class SouqApp {
    constructor() {
        this.ads = JSON.parse(localStorage.getItem('souq_ads')) || [];
        this.currentUser = JSON.parse(localStorage.getItem('souq_user')) || null;
        this.init();
    }

    init() {
        this.setupEventListeners();
        this.loadAds();
        this.updateUserStatus();
        
        // تحميل من الصفحة المخبأة إذا كان دون اتصال
        if (!navigator.onLine) {
            this.showOfflineMessage();
        }
    }

    setupEventListeners() {
        // نموذج الإعلان
        document.getElementById('adForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.submitAd();
        });

        // معاينة
        document.getElementById('previewBtn').addEventListener('click', () => {
            this.previewAd();
        });

        // إغلاق المعاينة
        document.getElementById('closePreview').addEventListener('click', () => {
            this.closeModal();
        });

        // زر المصادقة
        document.getElementById('authBtn').addEventListener('click', () => {
            this.toggleAuth();
        });

        // استمع لتغير حالة الاتصال
        window.addEventListener('online', () => {
            this.showMessage('تم استعادة الاتصال بالإنترنت', 'success');
        });

        window.addEventListener('offline', () => {
            this.showOfflineMessage();
        });

        // تحميل الصور
        document.getElementById('adImages').addEventListener('change', (e) => {
            this.previewImages(e.target.files);
        });
    }

    submitAd() {
        if (!this.validateForm()) return;

        const ad = {
            id: Date.now(),
            title: document.getElementById('adTitle').value,
            category: document.getElementById('adCategory').value,
            description: document.getElementById('adDescription').value,
            price: document.getElementById('adPrice').value || 'غير محدد',
            phone: document.getElementById('adPhone').value,
            location: document.getElementById('adLocation').value || 'دير الزور',
            date: new Date().toLocaleDateString('ar-SA'),
            userId: this.currentUser?.id || 'guest'
        };

        this.ads.unshift(ad);
        this.saveAds();
        this.loadAds();
        this.resetForm();
        
        this.showMessage('تم نشر الإعلان بنجاح!', 'success');
        
        // إشعار إذا كان متاحاً
        if ('Notification' in window && Notification.permission === 'granted') {
            new Notification('سوق دير الزور', {
                body: 'تم نشر إعلانك بنجاح',
                icon: '/icon.png'
            });
        }
    }

    validateForm() {
        const required = ['adTitle', 'adCategory', 'adDescription', 'adPhone'];
        let isValid = true;

        required.forEach(fieldId => {
            const field = document.getElementById(fieldId);
            if (!field.value.trim()) {
                field.style.borderColor = 'var(--danger-color)';
                isValid = false;
            } else {
                field.style.borderColor = '';
            }
        });

        return isValid;
    }

    previewAd() {
        const previewContent = `
            <div class="ad-card">
                <h3>${document.getElementById('adTitle').value || 'عنوان الإعلان'}</h3>
                <p><strong>القسم:</strong> ${document.getElementById('adCategory').value || 'غير محدد'}</p>
                <p><strong>السعر:</strong> ${document.getElementById('adPrice').value ? document.getElementById('adPrice').value + ' ل.س' : 'غير محدد'}</p>
                <p><strong>الوصف:</strong> ${document.getElementById('adDescription').value || 'لا يوجد وصف'}</p>
                <p><strong>الهاتف:</strong> ${document.getElementById('adPhone').value}</p>
                <p><strong>الموقع:</strong> ${document.getElementById('adLocation').value || 'دير الزور'}</p>
            </div>
        `;

        document.getElementById('adPreview').innerHTML = previewContent;
        this.showModal();
    }

    loadAds() {
        const adsList = document.getElementById('adsList');
        if (this.ads.length === 0) {
            adsList.innerHTML = '<p class="no-ads">لا توجد إعلانات منشورة بعد</p>';
            return;
        }

        adsList.innerHTML = this.ads.map(ad => `
            <div class="ad-card">
                <h3>${ad.title}</h3>
                <div class="ad-price">${ad.price} ل.س</div>
                <p>${ad.description.substring(0, 100)}...</p>
                <div class="ad-meta">
                    <span>📱 ${ad.phone}</span>
                    <span>📍 ${ad.location}</span>
                    <span>📅 ${ad.date}</span>
                </div>
                <button onclick="app.deleteAd(${ad.id})" class="btn btn-danger" style="margin-top: 10px; padding: 5px 10px; font-size: 0.8rem;">حذف</button>
            </div>
        `).join('');
    }

    previewImages(files) {
        const preview = document.getElementById('imagePreview');
        preview.innerHTML = '';

        Array.from(files).slice(0, 5).forEach(file => {
            if (!file.type.startsWith('image/')) return;

            const reader = new FileReader();
            reader.onload = (e) => {
                const img = document.createElement('img');
                img.src = e.target.result;
                img.className = 'preview-image';
                preview.appendChild(img);
            };
            reader.readAsDataURL(file);
        });
    }

    deleteAd(adId) {
        if (confirm('هل تريد حذف هذا الإعلان؟')) {
            this.ads = this.ads.filter(ad => ad.id !== adId);
            this.saveAds();
            this.loadAds();
            this.showMessage('تم حذف الإعلان', 'success');
        }
    }

    saveAds() {
        localStorage.setItem('souq_ads', JSON.stringify(this.ads));
    }

    resetForm() {
        document.getElementById('adForm').reset();
        document.getElementById('imagePreview').innerHTML = '';
    }

    showModal() {
        document.getElementById('previewModal').style.display = 'flex';
    }

    closeModal() {
        document.getElementById('previewModal').style.display = 'none';
    }

    showMessage(text, type = 'info') {
        // يمكن تطوير هذه الدالة لإظهار رسائل جميلة
        alert(text);
    }

    showOfflineMessage() {
        this.showMessage('أنت تعمل دون اتصال، يمكنك نشر إعلانات وسيتم مزامنتها عند عودة الاتصال', 'warning');
    }

    toggleAuth() {
        // محاكاة بسيطة للمصادقة
        if (!this.currentUser) {
            this.currentUser = {
                id: 'user_' + Date.now(),
                name: 'مستخدم'
            };
            localStorage.setItem('souq_user', JSON.stringify(this.currentUser));
            this.showMessage('تم تسجيل الدخول كضيف', 'success');
        } else {
            this.currentUser = null;
            localStorage.removeItem('souq_user');
            this.showMessage('تم تسجيل الخروج', 'info');
        }
        this.updateUserStatus();
    }

    updateUserStatus() {
        const statusEl = document.getElementById('userStatus');
        const authBtn = document.getElementById('authBtn');
        
        if (this.currentUser) {
            statusEl.innerHTML = `<span>مرحباً ${this.currentUser.name}!</span>`;
            authBtn.textContent = 'تسجيل الخروج';
        } else {
            statusEl.innerHTML = '<span>مرحباً! يمكنك نشر إعلانك</span>';
            authBtn.textContent = 'تسجيل الدخول';
        }
    }
}

// تهيئة التطبيق عند تحميل الصفحة
let app;
document.addEventListener('DOMContentLoaded', () => {
    app = new SouqApp();
});

// جعل الكائن عاماً للاستخدام من HTML
window.app = app;