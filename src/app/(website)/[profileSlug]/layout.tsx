import { getProfileBySlug, getMainLocationByProfileSlug } from '@/lib/actions/profile.actions'
import { WebsiteHeader } from './header'
import { WebsiteFooter } from './footer'
import { WhatsAppButton } from './whatsapp'

interface LayoutProps {
  children: React.ReactNode
  params: {
    profileSlug: string
  }
}

export default async function RootLayout({ children, params }: LayoutProps) {
  const { profileSlug } = await params
  const { data: profile } = await getProfileBySlug(profileSlug)
  const { data: location } = await getMainLocationByProfileSlug(profileSlug)

  return (
    <div className="mx-auto w-screen flex flex-col antialiased">
      <WebsiteHeader profileSlug={profileSlug} companyName={profile?.company || 'Firmenname'} phoneNumber={location?.phone} />
      {children}
      <WebsiteFooter companyName={profile?.company || 'Firmenname'} location={location} />
      <WhatsAppButton phoneNumber={location?.phone} />
    </div>
  )
}
