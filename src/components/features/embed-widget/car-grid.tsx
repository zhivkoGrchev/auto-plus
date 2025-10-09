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
      <div className={`flex items-center justify-center min-h-screen ${isDark ? 'bg-gray-900 text-white' : 'bg-white text-gray-900'}`}>
        <div className="text-center p-8">
          <h3 className="text-xl font-semibold mb-2">No vehicles available</h3>
          <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Check back soon for new inventory.</p>
        </div>
      </div>
    )
  }

  return (
    <div className={`min-h-screen p-6 ${isDark ? 'bg-gray-900' : 'bg-gray-50'}`}>
      <div className="max-w-7xl mx-auto">
        <h1 className={`text-3xl font-bold mb-8 ${isDark ? 'text-white' : 'text-gray-900'}`}>Available Vehicles</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {cars.map((car) => (
            <div key={car.id} className={`rounded-lg overflow-hidden shadow-lg transition-transform hover:scale-105 ${isDark ? 'bg-gray-800' : 'bg-white'}`}>
              {/* Car Image */}
              <div className="h-48 bg-gray-200 flex items-center justify-center overflow-hidden">
                {car.imageUrl ? (
                  <img src={car.imageUrl} alt={`${car.brand?.name} ${car.model?.name}`} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-gray-400">No image available</span>
                )}
              </div>

              {/* Car Details */}
              <div className="p-4">
                <h3 className={`text-xl font-bold mb-2 ${isDark ? 'text-white' : 'text-gray-900'}`}>
                  {car.brand?.name} {car.model?.name}
                </h3>

                <div className={`text-sm space-y-1 mb-4 ${isDark ? 'text-gray-300' : 'text-gray-600'}`}>
                  <p>📅 Year: {car.year}</p>
                  <p>🛣️ Mileage: {car.mileage.toLocaleString()} km</p>
                  <p>
                    ⚡ Power: {car.powerKW} kW / {car.powerPS} PS
                  </p>
                  <p>⛽ Fuel: {car.fuelType}</p>
                  <p>🎨 Color: {car.color}</p>
                </div>

                <div className="flex items-center justify-between">
                  <div className="text-2xl font-bold text-blue-600">€{car.price.toLocaleString()}</div>
                  <a
                    href={`/embed/${profileSlug}/${car.id}${theme === 'dark' ? '?theme=dark' : ''}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
                  >
                    Details
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
