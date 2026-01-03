import { NextRequest, NextResponse } from 'next/server'

// Informasi tentang kopi
const COFFEE_KNOWLEDGE = {
  menu: [
    { name: "Kopi Temanggung Robusta", price: 15000, taste: "kuat, earthy", bestFor: "pemula" },
    { name: "Kopi Bali Kintamani", price: 22000, taste: "ringan, fruity", bestFor: "siang hari" },
    { name: "Kopi Flores", price: 18000, taste: "rempah, kompleks", bestFor: "pencinta aroma" },
    { name: "Kopi Aceh Gayo", price: 25000, taste: "full-bodied, chocolatey", bestFor: "pengalaman premium" }
  ],
  promos: [
    "Senin: Beli 2 gratis 1 Kopi Temanggung",
    "Rabu: Diskon 20% untuk mahasiswa",
    "Weekend: Free cookie dengan pembelian minuman > Rp 30.000"
  ],
  brewingTips: {
    frenchPress: "4 menit, air 95°C, coarse grind",
    pourOver: "2.5 menit, water 92°C, medium-fine grind",
    espresso: "25-30 detik, 9 bar pressure, fine grind"
  }
}

// helper: aman untuk mengambil pesan error dari `unknown`
function getErrorMessage(err: unknown): string {
  if (err instanceof Error) return err.message
  try {
    return JSON.stringify(err)
  } catch {
    return String(err)
  }
}

/** Type definitions **/
type ChatMessage = { role?: 'user' | 'assistant' | 'system' | string; content?: string }
type RequestBody = { messages?: ChatMessage[]; mode?: string }

// function untuk memanggil Groq AI API
async function callGroqAI(systemPrompt: string, userMessage: string) {
  try {
    // mendapatkan API key dari environment variable
    const GROQ_API_KEY = process.env.GROQ_API_KEY

    if (!GROQ_API_KEY) {
      throw new Error('Groq API key not configured')
    }

    // Format messages untuk Groq API (OpenAI compatible)
    const messages = [
      {
        role: "system",
        content: systemPrompt
      },
      {
        role: "user",
        content: userMessage
      }
    ]

    const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GROQ_API_KEY}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        model: 'llama-3.1-8b-instant', // Model gratis Groq
        messages: messages,
        temperature: 0.7,
        max_tokens: 1000,
        top_p: 0.8
      })
    })

    if (!response.ok) {
      const errorText = await response.text()
      console.error('Groq API error response:', errorText)
      throw new Error(`Groq API error: ${response.status}`)
    }

    const data = await response.json()

    // Mengetahui response dari Groq AI
    const aiResponse = data?.choices?.[0]?.message?.content

    if (!aiResponse || typeof aiResponse !== 'string') {
      throw new Error('No response from Groq AI')
    }

    return aiResponse.trim()
  } catch (error: unknown) {
    console.error('Groq AI error:', getErrorMessage(error))
    throw error
  }
}

