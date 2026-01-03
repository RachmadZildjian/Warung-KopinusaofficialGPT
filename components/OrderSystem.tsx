'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'

// Tipe data untuk item dalam keranjang
interface CartItem {
  id: number
  name: string
  price: number
  quantity: number
  description?: string
}

// Tipe data untuk informasi pelanggan
interface CustomerInfo {
  name: string
  phone: string
  email: string
  address: string
  city: string
  notes: string
}

// Tipe data untuk pesanan
interface OrderData {
  orderId: string
  items: CartItem[]
  total: number
  customer: CustomerInfo
  paymentMethod: string
  paymentStatus: 'pending' | 'paid' | 'expired'
  orderDate: string
}

// Tipe data untuk langkah checkout
type CheckoutStep = 'cart' | 'customer-info' | 'payment' | 'confirmation'

export default function OrderSystem() {
  // State utama
  const [cart, setCart] = useState<CartItem[]>([])
  const [checkoutStep, setCheckoutStep] = useState<CheckoutStep>('cart')
  const [customerInfo, setCustomerInfo] = useState<CustomerInfo>({
    name: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    notes: ''
  })
  const [orderData, setOrderData] = useState<OrderData | null>(null)
  const [paymentMethod, setPaymentMethod] = useState('qris')
  const [copiedOrderId, setCopiedOrderId] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  // orderHistory sebelumnya tidak digunakan -> sekarang dipakai (disimpan/di-load dari localStorage)
  const [orderHistory, setOrderHistory] = useState<OrderData[]>([])
  const [showQrisModal, setShowQrisModal] = useState(false)

  // Daftar menu kopi lengkap dengan deskripsi
  const coffeeMenu = [
    { 
      id: 1, 
      name: 'Kopi Magelang Semar (Robusta)', 
      price: 15000,
      description: 'Aroma kuat dengan cita rasa earthy',
      roast: 'Medium Dark',
      origin: 'Magelang, Jawa Tengah'
    },
    { 
      id: 2, 
      name: 'Kopi Jantan Temanggung (Robusta)', 
      price: 20000,
      description: 'Kopi premium dengan aftertaste panjang',
      roast: 'Dark',
      origin: 'Temanggung, Jawa Tengah'
    },
    { 
      id: 3, 
      name: 'Kopi Flores (Robusta)', 
      price: 18000,
      description: 'Rasa rempah yang unik dan kompleks',
      roast: 'Medium',
      origin: 'Flores, NTT'
    },
    { 
      id: 4, 
      name: 'Kopi Temanggung (Robusta)', 
      price: 22000,
      description: 'Full-bodied dengan nuansa cokelat',
      roast: 'Dark',
      origin: 'Temanggung, Jawa Tengah'
    },
    { 
      id: 5, 
      name: 'Kopi Vietnam', 
      price: 22000,
      description: 'Kopi robusta Vietnam dengan karakteristik khas',
      roast: 'Dark',
      origin: 'Vietnam'
    },
    { 
      id: 6, 
      name: 'Kopi Bali Kintamani', 
      price: 22000,
      description: 'Ringan dengan aroma buah-buahan',
      roast: 'Light Medium',
      origin: 'Bali'
    },
    { 
      id: 7, 
      name: 'Kopi Aceh Gayo (Robusta)', 
      price: 22000,
      description: 'Kopi premium dengan cita rasa seimbang',
      roast: 'Medium',
      origin: 'Aceh'
    },
    { 
      id: 8, 
      name: 'Kopi Medan', 
      price: 22000,
      description: 'Khas Sumatera Utara dengan body yang kuat',
      roast: 'Dark',
      origin: 'Medan, Sumatera Utara'
    },
  ]

  // --- useEffect: load & persist orderHistory agar var tidak "unused" ---
  useEffect(() => {
    try {
      const saved = localStorage.getItem('kopi_order_history')
      if (saved) {
        setOrderHistory(JSON.parse(saved) as OrderData[])
      }
    } catch (e) {
      // ignore parse errors
      console.warn('Failed to load order history', e)
    }
  }, [])

  useEffect(() => {
    try {
      localStorage.setItem('kopi_order_history', JSON.stringify(orderHistory))
    } catch (e) {
      console.warn('Failed to save order history', e)
    }
  }, [orderHistory])

  // Fungsi untuk tambah ke keranjang
  const addToCart = (coffee: typeof coffeeMenu[0]) => {
    setCart(prev => {
      const existing = prev.find(item => item.id === coffee.id)
      if (existing) {
        return prev.map(item => 
          item.id === coffee.id 
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      }
      return [...prev, { 
        id: coffee.id, 
        name: coffee.name, 
        price: coffee.price, 
        quantity: 1,
        description: coffee.description
      }]
    })
  }

  // Fungsi untuk mengurangi jumlah
  const decreaseQuantity = (id: number) => {
    setCart(prev => {
      const item = prev.find(item => item.id === id)
      if (item && item.quantity > 1) {
        return prev.map(item => 
          item.id === id 
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      }
      return prev.filter(item => item.id !== id)
    })
  }

  // Fungsi untuk menghapus dari keranjang
  const removeFromCart = (id: number) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  // Fungsi untuk update informasi pelanggan
  const handleCustomerInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setCustomerInfo(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Fungsi untuk generate order ID
  const generateOrderId = () => {
    const timestamp = Date.now().toString().slice(-6)
    const random = Math.random().toString(36).substr(2, 4).toUpperCase()
    return `KOPI-${timestamp}-${random}`
  }

  // Fungsi untuk proses checkout
  const processCheckout = async () => {
    if (cart.length === 0) {
      alert('Keranjang belanja kosong!')
      return
    }

    // Validasi data pelanggan
    if (!customerInfo.name.trim()) {
      alert('Nama lengkap harus diisi')
      return
    }
    if (!customerInfo.phone.trim() || customerInfo.phone.length < 12) {
      alert('Nomor WhatsApp harus valid')
      return
    }
    if (!customerInfo.email.includes('@')) {
      alert('Email harus valid')
      return
    }
    if (!customerInfo.address.trim()) {
      alert('Alamat pengiriman harus diisi')
      return
    }

    setIsProcessing(true)

    try {
      // Generate order data
      const newOrderId = generateOrderId()
      const newOrder: OrderData = {
        orderId: newOrderId,
        items: [...cart],
        total: grandTotal,
        customer: { ...customerInfo },
        paymentMethod: paymentMethod,
        paymentStatus: 'pending',
        orderDate: new Date().toISOString()
      }

      setOrderData(newOrder)
      // gunakan orderHistory (sebelumnya warning unused)
      setOrderHistory(prev => [newOrder, ...prev])
      setCheckoutStep('payment')
      
      setTimeout(() => {
        setIsProcessing(false)
      }, 1500)

    } catch (error) {
      console.error('Checkout error:', error)
      alert('Terjadi kesalahan saat memproses pesanan')
      setIsProcessing(false)
    }
  }

  // Fungsi untuk konfirmasi pembayaran
  const confirmPayment = () => {
    setIsProcessing(true)
    
    setTimeout(() => {
      if (orderData) {
        setOrderData({
          ...orderData,
          paymentStatus: 'paid'
        })
        setCheckoutStep('confirmation')
        setIsProcessing(false)
      }
    }, 2000)
  }

  // Fungsi untuk copy order ID
  const copyOrderId = () => {
    if (orderData) {
      navigator.clipboard.writeText(orderData.orderId)
      setCopiedOrderId(true)
      setTimeout(() => setCopiedOrderId(false), 2000)
    }
  }

  // Fungsi untuk generate WhatsApp message
  const generateWhatsAppMessage = () => {
    if (!orderData) return ''
    
    const itemsText = orderData.items.map(item => 
      `• ${item.name} x${item.quantity}: Rp ${(item.price * item.quantity).toLocaleString()}`
    ).join('\n')
    
    return `Halo Warung KopiNusaOfficialGPT! 🎉

Saya ingin konfirmasi pembayaran untuk pesanan:

📋 Order ID: ${orderData.orderId}
👤 Nama: ${orderData.customer.name}
📞 Telepon: ${orderData.customer.phone}
📍 Alamat: ${orderData.customer.address}, ${orderData.customer.city}

🛒 Detail Pesanan:
${itemsText}

💰 Total Pembayaran: Rp ${orderData.total.toLocaleString()}
💳 Metode Pembayaran: ${orderData.paymentMethod.toUpperCase()}
📅 Tanggal: ${new Date(orderData.orderDate).toLocaleDateString('id-ID')}

Saya sudah melakukan pembayaran via ${orderData.paymentMethod}. Mohon konfirmasi penerimaan dan proses pengirimannya.

Terima kasih! ☕`
  }

  // Fungsi untuk kirim via WhatsApp
  const sendViaWhatsApp = () => {
    if (!orderData) return
    
    const message = generateWhatsAppMessage()
    const phoneNumber = '6287890901299' // 
    const encodedMessage = encodeURIComponent(message)
    const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodedMessage}`
    
    window.open(whatsappUrl, '_blank')
  }

  // Fungsi untuk print receipt
  const printReceipt = () => {
    window.print()
  }

  // Fungsi untuk mulai pesanan baru
  const startNewOrder = () => {
    setCart([])
    setCustomerInfo({
      name: '',
      phone: '',
      email: '',
      address: '',
      city: '',
      notes: ''
    })
    setOrderData(null)
    setCheckoutStep('cart')
  }

  // Hitung total
  const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0)
  const tax = Math.round(subtotal * 0.11)
  const shippingFee = subtotal > 100000 ? 0 : 15000
  const grandTotal = subtotal + tax + shippingFee

  // Payment methods
  const paymentMethods = [
    { id: 'gopay', name: 'GoPay', icon: '💜', description: 'Transfer via GoPay' },
    { id: 'dana', name: 'DANA', icon: '💚', description: 'Transfer via DANA' },
  ]

  // QRIS Modal Component
  const QrisModal = () => {
    if (!showQrisModal) return null

    return (
      <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl max-w-md w-full p-6">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-bold text-gray-800">QRIS Pembayaran</h3>
            <button 
              onClick={() => setShowQrisModal(false)}
              className="text-gray-500 hover:text-gray-700 text-2xl"
              aria-label="Tutup QRIS"
            >
              &times;
            </button>
          </div>
          
          <div className="text-center">
            {/* Ganti <img> -> <Image /> */}
            <div className="mx-auto mb-4 w-64 h-64 relative">
              <Image
                src="/qris-gopay.png"
                alt="QRIS Payment Code"
                width={256}
                height={256}
                className="border-2 border-gray-300 rounded-lg object-contain"
              />
            </div>

            <p className="text-gray-800 font-bold text-xl mb-2">Rp {grandTotal.toLocaleString()}</p>
            <p className="text-gray-600 mb-4">Scan QR Code di atas untuk membayar</p>
            
            <div className="grid grid-cols-2 gap-2 mb-6">
              <div className="bg-gray-100 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Order ID</p>
                <p className="font-semibold">{orderData?.orderId}</p>
              </div>
              <div className="bg-gray-100 p-3 rounded-lg">
                <p className="text-sm text-gray-600">Nama</p>
                <p className="font-semibold">{orderData?.customer.name}</p>
              </div>
            </div>
            
            <button
              onClick={() => setShowQrisModal(false)}
              className="w-full bg-amber-600 text-white py-3 rounded-lg font-semibold hover:bg-amber-700"
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    )
  }

  // Render cart step
  const renderCartStep = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-amber-700 to-amber-900 rounded-2xl p-8 text-white">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            ☕ Warung KopiNusaOfficialGPT
          </h1>
          <p className="text-xl text-amber-100 mb-6">
            Pesan Kopi Premium Asli Indonesia • Pembayaran QRIS • Kirim Bukti via WhatsApp
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-xl">🛡️</span>
              <span className="text-sm">Pembayaran Aman</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">📦</span>
              <span className="text-sm">Gratis Ongkir Rp100k</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xl">⏰</span>
              <span className="text-sm">Proses 24 Jam</span>
            </div>
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Menu Section */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-2xl shadow-xl p-6">
            <div className="flex items-center justify-between mb-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">Menu Kopi Premium</h2>
                <p className="text-gray-600">Pilih kopi favorit Anda</p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-500">Items in Cart</div>
                <div className="text-2xl font-bold text-amber-700">{cart.length}</div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {coffeeMenu.map((coffee) => {
                const cartItem = cart.find(item => item.id === coffee.id)
                return (
                  <div key={coffee.id} className="group bg-gradient-to-br from-white to-amber-50 border border-amber-200 rounded-xl p-5 hover:shadow-lg transition-all">
                    <div className="flex justify-between items-start mb-3">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className="text-xs font-medium bg-amber-100 text-amber-800 px-2 py-1 rounded">
                            {coffee.origin}
                          </span>
                          <span className="text-xs text-gray-500">{coffee.roast}</span>
                        </div>
                        <h3 className="font-bold text-gray-800 text-lg">{coffee.name}</h3>
                        <p className="text-gray-600 text-sm mt-1">{coffee.description}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      <div className="text-amber-700 font-bold text-xl">
                        Rp {coffee.price.toLocaleString()}
                      </div>
                      
                      <div className="flex items-center gap-3">
                        {cartItem ? (
                          <>
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => decreaseQuantity(coffee.id)}
                                className="w-8 h-8 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
                              >
                                <span className="text-gray-700 text-lg">−</span>
                              </button>
                              <span className="font-bold min-w-[20px] text-center">{cartItem.quantity}</span>
                              <button
                                onClick={() => addToCart(coffee)}
                                className="w-8 h-8 flex items-center justify-center bg-amber-600 text-white rounded-full hover:bg-amber-700"
                              >
                                <span className="font-bold text-lg">+</span>
                              </button>
                            </div>
                          </>
                        ) : (
                          <button
                            onClick={() => addToCart(coffee)}
                            className="px-5 py-2 bg-gradient-to-r from-amber-600 to-amber-700 text-white rounded-lg hover:from-amber-700 hover:to-amber-800 transition-all font-medium"
                          >
                            + Tambah
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>

        {/* Cart Summary */}
        <div className="lg:col-span-1">
          <div className="sticky top-6">
            <div className="bg-white rounded-2xl shadow-xl p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Ringkasan Pesanan</h2>
              
              {cart.length === 0 ? (
                <div className="text-center py-8">
                  <div className="text-gray-400 text-6xl mb-4">🛒</div>
                  <p className="text-gray-500 text-lg">Keranjang belanja kosong</p>
                  <p className="text-gray-400 text-sm mt-2">Tambahkan kopi favorit Anda</p>
                </div>
              ) : (
                <>
                  {/* Cart Items */}
                  <div className="space-y-4 max-h-80 overflow-y-auto pr-2">
                    {cart.map(item => (
                      <div key={item.id} className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white border border-gray-200 rounded-xl">
                        <div className="flex-grow">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-medium text-gray-800">{item.name}</p>
                              <div className="flex items-center gap-4 mt-2">
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => decreaseQuantity(item.id)}
                                    className="w-7 h-7 flex items-center justify-center bg-gray-200 rounded-full hover:bg-gray-300"
                                  >
                                    <span className="text-gray-700 text-lg">−</span>
                                  </button>
                                  <span className="font-bold min-w-[20px] text-center">{item.quantity}</span>
                                  <button
                                    onClick={() => addToCart(coffeeMenu.find(c => c.id === item.id)!)}
                                    className="w-7 h-7 flex items-center justify-center bg-amber-100 text-amber-700 rounded-full hover:bg-amber-200"
                                  >
                                    <span className="font-bold text-lg">+</span>
                                  </button>
                                </div>
                                <button
                                  onClick={() => removeFromCart(item.id)}
                                  className="text-red-500 hover:text-red-700 text-sm"
                                >
                                  Hapus
                                </button>
                              </div>
                            </div>
                            <div className="text-right">
                              <p className="text-amber-700 font-bold">Rp {(item.price * item.quantity).toLocaleString()}</p>
                              <p className="text-gray-500 text-sm">Rp {item.price.toLocaleString()} × {item.quantity}</p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Order Summary */}
                  <div className="border-t pt-6 mt-6 space-y-3">
                    <div className="flex justify-between text-gray-600">
                      <span>Subtotal</span>
                      <span>Rp {subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>PPN 11%</span>
                      <span>Rp {tax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-gray-600">
                      <span>Biaya Pengiriman</span>
                      <span className={shippingFee === 0 ? 'text-green-600 font-medium' : ''}>
                        {shippingFee === 0 ? 'Gratis' : `Rp ${shippingFee.toLocaleString()}`}
                      </span>
                    </div>
                    
                    {shippingFee === 0 && subtotal > 0 && (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-3">
                        <p className="text-green-700 text-sm text-center">
                          🎉 Anda mendapat gratis ongkir! (Pembelian di atas Rp 100.000)
                        </p>
                      </div>
                    )}

                    <div className="flex justify-between font-bold text-xl text-gray-800 pt-4 border-t">
                      <span>Total Pembayaran</span>
                      <span className="text-amber-700">Rp {grandTotal.toLocaleString()}</span>
                    </div>
                  </div>

                  {/* Checkout Button */}
                  <button
                    onClick={() => setCheckoutStep('customer-info')}
                    disabled={cart.length === 0}
                    className="w-full mt-8 bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                  >
                    Lanjut ke Checkout
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // Render customer info step
  const renderCustomerInfoStep = () => (
    <div className="max-w-3xl mx-auto">
      <div className="bg-white text-black rounded-2xl shadow-xl p-8">
        <div className="flex items-center mb-8">
          <button
            onClick={() => setCheckoutStep('cart')}
            className="flex items-center gap-2 text-amber-600 hover:text-amber-800 mr-6"
          >
            <span className="text-xl">←</span>
            <span>Kembali ke Keranjang</span>
          </button>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Informasi Pengiriman</h2>
            <p className="text-gray-600">Isi data lengkap untuk pengiriman</p>
          </div>
        </div>

        <form className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <span className="text-red-500">*</span> Nama Lengkap
              </label>
              <input
                type="text"
                name="name"
                value={customerInfo.name}
                onChange={handleCustomerInfoChange}
                className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all"
                required
                placeholder="Masukkan nama lengkap"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <span className="text-red-500">*</span> Nomor WhatsApp
              </label>
              <input
                type="tel"
                name="phone"
                value={customerInfo.phone}
                onChange={handleCustomerInfoChange}
                className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all"
                required
                placeholder="Contoh: 081234567890"
              />
              <p className="text-xs text-gray-500 mt-2">Untuk konfirmasi via WhatsApp</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <span className="text-red-500">*</span> Email
              </label>
              <input
                type="email"
                name="email"
                value={customerInfo.email}
                onChange={handleCustomerInfoChange}
                className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all"
                required
                placeholder="email@contoh.com"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <span className="text-red-500">*</span> Kota
              </label>
              <input
                type="text"
                name="city"
                value={customerInfo.city}
                onChange={handleCustomerInfoChange}
                className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all"
                required
                placeholder="Kota Anda"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                <span className="text-red-500">*</span> Alamat Lengkap
              </label>
              <textarea
                name="address"
                value={customerInfo.address}
                onChange={handleCustomerInfoChange}
                rows={3}
                className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all"
                required
                placeholder="Jalan, Nomor Rumah, RT/RW, Kecamatan"
              />
            </div>

            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Catatan Pengiriman (Opsional)
              </label>
              <textarea
                name="notes"
                value={customerInfo.notes}
                onChange={handleCustomerInfoChange}
                rows={2}
                className="w-full p-4 border-2 border-gray-300 rounded-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-200 transition-all"
                placeholder="Contoh: Pagar hitam, antar sebelum jam 3 sore, dll."
              />
            </div>
          </div>

          {/* Order Summary */}
          <div className="bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-6">
            <h3 className="font-bold text-gray-800 mb-4">Ringkasan Pesanan</h3>
            <div className="space-y-3">
              {cart.map(item => (
                <div key={item.id} className="flex justify-between">
                  <span className="text-gray-600">{item.name} × {item.quantity}</span>
                  <span className="font-medium">Rp {(item.price * item.quantity).toLocaleString()}</span>
                </div>
              ))}
              <div className="border-t pt-3">
                <div className="flex justify-between font-bold text-lg">
                  <span>Total Pembayaran</span>
                  <span className="text-amber-700">Rp {grandTotal.toLocaleString()}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <button
            type="button"
            onClick={processCheckout}
            disabled={isProcessing}
            className="w-full bg-gradient-to-r from-amber-600 to-amber-700 text-white py-4 rounded-xl font-bold hover:from-amber-700 hover:to-amber-800 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg"
          >
            {isProcessing ? (
              <div className="flex items-center justify-center">
                <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                Membuat Pesanan...
              </div>
            ) : (
              'Buat Pesanan & Lanjut ke Pembayaran'
            )}
          </button>
        </form>
      </div>
    </div>
  )

  // Render payment step
  const renderPaymentStep = () => {
    return (
    <div className="max-w-4xl mx-auto">
      <div className="bg-white text-black rounded-2xl shadow-xl p-8">
        <div className="flex items-center mb-8">
          <button
            onClick={() => setCheckoutStep('customer-info')}
            className="flex items-center gap-2 text-amber-600 hover:text-amber-800 mr-6"
          >
            <span className="text-xl">←</span>
            <span>Kembali</span>
          </button>
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Pembayaran</h2>
            <p className="text-gray-600">Pilih metode pembayaran dan selesaikan transaksi</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* Order Details */}
          <div>
            <div className="bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-6 mb-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <p className="text-sm text-gray-600">Order ID</p>
                  <div className="flex items-center gap-2 mt-1">
                    <p className="font-bold text-gray-800 text-lg">{orderData?.orderId}</p>
                    <button
                      onClick={copyOrderId}
                      className="p-1 hover:bg-amber-200 rounded"
                      title="Salin Order ID"
                    >
                      {copiedOrderId ? (
                        <span className="text-green-600 text-lg">✓</span>
                      ) : (
                        <span className="text-gray-500 text-lg">📋</span>
                      )}
                    </button>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600">Total Pembayaran</p>
                  <p className="text-amber-700 font-bold text-2xl">Rp {grandTotal.toLocaleString()}</p>
                </div>
              </div>
              
              <div className="border-t pt-4">
                <div className="space-y-2">
                  <div className="flex justify-between">
                    <span className="text-gray-600">Nama</span>
                    <span className="font-medium">{orderData?.customer.name}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Telepon</span>
                    <span className="font-medium">{orderData?.customer.phone}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">Status</span>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                      Menunggu Pembayaran
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Methods */}
            <div>
              <h3 className="font-bold text-gray-800 mb-4">Pilih Metode Pembayaran</h3>
              <div className="space-y-3">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    onClick={() => setPaymentMethod(method.id)}
                    className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                      paymentMethod === method.id
                        ? 'border-amber-500 bg-amber-50'
                        : 'border-gray-200 hover:border-amber-300'
                    }`}
                  >
                    <div className="flex items-center gap-4">
                      <div className="text-2xl">{method.icon}</div>
                      <div className="flex-grow">
                        <div className="flex items-center justify-between">
                          <span className="font-medium">{method.name}</span>
                          {paymentMethod === method.id && (
                            <span className="text-xs px-2 py-1 bg-amber-100 text-amber-800 rounded-full">
                              ✓ Dipilih
                            </span>
                          )}
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{method.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Instructions */}
            <div className="mt-6 p-4 bg-blue-50 border border-blue-200 rounded-xl">
              <h4 className="font-medium text-blue-800 mb-2">Instruksi Pembayaran:</h4>
              <ol className="text-sm text-blue-700 space-y-1">
                <li>1. Pilih metode pembayaran di atas</li>
                <li>2. Lakukan pembayaran sesuai metode yang dipilih</li>
                <li>3. Simpan bukti pembayaran (screenshot)</li>
                <li>4. Klik &quot;Konfirmasi Pembayaran&quot; setelah membayar</li>
              </ol>
            </div>
          </div>

          {/* QRIS Section */}
          <div>
            <div className="bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl p-8 text-white">
              <div className="text-center mb-6">
                <h3 className="text-xl font-bold mb-2">Scan QR Code untuk Bayar</h3>
                <p className="text-gray-300">Gunakan aplikasi e-wallet atau mobile banking</p>
              </div>
              
              {/* QR Code Static Image */}
              <div className="bg-white p-6 rounded-2xl mb-6">
                <div className="flex justify-center">
                  <div className="w-64 h-64 relative">
                    <Image
                      src="/Qrcode-Gopay.png"
                      alt="QR Code Pembayaran"
                      width={256}
                      height={256}
                      className="object-contain"
                    />
                  </div>
                </div>
                <div className="text-center mt-4">
                  <p className="text-gray-800 font-bold text-xl">Rp {grandTotal.toLocaleString()}</p>
                  <p className="text-gray-600 text-sm mt-1">Scan untuk membayar</p>
                </div>
              </div>

              {/* View QRIS Button */}
              <div className="text-center">
                <button
                  onClick={() => setShowQrisModal(true)}
                  className="px-6 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
                >
                  🔍 Lihat QRIS Lebih Besar
                </button>
              </div>
              
              {/* Supported Apps */}
              <div className="text-center mt-6">
                <p className="text-gray-300 mb-4">Didukung oleh:</p>
                <div className="flex flex-wrap justify-center gap-3">
                  {['Gopay','DANA'].map((app) => (
                    <div key={app} className="bg-gray-700/50 px-3 py-2 rounded-lg">
                      <span className="text-sm">{app}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Payment Actions */}
            <div className="mt-6 space-y-3">
              <button
                onClick={confirmPayment}
                disabled={isProcessing}
                className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 rounded-xl font-bold hover:from-green-700 hover:to-emerald-700 transition-all disabled:opacity-50 disabled:cursor-not-allowed text-lg"
              >
                {isProcessing ? (
                  <div className="flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin mr-3"></div>
                    Memproses...
                  </div>
                ) : (
                  'Konfirmasi Pembayaran'
                )}
              </button>
              
              <div className="text-center">
                <p className="text-sm text-gray-500">
                  Setelah pembayaran, kirim bukti via WhatsApp untuk konfirmasi
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    )
  }

  // Render confirmation step
  const renderConfirmationStep = () => (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-2xl shadow-xl p-8">
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
            <span className="text-4xl text-green-600">✅</span>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-3">Pembayaran Berhasil!</h2>
          <p className="text-gray-600 text-lg">
            Terima kasih atas pesanan Anda. Silakan kirim bukti screenshot dan nomor order ID pesanan Anda untuk konfirmasi.
          </p>
        </div>

        <div className="bg-gradient-to-r from-amber-50 to-amber-100 border border-amber-200 rounded-xl p-6 mb-8">
          <div className="text-center mb-4">
            <p className="text-sm text-gray-600">Order ID</p>
            <div className="flex items-center justify-center gap-2 mt-1">
              <p className="font-bold text-gray-800 text-xl">{orderData?.orderId}</p>
              <button
                onClick={copyOrderId}
                className="p-1 hover:bg-amber-200 rounded"
                title="Salin Order ID"
              >
                {copiedOrderId ? (
                  <span className="text-green-600 text-lg">✓</span>
                ) : (
                  <span className="text-gray-500 text-lg">📋</span>
                )}
              </button>
            </div>
          </div>
          
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 bg-white/50 rounded-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-amber-100 rounded-full flex items-center justify-center">
                  <span className="text-amber-700 text-xl">💰</span>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Pembayaran</p>
                  <p className="font-bold text-amber-700 text-lg">Rp {orderData?.total.toLocaleString()}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-600">Status</p>
                <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                  Terbayar
                </span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-3 bg-white/50 text-black rounded-lg">
                <p className="text-sm text-gray-600">Metode</p>
                <p className="font-medium">{orderData?.paymentMethod.toUpperCase()}</p>
              </div>
              <div className="p-3 bg-white/50 text-black rounded-lg">
                <p className="text-sm text-gray-600">Tanggal</p>
                <p className="font-medium">
                  {orderData ? new Date(orderData.orderDate).toLocaleDateString('id-ID') : ''}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-4">
          <button
            onClick={sendViaWhatsApp}
            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 text-white py-4 rounded-xl font-bold hover:from-green-600 hover:to-emerald-700 transition-all"
          >
            <span className="text-xl">💬</span>
            Kirim Bukti via WhatsApp
          </button>
          <button
            onClick={printReceipt}
            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-gray-600 to-gray-700 text-white py-4 rounded-xl font-bold hover:from-gray-700 hover:to-gray-800 transition-all"
          >
            <span className="text-xl">🖨️</span>
            Cetak Receipt
          </button>
          
          <button
            onClick={startNewOrder}
            className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-amber-500 to-amber-600 text-white py-4 rounded-xl font-bold hover:from-amber-600 hover:to-amber-700 transition-all"
          >
            <span className="text-xl">☕</span>
            Pesan Lagi
          </button>
        </div>

        <div className="mt-8 pt-6 border-t">
          <div className="flex items-center justify-center gap-2 text-gray-600">
            <span className="text-xl">📞</span>
            <span className="text-sm">Butuh bantuan? Hubungi: 0877-6201-0605</span>
          </div>
        </div>
      </div>
    </div>
  )

  // Progress indicator
  const renderProgressIndicator = () => {
    const steps = [
      { key: 'cart', label: 'Keranjang' },
      { key: 'customer-info', label: 'Data Diri' },
      { key: 'payment', label: 'Pembayaran' },
      { key: 'confirmation', label: 'Selesai' }
    ]
    
    const currentIndex = steps.findIndex(step => step.key === checkoutStep)
    
    return (
      <div className="mb-8">
        <div className="flex justify-between relative max-w-3xl mx-auto">
          <div className="absolute top-4 left-0 right-0 h-1.5 bg-gray-200 -z-10 rounded-full"></div>
          <div 
            className="absolute top-4 left-0 h-1.5 bg-gradient-to-r from-amber-500 to-amber-600 -z-10 rounded-full transition-all duration-500"
            style={{ width: `${(currentIndex / (steps.length - 1)) * 100}%` }}
          ></div>
          
          {steps.map((step, index) => (
            <div key={step.key} className="flex flex-col items-center">
              <div className={`w-9 h-9 rounded-full flex items-center justify-center mb-2 border-2 transition-all ${
                index <= currentIndex 
                  ? 'bg-gradient-to-br from-amber-500 to-amber-600 text-white border-amber-600 shadow-lg' 
                  : 'bg-white text-gray-400 border-gray-300'
              }`}>
                {index < currentIndex ? '✓' : index + 1}
              </div>
              <span className={`text-sm font-medium ${
                index <= currentIndex ? 'text-amber-700' : 'text-gray-500'
              }`}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-white to-amber-25">
      <QrisModal />
      
      <div className="max-w-7xl mx-auto px-4 py-8">
        {/* Header */}
        {checkoutStep === 'cart' && (
          <header className="mb-8 text-center">
            <div className="inline-block bg-gradient-to-r from-amber-600 to-amber-800 text-white px-8 py-3 rounded-full mb-4 shadow-lg">
              <h1 className="text-3xl md:text-4xl font-bold">
                ☕ Warung KopiNusaOfficialGPT
              </h1>
            </div>
            <p className="text-gray-600 text-lg max-w-3xl mx-auto">
              Sistem Pemesanan Kopi Premium • Pembayaran QRIS • Konfirmasi via WhatsApp
            </p>
          </header>
        )}

        {/* Progress Indicator (jika bukan di cart) */}
        {checkoutStep !== 'cart' && renderProgressIndicator()}

        {/* Main Content */}
        <main>
          {checkoutStep === 'cart' && renderCartStep()}
          {checkoutStep === 'customer-info' && renderCustomerInfoStep()}
          {checkoutStep === 'payment' && renderPaymentStep()}
          {checkoutStep === 'confirmation' && renderConfirmationStep()}
        </main>

        {/* Footer */}
        <footer className="mt-12 pt-8 border-t border-amber-200">
          <div className="text-center">
            <div className="flex flex-wrap justify-center gap-6 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-green-600">🛡️</span>
                <span className="text-sm text-gray-600">Pembayaran Aman</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-blue-600">📦</span>
                <span className="text-sm text-gray-600">Gratis Ongkir Rp100k</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-amber-600">⏰</span>
                <span className="text-sm text-gray-600">Support 24/7</span>
              </div>
            </div>
            <p className="text-gray-500 text-sm">
              © 2024 Warung KopiNusaOfficialGPT • WhatsApp: 0877-6201-0605
            </p>
          </div>
        </footer>
      </div>
    </div>
  )
}
