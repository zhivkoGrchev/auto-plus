import { prisma } from '@/db/prisma'
import Link from 'next/link'

interface PageProps {
  params: Promise<{ profileSlug: string; id: string }>
  searchParams?: Promise<{ theme?: 'light' | 'dark' }>
}

export default async function EmbedCarDetailsPage({ params, searchParams }: PageProps) {
  const { profileSlug, id } = await params
  const resolvedSearchParams = await searchParams
  const theme = resolvedSearchParams?.theme || 'light'
  const isDark = theme === 'dark'

  const car = await prisma.car.findUnique({
    where: { id },
    include: { brand: true, model: true },
  })

  if (!car) {
    return (
      <div className={`flex items-center justify-center min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold mb-2">Car not found</h2>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>The requested car does not exist.</p>
          <Link href={`/embed/${profileSlug}?theme=${theme}`} className="inline-block mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Back to List
          </Link>
        </div>
      </div>
    )
  }

  const formatCurrency = (v: number | null | undefined) =>
    v == null
      ? '—'
      : new Intl.NumberFormat('en-US', {
          style: 'currency',
          currency: 'EUR',
          maximumFractionDigits: 0,
        }).format(v)

  return (
    <div className={`min-h-screen p-6 ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <Link href={`/embed/${profileSlug}?theme=${theme}`} className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-6">
          ← Back to List
        </Link>

        {/* Car Details Card */}
        <div className={`rounded-lg overflow-hidden shadow-lg ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
          {/* Header */}
          <div className="p-6 border-b border-gray-200 dark:border-gray-700">
            <h1 className="text-3xl font-bold">
              {car.brand?.name} {car.model?.name} {car.year ? `(${car.year})` : ''}
            </h1>
            <p className={`mt-2 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{car.mileage.toLocaleString()} km</p>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 p-6">
            {/* Image */}
            <div>
              <div className="w-full h-80 bg-gray-200 dark:bg-gray-700 flex items-center justify-center rounded-lg overflow-hidden">
                {car.imageUrl ? (
                  <img src={car.imageUrl} alt={`${car.brand?.name} ${car.model?.name}`} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-400">No image available</span>
                )}
              </div>

              {/* Description */}
              {car.description && (
                <div className="mt-6">
                  <h2 className="text-xl font-semibold mb-2">Description</h2>
                  <p className={`text-sm leading-relaxed whitespace-pre-line ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{car.description}</p>
                </div>
              )}
            </div>

            {/* Specifications */}
            <div>
              <h2 className="text-xl font-semibold mb-4">Specifications</h2>
              <div className="space-y-3">
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="font-medium">Power</span>
                  <span>
                    {car.powerKW ?? '—'} kW / {car.powerPS ?? '—'} PS
                  </span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="font-medium">Cubic Capacity</span>
                  <span>{car.cubicCapacity != null ? `${car.cubicCapacity.toLocaleString()} cm³` : '—'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="font-medium">Year</span>
                  <span>{car.year ?? '—'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="font-medium">Mileage</span>
                  <span>{car.mileage != null ? `${car.mileage.toLocaleString()} km` : '—'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="font-medium">Fuel Type</span>
                  <span className="capitalize">{car.fuelType ?? '—'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="font-medium">Transmission</span>
                  <span className="capitalize">{car.transmission ?? '—'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="font-medium">Color</span>
                  <span>{car.color ?? '—'}</span>
                </div>
                <div className="flex justify-between py-2 border-b border-gray-200 dark:border-gray-700">
                  <span className="font-medium">VIN</span>
                  <span>{car.vin ?? '—'}</span>
                </div>
              </div>

              {/* Price */}
              <div className="mt-8 p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                <div className="text-sm text-gray-600 dark:text-gray-400 mb-1">Price</div>
                <div className="text-4xl font-bold text-blue-600">{formatCurrency(car.price as number)}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
