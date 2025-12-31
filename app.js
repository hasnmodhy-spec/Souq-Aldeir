// تخزين الإعلانات في localStorage
let ads = JSON.parse(localStorage.getItem('soug-ads')) || [];

function saveAd(ad) {
    ads.push(ad);
    localStorage.setItem('soug-ads', JSON.stringify(ads));
}

function loadAds() {
    return ads;
}