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
      <div className={`flex items-center justify-center min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-gray-50 text-gray-900'}`}>
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold mb-2">Car not found</h2>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>The requested car does not exist.</p>
          <Link
            href={`/embed/${profileSlug}?theme=${theme}`}
            className="inline-block mt-4 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
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

  const specs = [
    { label: 'Power', value: car.powerKW && car.powerPS ? `${car.powerKW} kW / ${car.powerPS} PS` : '—' },
    { label: 'Cubic Capacity', value: car.cubicCapacity != null ? `${car.cubicCapacity.toLocaleString()} cm³` : '—' },
    { label: 'Year', value: car.year ?? '—' },
    { label: 'Mileage', value: car.mileage != null ? `${car.mileage.toLocaleString()} km` : '—' },
    { label: 'Fuel Type', value: car.fuelType ?? '—' },
    { label: 'Transmission', value: car.transmission ?? '—' },
    { label: 'Color', value: car.color ?? '—' },
    { label: 'VIN', value: car.vin ?? '—' },
  ]

  return (
    <div
      className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 ${isDark ? 'bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-white' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900'}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Back Button */}
        <Link
          href={`/embed/${profileSlug}?theme=${theme}`}
          className={`inline-flex items-center gap-2 mb-8 px-4 py-2 rounded-lg transition-all ${
            isDark ? 'text-blue-400 hover:text-blue-300 hover:bg-gray-800' : 'text-blue-600 hover:text-blue-700 hover:bg-blue-50'
          }`}
        >
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to List
        </Link>

        {/* Main Content */}
        <div
          className={`rounded-2xl overflow-hidden shadow-2xl ${isDark ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700' : 'bg-white border border-gray-200'}`}
        >
          {/* Header Section */}
          <div
            className={`p-6 sm:p-8 border-b ${isDark ? 'border-gray-700 bg-gradient-to-r from-gray-800 to-gray-800/80' : 'border-gray-200 bg-gradient-to-r from-gray-50 to-white'}`}
          >
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <h1 className="text-3xl sm:text-4xl font-bold mb-2">
                  {car.brand?.name} {car.model?.name}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm">
                  {car.year && (
                    <span className={`px-3 py-1 rounded-full ${isDark ? 'bg-blue-900/30 text-blue-300' : 'bg-blue-100 text-blue-700'}`}>{car.year}</span>
                  )}
                  <span className={`flex items-center gap-1 ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    {car.mileage.toLocaleString()} km
                  </span>
                </div>
              </div>
              <div className={`text-right p-4 rounded-xl ${isDark ? 'bg-blue-900/30 border border-blue-800' : 'bg-blue-50 border border-blue-200'}`}>
                <div className={`text-xs font-medium mb-1 ${isDark ? 'text-blue-300' : 'text-blue-700'}`}>Price</div>
                <div className="text-3xl font-bold text-blue-600">{formatCurrency(car.price as number)}</div>
              </div>
            </div>
          </div>

          {/* Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 p-6 sm:p-8">
            {/* Image Section - Takes up 3 columns */}
            <div className="lg:col-span-3 space-y-6">
              {/* Main Image */}
              <div className={`relative w-full rounded-xl overflow-hidden ${isDark ? 'bg-gray-900/50' : 'bg-gray-100'}`} style={{ minHeight: '400px' }}>
                {car.imageUrl ? (
                  <img
                    src={car.imageUrl}
                    alt={`${car.brand?.name} ${car.model?.name}`}
                    className="w-full h-full object-contain"
                    style={{ maxHeight: '600px' }}
                  />
                ) : (
                  <div className="flex items-center justify-center h-96">
                    <div className="text-center">
                      <svg
                        className={`w-20 h-20 mx-auto mb-4 ${isDark ? 'text-gray-700' : 'text-gray-300'}`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={1.5}
                          d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                        />
                      </svg>
                      <span className={isDark ? 'text-gray-500' : 'text-gray-400'}>No image available</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Description */}
              {car.description && (
                <div className={`p-6 rounded-xl ${isDark ? 'bg-gray-900/50 border border-gray-700' : 'bg-gray-50 border border-gray-200'}`}>
                  <h2 className="text-xl font-semibold mb-3 flex items-center gap-2">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                      />
                    </svg>
                    Description
                  </h2>
                  <p className={`leading-relaxed whitespace-pre-line ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>{car.description}</p>
                </div>
              )}
            </div>

            {/* Specifications Section - Takes up 2 columns */}
            <div className="lg:col-span-2">
              <div className={`rounded-xl p-6 sticky top-8 ${isDark ? 'bg-gray-900/50 border border-gray-700' : 'bg-gray-50 border border-gray-200'}`}>
                <h2 className="text-2xl font-semibold mb-6 flex items-center gap-2">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
                    />
                  </svg>
                  Specifications
                </h2>
                <div className="space-y-1">
                  {specs.map((spec, index) => (
                    <div
                      key={index}
                      className={`flex justify-between items-center py-3 px-4 rounded-lg transition-colors ${
                        isDark ? 'hover:bg-gray-800/50' : 'hover:bg-white'
                      }`}
                    >
                      <span className={`font-medium text-sm ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>{spec.label}</span>
                      <span className={`font-semibold text-sm capitalize ${isDark ? 'text-white' : 'text-gray-900'}`}>{spec.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
