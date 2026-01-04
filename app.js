'use client'
import { useState, useEffect } from 'react'
import Link from 'next/link'

// بيانات إعلانات تجريبية (مؤقتة حتى تتصل بـ Supabase)
const sampleAds = [
  {
    id: 1,
    title: 'ساعة أبل ذكية جديدة',
    description: 'Apple Watch Series 9 بحالة ممتازة، مقاومة للماء',
    price: '1,500',
    category: 'إلكترونيات',
    location: 'دير الزور',
    image: 'https://images.unsplash.com/photo-1546868871-7041f2a55e12?w=400',
    views: 42
  },
  {
    id: 2,
    title: 'شقة فخمة للإيجار',
    description: '3 غرف نوم، 2 حمام، صالة كبيرة، مطبخ حديث',
    price: '1,200',
    category: 'عقارات',
    location: 'دير الزور',
    image: 'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=400',
    views: 156
  },
  {
    id: 3,
    title: 'سيارة تويوتا كامري',
    description: '2020، فل كامل، ماشية 50,000 كم، لون أبيض',
    price: '85,000',
    category: 'سيارات',
    location: 'دير الزور',
    image: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?w=400',
    views: 203
  },
  {
    id: 4,
    title: 'لابتوب ديل للبيع',
    description: 'شاشة 15 بوصة، 16GB RAM، SSD 512GB، بحالة الجديد',
    price: '2,800',
    category: 'إلكترونيات',
    location: 'دير الزور',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=400',
    views: 87
  },
  {
    id: 5,
    title: 'أثاث منزل كامل',
    description: 'كنبة 3 مقاعد، طاولة طعام، 6 كراسي، خزانة ملابس',
    price: '3,200',
    category: 'أثاث',
    location: 'دير الزور',
    image: 'https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=400',
    views: 64
  },
  {
    id: 6,
    title: 'دراجة نارية هارلي',
    description: 'موديل 2021، 1500cc، لون أحمر، ماشية 8000 كم',
    price: '45,000',
    category: 'مواصلات',
    location: 'دير الزور',
    image: 'https://images.unsplash.com/photo-1558981403-c5f9899a28bc?w=400',
    views: 128
  }
]

export default function HomePage() {
  const [ads, setAds] = useState(sampleAds)
  const [searchTerm, setSearchTerm] = useState('')

  const filteredAds = ads.filter(ad =>
    ad.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ad.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    ad.category.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gray-50">
      {/* الهيدر */}
      <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white shadow-lg">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              🏪 سوق دير الزور المفتوح
            </h1>
            <p className="text-xl opacity-90">
              منصة مجانية للإعلانات المبوبة في دير الزور
            </p>
          </div>

          {/* شريط البحث */}
          <div className="max-w-3xl mx-auto mt-8">
            <div className="flex flex-col md:flex-row gap-4">
              <input
                type="text"
                placeholder="🔍 ابحث عن سيارة، شقة، هاتف..."
                className="flex-grow p-4 rounded-lg text-gray-800"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
              <Link
                href="/add-ad"
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-4 px-8 rounded-lg text-center transition"
              >
                + نشر إعلان مجاني
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* الفئات */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-3 justify-center">
          {['جميع الإعلانات', 'سيارات', 'عقارات', 'إلكترونيات', 'أثاث', 'مواصلات', 'خدمات'].map((cat) => (
            <button
              key={cat}
              className="bg-white border border-gray-300 hover:border-blue-500 hover:text-blue-600 px-4 py-2 rounded-full transition"
            >
              {cat}
            </button>
          ))}
        </div>
      </div>

      {/* الإعلانات */}
      <main className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">
          أحدث الإعلانات ({filteredAds.length})
        </h2>

        {filteredAds.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-xl shadow">
            <div className="text-6xl mb-4">🔍</div>
            <h3 className="text-xl font-bold mb-2">لا توجد نتائج للبحث</h3>
            <p className="text-gray-600">جرب كلمات بحث مختلفة</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredAds.map((ad) => (
              <div key={ad.id} className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition">
                {/* صورة الإعلان */}
                <div className="h-64 overflow-hidden">
                  <img 
                    src={ad.image} 
                    alt={ad.title}
                    className="w-full h-full object-cover hover:scale-105 transition duration-300"
                  />
                  <div className="absolute top-4 right-4 bg-blue-600 text-white px-3 py-1 rounded-full text-sm">
                    {ad.category}
                  </div>
                </div>

                {/* محتوى الإعلان */}
                <div className="p-5">
                  <h3 className="text-xl font-bold mb-2 text-gray-900">{ad.title}</h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{ad.description}</p>
                  
                  <div className="flex justify-between items-center mb-4">
                    <div>
                      <span className="text-2xl font-bold text-green-700">{ad.price} ر.س</span>
                      <span className="text-sm text-gray-500 mr-2"> (قابل للتفاوض)</span>
                    </div>
                    <div className="text-sm text-gray-500">
                      <span>👁️ {ad.views}</span>
                    </div>
                  </div>

                  <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <span className="flex items-center">
                      📍 {ad.location}
                    </span>
                  </div>

                  <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 rounded-lg transition flex items-center justify-center">
                    <span className="ml-2">📞</span>
                    <span>اتصل بالبائع</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* الفوتر */}
      <footer className="bg-gray-800 text-white mt-12 py-8">
        <div className="container mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold mb-4">سوق دير الزور المفتوح</h3>
          <p className="text-gray-300 mb-4">منصة مجانية للإعلانات المبوبة في محافظة دير الزور</p>
          <p className="text-gray-400 text-sm">
            © {new Date().getFullYear()} جميع الحقوق محفوظة | تواصل معنا: info@deirezzor-market.com
          </p>
        </div>
      </footer>
    </div>
  )
}