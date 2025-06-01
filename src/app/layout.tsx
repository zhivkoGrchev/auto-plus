import { APP_NAME } from '@/types/global-constants'
import type { Metadata } from 'next'
import { Nunito_Sans } from 'next/font/google'
import { Header } from '@/components/layouts/header'
import { Navbar } from '@/components/layouts/navbar'
import { Footer } from '@/components/layouts/footer'
import { NextIntlClientProvider } from 'next-intl';
import { getLocale } from 'next-intl/server';
import './globals.css'

const fontNunitoSans = Nunito_Sans({
  variable: '--font-nunito-sans',
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: {
    template: `%s | ${APP_NAME}`,
    default: APP_NAME,
  },
  description: 'This is the best place for your Cars',
}

export default async function RootLayout({ children }: LayoutProps) {
  const locale = await getLocale();

  return (
    <html lang={locale}>
      <body
        className={`${fontNunitoSans.variable} min-h-screen flex flex-col antialiased`}
      >
        <NextIntlClientProvider>
          <Header>
            <Navbar />
          </Header>
          <main className="flex grow">{children}</main>
          <Footer />
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
