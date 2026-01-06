import { Footer } from '@/components/layouts/footer'
import { Header } from '@/components/layouts/header'
import { Hero } from '@/components/layouts/hero'
import { Navbar } from '@/components/layouts/navbar'
import { ToolBar } from '@/components/widgets/toolbar'

export default function HomePage() {
  return (
    <>
      <Header>
        <Navbar>
          <ToolBar />
        </Navbar>
      </Header>
      <main className="flex-1 w-full">
        <Hero />
      </main>
      <Footer />
    </>
  )
}
