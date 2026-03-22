import { notFound } from 'next/navigation'
import { ContactInfo } from '@/components/features/website/contact-info'
import { getProfileWithLocationsBySlug } from '@/services/profile'

interface ContactPageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function ContactPage(props: ContactPageProps) {
  const { slug } = await props.params
  const { data: profile, error } = await getProfileWithLocationsBySlug(slug)
  if (error) notFound()
  const location = profile.locations.find((item) => item.isMain)

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <ContactInfo location={location} />
    </div>
  )
}