// pesan Fallback responses jika Groq AI tidak merespons
const getFallbackResponse = (mode: string, userMessage: string) => {
  const message = userMessage.toLowerCase()

  if (mode === 'coffee') {
    if (message.includes('menu') || message.includes('harga')) {
      return "Kami punya Kopi Temanggung (Rp15k), Kopi Bali Kintamani (Rp22k), Kopi Flores (Rp18k), Kopi Aceh Gayo (Rp25k). Mana yang mau dicoba? ☕"
    }
    if (message.includes('promo') || message.includes('diskon')) {
      return "Promo kami: Senin (Beli 2 Gratis 1 Kopi Temanggung), Rabu (Diskon 20% untuk mahasiswa), Weekend (Free cookie untuk pembelian > Rp30k) 🎉"
    }
    if (message.includes('rekomendasi')) {
      if (message.includes('pemula')) {
        return "Untuk pemula, coba Kopi Temanggung Robusta! Rasanya kuat namun halus, cocok untuk membangkitkan semangat pagi! 💪"
      }
      if (message.includes('siang') || message.includes('pagi')) {
        return "Saya rekomendasikan Kopi Bali Kintamani yang ringan dengan aroma buah-buahan, cocok untuk siang hari! 🍊"
      }
      if (message.includes('malam') || message.includes('sore')) {
        return "Untuk malam hari, coba Kopi Aceh Gayo. Full-bodied dengan nuansa cokelat yang hangat. 🌙"
      }
      return "Saya rekomendasikan Kopi Flores dengan aroma rempah yang unik! 🌿"
    }
    return "Saya merekomendasikan Kopi Temanggung Robusta untuk Anda! Rasanya kuat dan earthy, cocok untuk hari ini. ☕"
  }

  // Pesan fallback umum
  if (message.includes('halo') || message.includes('hai') || message.includes('hi')) {
    return "Halo! 👋 Saya AI Assistant siap membantu Anda. Ada yang bisa saya bantu hari ini?"
  }
  if (message.includes('terima kasih') || message.includes('thanks')) {
    return "Sama-sama! 😊 Senang bisa membantu. Jangan ragu bertanya lagi jika ada yang perlu ditanyakan!"
  }
  return "Saya siap membantu Anda dengan berbagai pertanyaan. Silakan tanyakan apa yang ingin Anda ketahui! 😊"
}

