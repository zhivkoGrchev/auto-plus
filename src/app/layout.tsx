import type { Metadata } from 'next'
import { Nunito_Sans } from 'next/font/google'
import './globals.css'

const fontNunitoSans = Nunito_Sans({
  variable: '--font-nunito-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'auto-plus.de',
  description: 'This is the best place for your Cars',
}

export default function RootLayout({ children }: LayoutProps) {
  return (
    <html lang="en">
      <body className={`${fontNunitoSans.variable} min-h-screen flex flex-col antialiased`}>{children}</body>
    </html>
  )
}
