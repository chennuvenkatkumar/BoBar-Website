import type { Metadata } from 'next'
import { Nunito } from 'next/font/google'
import './globals.css'
import Nav from '@/components/layout/Nav'
import Footer from '@/components/layout/Footer'
import BubbleBackground from '@/components/effects/BubbleBackground'
import BobaParticles from '@/components/effects/BobaParticles'

const nunito = Nunito({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  variable: '--font-nunito',
  display: 'swap',
})

export const metadata: Metadata = {
  title: "BoBar — Halifax's Favourite Bubble Tea",
  description:
    'Handcrafted bubble teas made with love, real ingredients, and way too many pearls. Find us at 6082 Quinpool Road, Halifax.',
  keywords: ['bubble tea', 'boba', 'Halifax', 'Quinpool', 'milk tea', 'BoBar'],
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={nunito.variable}>
      <body className="font-nunito bg-cream text-brown min-h-screen overflow-x-hidden">
        <BubbleBackground />
        <BobaParticles />
        <Nav />
        <main className="relative z-10">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
