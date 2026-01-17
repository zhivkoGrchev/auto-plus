import LocationComponent from '@/components/features/website-admin/links/location'
import { getMainLocationByProfileSlug } from '@/lib/actions/profile.actions'

interface LocationPageProps {
  params: {
    profileSlug: string
  }
}

export default async function LocationPage(props: LocationPageProps) {
  const params = await props.params
  const { profileSlug } = params
  const { data: location } = await getMainLocationByProfileSlug(profileSlug)

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <LocationComponent location={location} />
    </div>
  )
}
