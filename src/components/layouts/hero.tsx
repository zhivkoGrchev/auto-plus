import Image from 'next/image'
import Link from 'next/link'
import { useTranslations } from 'next-intl'
import { Button } from '../ui/button'

export const Hero = () => {
  const t = useTranslations('Hero')

  return (
    <div className="hero relative h-screen w-full flex flex-col items-center justify-center text-foreground">
      {/* Landscape image - show on tablet and desktop */}
      <div className="absolute inset-0 -z-10 hidden sm:block">
        <Image src="/images/bg-image.jpg" alt={t('imgAlt')} fill style={{ objectFit: 'cover' }} priority />
      </div>

      {/* Portrait image - show only on mobile */}
      <div className="absolute inset-0 -z-10 block sm:hidden">
        <Image src="/images/bg-image-p.png" alt={t('imgAlt')} fill style={{ objectFit: 'cover' }} priority />
      </div>

      <div className="mt-20 sm:mt-32 md:mt-40 mb-auto px-4 sm:px-6 z-10 text-center max-w-4xl transform -translate-y-6 sm:-translate-y-8 md:-translate-y-10">
        <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold [filter:drop-shadow(0_2px_4px_rgba(0,0,0,0.7))_drop-shadow(0_4px_8px_rgba(0,0,0,0.5))]">
          {t('title')}
        </h1>
        <h2 className="text-lg sm:text-xl md:text-2xl mt-4 [filter:drop-shadow(0_2px_4px_rgba(0,0,0,0.7))_drop-shadow(0_4px_8px_rgba(0,0,0,0.5))]">
          {t('description')}
        </h2>
        <Button className="mt-8 sm:mt-10 md:mt-14 font-medium" asChild>
          <Link href="/admin">{t('startDemo')}</Link>
        </Button>
      </div>
    </div>
  )
}
