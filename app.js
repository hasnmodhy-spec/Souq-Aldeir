import { supabase } from '@/lib/supabase'
import Link from 'next/link'

export default async function Home() {
  // جلب الإعلانات من Supabase
  const { data: ads } = await supabase
    .from('ads')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(20)

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      {/* الهيدر */}
      <header className="bg-white shadow mb-6 rounded-lg p-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-3xl font-bold text-center text-blue-600">
            🏪 سوق دير الزور للمستعمل
          </h1>
          <p className="text-center text-gray-600 mt-2">
            اشتري وبيع كل ما تحتاجه في دير الزور
          </p>
        </div>
      </header>

      <main className="max-w-6xl mx-auto">
        {/* زر نشر إعلان */}
        <div className="mb-6 text-center">
          <Link 
            href="/add-ad" 
            className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg inline-flex items-center"
          >
            <span className="ml-2">+</span>
            <span>نشر إعلان جديد</span>
          </Link>
        </div>

        {/* شبكة الإعلانات */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {ads?.map((ad) => (
            <div key={ad.id} className="bg-white rounded-lg shadow-md overflow-hidden border border-gray-200">
              {/* صورة الإعلان */}
              <div className="h-48 bg-gray-200 flex items-center justify-center">
                {ad.images && ad.images.length > 0 ? (
                  <img 
                    src={ad.images[0]} 
                    alt={ad.title}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <span className="text-gray-500">لا توجد صورة</span>
                )}
              </div>
              
              {/* محتوى الإعلان */}
              <div className="p-4">
                <h3 className="text-xl font-semibold mb-2">{ad.title}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{ad.description}</p>
                
                <div className="flex justify-between items-center">
                  <span className="text-2xl font-bold text-blue-600">{ad.price} ر.س</span>
                  <span className="text-sm bg-gray-100 text-gray-800 px-3 py-1 rounded">
                    {ad.category}
                  </span>
                </div>
                
                <div className="mt-4 flex justify-between text-sm text-gray-500">
                  <span>📍 {ad.location}</span>
                  <span>👁️ {ad.views || 0} مشاهدة</span>
                </div>
                
                {/* زر الاتصال */}
                <button className="mt-4 w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded-lg">
                  📞 اتصل بالبائع
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* إذا لم يكن هناك إعلانات */}
        {(!ads || ads.length === 0) && (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">🏪</div>
            <h3 className="text-2xl font-semibold mb-2">لا توجد إعلانات حالياً</h3>
            <p className="text-gray-600 mb-4">كن أول من ينشر إعلان في سوق دير الزور!</p>
            <Link 
              href="/add-ad" 
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg inline-block"
            >
              ابدأ بنشر إعلانك
            </Link>
          </div>
        )}
      </main>

      {/* الفوتر */}
      <footer className="mt-12 text-center text-gray-500 text-sm">
        <p>© 2024 سوق دير الزور للمستعمل - جميع الحقوق محفوظة</p>
        <p className="mt-2">تواصل معنا: info@souk-dier-ezzor.com</p>
      </footer>
    </div>
  )
}