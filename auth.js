// ملف auth.js

// التحقق من حالة تسجيل الدخول
function checkAuth() {
    return localStorage.getItem('currentUser');
}

// الحصول على المستخدم الحالي
function getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
}

// التحقق من صلاحيات الإعلان
function checkAdOwnership(adId) {
    const user = getCurrentUser();
    if (!user) return false;
    
    const ads = JSON.parse(localStorage.getItem('souq_ads') || '[]');
    const ad = ads.find(a => a.id === adId);
    
    return ad && ad.userId === user.id;
}

// تحديث بيانات المستخدم
function updateUserProfile(userData) {
    const users = JSON.parse(localStorage.getItem('souq_users') || '[]');
    const currentUser = getCurrentUser();
    
    if (!currentUser) return false;
    
    const index = users.findIndex(u => u.id === currentUser.id);
    if (index === -1) return false;
    
    // تحديث البيانات
    users[index] = { ...users[index], ...userData };
    localStorage.setItem('souq_users', JSON.stringify(users));
    localStorage.setItem('currentUser', JSON.stringify(users[index]));
    
    return true;
}

// تغيير كلمة المرور
function changePassword(currentPass, newPass) {
    const user = getCurrentUser();
    if (!user) return false;
    
    if (user.password !== currentPass) {
        return false;
    }
    
    user.password = newPass;
    return updateUserProfile({ password: newPass });
}

// استعادة كلمة المرور (محاكاة)
function resetPassword(email) {
    const users = JSON.parse(localStorage.getItem('souq_users') || '[]');
    const user = users.find(u => u.email === email);
    
    if (!user) {
        return { success: false, message: 'البريد الإلكتروني غير مسجل' };
    }
    
    // في التطبيق الحقيقي، هنا سترسل رسالة إلكترونية
    console.log(`إرسال رابط استعادة كلمة المرور إلى: ${email}`);
    
    return { 
        success: true, 
        message: 'تم إرسال رابط استعادة كلمة المرور إلى بريدك الإلكتروني' 
    };
}

// إدارة الجلسات
const sessionManager = {
    startSession: function(user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        localStorage.setItem('sessionStart', new Date().toISOString());
    },
    
    endSession: function() {
        localStorage.removeItem('currentUser');
        localStorage.removeItem('sessionStart');
    },
    
    getSessionDuration: function() {
        const start = localStorage.getItem('sessionStart');
        if (!start) return 0;
        
        const startTime = new Date(start);
        const now = new Date();
        return Math.floor((now - startTime) / 1000); // بالثواني
    },
    
    isSessionValid: function() {
        const duration = this.getSessionDuration();
        return duration < 86400; // 24 ساعة
    }
};

// تصدير الوظائف
window.checkAuth = checkAuth;
window.getCurrentUser = getCurrentUser;
window.checkAdOwnership = checkAdOwnership;
window.updateUserProfile = updateUserProfile;
window.changePassword = changePassword;
window.resetPassword = resetPassword;
window.sessionManager = sessionManager