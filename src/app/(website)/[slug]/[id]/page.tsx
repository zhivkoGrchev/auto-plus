import CarDetails from '@/components/features/car-details'

interface PageProps {
  params: Promise<{
    slug: string
    id: string
  }>
  searchParams?: Promise<{
    source?: string
  }>
}

export default async function CarDetailsPage(props: PageProps) {
  const { slug, id } = await props.params
  const options = await props.searchParams
  return <CarDetails id={id} slug={slug} options={options} />
}
