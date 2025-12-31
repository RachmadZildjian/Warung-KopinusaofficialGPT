export const metadata = {
  title: 'Tentang Kami - Warung KopiNusaOfficialGPT',
  description: 'Kenali lebih dekat Warung KopiNusaOfficialGPT',
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-amber-50 py-16">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-amber-900 mb-4">Tentang KopiNusa</h1>
            <p className="text-gray-600 text-lg">
              Menyatukan tradisi kopi nusantara dengan teknologi modern
            </p>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-amber-800 mb-4">Visi Kami</h2>
            <p className="text-gray-700 mb-6">
              Warung KopiNusaOfficialGPT hadir untuk merevolusi pengalaman ngopi dengan memadukan 
              kearifan lokal dalam memilih biji kopi terbaik dengan kecanggihan Artificial Intelligence 
              untuk memberikan rekomendasi yang personal.
            </p>
            
            <h2 className="text-2xl font-bold text-amber-800 mb-4">Misi Kami</h2>
            <ul className="text-gray-700 space-y-2 mb-6">
              <li>• Menyajikan kopi berkualitas dari biji pilihan nusantara</li>
              <li>• Memberikan pengalaman personal dengan teknologi AI</li>
              <li>• Melestarikan tradisi kopi Indonesia dengan sentuhan modern</li>
              <li>• Menjadi tempat ngopi favorit bagi komunitas digital</li>
            </ul>

            <h2 className="text-2xl font-bold text-amber-800 mb-4">Teknologi Kami</h2>
            <p className="text-gray-700">
              Dengan menggunakan GPT-powered AI assistant, kami dapat menganalisis preferensi 
              dan memberikan rekomendasi kopi yang sesuai dengan selera, mood, dan bahkan 
              aktivitas yang sedang Anda lakukan.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-amber-100 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-amber-800 mb-3">Lokasi</h3>
              <p className="text-gray-700">Jl. Dukuh Dalam 5 No.60, RT.3/RW.4, Dukuh, Kec. Kramat jati, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13550</p>
            </div>
            
            <div className="bg-amber-100 rounded-lg p-6">
              <h3 className="text-xl font-semibold text-amber-800 mb-3">Jam Operasional</h3>
              <p className="text-gray-700">Senin - Minggu<br/>07:00 - 22:00 WIB</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}