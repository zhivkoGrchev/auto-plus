import CarDetailsPage from '@/components/features/car-details'

interface PageProps {
  params: { id: string }
}

export default async function CarDetailsWebsite(props: PageProps) {
  return <CarDetailsPage {...props} searchParams={{ source: 'website' }} />
}
