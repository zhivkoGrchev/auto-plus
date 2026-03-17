import { Footer } from '@/components/layouts/footer'
import { Header } from '@/components/layouts/header'
import { Logo } from '@/components/layouts/logo'
import { MenuBar } from '@/components/widgets/menubar'
import { ToolBar } from '@/components/widgets/toolbar'

export default function CustomerAdminLayout({ children }: AppLayoutProps) {
  return (
    <>
      <Header>
        <Logo />
        <ToolBar />
        <MenuBar />
      </Header>
      <main className="p-4 flex grow">{children}</main>
      <Footer />
    </>
  )
}
