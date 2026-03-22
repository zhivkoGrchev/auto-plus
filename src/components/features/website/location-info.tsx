import type { Location } from '@/prisma/generated'

interface LocationInfoProps {
  location?: Location
}

export function LocationInfo({ location }: LocationInfoProps) {
  if (!location) {
    return (
      <div className="max-w-4xl mx-auto p-6 text-center">
        <h2 className="text-3xl font-bold mb-6">Unser Standort</h2>
        <p className="text-gray-500">Keine Standortinformationen verfügbar.</p>
      </div>
    )
  }

  const address = `${location.address}, ${location.postcode} ${location.city}`

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Unser Standort</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Address Info */}
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">Adresse</h3>
            <p className="text-gray-50">{location.address}</p>
            <p className="text-gray-50">
              {location.postcode} {location.city}
            </p>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-2">Kontakt</h3>
            <p className="text-gray-50">Ansprechpartner: {location.contactPerson}</p>
            <p className="text-gray-50">Telefon: {location.phone}</p>
            <p className="text-gray-50">E-Mail: {location.email}</p>
          </div>
        </div>

        {/* Map */}
        <div className="h-96">
          <iframe
            src={`https://maps.google.com/maps?q=${encodeURIComponent(address)}&output=embed`}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg shadow-lg"
            title="Location Map"
          />
        </div>
      </div>

      {/* Direction Button */}
      <div className="text-center mt-8">
        <a
          href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition"
        >
          Wegbeschreibung
        </a>
      </div>
    </div>
  )
}
