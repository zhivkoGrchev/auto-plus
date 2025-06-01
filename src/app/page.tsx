import Link from 'next/link'
import { useTranslations } from 'next-intl'

export default function HomePage() {
  const t = useTranslations('HomePage');

  return (
    <div className="bg-image text-cyan-50 flex flex-col items-center grow basis-full min-h-screen pt-50">
      <div className="mb-2 text-4xl font-bold">{t('title')}</div>
        <div className="mb-10 text-xl">{t('description')}</div>
      <Link
        href="/demo"
        className="ml-12 bg-cyan-600 text-cyan-50 px-4 py-1 rounded-md font-medium hover:bg-cyan-400 transition-colors"
      >
        {t('startDemo')}
      </Link>
    </div>
  )
}
