import { notFound } from 'next/navigation'
import { WhatsAppButton } from '@/components/features/website/whatsapp-button'
import { Footer } from '@/components/layouts/website/footer'
import { Header } from '@/components/layouts/website/header'
import { getProfileExtendedBySlug } from '@/server/services/profile.service'

interface WebsiteLayoutProps extends AppLayoutProps {
  params: Promise<{
    slug: string
  }>
}

export default async function WebsiteLayout({ children, params }: WebsiteLayoutProps) {
  const { slug } = await params
  const { data: profile, error } = await getProfileExtendedBySlug(slug)
  if (error) notFound()
  const location = profile.locations.find((item) => item.isMain)

  return (
    <div className="min-h-screen w-screen flex flex-col antialiased">
      <Header profile={profile} />
      <main className="grow flex flex-col p-8">{children}</main>
      <Footer profile={profile} />
      <WhatsAppButton phoneNumber={location?.phone} />
    </div>
  )
}
