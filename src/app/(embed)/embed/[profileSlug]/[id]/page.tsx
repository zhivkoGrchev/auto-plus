import CarDetailsPage from '@/components/features/car-details'

interface PageProps {
  params: Promise<{
    profileSlug: string
    id: string
  }>
  searchParams?: Promise<{ source?: string }>
}

export default async function CarDetailsEmbed(props: PageProps) {
  const params = await props.params
  const resolvedSearchParams = await props.searchParams
  return (
    <div className="flex grow">
      <CarDetailsPage profileSlug={params.profileSlug} id={params.id} searchParams={resolvedSearchParams} />
    </div>
  )
}
