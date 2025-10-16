import type { CarExtended } from '@/lib/interfaces/car-extended'

interface CarGridProps {
  cars: CarExtended[]
  theme?: 'light' | 'dark'
  profileSlug: string
}

export function CarGrid({ cars, theme = 'light', profileSlug }: CarGridProps) {
  const isDark = theme === 'dark'

  if (cars.length === 0) {
    return (
      <div
        className={`flex items-center justify-center min-h-screen ${isDark ? 'bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800 text-white' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100 text-gray-900'}`}
      >
        <div className="text-center p-8">
          <svg className={`w-24 h-24 mx-auto mb-6 ${isDark ? 'text-gray-700' : 'text-gray-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
            />
          </svg>
          <h3 className="text-2xl font-bold mb-2">No vehicles available</h3>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Check back soon for new inventory.</p>
        </div>
      </div>
    )
  }

  return (
    <div
      className={`min-h-screen py-8 px-4 sm:px-6 lg:px-8 ${isDark ? 'bg-gradient-to-br from-gray-900 via-gray-900 to-gray-800' : 'bg-gradient-to-br from-gray-50 via-white to-gray-100'}`}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <p className={`text-lg ${isDark ? 'text-gray-400' : 'text-gray-600'}`}>
            {cars.length} {cars.length === 1 ? 'vehicle' : 'vehicles'} in stock
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div
              key={car.id}
              className={`group rounded-2xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl hover:-translate-y-1 ${
                isDark
                  ? 'bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:border-gray-600'
                  : 'bg-white border border-gray-200 hover:border-gray-300'
              }`}
            >
              {/* Car Image */}
              <div className={`relative h-56 overflow-hidden ${isDark ? 'bg-gray-900/50' : 'bg-gray-100'}`}>
                {car.imageUrl ? (
                  <img
                    src={car.imageUrl}
                    alt={`${car.brand?.name} ${car.model?.name}`}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                ) : (
                  <div className="flex items-center justify-center h-full">
                    <svg className={`w-16 h-16 ${isDark ? 'text-gray-700' : 'text-gray-300'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={1.5}
                        d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                  </div>
                )}

                {/* Price Badge */}
                <div
                  className={`absolute top-4 right-4 px-4 py-2 rounded-xl font-bold shadow-lg backdrop-blur-sm ${
                    isDark ? 'bg-blue-600/90 text-white' : 'bg-white/95 text-blue-600'
                  }`}
                >
                  {car.price
                    ? new Intl.NumberFormat('de-DE', {
                        style: 'currency',
                        currency: 'EUR',
                        maximumFractionDigits: 0,
                      }).format(car.price)
                    : '—'}
                </div>
              </div>

              {/* Car Details */}
              <div className="p-5">
                {/* Title */}
                <h3 className={`text-xl font-bold mb-3 line-clamp-1 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {car.brand?.name} {car.model?.name}
                </h3>

                {/* Specs Grid */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  {/* Year */}
                  <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                      />
                    </svg>
                    <span className="font-medium">{car.year}</span>
                  </div>

                  {/* Mileage */}
                  <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    <span className="font-medium">{car.mileage.toLocaleString()} km</span>
                  </div>

                  {/* Power */}
                  <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z"
                      />
                    </svg>
                    <span className="font-medium">{car.powerKW} kW</span>
                  </div>

                  {/* Fuel */}
                  <div className={`flex items-center gap-2 text-sm ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                    <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                      />
                    </svg>
                    <span className="font-medium capitalize">{car.fuelType}</span>
                  </div>
                </div>

                {/* Color Badge */}
                {car.color && (
                  <div className="mb-4">
                    <span
                      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium ${
                        isDark ? 'bg-gray-700 text-gray-300' : 'bg-gray-100 text-gray-700'
                      }`}
                    >
                      <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path
                          fillRule="evenodd"
                          d="M4 2a2 2 0 00-2 2v11a3 3 0 106 0V4a2 2 0 00-2-2H4zm1 14a1 1 0 100-2 1 1 0 000 2zm5-1.757l4.9-4.9a2 2 0 000-2.828L13.485 5.1a2 2 0 00-2.828 0L10 5.757v8.486zM16 18H9.071l6-6H16a2 2 0 012 2v2a2 2 0 01-2 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                      {car.color}
                    </span>
                  </div>
                )}

                {/* View Details Button */}
                <a
                  href={`/embed/${profileSlug}/${car.id}?source=embed`}
                  rel="noopener noreferrer"
                  className={`block w-full text-center px-4 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    isDark
                      ? 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-900/30 hover:shadow-blue-900/50'
                      : 'bg-blue-600 hover:bg-blue-700 text-white shadow-lg shadow-blue-600/20 hover:shadow-blue-600/40'
                  }`}
                >
                  View Details
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
