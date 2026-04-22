import type { ProfileExtended } from '@/types/profile'

interface FooterProps {
  profile: ProfileExtended
}

export const Footer = ({ profile }: FooterProps) => {
  const company = profile.company || 'Firmenname'
  const location = profile.locations.find((item) => item.isMain)

  return (
    <footer className="p-8 flex flex-col gap-8 bg-cyan-900 text-white">
      <div className="container mx-auto flex flex-col md:flex-row gap-8">
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
      <div className="text-center text-sm text-cyan-100">
        &copy; {new Date().getFullYear()} {company}. All rights reserved.
      </div>
    </footer>
  )
}
