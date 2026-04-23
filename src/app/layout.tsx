import type { Metadata, Viewport } from 'next'
import { Nunito_Sans } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getLocale, getTranslations } from 'next-intl/server'
import { ThemeProvider } from 'next-themes'
import { Toaster } from '@/components/ui/sonner'
import { defaultTheme } from '@/config/theme'
import { APP_NAME } from '@/constants'
import './globals.css'

const fontNunitoSans = Nunito_Sans({
  variable: '--font-nunito-sans',
  subsets: ['latin'],
})

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

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

export default async function RootLayout({ children }: AppLayoutProps) {
  const locale = await getLocale()

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${fontNunitoSans.variable} min-h-screen flex flex-col antialiased overflow-x-hidden`}>
        <ThemeProvider attribute="class" defaultTheme={defaultTheme} enableSystem disableTransitionOnChange>
          <NextIntlClientProvider>
            {children}
            <Toaster />
          </NextIntlClientProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
