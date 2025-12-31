'use client'

import { useState } from 'react'
import Link from 'next/link'

const featuredCoffees = [
  { 
    id: 1, 
    name: 'Kopi Bali Kintamani', 
    price: 15000, 
    description: 'Aroma buah-buahan cerah dan rasa bersih khas dataran tinggi Kintamani.',
    image: '/images/kopi-bali-kintamani.jpg',
    origin: 'Bali',
    roastLevel: 'Light Roast',
    tastingNotes: ['Fruity', 'Citrus', 'Floral', '250 gram'],
    recipe: {
      penyajian: [
        'Siapkan 15 g biji kopi Bali Kintamani.',
        'Giling hingga medium (pour-over/V60).',
        'Seduh dengan water ratio 1:15 (225 ml air).',
        'Suhu air ideal: 92–95°C.',
        'Brewing time: 2:30–3:30 menit (tergantung teknik gagang dan lapisan bubuk).'
      ],
      kesehatan: [
        'Konsumsi maksimal 2 cangkir per hari.',
        'Kopi Arabica cenderung lebih ringan dan cocok untuk konsumsi harian untuk meningkatkan kewaspadaan.',
        'Hindari menambah gula berlebihan — nikmati profil asam/fruitiness untuk rasa lebih sehat.',
        'Minum air putih sebelum dan sesudah untuk menjaga hidrasi.'
      ]
    }
  },
  { 
    id: 2, 
    name: 'Kopi Aceh Gayo (Robusta)', 
    price: 15000, 
    description: 'Kekayaan rasa dan aroma earthy dari biji robusta kebanggaan Aceh.',
    image: '/images/kopi-aceh-gayo.jpg',
    origin: 'Aceh',
    roastLevel: 'Dark Roast',
    tastingNotes: ['Earthy', 'Spicy', 'Cedar', '250 gram'],
    recipe: {
      penyajian: [
        'Siapkan 15 g bubuk kopi (giling halus-sedang untuk Moka pot; sangat halus untuk espresso).',
        'Jika Moka pot: masukkan 15 g, isi water chamber sesuai petunjuk, panaskan hingga ekstraksi; hasil konsentrat ~60–90 ml.',
        'Jika espresso (mesin): gunakan dosis 16–18 g, water ratio espresso ~1:2 (yield ≈ 32–36 g), ekstraksi 25–30 detik pada 90–94°C.',
        'Untuk minuman harian, bisa diencerkan dengan air panas (Americano) atau susu sesuai selera.',
      ],
      kesehatan: [
        'Karena kandungan kafein Robusta relatif tinggi, batasi konsumsi maksimal 1–2 cangkir kecil per hari.',
        'Baik untuk tenaga dan alertness singkat; hindari malam agar tidur tidak terganggu.',
        'Jika sensitif terhadap kafein, pilih porsi lebih kecil atau campur dengan susu/air.',
        'Perbanyak minum air putih setelah konsumsi untuk mengurangi efek dehidrasi ringan.'
      ]
    }
  },
  { 
    id: 3, 
    name: 'Kopi Flores (Robusta)', 
    price: 18000, 
    description: 'Aroma rempah dan kekhasan rasa dari biji kopi Flores pilihan.',
    image: '/images/kopi-flores.jpg',
    origin: 'Flores, NTT',
    roastLevel: 'Medium Roast',
    tastingNotes: ['Floral', 'Spice', 'Citrus', '250 gram'],
    recipe: {
      penyajian: [
        '12g kopi Flores untuk 180ml air',
        'Giling medium-fine',
        'Metode pour-over dengan V60',
        'Suhu air: 90-93°C',
        'Total brewing time: 2.5-3 menit'
      ],
      kesehatan: [
        'Baik untuk metabolisme tubuh',
        'Mengandung antioksidan alami',
        'Disarankan dikonsumsi pagi hari',
        'Hindari tambahan gula berlebihan'
      ]
    }
  },
  { 
    id: 4, 
    name: 'Kopi Vietnam', 
    price: 15000, 
    description: 'Perpaduan unik rasa nutty dan chocolatey dari biji kopi Vietnam.',
    image: '/images/kopi-vietnam.jpg',
    origin: 'Vietnam',
    roastLevel: 'Medium-Dark Roast',
    tastingNotes: ['Nutty', 'Chocolate', 'Toffee', '250 gram'],
    recipe: {
      penyajian: [
        'Siapkan 15–18 g bubuk kopi Robusta (giling medium-coarse di alat phin)',
        'Masukkan kopi ke alat phin; tekan ringan.',
        'Tuangkan 20–30 ml air panas (bloom) lalu tekan/biarkan 20–30 detik.',
        'Tambahkan 90–120 ml air panas (92–95°C) untuk menetes; total ekstraksi phin ≈ 3–4 menit.',
        'Untuk cà phê sữa đá: tuang 1–2 sdm susu kental manis di gelas, tambahkan ekstrak kopi kental, aduk, lalu tambahkan es.'
      ],
      kesehatan: [
        'Konsumsi maksimal 1–2 cangkir per hari (varian susu kental menambah gula).',
        'Mengandung kafein sedang–tinggi; baik untuk meningkatkan fokus secara sementara.',
        'Hindari saat perut kosong karena kafein + gula dapat mengiritasi lambung.',
        'Kurangi frekuensi atau takaran susu kental jika berisiko gula darah/kontrol kalori.'
      ]
    }
  },
  { 
    id: 5, 
    name: 'Kopi Magelang Semar (Robusta)', 
    price: 15000, 
    description: 'Rasa bold dan pahit kopi khas Magelang yang legendaris.',
    image: '/images/kopi-magelang-semar.jpg',
    origin: 'Magelang, Jawa Tengah',
    roastLevel: 'Dark Roast',
    tastingNotes: ['Chocolate', 'Nutty', 'Earthy', '250 gram'],
    recipe: {
      penyajian: [
        'Siapkan 15g biji kopi Magelang Semar',
        'Giling hingga medium-coarse',
        'Seduh dengan water ratio 1:15 (225ml air)',
        'Suhu air ideal: 92-95°C',
        'Brewing time: 3-4 menit'
      ],
      kesehatan: [
        'Konsumsi maksimal 2 cangkir per hari',
        'Baik untuk meningkatkan fokus dan energi',
        'Hindari dikonsumsi saat perut kosong',
        'Perbanyak minum air putih setelah konsumsi kopi'
      ]
    }
  },
  { 
    id: 6, 
    name: 'Kopi Jantan Temanggung (Robusta)', 
    price: 20000, 
    description: 'Karakter kuat dan "jantan" dari biji robusta pegunungan Temanggung.',
    image: '/images/kopi-jantan-temanggung.jpg',
    origin: 'Temanggung, Jawa Tengah',
    roastLevel: 'Extra Dark Roast',
    tastingNotes: ['Spicy', 'Tobacco', 'Dark Chocolate', '250 gram'],
    recipe: {
      penyajian: [
        'Gunakan 18g kopi untuk 150ml air',
        'Giling halus untuk espresso',
        'Tekanan 9 bar, waktu ekstraksi 25-30 detik',
        'Suhu air: 88-90°C',
        'Hasil: crema tebal dan aroma kuat'
      ],
      kesehatan: [
        'Kadar kafein tinggi, batasi 1 cangkir per hari',
        'Tidak disarankan untuk penderita hipertensi',
        'Berikan jeda 4-5 jam antar konsumsi',
        'Konsumsi dengan makanan ringan'
      ]
    }
  },
  { 
    id: 7, 
    name: 'Kopi Medan', 
    price: 15000, 
    description: 'Cita rasa full-bodied dan aroma yang menggugah dari biji kopi pilihan Medan.',
    image: '/images/kopi-medan.jpg',
    origin: 'Medan, Sumatera Utara',
    roastLevel: 'Medium-Dark Roast',
    tastingNotes: ['Full-bodied', 'Chocolate', 'Caramel', '250 gram'],
    recipe: {
      penyajian: [
        'Siapkan 15 g biji kopi Medan (giling coarse untuk French Press).',
        'Masukkan bubuk ke French Press, tuang 225 ml air panas (92–95°C).',
        'Aduk ringan, tutup, dan biarkan bloom + ekstraksi selama 4 menit.',
        'Tekan plunger perlahan, tuang dan nikmati segera untuk menghindari over-extraction.'
      ],
      kesehatan: [
        'Konsumsi maksimal 2 cangkir per hari.',
        'French Press menghasilkan kopi yang lebih berbody — rasa kenyang dan hangat baik untuk mood.',
        'French Press menyisakan minyak kopi (ditengarai lebih kaya antioksidan) — bila memiliki masalah kolesterol, konsultasikan dengan profesional medis.',
        'Hindari konsumsi berlebihan saat perut kosong; minum air putih setelahnya.'
      ]
    }
  },
  { 
    id: 8, 
    name: 'Kopi Temanggung (Robusta)', 
    price: 22000, 
    description: 'Cita rasa klasik robusta yang otentik dari jantung penghasil kopi Temanggung.',
    image: '/images/kopi-temanggung.jpg',
    origin: 'Temanggung, Jawa Tengah',
    roastLevel: 'Dark Roast',
    tastingNotes: ['Cocoa', 'Caramel', 'Woody', '250 gram'],
    recipe: {
      penyajian: [
        '15g kopi untuk 200ml air',
        'Giling medium-coarse',
        'Metode French Press',
        'Suhu air: 95°C',
        'Steep time: 4 menit'
      ],
      kesehatan: [
        'Konsumsi ideal 1-2 cangkir sehari',
        'Baik untuk stimulasi mental',
        'Perhatikan reaksi tubuh terhadap kafein',
        'Hindari konsumsi di atas jam 4 sore'
      ]
    }
  },
]

