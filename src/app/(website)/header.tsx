'use client'

import { useState } from 'react'
import { FaPhone } from 'react-icons/fa'

export const WebsiteHeader = () => {
  const [menuOpen, setMenuOpen] = useState(false)
  const phoneNumber = '4915257539557' // <-- change to your number (without +)
  const message = 'Hallo, ich interessiere mich für Ihre Autos!'

  return (
    <header className="w-full bg-cyan-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="/website" className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-wide">Firmenname</span>
        </a>

        <nav className="hidden md:flex items-center gap-6 text-lg">
          <a href="/website" className="hover:text-cyan-200 transition">
            Startseite
          </a>
          <a href="/website/location" className="hover:text-cyan-200 transition">
            Standort
          </a>
          <a href="/website/contact" className="hover:text-cyan-200 transition">
            Kontakt
          </a>
          <a
            href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full flex items-center gap-2 transition transform hover:scale-105"
          >
            <FaPhone size={16} />
            Jetzt anrufen
          </a>
        </nav>

        {/* Mobile toggle */}
        <button type="button" className="md:hidden text-white text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '×' : '☰'}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-cyan-600 px-6 py-4 space-y-4">
          <a href="/website" className="block hover:text-cyan-200 transition">
            Startseite
          </a>
          <a href="/website/location" className="block hover:text-cyan-200 transition">
            Standort
          </a>
          <a href="/website/contact" className="block hover:text-cyan-200 transition">
            Kontakt
          </a>
          <a
            href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
            className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full flex items-center gap-2 transition transform hover:scale-105"
          >
            <FaPhone size={16} />
            Jetzt anrufen
          </a>
        </div>
      )}
    </header>
  )
}
