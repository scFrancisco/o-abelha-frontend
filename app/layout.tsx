import './globals.css'
import { Inter } from 'next/font/google'
import Navbar from '@/components/Navbar'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

export const metadata = {
  title: 'CRC O Abelha',
  description: 'Clube Recreativo e Cultural de Colmeias, Leiria',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt" className={inter.variable}>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  )
}
