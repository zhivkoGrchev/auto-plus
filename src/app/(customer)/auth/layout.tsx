import { Footer } from '@/components/layouts/footer'
import { Header } from '@/components/layouts/header'
import { Logo } from '@/components/layouts/logo'
import { ToolBar } from '@/components/widgets/toolbar'

export default function CustomerAuthLayout({ children }: AppLayoutProps) {
  return (
    <>
      <Header>
        <Logo />
        <ToolBar />
      </Header>
      <main className="p-4 flex grow">{children}</main>
      <Footer />
    </>
  )
}
