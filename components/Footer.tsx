import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-amber-900 text-amber-100 py-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-xl font-bold text-amber-300 mb-4">Warung KopiNusaOfficialGPT</h3>
            <p className="text-amber-200">
              Menyajikan Kopi Berkualitas Berasal dari Indonesia Yang Dipanen Langsung Oleh Petani.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Katalog</h4>
            <div className="flex flex-col space-y-2">
              <Link href="/menu" className="hover:text-amber-300 transition-colors">Menu</Link>
              <Link href="/order" className="hover:text-amber-300 transition-colors">Order</Link>
              <Link href="/ai-assistant" className="hover:text-amber-300 transition-colors">AI Assistant</Link>
              <Link href="/about" className="hover:text-amber-300 transition-colors">About</Link>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Kontak</h4>
            <p>Email: jimbedous@gmail.com</p>
            <p>Telepon: 087762010605</p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Lokasi</h4>
            <p>Jl. Dukuh Dalam 5 No.60, RT.3/RW.4, Dukuh, Kec. Kramat jati, Kota Jakarta Timur, Daerah Khusus Ibukota Jakarta 13550</p>
          </div>
        </div>
        
        <div className="border-t border-amber-700 mt-8 pt-8 text-center">
          <p>&copy; 2024 Warung KopiNusaOfficialGPT. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}