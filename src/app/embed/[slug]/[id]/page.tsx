import CarDetails from '@/components/features/car-details'

interface PageProps {
  params: Promise<{
    id: string
    slug: string
  }>
  searchParams?: Promise<{
    source?: string
  }>
}

export default async function CarDetailsEmbed(props: PageProps) {
  const params = await props.params
  const options = await props.searchParams
  return (
    <div className="flex grow">
      <CarDetails id={params.id} slug={params.slug} options={options} />
    </div>
  )
}
