import { useTranslations } from 'next-intl'

export const WebsiteFooter = () => {
  const t = useTranslations('WebsiteFooter')

  return (
    <footer className="w-full bg-cyan-800 text-white mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-3">{t('CompanyName')}</h3>
          <p className="text-cyan-100/90">{t('CompanyDescription')}</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-3">{t('Links')}</h3>
          <ul className="space-y-2">
            <li>
              <a href="#home" className="hover:text-cyan-300 transition">
                {t('Impressum')}
              </a>
            </li>
            <li>
              <a href="#cars" className="hover:text-cyan-300 transition">
                {t('PrivacyPolicy')}
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-3">{t('Contact')}</h3>
          <p className="text-cyan-100/90">{t('Address')}</p>
          <p className="text-cyan-100/90">{t('Phone')}</p>
          <p className="text-cyan-100/90">{t('Email')}</p>
        </div>
      </div>
      <div className="bg-cyan-900 py-4 text-center text-cyan-100 text-sm">© {new Date().getFullYear()} Autohaus Plus. All rights reserved.</div>
    </footer>
  )
}
