import OrderSystem from '@/components/OrderSystem'

export const metadata = {
  title: 'Pesan - Warung KopiNusaOfficialGPT',
  description: 'Pesan kopi favorit Anda dengan mudah',
}

export default function OrderPage() {
  return (
    <div className="min-h-screen bg-amber-50 py-16">
      <div className="container mx-auto px-4">
        
        
        <OrderSystem />
      </div>
    </div>
  )
}