import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { prisma } from '@/prisma'

interface CarCardProps {
  profileSlug: string
}

export const CarCard = async ({ profileSlug }: CarCardProps) => {
  // Find Profile by slug (not User!)
  const profile = await prisma.profile.findUnique({
    where: {
      slug: profileSlug,
    },
  })

  if (!profile) {
    return (
      <main className="grow max-w-6xl mx-auto p-6">
        <div className="text-center text-cyan-50">
          <p>Profile not found</p>
        </div>
      </main>
    )
  }
  // Fetch cars listed on the website for the found profile
  const cars = await prisma.car.findMany({
    where: {
      listedOnWebsite: true,
      profileId: profile.id,
    },
    include: {
      brand: true,
      model: true,
      images: true,
    },
    orderBy: { createdAt: 'desc' },
  })

  if (cars.length === 0) {
    return (
      <main className="grow max-w-6xl mx-auto p-6">
        <div className="text-center text-cyan-50">
          <p>Keine Fahrzeuge verfügbar</p>
        </div>
      </main>
    )
  }

  return (
    <main id="cars" className="grow max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cars.map((car) => (
          <div key={car.id} className="bg-cyan-900 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition">
            <div className="w-full h-48 bg-cyan-800 flex items-center justify-center">
              <span className="text-cyan-50 text-sm">
                {car.images[0].imageUrl ? <img src={car.images[0].imageUrl} alt="Car" className="w-full h-48 object-cover" /> : <span>No image available</span>}
              </span>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold text-cyan-50">
                {car.brand?.name} {car.model?.name} {car.year ? `(${car.year})` : ''}
              </h3>
              <p className="text-cyan-50 mt-2">{car.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-lg font-semibold text-cyan-50">
                  {car.price
                    ? new Intl.NumberFormat('de-DE', {
                        style: 'currency',
                        currency: 'EUR',
                        maximumFractionDigits: 0,
                      }).format(car.price)
                    : '—'}
                </span>
                <Link href={`/${profileSlug}/${car.id}`}>
                  <Button className="cursor-pointer" variant="outline" size="sm">
                    Details
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
