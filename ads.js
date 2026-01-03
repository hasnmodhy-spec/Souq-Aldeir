// ملف ads.js

// إدارة الإعلانات
const adsManager = {
    // الحصول على جميع الإعلانات
    getAllAds: function() {
        return JSON.parse(localStorage.getItem('souq_ads') || '[]');
    },
    
    // الحصول على إعلانات مستخدم معين
    getUserAds: function(userId) {
        const ads = this.getAllAds();
        return ads.filter(ad => ad.userId === userId);
    },
    
    // إضافة إعلان جديد
    addAd: function(adData) {
        const ads = this.getAllAds();
        const newId = ads.length > 0 ? Math.max(...ads.map(a => a.id)) + 1 : 1;
        
        const newAd = {
            ...adData,
            id: newId,
            date: 'الآن',
            views: 0,
            status: 'active'
        };
        
        ads.unshift(newAd);
        localStorage.setItem('souq_ads', JSON.stringify(ads));
        
        return newAd;
    },
    
    // تحديث إعلان
    updateAd: function(adId, updates) {
        const ads = this.getAllAds();
        const index = ads.findIndex(a => a.id === adId);
        
        if (index === -1) return false;
        
        ads[index] = { ...ads[index], ...updates };
        localStorage.setItem('souq_ads', JSON.stringify(ads));
        
        return true;
    },
    
    // حذف إعلان
    deleteAd: function(adId) {
        const ads = this.getAllAds();
        const filteredAds = ads.filter(a => a.id !== adId);
        
        localStorage.setItem('souq_ads', JSON.stringify(filteredAds));
        return ads.length !== filteredAds.length;
    },
    
    // زيادة عدد المشاهدات
    incrementViews: function(adId) {
        const ads = this.getAllAds();
        const index = ads.findIndex(a => a.id === adId);
        
        if (index === -1) return false;
        
        ads[index].views = (ads[index].views || 0) + 1;
        localStorage.setItem('souq_ads', JSON.stringify(ads));
        
        return true;
    },
    
    // البحث في الإعلانات
    searchAds: function(query, category = '', location = '') {
        let ads = this.getAllAds();
        
        if (query) {
            const q = query.toLowerCase();
            ads = ads.filter(ad => 
                ad.title.toLowerCase().includes(q) ||
                ad.description.toLowerCase().includes(q)
            );
        }
        
        if (category) {
            ads = ads.filter(ad => ad.category === category);
        }
        
        if (location) {
            ads = ads.filter(ad => ad.location === location);
        }
        
        return ads;
    },
    
    // الحصول على أحدث الإعلانات
    getLatestAds: function(limit = 10) {
        const ads = this.getAllAds();
        return ads.slice(0, limit);
    },
    
    // الحصول على أكثر الإعلانات مشاهدة
    getMostViewed: function(limit = 10) {
        const ads = this.getAllAds();
        return ads.sort((a, b) => (b.views || 0) - (a.views || 0)).slice(0, limit);
    },
    
    // الحصول على إعلانات حسب القسم
    getAdsByCategory: function(category, limit = 20) {
        const ads = this.getAllAds();
        return ads.filter(ad => ad.category === category).slice(0, limit);
    },
    
    // تغيير حالة الإعلان
    toggleAdStatus: function(adId, status) {
        return this.updateAd(adId, { status: status });
    },
    
    // إضافة تعليق على الإعلان
    addComment: function(adId, comment) {
        const ad = this.getAllAds().find(a => a.id === adId);
        if (!ad) return false;
        
        ad.comments = ad.comments || [];
        ad.comments.push({
            id: ad.comments.length + 1,
            user: comment.user,
            text: comment.text,
            date: new Date().toLocaleDateString('ar-SA')
        });
        
        return this.updateAd(adId, { comments: ad.comments });
    },
    
    // إضافة إلى المفضلة
    addToFavorites: function(userId, adId) {
        const users = JSON.parse(localStorage.getItem('souq_users') || '[]');
        const userIndex = users.findIndex(u => u.id === userId);
        
        if (userIndex === -1) return false;
        
        users[userIndex].favorites = users[userIndex].favorites || [];
        
        if (!users[userIndex].favorites.includes(adId)) {
            users[userIndex].favorites.push(adId);
            localStorage.setItem('souq_users', JSON.stringify(users));
        }
        
        return true;
    },
    
    // إزالة من المفضلة
    removeFromFavorites: function(userId, adId) {
        const users = JSON.parse(localStorage.getItem('souq_users') || '[]');
        const userIndex = users.findIndex(u => u.id === userId);
        
        if (userIndex === -1) return false;
        
        users[userIndex].favorites = users[userIndex].favorites || [];
        const index = users[userIndex].favorites.indexOf(adId);
        
        if (index > -1) {
            users[userIndex].favorites.splice(index, 1);
            localStorage.setItem('souq_users', JSON.stringify(users));
        }
        
        return true;
    },
    
    // الحصول على الإعلانات المفضلة
    getFavorites: function(userId) {
        const users = JSON.parse(localStorage.getItem('souq_users') || '[]');
        const user = users.find(u => u.id === userId);
        
        if (!user || !user.favorites) return [];
        
        const ads = this.getAllAds();
        return ads.filter(ad => user.favorites.includes(ad.id));
    },
    
    // الإحصائيات
    getStats: function() {
        const ads = this.getAllAds();
        const users = JSON.parse(localStorage.getItem('souq_users') || '[]');
        
        return {
            totalAds: ads.length,
            totalUsers: users.length,
            activeAds: ads.filter(a => a.status === 'active').length,
            totalViews: ads.reduce((sum, ad) => sum + (ad.views || 0), 0),
            byCategory: this.getCategoryStats()
        };
    },
    
    // إحصائيات الأقسام
    getCategoryStats: function() {
        const ads = this.getAllAds();
        const stats = {};
        
        ads.forEach(ad => {
            stats[ad.category] = (stats[ad.category] || 0) + 1;
        });
        
        return stats;
    }
};

// تصدير مدير الإعلانات
window.adsManager = adsManager;