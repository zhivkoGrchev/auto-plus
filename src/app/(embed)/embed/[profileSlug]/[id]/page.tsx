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
  return (
    <div className="flex grow">
      <CarDetailsPage profileSlug={params.profileSlug} params={Promise.resolve({ id: params.id })} searchParams={props.searchParams} />
    </div>
  )
}
