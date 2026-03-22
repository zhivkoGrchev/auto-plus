import CarDetailsPage from '@/components/features/car-details'

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
  const resolvedSearchParams = await props.searchParams
  return (
    <div className="flex grow">
      <CarDetailsPage slug={params.slug} id={params.id} searchParams={resolvedSearchParams} />
    </div>
  )
}
