import Navbar from '@/components/Globals/Navbar/Navbar'
import Footer from '@/components/Globals/Footer/Footer'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Browse KinoXP',
  description: 'Browse KinoXP - An online cinema with only the best movies.',
}

export default function UserLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <>
      <header>
        <Navbar />
      </header>
      <main>
        {children}
      </main>
      <Footer />
    </>
  )
}
