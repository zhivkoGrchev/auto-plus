import { prisma } from '@/db/prisma'
import Link from 'next/link'
import { Button } from '@/components/ui/button'

export const CarCard = async () => {
  const cars = await prisma.car.findMany({
    include: {
      brand: true,
      model: true,
    },
    orderBy: { createdAt: 'desc' },
  })

  return (
    <main id="cars" className="flex-grow max-w-6xl mx-auto p-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {cars.map((car) => (
          <div key={car.id} className="bg-cyan-900 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition">
            <div className="w-full h-48 bg-cyan-800 flex items-center justify-center">
              <span className="text-cyan-50 text-sm">No image available</span>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold text-cyan-50">
                {car.brand?.name} {car.model?.name} {car.year ? `(${car.year})` : ''}
              </h3>
              <p className="text-gray-600 mt-2">{car.description}</p>
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
                <Link href={`/cars/${car.id}`}>
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
