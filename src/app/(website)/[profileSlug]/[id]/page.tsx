import CarDetailsPage from '@/components/features/car-details'

interface PageProps {
  params: Promise<{
    profileSlug: string
    id: string
  }>
  searchParams?: Promise<{ source?: string }>
}

export default async function CarDetailsWebsite(props: PageProps) {
  const params = await props.params
  const resolvedSearchParams = await props.searchParams
  return <CarDetailsPage profileSlug={params.profileSlug} id={params.id} searchParams={resolvedSearchParams} />
}
