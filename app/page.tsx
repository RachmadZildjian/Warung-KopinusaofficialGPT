import Link from 'next/link'

export default function Home() {
  return (
    <>
      {/* Hero Section dengan Background Bijih Kopi Premium */}
      <section 
        className="relative text-white overflow-hidden"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(30, 15, 0, 0.85),
              rgba(30, 15, 0, 0.9)
            ),
            url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%235C3D2E' fill-opacity='0.2'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")
          `,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="container mx-auto px-4 py-24 relative">
          {/* Efek biji kopi */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-10 w-20 h-20 rounded-full bg-gradient-to-br from-amber-800 to-amber-900 blur-md"></div>
            <div className="absolute top-40 right-20 w-32 h-32 rounded-full bg-gradient-to-br from-brown-800 to-brown-900 blur-md"></div>
            <div className="absolute bottom-20 left-32 w-16 h-16 rounded-full bg-gradient-to-br from-amber-700 to-amber-800 blur-md"></div>
          </div>
          
          <div className="max-w-2xl relative z-10">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-amber-900/30 to-amber-700/30 backdrop-blur-sm rounded-full border border-amber-700/30">
              <span className="text-amber-300">☕</span>
              <span className="text-amber-200 text-sm font-medium">Kopi Nusantara Premium</span>
            </div>
            
            <h1 className="text-5xl font-bold mb-6">
              <span className="bg-gradient-to-r from-amber-300 via-amber-200 to-amber-300 bg-clip-text text-transparent">
                Warung KopiNusaOfficialGPT
              </span>
            </h1>
            <p className="text-xl mb-8 text-amber-100 leading-relaxed">
              Tempat dimana <span className="text-amber-300 font-semibold">tradisi kopi nusantara</span> bertemu dengan 
              teknologi AI modern. Setiap cangkir adalah cerita, setiap tegukan adalah pengalaman.
            </p>
            <div className="flex gap-4 flex-wrap">
              <Link 
                href="/menu" 
                className="group relative overflow-hidden bg-gradient-to-r from-amber-700 to-amber-600 hover:from-amber-600 hover:to-amber-500 text-amber-50 font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-amber-900/30"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span>☕</span>
                  <span>Jelajahi Menu</span>
                </span>
              </Link>
              <Link 
                href="/ai-assistant"
                className="group relative overflow-hidden border-2 border-amber-500/50 hover:border-amber-400 bg-gradient-to-r from-amber-900/20 to-amber-800/20 hover:from-amber-800/30 hover:to-amber-700/30 backdrop-blur-sm text-amber-100 font-semibold px-8 py-3 rounded-lg transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span className="group-hover:animate-pulse">✨</span>
                  <span>Konsultasi Barista AI</span>
                </span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section dengan Background Textured Cream */}
      <section 
        className="py-16 relative"
        style={{
          backgroundImage: `
            linear-gradient(
              rgba(250, 245, 240, 0.95),
              rgba(250, 245, 240, 0.98)
            ),
            url("data:image/svg+xml,%3Csvg width='100' height='100' viewBox='0 0 100 100' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm63 31c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM34 90c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zm56-76c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3zM12 86c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm28-65c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm23-11c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-6 60c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm29 22c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zM32 63c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm57-13c2.76 0 5-2.24 5-5s-2.24-5-5-5-5 2.24-5 5 2.24 5 5 5zm-9-21c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM60 91c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM35 41c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2zM12 60c1.105 0 2-.895 2-2s-.895-2-2-2-2 .895-2 2 .895 2 2 2z' fill='%23D4A574' fill-opacity='0.05' fill-rule='evenodd'/%3E%3C/svg%3E")
          `,
          backgroundSize: '200px'
        }}
      >
        <div className="container mx-auto px-4 relative">
          {/* Hiasan samping */}
          <div className="absolute -left-4 top-1/4 w-24 h-24 rounded-full bg-gradient-to-br from-amber-100/50 to-amber-50/30 blur-xl"></div>
          <div className="absolute -right-4 bottom-1/4 w-24 h-24 rounded-full bg-gradient-to-br from-amber-100/50 to-amber-50/30 blur-xl"></div>
          
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 mb-4">
              <div className="w-6 h-0.5 bg-gradient-to-r from-amber-600 to-amber-400"></div>
              <span className="text-amber-700 font-medium">PENGALAMAN UNGGULAN</span>
              <div className="w-6 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600"></div>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              Kenapa KopiNusa Berbeda?
            </h2>
            <p className="text-gray-700 max-w-2xl mx-auto leading-relaxed">
              Kami menghadirkan harmoni antara warisan kopi nusantara yang kaya dan inovasi teknologi modern
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="group relative p-6 rounded-2xl bg-gradient-to-b from-white to-amber-50 border border-amber-100 hover:border-amber-200 hover:shadow-lg hover:shadow-amber-100/30 transition-all duration-300">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-xl text-white">🤖</span>
              </div>
              <div className="pt-6 text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">AI Barista Personal</h3>
                <p className="text-gray-600 leading-relaxed">
                  Rekomendasi kopi yang disesuaikan dengan selera, mood, dan waktu Anda
                </p>
              </div>
            </div>

            <div className="group relative p-6 rounded-2xl bg-gradient-to-b from-white to-amber-50 border border-amber-100 hover:border-amber-200 hover:shadow-lg hover:shadow-amber-100/30 transition-all duration-300">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-xl text-white">🌱</span>
              </div>
              <div className="pt-6 text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Single Origin Premium</h3>
                <p className="text-gray-600 leading-relaxed">
                  Biji kopi pilihan langsung dari perkebunan terbaik di Indonesia
                </p>
              </div>
            </div>

            <div className="group relative p-6 rounded-2xl bg-gradient-to-b from-white to-amber-50 border border-amber-100 hover:border-amber-200 hover:shadow-lg hover:shadow-amber-100/30 transition-all duration-300">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 w-12 h-12 bg-gradient-to-br from-amber-600 to-amber-500 rounded-full flex items-center justify-center shadow-lg">
                <span className="text-xl text-white">⚡</span>
              </div>
              <div className="pt-6 text-center">
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Order & Pickup Modern</h3>
                <p className="text-gray-600 leading-relaxed">
                  Sistem pemesanan digital yang cepat dengan estimasi waktu akurat
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section dengan Background Gradient Emas */}
      <section 
        className="py-16 relative overflow-hidden"
        style={{
          background: 'linear-gradient(135deg, #2c1810 0%, #3d2618 25%, #5c3d2e 50%, #3d2618 75%, #2c1810 100%)'
        }}
      >
        {/* Efek biji kopi floating */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i}
              className="absolute rounded-full bg-gradient-to-br from-amber-400 to-amber-600"
              style={{
                width: `${Math.random() * 30 + 10}px`,
                height: `${Math.random() * 30 + 10}px`,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                opacity: Math.random() * 0.3 + 0.1,
                transform: `rotate(${Math.random() * 360}deg)`
              }}
            />
          ))}
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="max-w-2xl mx-auto">
            <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-amber-800/30 to-amber-600/30 backdrop-blur-sm rounded-full border border-amber-600/30">
              <span className="text-amber-300">🌟</span>
              <span className="text-amber-200 text-sm font-medium">Premium Coffee Experience</span>
            </div>
            
            <h2 className="text-3xl font-bold text-amber-50 mb-4">
              Siap Menikmati Perjalanan Rasa Kopi Nusantara?
            </h2>
            <p className="text-amber-100/80 mb-8 max-w-2xl mx-auto leading-relaxed">
              Setiap biji kopi kami memiliki cerita unik. Mari kita temukan cerita yang cocok untuk hari Anda.
            </p>
            
            <div className="flex gap-4 justify-center flex-wrap">
              <Link 
                href="/menu"
                className="group relative overflow-hidden bg-gradient-to-r from-amber-600 to-amber-500 hover:from-amber-500 hover:to-amber-400 text-amber-50 font-semibold px-8 py-3 rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-amber-500/20"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span className="group-hover:rotate-12 transition-transform">📜</span>
                  <span>Jelajahi Menu Lengkap</span>
                </span>
              </Link>
              <Link 
                href="/order"
                className="group relative overflow-hidden border-2 border-amber-400/50 hover:border-amber-300 bg-gradient-to-r from-amber-800/30 to-amber-700/30 hover:from-amber-700/40 hover:to-amber-600/40 backdrop-blur-sm text-amber-100 font-semibold px-8 py-3 rounded-lg transition-all duration-300"
              >
                <span className="relative z-10 flex items-center gap-2">
                  <span className="group-hover:scale-110 transition-transform">⚡</span>
                  <span>Pesan Sekarang</span>
                </span>
              </Link>
            </div>
            
            <div className="mt-8 pt-8 border-t border-amber-800/30">
              <p className="text-amber-200/60 text-sm">
                ✨ Setiap pembelian mendukung petani kopi lokal Indonesia
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

// Tambahkan custom CSS untuk efek tambahan
const styles = `
  @keyframes float {
    0%, 100% { transform: translateY(0px) rotate(0deg); }
    50% { transform: translateY(-10px) rotate(5deg); }
  }
  
  .float-animation {
    animation: float 6s ease-in-out infinite;
  }
`

// Tambahkan style ke dalam komponen
if (typeof document !== 'undefined') {
  const styleSheet = document.createElement('style')
  styleSheet.textContent = styles
  document.head.appendChild(styleSheet)
}