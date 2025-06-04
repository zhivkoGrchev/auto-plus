import { useTranslations } from 'next-intl'
import Hero from '@/components/hero'
import heroImg from '/public/images/bg-image.jpg'

export default function HomePage() {
  const t = useTranslations('HomePage')
  return <Hero imgData={heroImg} imgAlt="car background" title={t('title')} description={t('description')} startDemo={t('startDemo')} />
}
