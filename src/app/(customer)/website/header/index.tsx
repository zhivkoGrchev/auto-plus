'use client'

import React, { useState } from 'react'
import { LocaleTool } from '@/components/toolbar/locale-tool'
import { useTranslations } from 'next-intl'

export default function WebsiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const t = useTranslations('WebsiteHeader')

  return (
    <header className="w-full bg-cyan-700 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <a href="#home" className="flex items-center gap-2">
          <span className="text-2xl font-bold tracking-wide">{t('CompanyName')}</span>
        </a>

        <nav className="hidden md:flex items-center gap-6 text-lg">
          <a href="#home" className="hover:text-cyan-200 transition">
            {t('Home')}
          </a>
          <a href="#about" className="hover:text-cyan-200 transition">
            {t('About')}
          </a>
          <a href="#contact" className="hover:text-cyan-200 transition">
            {t('Contact')}
          </a>
          <LocaleTool />
        </nav>

        {/* Mobile toggle */}
        <button type="button" className="md:hidden text-white text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? '✖' : '☰'}
        </button>
      </div>

      {menuOpen && (
        <div className="md:hidden bg-cyan-600 px-6 py-4 space-y-4">
          <a href="#home" className="block hover:text-cyan-200 transition">
            {t('Home')}
          </a>
          <a href="#about" className="block hover:text-cyan-200 transition">
            {t('About')}
          </a>
          <a href="#contact" className="block hover:text-cyan-200 transition">
            {t('Contact')}
          </a>
          <LocaleTool />
        </div>
      )}
    </header>
  )
}
