import type { Metadata } from 'next'
import { Nunito_Sans } from 'next/font/google'
import { Header } from '@/components/layouts/header'
import { Navbar } from '@/components/layouts/navbar'
import { Footer } from '@/components/layouts/footer'
import './globals.css'
<<<<<<< HEAD
=======
import Navbar from '@/components/Navbar'
import Footer from '@/components/Footer'
>>>>>>> dev

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
      <body className={`${fontNunitoSans.variable} min-h-screen flex flex-col antialiased`}>
        <Header>
          <Navbar />
        </Header>
        <main className="flex grow">{children}</main>
        <Footer />
      </body>
      <Footer />
    </html>
  )
}
