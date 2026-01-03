// إدارة الإعلانات
class AdsManager {
    constructor() {
        this.ads = this.loadAds();
    }

    loadAds() {
        return JSON.parse(localStorage.getItem('souq_ads')) || [];
    }

    saveAds() {
        localStorage.setItem('souq_ads', JSON.stringify(this.ads));
    }

    createAd(adData) {
        const ad = {
            ...adData,
            id: Date.now(),
            date: new Date().toLocaleDateString('ar-SA'),
            views: 0
        };

        this.ads.unshift(ad);
        this.saveAds();
        
        // حدث إضافة إعلان جديد
        document.dispatchEvent(new CustomEvent('adAdded', { detail: { ad } }));
        
        return ad;
    }

    deleteAd(adId) {
        this.ads = this.ads.filter(ad => ad.id !== adId);
        this.saveAds();
        
        // حدث حذف إعلان
        document.dispatchEvent(new CustomEvent('adDeleted', { detail: { adId } }));
    }

    getAds(category = null) {
        if (category) {
            return this.ads.filter(ad => ad.category === category);
        }
        return this.ads;
    }

    searchAds(query) {
        return this.ads.filter(ad => 
            ad.title.includes(query) || 
            ad.description.includes(query)
        );
    }

    getAdById(adId) {
        return this.ads.find(ad => ad.id === adId);
    }

    incrementViews(adId) {
        const ad = this.getAdById(adId);
        if (ad) {
            ad.views = (ad.views || 0) + 1;
            this.saveAds();
        }
    }
}

// إنشاء نسخة عامة
const adsManager = new AdsManager();