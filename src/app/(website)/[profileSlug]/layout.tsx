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

  return (
    <div className="mx-auto w-screen flex flex-col antialiased">
      <WebsiteHeader profileSlug={profileSlug} />
      {children}
      <WebsiteFooter />
      <WhatsAppButton />
    </div>
  )
}
