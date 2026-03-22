import { notFound } from 'next/navigation'
import { LocationInfo } from '@/components/features/website/location-info'
import { getProfileWithLocationsBySlug } from '@/services/profile'

interface LocationPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function LocationPage(props: LocationPageProps) {
  const { slug } = await props.params
  const { data: profile, error } = await getProfileWithLocationsBySlug(slug)
  if (error) notFound()
  const location = profile.locations.find((item) => item.isMain)

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <LocationInfo location={location} />
    </div>
  )
}
