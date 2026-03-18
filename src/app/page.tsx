import { Footer } from '@/components/layouts/footer'
import { Header } from '@/components/layouts/header'
import { Hero } from '@/components/layouts/hero'
import { Logo } from '@/components/layouts/logo'
import { ToolBar } from '@/components/widgets/toolbar'

export default function HomePage() {
  return (
    <>
      <Header>
        <Logo />
        <ToolBar />
      </Header>
      <main className="flex-1 w-full">
        <Hero />
      </main>
      <Footer />
    </>
  )
}