function RecipeModal({ coffee, isOpen, onClose }: { coffee: typeof featuredCoffees[0] | null; isOpen: boolean; onClose: () => void }) {
  if (!isOpen || !coffee) return null

  // Fungsi untuk download resep sebagai PDF atau txt
  const downloadRecipe = () => {
    // Format text untuk download
    const recipeText = `
      🎉 RESEP PENYAJIAN KOPI PREMIUM 🎉
      ==================================
      
      📋 Detail Kopi:
      • Nama: ${coffee.name}
      • Harga: Rp ${coffee.price.toLocaleString()}
      • Asal: ${coffee.origin}
      • Roast Level: ${coffee.roastLevel}
      • Tasting Notes: ${coffee.tastingNotes.join(', ')}
      
      📖 CARA PENYAJIAN:
      ${coffee.recipe.penyajian.map((step, index) => `${index + 1}. ${step}`).join('\n')}
      
      💪 TIPS KESEHATAN:
      ${coffee.recipe.kesehatan.map((tip, index) => `• ${tip}`).join('\n')}
      
      📝 CATATAN PENTING:
      • Konsumsi kopi harus disesuaikan dengan kondisi kesehatan masing-masing individu.
      • Disarankan untuk berkonsultasi dengan dokter jika memiliki kondisi medis tertentu.
      • Selalu dengarkan respon tubuh Anda terhadap kafein.
      
      ==================================
      🏪 Warung KopiNusaOfficialGPT
      ☕ Premium Coffee Experience
      📞 0878-9090-1299
      ==================================
      
      ⏰ Download pada: ${new Date().toLocaleString('id-ID')}
    `

    // Buat blob untuk text file
    const textBlob = new Blob([recipeText], { type: 'text/plain' })
    
    
    
    // Buat URL untuk download
    const textUrl = URL.createObjectURL(textBlob)
    
    
    // Download sebagai text file
    const textLink = document.createElement('a')
    textLink.href = textUrl
    textLink.download = `Resep-${coffee.name.replace(/\s+/g, '-')}.txt`
    document.body.appendChild(textLink)
    textLink.click()
    document.body.removeChild(textLink)
    
    // Cleanup
    setTimeout(() => {
      URL.revokeObjectURL(textUrl)
    }, 100)
    
    // Tampilkan konfirmasi
    alert(`✅ Resep "${coffee.name}" berhasil didownload!`)
  }

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-gradient-to-b from-amber-50 to-white rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto shadow-2xl border border-amber-200">
        <div className="p-8">
          {/* Header dengan gradient */}
          <div className="mb-8">
            <div className="flex justify-between items-start">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-3 h-3 rounded-full bg-amber-500"></div>
                  <span className="text-sm font-semibold text-amber-700 uppercase tracking-wider">Brewing Guide</span>
                </div>
                <h2 className="text-3xl font-bold text-gray-900">Resep Penyajian <span className="text-amber-700">{coffee.name}</span></h2>
              </div>
              <button 
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 hover:bg-amber-50 rounded-full p-2 transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            
            {/* Coffee info card */}
            <div className="mt-4 p-4 bg-gradient-to-r from-amber-100 to-amber-50 rounded-xl border border-amber-200">
              <div className="flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <span className="px-3 py-1 bg-amber-600 text-white text-sm rounded-full">Rp {coffee.price.toLocaleString()}</span>
                    <span className="text-sm text-gray-600">{coffee.origin}</span>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="flex items-center gap-1">
                      <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      <span className="text-sm font-medium text-gray-700">{coffee.roastLevel}</span>
                    </div>
                    <div className="flex gap-2">
                      {coffee.tastingNotes.map((note: string, index: number) => (
                        <span key={index} className="px-2 py-1 bg-white/50 text-xs text-gray-700 rounded-full border border-amber-200">
                          {note}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                {/* Tombol Download kecil di header */}
                <button
                  onClick={downloadRecipe}
                  className="hidden md:flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all font-medium shadow-md hover:shadow-lg"
                  title="Download Resep"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm">Download</span>
                </button>
              </div>
            </div>
          </div>

          {/* Content dengan grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Cara Penyajian */}
            <div className="bg-white rounded-xl p-6 border border-amber-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-amber-500 to-amber-600 flex items-center justify-center">
                  <span className="text-white font-bold">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Cara Penyajian</h3>
                  <p className="text-sm text-gray-600">Ikuti panduan untuk hasil terbaik</p>
                </div>
              </div>
              <ol className="space-y-3 ml-2">
                {coffee.recipe.penyajian.map((step: string, index: number) => (
                  <li key={index} className="flex items-start gap-3 p-3 hover:bg-amber-50/50 rounded-lg transition-colors">
                    <span className="flex-shrink-0 w-6 h-6 bg-amber-100 text-amber-700 rounded-full flex items-center justify-center text-sm font-medium">
                      {index + 1}
                    </span>
                    <span className="text-gray-700">{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Tips Kesehatan */}
            <div className="bg-gradient-to-br from-green-50 to-emerald-50 rounded-xl p-6 border border-green-100 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-green-500 to-emerald-600 flex items-center justify-center">
                  <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="text-xl font-bold text-gray-900">Tips Kesehatan</h3>
                  <p className="text-sm text-gray-600">Untuk pengalaman kopi yang sehat</p>
                </div>
              </div>
              <ul className="space-y-3 ml-2">
                {coffee.recipe.kesehatan.map((tip: string, index: number) => (
                  <li key={index} className="flex items-start gap-3 p-3 hover:bg-white/50 rounded-lg transition-colors">
                    <svg className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span className="text-gray-700">{tip}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Catatan Tambahan */}
          <div className="mt-8 p-6 bg-gradient-to-r from-amber-50 to-amber-100 rounded-xl border border-amber-200">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-amber-100 flex items-center justify-center flex-shrink-0">
                <svg className="w-4 h-4 text-amber-600" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <div>
                <h4 className="font-semibold text-amber-800 mb-1">Catatan Penting</h4>
                <p className="text-sm text-amber-700">
                  Konsumsi kopi harus disesuaikan dengan kondisi kesehatan masing-masing individu. 
                  Disarankan untuk berkonsultasi dengan dokter jika memiliki kondisi medis tertentu.
                  Selalu dengarkan respon tubuh Anda terhadap kafein.
                </p>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-8 pt-6 border-t border-gray-200">
            <div className="text-sm text-gray-500">
              Brewing guide ini dibuat khusus untuk kopi premium Warung KopiNusaOfficialGPT
            </div>
            <div className="flex gap-2">
              <button
                onClick={onClose}
                className="px-6 py-2.5 border border-white-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors font-medium flex items-center gap-1"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
                Tutup Panduan
              </button>
          <Link 
              href="/ai-assistant" 
              className="bg-green-600 hover:bg-amber-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors inline-flex items-center gap-2"
              >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Konsultasi Kesehatan
            </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default function CoffeeMenu() {
  const [selectedCoffee, setSelectedCoffee] = useState<typeof featuredCoffees[0] | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleShowRecipe = (coffee: typeof featuredCoffees[0]) => {
    setSelectedCoffee(coffee)
    setIsModalOpen(true)
  }

  const closeModal = () => {
    setIsModalOpen(false)
    setSelectedCoffee(null)
  }

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>, coffeeId: number) => {
    const img = e.currentTarget as HTMLImageElement
    console.log(`Gambar error untuk coffee ID: ${coffeeId}`, img.src)
    const parent = img.parentElement as HTMLElement | null
    if (parent) {
      // Remove the image and show a beautiful placeholder
      img.style.display = 'none'
      parent.innerHTML = `
        <div class="w-full h-full bg-gradient-to-br from-amber-400 to-amber-600 flex flex-col items-center justify-center p-4 relative">
          <div class="text-5xl mb-2 opacity-80">☕</div>
          <div class="text-white text-center">
            <div class="font-bold mb-1">Premium Coffee</div>
            <div class="text-xs opacity-80">No Image Available</div>
          </div>
          <div class="absolute bottom-2 right-2 text-white/30 text-xs">KopiNusa</div>
        </div>
      `
    }
  }

  return (
    <>
      {/* Header Section */}
      <div className="mb-12 text-center">
        <div className="inline-flex items-center gap-2 mb-4">
          <div className="w-12 h-0.5 bg-gradient-to-r from-amber-600 to-amber-400"></div>
          <span className="text-amber-700 font-medium uppercase tracking-wider text-sm">Menu Premium</span>
          <div className="w-12 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600"></div>
        </div>
        <h1 className="text-4xl font-bold text-gray-900 mb-4">
          <span className="bg-gradient-to-r from-amber-700 via-amber-600 to-amber-500 bg-clip-text text-transparent">
            Cek Koleksi Kopi Premium Kami
          </span>
        </h1>
        <p className="text-gray-600 max-w-3xl mx-auto">
          Setiap kopi dalam koleksi kami memiliki karakter unik yang mencerminkan kekayaan alam Indonesia. 
          Nikmati perjalanan rasa dari berbagai daerah penghasil kopi terbaik.
        </p>
      </div>

      {/* Coffee Grid */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {featuredCoffees.map((coffee) => (
          <div 
            key={coffee.id} 
            className="group relative bg-white rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 border border-amber-100 hover:border-amber-200"
          >
            {/* Badge harga */}
            <div className="absolute top-4 left-4 z-10">
              <span className="px-3 py-1.5 bg-gradient-to-r from-amber-600 to-amber-500 text-white text-sm font-semibold rounded-full shadow-md">
                Rp {coffee.price.toLocaleString()}
              </span>
            </div>

            {/* Image Container */}
            <div className="h-56 overflow-hidden relative">
              <img 
                src={coffee.image} 
                alt={coffee.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => handleImageError(e, coffee.id)}
                onLoad={() => console.log('Gambar berhasil load:', coffee.name)}
              />
              {/* Gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            {/* Content */}
            <div className="p-5">
              {/* Origin badge */}
              <div className="flex items-center justify-between mb-3">
                <span className="px-2.5 py-1 bg-amber-100 text-amber-700 text-xs font-medium rounded-full">
                  {coffee.origin}
                </span>
                <span className="text-xs text-gray-500">{coffee.roastLevel}</span>
              </div>

              {/* Coffee name */}
              <h3 className="text-lg font-bold text-gray-900 mb-2 group-hover:text-amber-700 transition-colors line-clamp-1">
                {coffee.name}
              </h3>

              {/* Description */}
              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {coffee.description}
              </p>

              {/* Tasting notes */}
              <div className="flex flex-wrap gap-1.5 mb-5">
                {coffee.tastingNotes.map((note, index) => (
                  <span 
                    key={index}
                    className="px-2 py-1 bg-gray-50 text-gray-700 text-xs rounded-full border border-gray-200"
                  >
                    {note}
                  </span>
                ))}
              </div>

              {/* Action button */}
              <button 
                onClick={() => handleShowRecipe(coffee)}
                className="w-full bg-gradient-to-r from-amber-50 to-amber-100 hover:from-amber-100 hover:to-amber-200 text-amber-700 font-semibold py-3 rounded-lg transition-all duration-300 flex items-center justify-center gap-2 border border-amber-200 hover:border-amber-300 hover:shadow-md"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
                <span>Lihat Panduan Brewing</span>
              </button>
            </div>

            {/* Hover effect border */}
            <div className="absolute inset-0 border-2 border-transparent group-hover:border-amber-300 rounded-2xl transition-colors pointer-events-none"></div>
          </div>
        ))}
      </div>

      {/* Stats Section */}
      <div className="mt-16 p-8 bg-gradient-to-r from-amber-50 to-amber-100 rounded-2xl border border-amber-200">
        <div className="grid md:grid-cols-4 gap-6 text-center">
          <div className="p-4">
            <div className="text-3xl font-bold text-amber-700 mb-2">8+</div>
            <div className="text-sm text-gray-600 font-medium">Jenis Kopi Premium</div>
          </div>
          <div className="p-4">
            <div className="text-3xl font-bold text-amber-700 mb-2">100%</div>
            <div className="text-sm text-gray-600 font-medium">Single Origin Indonesia</div>
          </div>
          <div className="p-4">
            <div className="text-3xl font-bold text-amber-700 mb-2">✓</div>
            <div className="text-sm text-gray-600 font-medium">Brewing Guide Tersedia</div>
          </div>
          <div className="p-4">
            <div className="text-3xl font-bold text-amber-700 mb-2">24/7</div>
            <div className="text-sm text-gray-600 font-medium">Konsultasi AI Barista</div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <RecipeModal 
        coffee={selectedCoffee} 
        isOpen={isModalOpen} 
        onClose={closeModal} 
      />
    </>
  )
}