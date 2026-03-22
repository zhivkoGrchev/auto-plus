import Link from 'next/link'
import { getTranslations } from 'next-intl/server'
import PrintButton from '@/components/features/car-details/print-button'
import { prisma } from '@/prisma'
import CarGallery from './car-gallery'

interface PageProps {
  id: string
  slug?: string
  searchParams?: { source?: string }
}

export default async function CarDetailsPage({ slug, id, searchParams }: PageProps) {
  const source = searchParams?.source
  const backLink = source === 'admin' ? '/admin/cars' : source === 'embed' ? `/embed/${slug}` : `/${slug}`
  const t = await getTranslations('CarDialog')

  const car = await prisma.car.findUnique({
    where: { id },
    include: {
      brand: true,
      model: true,
      images: { orderBy: { order: 'asc' } },
    },
  })

  if (!car) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold">Car not found</h2>
        <p className="mt-2">The requested car does not exist.</p>
        <Link href={backLink} className="inline-block mt-4 text-blue-500 hover:underline">
          {t('backToList')}
        </Link>
      </div>
    )
  }

  const formatCurrency = (v: number | null | undefined) =>
    v == null
      ? '—'
      : new Intl.NumberFormat('de-DE', {
          style: 'currency',
          currency: 'EUR',
          maximumFractionDigits: 0,
        }).format(v)

  const formatDate = (d: any) => {
    if (!d) return '—'
    try {
      return new Date(d).toLocaleDateString('en-GB')
    } catch {
      return String(d)
    }
  }

  return (
    <main className="printable max-w-7xl mx-auto p-8 m-8 bg-background text-foreground border rounded-2xl shadow-lg print-reset">
      {/* Title */}
      <header className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">
            {car.brand?.name ?? ''} {car.model?.name ?? ''} {car.year ? `(${car.year})` : ''}
          </h1>
          <p className="text-sm text-muted-foreground">{car.mileage.toLocaleString()} km</p>
        </div>
      </header>

      {/* Layout */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
        {/* Gallery and Description */}
        <div className="md:col-span-2 space-y-6">
          <CarGallery images={car.images} carName={`${car.brand?.name} ${car.model?.name}`} />

          {car.description && (
            <div>
              <h2 className="text-xl font-semibold mb-2">Description</h2>
              <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">{car.description}</p>
            </div>
          )}
        </div>

        {/* Sidebar Details */}
        <aside className="space-y-4 text-sm">
          <div className="flex justify-between border-b pb-2 gap-4">
            <span className="font-medium">{t('power')}</span>
            <span className="text-right">
              {car.powerKW ?? '—'} kW / {car.powerPS ?? '—'} PS
            </span>
          </div>
          <div className="flex justify-between border-b pb-2 gap-4">
            <span className="font-medium">{t('cubicCapacity')}</span>
            <span className="text-right">{car.cubicCapacity != null ? `${car.cubicCapacity.toLocaleString()} cm³` : '—'}</span>
          </div>
          <div className="flex justify-between border-b pb-2 gap-4">
            <span className="font-medium">{t('year')}</span>
            <span className="text-right">{car.year ?? '—'}</span>
          </div>
          <div className="flex justify-between border-b pb-2 gap-4">
            <span className="font-medium">{t('mileage')}</span>
            <span className="text-right">{car.mileage != null ? `${car.mileage.toLocaleString()} km` : '—'}</span>
          </div>
          <div className="flex justify-between border-b pb-2 gap-4">
            <span className="font-medium">{t('fuelType')}</span>
            <span className="text-right">{car.fuelType ? t(car.fuelType) : '—'}</span>
          </div>
          <div className="flex justify-between border-b pb-2 gap-4">
            <span className="font-medium">{t('transmission')}</span>
            <span className="text-right">{car.transmission ? t(car.transmission) : '—'}</span>
          </div>
          <div className="flex justify-between border-b pb-2 gap-4">
            <span className="font-medium">{t('color')}</span>
            <span className="text-right">{car.color ?? '—'}</span>
          </div>
          <div className="flex justify-between border-b pb-2 gap-4">
            <span className="font-medium">{t('seats')}</span>
            <span className="text-right">{car.seats ?? '—'}</span>
          </div>
          <div className="flex justify-between border-b pb-2 gap-4">
            <span className="font-medium">{t('doors')}</span>
            <span className="text-right">{car.doors ?? '—'}</span>
          </div>
          <div className="flex justify-between border-b pb-2 gap-4">
            <span className="font-medium">{t('vehicleType')}</span>
            <span className="text-right">{car.vehicleType ? t(car.vehicleType) : '—'}</span>
          </div>
          <div className="flex justify-between border-b pb-2 gap-4">
            <span className="font-medium">{t('mot')}</span>
            <span className="text-right">
              {car.mot ? `${String(new Date(car.mot).getMonth() + 1).padStart(2, '0')}/${new Date(car.mot).getFullYear()}` : '—'}
            </span>
          </div>
          <div className="flex justify-between border-b pb-2 gap-4">
            <span className="font-medium">{t('vin')}</span>
            <span className="text-xs break-all text-right">{car.vin ?? '—'}</span>
          </div>
          <div className="flex justify-between border-b pb-2 text-lg font-semibold gap-4">
            <span>{t('price')}</span>
            <span className="text-green-600 text-right">{formatCurrency(car.price as number)}</span>
          </div>
          <div className="flex justify-between pt-4 text-xs text-muted-foreground gap-4">
            <span>Created</span>
            <span className="text-right">{formatDate(car.createdAt)}</span>
          </div>
        </aside>
      </div>

      {/* Actions */}
      <div className="no-print flex items-center justify-between mt-8">
        <Link href={backLink} className="no-print px-4 py-2 rounded-lg border hover:bg-muted transition text-sm">
          {t('backToList')}
        </Link>
        <PrintButton />
      </div>
    </main>
  )
}
