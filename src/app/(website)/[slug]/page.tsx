import { notFound } from 'next/navigation'
import { getTranslations } from 'next-intl/server'
import { CarList } from '@/components/features/website/car-list'
import { getProfileExtendedBySlug } from '@/server/services/profile.service'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function WebsiteHomePage(props: PageProps) {
  const { slug } = await props.params
  const { data: profile, error } = await getProfileExtendedBySlug(slug)
  const t = await getTranslations('Website')
  if (error) notFound()

  return (
    <main className="container mx-auto grow flex flex-col gap-8">
      <div id="home" className="flex flex-col items-center gap-4">
        <h2 className="text-4xl text-center font-bold">{t('home.title')}</h2>
        <p className="text-lg text-center">{t('home.description')}</p>
      </div>
      <CarList profile={profile} />
    </main>
  )
}
