import { notFound } from 'next/navigation'
import { LocationInfo } from '@/components/features/website/location-info'
import { getProfileExtendedBySlug } from '@/services/profile.service'

interface LocationPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function LocationPage(props: LocationPageProps) {
  const { slug } = await props.params
  const { data: profile, error } = await getProfileExtendedBySlug(slug)
  if (error) notFound()
  const location = profile.locations.find((item) => item.isMain)

  return (
    <div className="container mx-auto grow flex flex-col gap-8">
      <LocationInfo location={location} />
    </div>
  )
}
