import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

export const metadata = {
  title: 'Warung KopiNusaOfficialGPT',
  description: 'Website AI-Powered Coffee Shop',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="id">
      <body className="bg-amber-50">
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  )
}