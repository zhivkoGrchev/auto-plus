import React from 'react'

function Location() {
  // You'll need to replace this with the actual coordinates of Hauptstraße 123
  const address = 'Rainweg 79, Saalfeld, Germany'
  const mapSrc = `https://www.google.com/maps/embed/v1/place?key=YOUR_API_KEY&q=${encodeURIComponent(address)}`

  // Alternative: Use search without API key (less reliable)
  const mapSrcNoKey =
    'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2428.123!2d13.404954!3d52.520008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNTLCsDMxJzEyLjAiTiAxM8KwMjQnMTcuOCJF!5e0!3m2!1sen!2sde!4v1234567890123!5m2!1sen!2sde'

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-6 text-center">Unser Standort</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Address Info */}
        <div className="space-y-4">
          <div>
            <h3 className="text-xl font-semibold mb-2">Adresse</h3>
            <p className="text-gray-50 text-lg">Autohaus Plus</p>
            <p className="text-gray-50">Hauptstraße 123</p>
            <p className="text-gray-50">12345 Berlin, Germany</p>
          </div>
        </div>

        {/* Map */}
        <div className="h-96">
          <iframe
            src={mapSrcNoKey}
            width="100%"
            height="100%"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded-lg shadow-lg"
            title="Autohaus Plus Location Map"
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

export default Location
