import { CarList } from '@/components/features/embed/car-list'
import { getCarsByProfileId } from '@/services/car.service'
import { getProfileExtendedBySlug } from '@/services/profile.service'

interface PageProps {
  params: Promise<{
    slug: string
  }>
  searchParams?: Promise<{
    theme?: 'light' | 'dark'
  }>
}

export default async function EmbedPage(props: PageProps) {
  const { slug } = await props.params
  const searchParams = await props.searchParams
  const theme = searchParams?.theme || 'light'

  const { data: profile, error } = await getProfileExtendedBySlug(slug)
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Profile not found</h2>
          <p className="text-gray-600 mt-2">The requested dealer profile does not exist.</p>
        </div>
      </div>
    )
  }

  const { data: cars } = await getCarsByProfileId(profile.id)

  return <CarList cars={cars} slug={slug} theme={theme} />
}
