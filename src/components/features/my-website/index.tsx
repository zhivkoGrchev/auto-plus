import { useTranslations } from 'next-intl'
export const WebsiteAdmin = () => {
  const t = useTranslations('MyWebsite')
  return (
    <div className="mt-10">
      <p className="text-center text-lg font-semibold mb-4">
        <a className="cursor-pointer" href="http://localhost:3000/website" target="_blank" rel="noopener noreferrer">
          {t('openWebsite')}
        </a>
      </p>
      <p className="text-center">{t('developerMode')}</p>
    </div>
  )
}
