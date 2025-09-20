export const WebsiteFooter = () => {
  return (
    <footer className="w-full bg-cyan-900 text-white mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-3">Company Name</h3>
          <p>Gebrauchtwagen zu verkaufen.</p>
          <p>Der beste Ort, um Ihr</p>
          <p>nächstes Auto zu finden.</p>
        </div>
        <div>
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
        <div>
          <h3 className="text-xl font-semibold mb-3">Öffnungszeiten</h3>
          <ul className="space-y-2">
            <li>
              <p>Montag - Freitag:</p>
              <p>09:00 - 18:00 Uhr</p>
            </li>
            <li>
              <p>Samstag:</p>
              <p>09:00 - 12:00 Uhr</p>
            </li>
            <li>
              <p>Sonntag und Feiertage</p>
              <p>Geschlossen,</p>
              <p>oder nach Vereinbarung.</p>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-3">Kontact</h3>
          <p>Saalfeld, Deutschland</p>
          <p>+49 123 456 7890</p>
          <p>info@autohausplus.com</p>
        </div>
      </div>
      <div className="bg-cyan-900 py-4 text-center text-cyan-100 text-sm">© {new Date().getFullYear()} Autohaus Plus. All rights reserved.</div>
    </footer>
  )
}
