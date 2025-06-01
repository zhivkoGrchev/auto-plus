import Link from 'next/link'

export default function HomePage() {
  return (
    <div className="bg-image text-cyan-50 flex flex-col items-center grow basis-full min-h-screen pt-50">
      <div className="mb-2 text-4xl font-bold">Die Cloud-Plattform für Gebrauchtwagenhändler & Autoparks</div>
        <div className="mb-10 text-xl">
          Verwalten Sie Ihren Bestand, automatisieren Sie Verkäufe und steigern
          Sie Ihren Umsatz – alles in einem sicheren System.
        </div>
      <Link
        href="/demo"
        className="ml-12 bg-cyan-600 text-cyan-50 px-4 py-1 rounded-md font-medium hover:bg-cyan-400 transition-colors"
      >
        Jetzt starten - Kostenlose Demo
      </Link>
    </div>
  )
}
