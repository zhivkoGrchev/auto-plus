import { Footer } from '@/components/layouts/footer'
import { Header } from '@/components/layouts/header'
import { Navbar } from '@/components/layouts/navbar'
import { ToolBar } from '@/components/widgets/toolbar'

export default function CarDetailsLayout({ children }: LayoutProps) {
  return (
    <>
      <Header>
        <Navbar>
          <ToolBar />
        </Navbar>
      </Header>
      <main className="flex grow">{children}</main>
      <Footer />
    </>
  )
}
