import { APP_NAME } from '@/types/global-constants'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { FaFacebook, FaTwitter, FaLinkedin, FaPhone, FaEnvelope } from 'react-icons/fa'

export const Footer = () => {
  const t = useTranslations('Footer')

  return (
    <footer className="bg-cyan-700 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">{APP_NAME}</h3>
            <p className="mb-4">{t('companyDescription')}</p>
            <div className="flex space-x-4">
              {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
              <a href="#" className="hover:text-blue-400">
                <FaFacebook size={20} />
              </a>
              {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
              <a href="#" className="hover:text-blue-400">
                <FaTwitter size={20} />
              </a>
              {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
              <a href="#" className="hover:text-blue-400">
                <FaLinkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('quickLinks')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/features" className="hover:text-blue-400">
                  {t('features')}
                </Link>
              </li>
              <li>
                <Link href="/pricing" className="hover:text-blue-400">
                  {t('pricing')}
                </Link>
              </li>
              <li>
                <Link href="/case-studies" className="hover:text-blue-400">
                  {t('caseStudies')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('support')}</h4>
            <ul className="space-y-2">
              <li>
                <Link href="/faq" className="hover:text-blue-400">
                  {t('faq')}
                </Link>
              </li>
              <li>
                <Link href="/privacy" className="hover:text-blue-400">
                  {t('privacyPolicy')}
                </Link>
              </li>
              <li>
                <Link href="/terms" className="hover:text-blue-400">
                  {t('termsOfService')}
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4">{t('contact')}</h4>
            <div className="space-y-2">
              <div className="flex items-center">
                <FaPhone className="mr-2" />
                <span>{t('phoneNumber')}</span>
              </div>
              <div className="flex items-center">
                <FaEnvelope className="mr-2" />
                <a href="mailto:support@auto-plus.de" className="hover:text-blue-400">
                  {t('email')}
                </a>
              </div>
            </div>
            <div className="mt-4 p-3 bg-gray-800 rounded-lg">
              <p className="text-sm">
                <strong>{t('cloudHosted')}:</strong> {t('cloudDescription')}
              </p>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 mt-8 pt-8 text-center text-sm text-gray-400">
          <p>
            © {new Date().getFullYear()} {APP_NAME}. {t('allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  )
}
