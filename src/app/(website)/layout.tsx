import { useTranslations } from 'next-intl'
import { WebsiteHeader } from './header'
import { WebsiteFooter } from './footer'
import { WhatsAppButton } from './whatsapp'

export default function RootLayout({ children }: LayoutProps) {
  const t = useTranslations('WebsiteHomePage')
  return (
    <div className="mx-auto w-screen flex flex-col antialiased">
      <WebsiteHeader />
      <section id="home" className="py-16 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold mb-4">{t('Title')}</h2>
          <p className="text-lg text-gray-600">{t('Description')}</p>
        </div>
      </section>
      {children}
      <WebsiteFooter />
      <WhatsAppButton />
    </div>
  )
}
