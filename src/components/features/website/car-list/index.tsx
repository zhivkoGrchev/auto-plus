import type { ProfileExtended } from '@/lib/types/profile'
import { prisma } from '@/prisma'
import { CarCard } from './car.card'

interface CarListProps {
  profile: ProfileExtended
}

export async function CarList({ profile }: CarListProps) {
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
          <CarCard key={car.id} car={car} href={`/${profile.slug}/${car.id}`} />
        ))}
      </div>
    </main>
  )
}
