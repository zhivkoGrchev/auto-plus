import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import heroImg from '/public/images/bg-image.jpg'

export default function Hero() {
  const t = useTranslations('Hero')

  return (
    <div className="relative text-cyan-50 flex flex-col items-center justify-center h-screen w-full">
      <div className="absolute -z-10 inset-0">
        <Image src={heroImg} alt={t('imgAlt')} fill style={{ objectFit: 'cover' }} />
      </div>
      <div className="absolute inset-0" />
      <div className="text-center px-4 z-10 mb-auto pt-30">
        <h1 className="text-cyan-50 text-4xl">{t('title')}</h1>
        <h2 className="mb-10 text-cyan-50 text-2xl">{t('description')}</h2>
        <Link href="/demo" className="ml-12 mt-5 bg-cyan-600 text-cyan-50 px-4 py-1 rounded-md font-medium hover:bg-cyan-400 transition-colors">
          {t('startDemo')}
        </Link>
      </div>
    </div>
  )
}
