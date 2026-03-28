import type { ProfileExtended } from '@/lib/types/profile'
import { getCarsByProfileId } from '@/services/car.service'
import { CarCard } from './car.card'

interface CarListProps {
  profile: ProfileExtended
}

export async function CarList({ profile }: CarListProps) {
  const { data: cars, error } = await getCarsByProfileId(profile.id)

  if (error || cars.length === 0) {
    return (
      <div className="grow flex justify-center items-center">
        <p className="text-2xl text-center text-cyan-50">Keine Fahrzeuge verfügbar.</p>
      </div>
    )
  }

  return (
    <div id="cars" className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {cars.map((car) => (
        <CarCard key={car.id} car={car} href={`/${profile.slug}/${car.id}`} />
      ))}
    </div>
  )
}
