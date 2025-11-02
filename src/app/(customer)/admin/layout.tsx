import { Footer } from '@/components/layouts/footer'
import { Header } from '@/components/layouts/header'
import { Navbar } from '@/components/layouts/navbar'
import { MenuBar } from '@/components/widgets/menubar'
import { ToolBar } from '@/components/widgets/toolbar'

export default function CustomerLayout({ children }: LayoutProps) {
  return (
    <>
      <Header>
        <Navbar>
          <MenuBar />
          <ToolBar />
        </Navbar>
      </Header>
      <main className="p-4 flex grow">{children}</main>
      <Footer />
    </>
  )
}
