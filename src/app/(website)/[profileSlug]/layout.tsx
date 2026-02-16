import { getMainLocationByProfileSlug, getProfileBySlug } from '@/lib/actions/profile.actions'
import { WebsiteFooter } from './footer'
import { WebsiteHeader } from './header'
import { WhatsAppButton } from './whatsapp'

interface WebsiteLayoutProps extends AppLayoutProps {
  params: Promise<{ profileSlug: string }>
}

export default async function RootLayout({ children, params }: WebsiteLayoutProps) {
  const { profileSlug } = await params
  const { data: profile } = await getProfileBySlug(profileSlug)
  const { data: location } = await getMainLocationByProfileSlug(profileSlug)

  return (
    <div className="min-h-screen w-screen flex flex-col antialiased">
      <WebsiteHeader profileSlug={profileSlug} companyName={profile?.company || 'Firmenname'} phoneNumber={location?.phone} />
      <main className="grow">{children}</main>
      <WebsiteFooter companyName={profile?.company || 'Firmenname'} location={location} />
      <WhatsAppButton phoneNumber={location?.phone} />
    </div>
  )
}
