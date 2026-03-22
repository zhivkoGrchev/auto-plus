import { notFound } from 'next/navigation'
import { CarList } from '@/components/features/website/car-list'
import { getProfileWithLocationsBySlug } from '@/services/profile'

interface PageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function WebsiteHomePage(props: PageProps) {
  const { slug } = await props.params
  const { data: profile, error } = await getProfileWithLocationsBySlug(slug)
  if (error) notFound()

  return (
    <div className="my-4 flex flex-col gap-4">
      <div id="home" className="max-w-7xl mx-auto flex flex-col items-center gap-4">
        <h2 className="text-4xl text-center font-bold">Gebrauchtwagen in Deutschland</h2>
        <p className="text-lg text-center">Entdecken Sie unsere Auswahl an Fahrzeugen für jeden Lebensstil.</p>
      </div>
      <CarList profile={profile} />
    </div>
  )
}
