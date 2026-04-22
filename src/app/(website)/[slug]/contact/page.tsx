import { notFound } from 'next/navigation'
import { ContactInfo } from '@/components/features/website/contact-info'
import { getProfileExtendedBySlug } from '@/server/services/profile.service'

interface ContactPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ContactPage(props: ContactPageProps) {
  const { slug } = await props.params
  const { data: profile, error } = await getProfileExtendedBySlug(slug)
  if (error) notFound()
  const location = profile.locations.find((item) => item.isMain)

  return (
    <div className="container mx-auto grow flex flex-col gap-8">
      <ContactInfo location={location} />
    </div>
  )
}
