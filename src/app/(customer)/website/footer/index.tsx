import React from 'react'

export default function WebsiteFooter() {
  return (
    <footer className="w-full bg-cyan-800 text-white mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <h3 className="text-xl font-semibold mb-3">Autohaus Plus</h3>
          <p className="text-cyan-100/90">Your trusted dealership for premium cars. Luxury, performance and reliability.</p>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-3">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#home" className="hover:text-cyan-300 transition">
                Home
              </a>
            </li>
            <li>
              <a href="#cars" className="hover:text-cyan-300 transition">
                Cars
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-cyan-300 transition">
                About
              </a>
            </li>
            <li>
              <a href="#contact" className="hover:text-cyan-300 transition">
                Contact
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h3 className="text-xl font-semibold mb-3">Contact</h3>
          <p className="text-cyan-100/90">📍 Berlin, Germany</p>
          <p className="text-cyan-100/90">📞 +49 123 456 789</p>
          <p className="text-cyan-100/90">✉️ info@autohausplus.com</p>
        </div>
      </div>
      <div className="bg-cyan-900 py-4 text-center text-cyan-100 text-sm">© {new Date().getFullYear()} Autohaus Plus. All rights reserved.</div>
    </footer>
  )
}
