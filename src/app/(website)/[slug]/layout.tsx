import { notFound } from 'next/navigation'
import { WhatsAppButton } from '@/components/features/website/whatsapp'
import { Footer } from '@/components/layouts/website/footer'
import { Header } from '@/components/layouts/website/header'
import { getProfileWithLocationsBySlug } from '@/services/profile'

interface WebsiteLayoutProps extends AppLayoutProps {
  params: Promise<{
    slug: string
  }>
}

export default async function WebsiteLayout({ children, params }: WebsiteLayoutProps) {
  const { slug } = await params
  const { data: profile, error } = await getProfileWithLocationsBySlug(slug)
  if (error) notFound()
  const location = profile.locations.find((item) => item.isMain)

  return (
    <div className="min-h-screen w-screen flex flex-col antialiased">
      <Header profile={profile} />
      <main className="grow flex flex-col gap-4">{children}</main>
      <Footer profile={profile} />
      <WhatsAppButton phoneNumber={location?.phone} />
    </div>
  )
}
