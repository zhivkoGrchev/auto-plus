import { CarGrid } from '@/components/features/embed-widget/car-grid'
import { prisma } from '@/prisma'

interface PageProps {
  params: Promise<{ profileSlug: string }>
  searchParams?: Promise<{ theme?: 'light' | 'dark' }>
}

export default async function EmbedPage({ params, searchParams }: PageProps) {
  const { profileSlug } = await params
  const resolvedSearchParams = await searchParams
  const theme = resolvedSearchParams?.theme || 'light'

  // Find profile by slug
  const profile = await prisma.profile.findUnique({
    where: { slug: profileSlug },
  })

  if (!profile) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800">Profile not found</h2>
          <p className="text-gray-600 mt-2">The requested dealer profile does not exist.</p>
        </div>
      </div>
    )
  }

  // Get listed cars for this profile
  const cars = await prisma.car.findMany({
    where: {
      profileId: profile.id,
      listedOnWebsite: true,
    },
    include: {
      brand: true,
      model: true,
      images: true,
    },
    orderBy: { createdAt: 'desc' },
  })

  return <CarGrid cars={cars} theme={theme} profileSlug={profileSlug} />
}
