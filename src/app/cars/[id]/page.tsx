import CarDetailsPage from '@/components/features/car-details'

interface PageProps {
  params: { id: string }
}

export default async function CarDetailsAdmin(props: PageProps) {
  return <CarDetailsPage {...props} searchParams={{ source: 'admin' }} />
}
