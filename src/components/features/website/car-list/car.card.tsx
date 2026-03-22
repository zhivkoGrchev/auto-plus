import Link from 'next/link'
import { Button } from '@/components/ui/button'
import type { CarExtended } from '@/lib/types/car'

interface CarCardProps {
  car: CarExtended
  href: string
}

export async function CarCard({ car, href }: CarCardProps) {
  return (
    <div key={car.id} className="bg-cyan-900 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition">
      <div className="w-full h-48 bg-cyan-800 flex items-center justify-center">
        <span className="text-cyan-50 text-sm">
          {car.images?.[0]?.imageUrl ? <img src={car.images[0].imageUrl} alt="Car" className="w-full h-48 object-cover" /> : <span>No image available</span>}
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
          <Link href={href}>
            <Button className="cursor-pointer" variant="outline" size="sm">
              Details
            </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}
