import CarDetailsPage from '@/components/features/car-details'

interface PageProps {
  params: Promise<{ id: string }>
}

export default async function CarDetailsAdmin(props: PageProps) {
  const params = await props.params
  return <CarDetailsPage id={params.id} searchParams={{ source: 'admin' }} />
}
