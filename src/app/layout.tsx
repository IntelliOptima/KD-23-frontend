import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'KinoXP',
  description: 'KinoXP - The best cinema in the world, with only the best movies.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <header>
          {/* TODO --- Creater navbar for instance */}
        </header>
        <main>
          {children}
        </main>
        <footer>
          {/* TODO --- Create footer section for instance */}
        </footer>
        </body>
    </html>
  )
}
