import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import heroImgLandscape from '/public/images/bg-image.jpg'
import heroImgPortrait from '/public/images/bg-image-p.png'
import { Button } from '../ui/button'

export const Hero = () => {
  const t = useTranslations('Hero')

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center text-cyan-50 dark:text-cyan-950">
      {/* Landscape image - show on tablet and desktop */}
      <div className="absolute inset-0 -z-10 hidden sm:block">
        <Image src={heroImgLandscape} alt={t('imgAlt')} fill style={{ objectFit: 'cover' }} priority />
      </div>

      {/* Portrait image - show only on mobile */}
      <div className="absolute inset-0 -z-10 block sm:hidden">
        <Image src={heroImgPortrait} alt={t('imgAlt')} fill style={{ objectFit: 'cover' }} priority />
      </div>

      <div className="mt-20 sm:mt-32 md:mt-40 mb-auto px-4 sm:px-6 z-10 text-center max-w-4xl">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold">{t('title')}</h1>
        <h2 className="text-lg sm:text-xl md:text-2xl mt-4">{t('description')}</h2>
        <Button className="mt-8 sm:mt-10 md:mt-14 font-medium" asChild>
          <Link href="/admin">{t('startDemo')}</Link>
        </Button>
      </div>
    </div>
  )
}
