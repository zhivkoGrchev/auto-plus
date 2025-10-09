import CarDetailsPage from '@/components/features/car-details'

interface PageProps {
  params: Promise<{ slug: string; id: string }>
}

export default async function CarDetailsWebsite(props: PageProps) {
  const params = await props.params
  return <CarDetailsPage params={{ id: params.id }} searchParams={{ source: params.slug }} />
}
