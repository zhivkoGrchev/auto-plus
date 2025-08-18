import WebsiteHeader from './header'
import WebsiteFooter from './footer'
import WhatsAppButton from './whatsapp'

export default function HomePage() {
  const cars = [
    { id: 1, name: 'BMW M3', description: 'A sporty sedan with high performance.', image: 'https://source.unsplash.com/400x250/?bmw,car', price: '€55,000' },
    {
      id: 2,
      name: 'Mercedes-Benz C-Class',
      description: 'Luxury sedan with advanced tech.',
      image: 'https://source.unsplash.com/400x250/?mercedes,car',
      price: '€48,000',
    },
    { id: 3, name: 'Audi A6', description: 'Premium comfort and sleek design.', image: 'https://source.unsplash.com/400x250/?audi,car', price: '€52,000' },
    { id: 4, name: 'Porsche 911', description: 'A true sports car legend.', image: 'https://source.unsplash.com/400x250/?porsche,car', price: '€95,000' },
  ]

  return (
    <div className="mx-auto w-screen flex flex-col antialiased">
      <WebsiteHeader />

      <section id="home" className="py-16 text-center">
        <div className="max-w-7xl mx-auto px-6">
          <h2 className="text-4xl font-extrabold mb-4">Used cars in Gremany</h2>
          <p className="text-lg text-gray-600">Explore our premium selection of vehicles for every lifestyle.</p>
        </div>
      </section>

      <main id="cars" className="flex-grow max-w-6xl mx-auto p-6">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {cars.map((car) => (
            <div key={car.id} className="bg-cyan-50 rounded-2xl shadow-lg overflow-hidden hover:shadow-2xl transition">
              <img src={car.image} alt={car.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="text-xl font-bold">{car.name}</h3>
                <p className="text-gray-600 mt-2">{car.description}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-lg font-semibold">{car.price}</span>
                  <button type="button" className="bg-cyan-900 text-white px-4 py-2 rounded-lg hover:bg-cyan-700 transition">
                    Details
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>

      <WebsiteFooter />
      <WhatsAppButton />
    </div>
  )
}
