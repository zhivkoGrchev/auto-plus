import Link from 'next/link'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import heroImg from '/public/images/bg-image.jpg'
import { Button } from '../ui/button'

export const Hero = () => {
  const t = useTranslations('Hero')

  return (
    <div className="relative h-screen w-full flex flex-col items-center justify-center text-cyan-50 dark:text-cyan-950">
      <div className="absolute inset-0 -z-10">
        <Image src={heroImg} alt={t('imgAlt')} fill style={{ objectFit: 'cover' }} />
      </div>
      <div className="mt-40 mb-auto px-4 z-10 text-center">
        <h1 className="text-4xl">{t('title')}</h1>
        <h2 className="text-2xl">{t('description')}</h2>
        <Button className="mt-14 font-medium" asChild>
          <Link href="/admin">{t('startDemo')}</Link>
        </Button>
      </div>
    </div>
  )
}
