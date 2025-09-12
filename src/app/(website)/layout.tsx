import { WebsiteHeader } from './header'
import { WebsiteFooter } from './footer'
import { WhatsAppButton } from './whatsapp'

export default function RootLayout({ children }: LayoutProps) {
  return (
    <div className="mx-auto w-screen flex flex-col antialiased">
      <WebsiteHeader />
      {children}
      <WebsiteFooter />
      <WhatsAppButton />
    </div>
  )
}
