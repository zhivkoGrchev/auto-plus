import { CarCard } from './car-card'

interface PageProps {
  params: {
    slug: string
  }
}

export default function WebsiteHomePage({ params }: PageProps) {
  const { slug } = params

  return (
    <>
      <section id="home" className="py-16 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-bold mb-4">Gebrauchtwagen in Deutschland</h2>
          <p className="text-lg">Entdecken Sie unsere Auswahl an Fahrzeugen für jeden Lebensstil.</p>
        </div>
      </section>
      <CarCard slug={slug} />
    </>
  )
}
