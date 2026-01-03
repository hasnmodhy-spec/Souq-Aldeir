// نظام مصادقة مبسط
class AuthManager {
    constructor() {
        this.currentUser = this.getUser();
    }

    getUser() {
        return JSON.parse(localStorage.getItem('souq_user'));
    }

    login(username = 'مستخدم') {
        const user = {
            id: 'user_' + Date.now(),
            name: username,
            joined: new Date().toISOString()
        };
        
        localStorage.setItem('souq_user', JSON.stringify(user));
        this.currentUser = user;
        
        // حدث تسجيل الدخول
        document.dispatchEvent(new CustomEvent('authChange', { detail: { user } }));
        
        return user;
    }

    logout() {
        localStorage.removeItem('souq_user');
        this.currentUser = null;
        
        // حدث تسجيل الخروج
        document.dispatchEvent(new CustomEvent('authChange', { detail: { user: null } }));
    }

    isAuthenticated() {
        return !!this.currentUser;
    }
}

// إنشاء نسخة عامة
const authManager = new AuthManager();