import CoffeeMenu from '@/components/CoffeeMenu'

export const metadata = {
  title: 'Menu - Warung KopiNusaOfficialGPT',
  description: 'Lihat menu lengkap kopi spesial kami',
}

export default function MenuPage() {
  return (
    <div className="min-h-screen bg-amber-50 py-16">
      <div className="container mx-auto px-4">
        <CoffeeMenu />
        
        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">Siap memesan kopi favorit Anda?</p>
          <a 
            href="/order" 
            className="bg-amber-600 hover:bg-amber-700 text-white font-semibold px-8 py-3 rounded-lg transition-colors inline-block"
          >
            Pesan Sekarang
          </a>
        </div>
      </div>
    </div>
  )
}