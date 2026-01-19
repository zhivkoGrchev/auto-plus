import Contact from '@/components/features/website-admin/links/contact'
import { getMainLocationByProfileSlug } from '@/lib/actions/profile.actions'

interface ContactPageProps {
  params: {
    profileSlug: string
  }
}

export default async function ContactPage(props: ContactPageProps) {
  const params = await props.params
  const { profileSlug } = params
  const { data: location } = await getMainLocationByProfileSlug(profileSlug)

  return (
    <div className="max-w-7xl mx-auto px-6 py-16">
      <Contact location={location} />
    </div>
  )
}
