import CarDetailsPage from '@/components/features/car-details'

interface PageProps {
  params: Promise<{
    slug: string
    id: string
  }>
  searchParams?: Promise<{
    source?: string
  }>
}

export default async function CarDetailsWebsite(props: PageProps) {
  const params = await props.params
  const resolvedSearchParams = await props.searchParams
  return <CarDetailsPage slug={params.slug} id={params.id} searchParams={resolvedSearchParams} />
}
