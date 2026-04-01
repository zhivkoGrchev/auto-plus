import CarDetails from '@/components/features/car-details'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function CarDetailsPage(props: PageProps) {
  const params = await props.params
  return <CarDetails id={params.id} options={{ source: 'admin' }} />
}
