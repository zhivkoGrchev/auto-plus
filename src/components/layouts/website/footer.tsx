import type { ProfileExtended } from '@/lib/types/profile'

interface FooterProps {
  profile: ProfileExtended
}

export const Footer = ({ profile }: FooterProps) => {
  const company = profile.company || 'Firmenname'
  const location = profile.locations.find((item) => item.isMain)

  return (
    <footer className="w-full bg-cyan-900 text-white mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-3">{company}</h3>
          {location ? (
            <>
              <p className="text-gray-50">{location.address}</p>
              <p className="text-gray-50">
                {location.postcode} {location.city}
              </p>
            </>
          ) : (
            <p className="text-gray-50">Gebrauchtwagen zu verkaufen.</p>
          )}
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-3">Schnellzugriff</h3>
          <ul className="space-y-2">
            <li>
              <a href="#home" className="hover:text-cyan-300 transition">
                Impressum
              </a>
            </li>
            <li>
              <a href="#cars" className="hover:text-cyan-300 transition">
                Datenschutzrichtlinie
              </a>
            </li>
          </ul>
        </div>
      </div>
      <div className="bg-cyan-900 py-4 text-center text-cyan-100 text-sm">
        © &copy; {new Date().getFullYear()} {company}. All rights reserved.
      </div>
    </footer>
  )
}
