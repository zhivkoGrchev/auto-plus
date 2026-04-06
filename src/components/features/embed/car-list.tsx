import { Calendar, Fuel, Gauge, ImageOff, MessageSquareWarning, SwatchBook, View, Zap } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Card, CardAction, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import type { CarExtended } from '@/lib/types/car'

interface CarListProps {
  cars?: CarExtended[]
  slug: string
  theme?: 'light' | 'dark'
}

export function CarList({ cars, theme = 'light', slug }: CarListProps) {
  const isDark = theme === 'dark'

  if (!cars || cars.length === 0) {
    return (
      <div
        className={`grow flex flex-col justify-center items-center gap-2 ${isDark ? 'bg-linear-to-br from-gray-900 via-gray-900 to-gray-800 text-white' : 'bg-linear-to-br from-gray-50 via-white to-gray-100 text-gray-900'}`}
      >
        <MessageSquareWarning className={`size-24 mb-8 ${isDark ? 'text-gray-700' : 'text-gray-300'}`} />
        <h3 className="text-2xl font-bold">No vehicles available</h3>
        <p className={isDark ? 'text-gray-400' : 'text-gray-600'}>Check back soon for new inventory.</p>
      </div>
    )
  }

  return (
    <div className="grow p-6">
      <div className="mx-6 mb-6 text-lg">
        {cars.length} {cars.length === 1 ? 'vehicle' : 'vehicles'} in stock
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <Card className="group pt-0 overflow-hidden transition-all duration-300 hover:shadow-2xl hover:-translate-y-1" key={car.id}>
            <div className="relative h-56 flex justify-center items-center overflow-hidden bg-gray-500/10">
              {car.images?.[0]?.imageUrl ? (
                <Image
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                  src={car.images[0].imageUrl}
                  fill
                  alt={`${car.brand?.name} ${car.model?.name}`}
                />
              ) : (
                <ImageOff className="size-20" />
              )}

              <Badge className="absolute top-4 right-4 px-4 py-2 font-bold shadow-lg backdrop-blur-sm">
                {car.price
                  ? new Intl.NumberFormat('de-DE', {
                      style: 'currency',
                      currency: 'EUR',
                      maximumFractionDigits: 0,
                    }).format(car.price)
                  : '—'}
              </Badge>
            </div>
            <CardHeader>
              <CardTitle className="text-xl font-bold">
                {car.brand?.name} {car.model?.name}
              </CardTitle>
              {car.color && (
                <CardAction>
                  <Badge>
                    <SwatchBook className="size-4" />
                    {car.color}
                  </Badge>
                </CardAction>
              )}
            </CardHeader>
            <div className="px-6 grid grid-cols-2 gap-3">
              {/* Year */}
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="size-4" />
                <span className="font-medium">{car.year}</span>
              </div>
              {/* Mileage */}
              <div className="flex items-center gap-2 text-sm">
                <Zap className="size-4" />
                <span className="font-medium">{car.mileage.toLocaleString()} km</span>
              </div>
              {/* Power */}
              <div className="flex items-center gap-2 text-sm">
                <Gauge className="size-4" />
                <span className="font-medium">{car.powerKW} kW</span>
              </div>
              {/* Fuel */}
              <div className="flex items-center gap-2 text-sm">
                <Fuel className="size-4" />
                <span className="font-medium capitalize">{car.fuelType}</span>
              </div>
            </div>
            <CardFooter>
              <Button className="w-full" asChild>
                <Link href={`/embed/${slug}/${car.id}?source=embed`} rel="noopener noreferrer" prefetch={false}>
                  <View />
                  View Details
                </Link>
              </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
