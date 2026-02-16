import { Footer } from '@/components/layouts/footer'
import { Header } from '@/components/layouts/header'
import { Navbar } from '@/components/layouts/navbar'
import { ToolBar } from '@/components/widgets/toolbar'

export default function CustomerAuthLayout({ children }: AppLayoutProps) {
  return (
    <>
      <Header>
        <Navbar>
          <ToolBar />
        </Navbar>
      </Header>
      <main className="p-4 flex grow">{children}</main>
      <Footer />
    </>
  )
}
