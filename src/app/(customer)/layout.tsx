import { Footer } from '@/components/layouts/footer'
import { Header } from '@/components/layouts/header'
import { Navbar } from '@/components/layouts/navbar'

export default function CustomerLayout({ children }: LayoutProps) {
  return (
    <>
      <Header>
        <Navbar />
      </Header>
      <main className="flex grow">{children}</main>
      <Footer />
    </>
  )
}
