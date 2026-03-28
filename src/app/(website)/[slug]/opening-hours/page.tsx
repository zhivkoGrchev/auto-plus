import { OpeningHours } from '@/components/features/website/opening-hours'

export default function OpeningHoursPage() {
  return (
    <div className="container mx-auto grow flex flex-col gap-8">
      <h2 className="text-center text-3xl font-bold">Öffnungszeiten</h2>
      <OpeningHours />
    </div>
  )
}
