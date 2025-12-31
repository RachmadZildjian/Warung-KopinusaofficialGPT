'use client'

import { useState, useRef, useEffect } from 'react'

interface Message {
  role: string
  content: string
}

export default function AIChatbot() {
  const [messages, setMessages] = useState<Message[]>([
    { 
      role: 'assistant', 
      content: 'Halo! Saya AI Assistant 🤖\nSaya bisa membantu berbagai kebutuhan Anda.\nPilih Mode Kopi untuk konsultasi khusus kopi, atau Mode konsultasi kesehatan untuk memberikan konsultasi keluhan ringan tanpa harus keluar rumah.' 
    }
  ])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [mode, setMode] = useState<'coffee' | 'general'>('coffee')
  const [apiStatus, setApiStatus] = useState<'idle' | 'testing' | 'success' | 'error'>('idle')
  const messagesEndRef = useRef<null | HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  // Mengetest status API saat halaman dimuat
  useEffect(() => {
    const testApi = async () => {
      setApiStatus('testing')
      try {
        const response = await fetch('/api/chat', { method: 'GET' })
        if (response.ok) {
          setApiStatus('success')
        } else {
          setApiStatus('error')
        }
      } catch {
        setApiStatus('error')
      }
    }
    testApi()
  }, [])

  const handleSend = async () => {
    if (!input.trim() || isLoading) return

    const userMessage = input.trim()
    const newMessages = [...messages, { role: 'user', content: userMessage }]
    setMessages(newMessages)
    setInput('')
    setIsLoading(true)

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newMessages,
          mode: mode
        })
      })

      const data = await response.json()

      if (data.success) {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: data.response 
        }])
      } else {
        setMessages(prev => [...prev, { 
          role: 'assistant', 
          content: `${data.fallback || "Maaf, terjadi kesalahan. Coba lagi nanti ya!"}` 
        }])
      }
      
    } catch (error) {
      console.error('Chat error:', error)
      setMessages(prev => [...prev, { 
        role: 'assistant', 
        content: "Koneksi terputus. Silakan coba lagi! 🔄" 
      }])
    } finally {
      setIsLoading(false)
    }
  }

  const quickQuestions = mode === 'coffee' ? [
    "Rekomendasi kopi untuk pemula",
    "Cara menyeduh kopi yang benar", 
    "Kopi robusta vs arabica",
    "Tips mengurangi pahit kopi",
    "Kopi terbaik untuk pagi hari"
  ] : [
    "Tips menjaga kesehatan",
    "Tips meningkatkan produktivitas",
    "Jelaskan tentang manfaat minum kopi",
    "Jelaskan tentang stres dan cara mengatasinya",
    "Jelaskan dampak negatif dari minum kopi berlebihan",
  ]

  return (
    <div className="bg-white rounded-lg shadow-lg p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-3">
          <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
            mode === 'coffee' ? 'bg-amber-600' : 'bg-blue-600'
          }`}>
            <span className="text-white font-bold">AI</span>
          </div>
          <div>
            <h2 className={`text-2xl font-bold ${
              mode === 'coffee' ? 'text-amber-800' : 'text-blue-800'
            }`}>
              {mode === 'coffee' ? 'Coffee Assistant' : 'AI Assistant'}
            </h2>
            <p className="text-sm text-gray-600">
              {mode === 'coffee' ? 'Konsultasi kopi dan warung' : 'Asisten umum berbagai topik'}
            </p>
          </div>
        </div>
        
        {/* Status Indicator */}
        <div className="flex items-center gap-2">
          <div className={`w-3 h-3 rounded-full ${
            apiStatus === 'success' ? 'bg-green-500' :
            apiStatus === 'error' ? 'bg-red-500' :
            apiStatus === 'testing' ? 'bg-yellow-500 animate-pulse' : 'bg-gray-500'
          }`}></div>
          <span className="text-xs text-gray-600">
            {apiStatus === 'success' ? 'Online' : 
             apiStatus === 'error' ? 'Offline' : 
             apiStatus === 'testing' ? 'Testing...' : 'Idle'}
          </span>
        </div>
      </div>

      {/* Mode Selector */}
      <div className="mb-6 p-4 border rounded-lg bg-gray-50">
        <h3 className="font-semibold text-gray-800 mb-3">Pilih Mode Chat:</h3>
        <div className="flex gap-4">
          <button
            onClick={() => setMode('coffee')}
            className={`flex-1 p-4 rounded-lg transition-all flex flex-col items-center ${
              mode === 'coffee' 
                ? 'bg-amber-600 text-white shadow-md border-2 border-amber-700' 
                : 'bg-white border-2 border-amber-200 text-amber-800 hover:bg-amber-50'
            }`}
          >
            <span className="text-2xl mb-2">☕</span>
            <span className="font-semibold">Mode Kopi</span>
            <p className="text-xs mt-1 opacity-90">Konsultasi khusus kopi dan warung</p>
          </button>
          
          <button
            onClick={() => setMode('general')}
            className={`flex-1 p-4 rounded-lg transition-all flex flex-col items-center ${
              mode === 'general' 
                ? 'bg-blue-600 text-white shadow-md border-2 border-blue-700' 
                : 'bg-white border-2 border-blue-200 text-blue-800 hover:bg-blue-50'
            }`}
          >
            <span className="text-2xl mb-2">🤖</span>
            <span className="font-semibold">Mode Konsultasi Kesehatan</span>
            <p className="text-xs mt-1 opacity-90">Konsultasi Khusus Kesehatan</p>
          </button>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-200">
          
        </div>
      </div>
      
      {/* Chat Messages */}
      <div className="h-64 overflow-y-auto mb-4 border rounded-lg p-4 bg-gray-50">
        {messages.map((msg, index) => (
          <div key={index} className={`mb-4 ${msg.role === 'user' ? 'text-right' : ''}`}>
            <div className={`inline-block max-w-[80%] p-3 rounded-lg ${
              msg.role === 'user' 
                ? mode === 'coffee'
                  ? 'bg-amber-600 text-white rounded-br-none shadow-sm'
                  : 'bg-blue-600 text-white rounded-br-none shadow-sm'
                : mode === 'coffee'
                  ? 'bg-white border border-amber-200 text-gray-800 rounded-bl-none shadow-sm'
                  : 'bg-white border border-blue-200 text-gray-800 rounded-bl-none shadow-sm'
            }`}>
              <div className="whitespace-pre-wrap">{msg.content}</div>
            </div>
            <div className={`text-xs mt-1 text-gray-500 ${msg.role === 'user' ? 'text-right' : ''}`}>
              {msg.role === 'user' ? '👤 Anda' : mode === 'coffee' ? '🤖 Coffee AI' : '🤖 AI Assistant Kesehatan'}
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="mb-4">
            <div className={`inline-block max-w-[80%] p-3 rounded-lg bg-white border rounded-bl-none shadow-sm ${
              mode === 'coffee' ? 'border-amber-200' : 'border-blue-200'
            }`}>
              <div className="flex items-center gap-3">
                <div className="flex space-x-1">
                  <div className={`w-2 h-2 rounded-full animate-bounce ${
                    mode === 'coffee' ? 'bg-amber-600' : 'bg-blue-600'
                  }`}></div>
                  <div className={`w-2 h-2 rounded-full animate-bounce ${
                    mode === 'coffee' ? 'bg-amber-600' : 'bg-blue-600'
                  }`} style={{animationDelay: '0.2s'}}></div>
                  <div className={`w-2 h-2 rounded-full animate-bounce ${
                    mode === 'coffee' ? 'bg-amber-600' : 'bg-blue-600'
                  }`} style={{animationDelay: '0.4s'}}></div>
                </div>
                <span className="text-sm text-gray-600">
                  {mode === 'coffee' 
                    ? 'Mencari rekomendasi kopi terbaik...' 
                    : 'Memproses permintaan Anda...'}
                </span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Questions */}
      <div className="mb-4">
        <p className="text-sm text-gray-600 mb-2">Pertanyaan cepat:</p>
        <div className="flex flex-wrap gap-2">
          {quickQuestions.map((question, index) => (
            <button
              key={index}
              onClick={() => setInput(question)}
              className={`text-xs px-3 py-1.5 rounded-full transition-all ${
                mode === 'coffee'
                  ? 'bg-amber-100 text-amber-800 hover:bg-amber-200 hover:shadow-sm'
                  : 'bg-blue-100 text-blue-800 hover:bg-blue-200 hover:shadow-sm'
              }`}
            >
              {question}
            </button>
          ))}
        </div>
      </div>

      {/* Input Area */}
      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder={mode === 'coffee' ? "Tanya tentang kopi..." : "Tanya apapun..."}
          className={`flex-1 text-black border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:border-transparent transition-all ${
            mode === 'coffee'
              ? 'border-amber-300 focus:ring-amber-500'
              : 'border-blue-300 focus:ring-blue-500'
          }`}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          disabled={isLoading}
        />
        <button 
          onClick={handleSend}
          disabled={isLoading || !input.trim()}
          className={`px-6 py-2 rounded-lg transition-all flex items-center gap-2 ${
            mode === 'coffee'
              ? 'bg-amber-600 hover:bg-amber-700 disabled:bg-amber-400 hover:shadow-md'
              : 'bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 hover:shadow-md'
          } text-white disabled:cursor-not-allowed disabled:opacity-60`}
        >
          {isLoading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>...</span>
            </>
          ) : (
            'Kirim'
          )}
        </button>
      </div>

      {/* Footer Info */}
      <div className="mt-4 pt-4 border-t text-center">
        <p className="text-xs text-gray-500">
          {mode === 'coffee' 
            ? '☕ Khusus konsultasi kopi dan warung • Powered by AI' 
            : '🤖 Asisten konsultasi kesehatan • Powered by AI'}
        </p>
      </div>
    </div>
  )
}