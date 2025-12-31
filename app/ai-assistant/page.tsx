import AIChatbot from '@/components/AIChatbot'

export const metadata = {
  title: 'AI Assistant - Warung KopiNusaOfficialGPT',
  description: 'Konsultasi dengan AI assistant untuk rekomendasi kopi personal',
}

export default function AIAssistantPage() {
  return (
    <div className="min-h-screen bg-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-amber-900 mb-4">AI Coffee Assistant</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Bingung memilih kopi? Tanya assistant AI kami untuk rekomendasi personal berdasarkan selera dan mood Anda
          </p>
        </div>
        
        <AIChatbot />
      </div>
    </div>
  )
}