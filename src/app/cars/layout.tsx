import { Footer } from '@/components/layouts/footer'
import { Header } from '@/components/layouts/header'
import { Logo } from '@/components/layouts/logo'
import { ToolBar } from '@/components/widgets/toolbar'

export default function CarDetailsLayout({ children }: AppLayoutProps) {
  return (
    <>
      <Header>
        <Logo />
        <ToolBar />
      </Header>
      <main className="flex grow">{children}</main>
      <Footer />
    </>
  )
}
