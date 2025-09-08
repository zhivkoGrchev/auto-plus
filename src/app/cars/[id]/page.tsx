import { prisma } from '@/db/prisma'
import Link from 'next/link'
import PrintButton from './print-button'
import { getTranslations } from 'next-intl/server'

interface PageProps {
  params: { id: string }
}

export default async function CarDetailsPage({ params }: PageProps) {
  const t = await getTranslations('AddCarDialog')
  const id = params.id

  const car = await prisma.car.findUnique({
    where: { id },
    include: {
      brand: true,
      model: true,
    },
  })

  if (!car) {
    return (
      <div className="p-6 max-w-4xl mx-auto">
        <h2 className="text-xl font-semibold">Car not found</h2>
        <p className="mt-2">The requested car does not exist.</p>
        <Link href="/cars" className="inline-block mt-4 text-blue-500 hover:underline">
          Back to list
        </Link>
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

  const formatDate = (d: any) => {
    if (!d) return '—'
    try {
      return new Date(d).toLocaleDateString('en-GB')
    } catch {
      return String(d)
    }
  }

  return (
    <>
      <main className="mx-auto p-8 m-8 bg-background text-foreground border rounded-2xl shadow-lg print-reset">
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
          {/* Image placeholder */}
          <div className="md:col-span-2">
            <div className="w-full h-80 bg-muted flex items-center justify-center rounded-xl border border-dashed">
              <span className="text-muted-foreground">Image Placeholder</span>
            </div>

            {car.description && (
              <div className="mt-6">
                <h2 className="text-xl font-semibold mb-2">Description</h2>
                <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-line">{car.description}</p>
              </div>
            )}
          </div>

          {/* Sidebar details */}
          <aside className="space-y-4 text-sm mx-auto w-full md:w-64">
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">{t('year')}</span>
              <span>{car.year ?? '—'}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">{t('mileage')}</span>
              <span>{car.mileage != null ? `${car.mileage.toLocaleString()} km` : '—'}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">{t('fuelType')}</span>
              <span>{car.fuelType ? t(car.fuelType) : '—'}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">{t('transmission')}</span>
              <span>{car.transmission ? t(car.transmission) : '—'}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">{t('color')}</span>
              <span>{car.color ?? '—'}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">{t('vin')}</span>
              <span>{car.vin ?? '—'}</span>
            </div>
            <div className="flex justify-between border-b pb-2">
              <span className="font-medium">{t('price')}</span>
              <span>{formatCurrency(car.price as number)}</span>
            </div>
            <div className="flex justify-between pt-8">
              <span className="font-medium">{t('created')}</span>
              <span>{formatDate(car.createdAt)}</span>
            </div>
          </aside>
        </div>

        {/* Actions (hidden in print) */}
        <div className="no-print flex items-center justify-between mt-8">
          <Link href="/admin" className="px-4 py-2 rounded-lg border hover:bg-muted transition text-sm">
            {t('backToList')}
          </Link>
          <PrintButton />
        </div>
      </main>
    </>
  )
}
