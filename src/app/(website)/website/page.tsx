import { prisma } from '@/db/prisma'
import { getTranslations } from 'next-intl/server'

export default async function WebsiteHomePage() {
  const t = getTranslations('WebsiteHomePage')

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
          <div key={car.id} className="bg-cyan-50 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition">
            <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
              <span className="text-gray-400 text-sm">No image available</span>
            </div>
            <div className="p-4">
              <h3 className="text-xl font-bold text-gray-900">
                {car.brand?.name} {car.model?.name} {car.year ? `(${car.year})` : ''}
              </h3>
              <p className="text-gray-600 mt-2">{car.description}</p>
              <div className="mt-4 flex justify-between items-center">
                <span className="text-lg font-semibold text-gray-900">
                  {car.price
                    ? new Intl.NumberFormat('de-DE', {
                        style: 'currency',
                        currency: 'EUR',
                        maximumFractionDigits: 0,
                      }).format(car.price)
                    : '—'}
                </span>
                <button type="button" className="bg-cyan-900 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition">
                  Details
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  )
}
