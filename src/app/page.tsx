import { Footer } from '@/components/layouts/footer'
import { Header } from '@/components/layouts/header'
import { Navbar } from '@/components/layouts/navbar'
import { Hero } from '@/components/layouts/hero'

export default function HomePage() {
  return (
    <>
      <Header>
        <Navbar />
      </Header>
      <main className="flex-1 w-full">
        <Hero />
      </main>
      <Footer />
    </>
  )
}
