'use client'

import { useState } from 'react'
import { FaPhone } from 'react-icons/fa'

interface WebsiteHeaderProps {
  profileSlug: string
  companyName: string
  phoneNumber?: string | null
}

export const WebsiteHeader = ({ profileSlug, companyName, phoneNumber }: WebsiteHeaderProps) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const message = 'Hallo, ich interessiere mich für Ihre Autos!'

  return (
    <header className="w-full bg-cyan-900 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href={`/${profileSlug}`} className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-wide">{companyName}</span>
        </a>

        <nav className="hidden md:flex items-center gap-6 text-lg">
          <a href={`/${profileSlug}`} className="hover:text-cyan-200 transition">
            Startseite
          </a>
          <a href={`/${profileSlug}/location`} className="hover:text-cyan-200 transition">
            Standort
          </a>
          <a href={`/${profileSlug}/contact`} className="hover:text-cyan-200 transition">
            Kontakt
          </a>
          {phoneNumber && (
            <a
              href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full flex items-center gap-2 transition transform hover:scale-105"
            >
              <FaPhone size={16} />
              Jetzt anrufen
            </a>
          )}
        </nav>

        {/* Mobile toggle */}
        <button type="button" className="md:hidden text-white text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '×' : '☰'}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-cyan-600 px-6 py-4 space-y-4">
          <a href={`/${profileSlug}`} className="block hover:text-cyan-200 transition">
            Startseite
          </a>
          <a href={`/${profileSlug}/location`} className="block hover:text-cyan-200 transition">
            Standort
          </a>
          <a href={`/${profileSlug}/contact`} className="block hover:text-cyan-200 transition">
            Kontakt
          </a>
          {phoneNumber && (
            <a
              href={`https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-full flex items-center gap-2 transition transform hover:scale-105"
            >
              <FaPhone size={16} />
              Jetzt anrufen
            </a>
          )}
        </div>
      )}
    </header>
  )
}
