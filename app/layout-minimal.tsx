import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Kleaners - Professional Cleaning Services',
  description: 'Professional cleaning services for homes and offices.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <div className="min-h-screen">
          <h1>Minimal Layout Test</h1>
          {children}
        </div>
      </body>
    </html>
  )
}
