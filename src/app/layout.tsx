import { APP_NAME } from '@/lib/constants'
import type { Metadata } from 'next'
import { Nunito_Sans } from 'next/font/google'
import { ThemeProvider } from 'next-themes'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getTranslations } from 'next-intl/server'
import { Toaster } from '@/components/ui/sonner'
import './globals.css'

const fontNunitoSans = Nunito_Sans({
  variable: '--font-nunito-sans',
  subsets: ['latin'],
})

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations('Metadata')

  return {
    title: {
      template: `%s | ${APP_NAME}`,
      default: APP_NAME,
    },
    description: t('description'),
  }
}

export default async function RootLayout({ children }: LayoutProps) {
  const locale = await getLocale()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${fontNunitoSans.variable} min-h-screen flex flex-col antialiased`}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <NextIntlClientProvider>
            {children}
            <Toaster />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
