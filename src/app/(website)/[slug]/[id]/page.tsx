import CarDetailsPage from '@/components/features/car-details'

interface PageProps {
  params: {
    slug: string
    id: string
  }
}

export default async function CarDetailsWebsite(props: PageProps) {
  return <CarDetailsPage {...props} searchParams={{ source: props.params.slug }} />
}
