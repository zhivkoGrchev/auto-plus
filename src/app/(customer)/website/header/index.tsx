'use client'

import React, { useState } from 'react'

export default function WebsiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="w-full bg-cyan-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2">
          <span className="text-2xl">🚗</span>
          <span className="text-2xl font-bold tracking-wide">Autohaus</span>
        </a>

        <nav className="hidden md:flex items-center gap-6 text-lg">
          <a href="#home" className="hover:text-cyan-200 transition">
            Home
          </a>
          <a href="#cars" className="hover:text-cyan-200 transition">
            Cars
          </a>
          <a href="#about" className="hover:text-cyan-200 transition">
            About
          </a>
          <a href="#contact" className="hover:text-cyan-200 transition">
            Contact
          </a>
        </nav>

        <button type="button" className="hidden md:inline-flex bg-white text-cyan-700 px-4 py-2 rounded-lg font-semibold hover:bg-cyan-100 transition">
          Call Now
        </button>

        {/* Mobile toggle */}
        <button type="button" className="md:hidden text-white text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✖' : '☰'}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-blue-600 px-6 py-4 space-y-4">
          <a href="#home" className="block hover:text-cyan-200 transition">
            Home
          </a>
          <a href="#cars" className="block hover:text-cyan-200 transition">
            Cars
          </a>
          <a href="#about" className="block hover:text-cyan-200 transition">
            About
          </a>
          <a href="#contact" className="block hover:text-cyan-200 transition">
            Contact
          </a>
          <button type="button" className="w-full bg-white text-cyan-700 px-4 py-2 rounded-lg font-semibold hover:bg-cyan-100 transition">
            Call Now
          </button>
        </div>
      )}
    </header>
  )
}
