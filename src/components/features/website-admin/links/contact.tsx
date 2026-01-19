import type { Location } from '@/prisma/generated'

interface ContactProps {
  location?: Location | null
}

function Contact({ location }: ContactProps) {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center">Kontaktieren Sie uns</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Contact Information */}
        <div className="space-y-6">
          <div>
            <h3 className="text-xl font-semibold mb-4">Kontakt aufnehmen</h3>
            {location ? (
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <div>
                    <p className="font-medium">Telefon</p>
                    <p className="text-cyan-50">{location.phone}</p>
                  </div>
                </div>

                <div className="flex items-center space-x-3">
                  <div>
                    <p className="font-medium">E-mail</p>
                    <p className="text-cyan-50">{location.email}</p>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-gray-500">Keine Kontaktinformationen verfügbar.</p>
            )}
          </div>
        </div>

        {/* Contact Form */}
        <div>
          <h3 className="text-xl font-semibold mb-4">Senden Sie uns eine Nachricht</h3>
          <form className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-cyan-50 mb-1">
                Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-cyan-50 mb-1">
                E-mail
              </label>
              <input
                type="email"
                id="email"
                name="email"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <div>
              <label htmlFor="phone" className="block text-sm font-medium text-cyan-50 mb-1">
                Telefon (optional)
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-cyan-50 mb-1">
                Nachricht
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Nachricht senden
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Contact