export async function POST(request: NextRequest) {
  try {
    // memanggil body dari request dengan aman
    const rawBody = await request.json().catch(() => null) as unknown

    if (!rawBody || typeof rawBody !== 'object') {
      return NextResponse.json(
        {
          success: false,
          error: "Invalid request body",
          fallback: "Format permintaan tidak valid. Silakan coba lagi."
        },
        { status: 400 }
      )
    }

    const { messages, mode = 'coffee' } = rawBody as RequestBody

    // memastikan messages adalah array yang tidak kosong
    if (!Array.isArray(messages) || messages.length === 0) {
      return NextResponse.json(
        {
          success: false,
          error: "Messages must be a non-empty array",
          fallback: "Tidak ada pesan untuk diproses."
        },
        { status: 400 }
      )
    }

    // Pastikan setiap message memiliki content string
    const normalizedMessages: ChatMessage[] = messages.map((m) => ({
      role: m?.role,
      content: typeof m?.content === 'string' ? m!.content : ''
    }))

    console.log(`📱 [API] Mode: ${mode}`)

    // PROMPT BERDASARKAN MODE
    let systemPrompt = ''

    if (mode === 'coffee') {
      systemPrompt = `ANDA ADALAH BARISTA AI WARUNG KOPINUSAOFFICIALGPT.

      DATA KHUSUS:
      ${JSON.stringify(COFFEE_KNOWLEDGE, null, 1)}

      ATURAN:
      1. Hanya jawab pertanyaan tentang kopi, warung, dan menu kami
      2. Jika ditanya topik lain, jawab: "Maaf, saya hanya bisa membantu tentang kopi dan warung kami"
      3. Selalu sertakan detail dari DATA KHUSUS di atas.
      4. Rekomendasikan berdasarkan preferensi pelanggan
      5. Informasikan promo yang sedang berjalan
      6. Gunakan gaya percakapan yang santai dan ramah
      7. Apabila menanyakan tentang brewing, berikan tips singkat dan jelas
      8. Apabila kamu ditanya "kamu siapa?", jawab "Saya adalah Barista AI dari KopiNusantaraOfficialGPT yang siap membantu kamu memilih kopi terbaik!"

      BAHASA:
      - Gunakan bahasa Indonesia yang santai dan ramah
      - Tambahkan emoji yang sesuai ☕✨😊
      - Bersemangat dan antusias

      CONTOH RESPON:
      User: "Rekomendasi kopi untuk pemula"
      AI: "Untuk pemula, saya rekomendasikan Kopi Temanggung Robusta (Rp 15.000) yang kuat namun halus. Cocok untuk membangkitkan semangat! 💪"

      User: "Ada promo apa?"
      AI: "Hari ini Senin! Beli 2 Kopi Temanggung gratis 1. Juga ada diskon 20% untuk mahasiswa setiap Rabu. 🎉"`
    } else {
      // MODE UMUM
      systemPrompt = `Anda adalah asisten AI yang ahli dalam bidang kesehatan.
      Berikan jawaban yang informatif, akurat, dan ramah dalam bahasa Indonesia.
      Gunakan gaya bahasa yang santai dan mudah dipahami.

      ATURAN:
      1. Jawab pertanyaan dengan informatif dan jelas
      2. Jika tidak tahu, jangan buat-buat jawaban
      3. Gunakan struktur yang mudah dibaca
      4. Tambahkan emoji yang sesuai untuk membuat respons lebih hidup 😊✨

      CONTOH RESPON:
      User: "apa manfaat dari menjaga tubuh tetap sehat?"
      AI: "Tubuh yang sehat memastikan suplai oksigen ke otak berjalan optimal. Hal ini meningkatkan kemampuan kognitif, sehingga Anda bisa bekerja lebih fokus, berpikir jernih, dan tidak mudah merasa lelah saat menghadapi tekanan pekerjaan. 🤖

      AI bisa belajar dari data, mengenali pola, membuat keputusan, dan bahkan berinteraksi dengan manusia!"
      `
    }

    // mempersiapkan pesan terakhir dari user ke groq AI
    const userMessages = normalizedMessages.filter((msg) => msg.role === 'user')
    const lastUserMessage = userMessages[userMessages.length - 1]?.content || ""

    console.log(`📤 [API] Sending to Groq AI`)

    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), 15000)

    let aiResponse: string
    let usedGroqAI = false

    try {
      // memanggil Groq AI
      aiResponse = await callGroqAI(systemPrompt, lastUserMessage)
      usedGroqAI = true
      console.log('✅ [API] Groq AI response received')
    } catch (fetchError: unknown) {
      clearTimeout(timeoutId)
      console.error('❌ Groq AI error:', getErrorMessage(fetchError))

      // menampilkan fallback local response
      aiResponse = getFallbackResponse(mode, lastUserMessage)
      usedGroqAI = false

      console.log('⚠️ [API] Using fallback response')
    }

    clearTimeout(timeoutId)

    return NextResponse.json(
      {
        success: true,
        response: aiResponse,
        mode: mode,
        provider: usedGroqAI ? 'Groq AI' : 'Local Fallback',
        model: usedGroqAI ? 'llama-3.1-8b-instant' : 'Local Knowledge Base'
      },
      { status: 200 }
    )

  } catch (error: unknown) {
    console.error('💥 [API] Unhandled error:', getErrorMessage(error))

    if (error instanceof Error && error.name === 'AbortError') {
      return NextResponse.json(
        {
          success: false,
          error: "Request timeout",
          fallback: "Permintaan terlalu lama diproses. Coba lagi dengan pertanyaan yang lebih singkat. ⏰"
        },
        { status: 200 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        error: (error instanceof Error && error.message) ? error.message : "Unknown error",
        fallback: "Terjadi kesalahan sistem. Silakan coba lagi nanti!"
      },
      { status: 200 }
    )
  }
}

// GET endpoint untuk testing
export async function GET() {
  return NextResponse.json(
    {
      message: "AI Chat API dengan Groq AI",
      status: "running",
      timestamp: new Date().toISOString(),
      ai_provider: "Groq AI",
      default_model: "llama-3.1-8b-instant",
      available_models: ["llama-3.1-8b-instant", "mixtral-8x7b-32768", "gemma2-9b-it"],
      modes: ["coffee", "general"],
      endpoints: {
        POST: "/api/chat",
        GET: "/api/chat"
      },
      configuration_required: [
        "GROQ_API_KEY"
      ],
      example_request: {
        method: "POST",
        url: "/api/chat",
        body: {
          messages: [{ role: "user", content: "Halo" }],
          mode: "coffee"
        }
      }
    },
    { status: 200 }
  )
}
