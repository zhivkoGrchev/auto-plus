'use client'

import { useState, useEffect } from 'react'
import { getFormattedOpeningHours } from '@/lib/actions/opening-hours.actions'

interface WebsiteFooterProps {
  companyName: string
}

export const WebsiteFooter = ({ companyName }: WebsiteFooterProps) => {
  const [openingHours, setOpeningHours] = useState<Record<string, string>>({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadOpeningHours = async () => {
      try {
        const hours = await getFormattedOpeningHours()
        setOpeningHours(hours)
      } catch (error) {
        console.error('Failed to load opening hours:', error)
      } finally {
        setLoading(false)
      }
    }

    loadOpeningHours()
  }, [])

  return (
    <footer className="w-full bg-cyan-900 text-white mt-12">
      <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-3">{companyName}</h3>
          <p>Gebrauchtwagen zu verkaufen.</p>
        </div>
        <div className="flex-1">
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
        <div className="flex-1">
          <h3 className="text-xl font-semibold mb-3">Öffnungszeiten</h3>
          {loading ? (
            <p className="text-cyan-200">Loading...</p>
          ) : (
            <ul className="space-y-1 text-sm">
              {Object.entries(openingHours).map(([day, hours]) => (
                <li key={day} className="flex justify-between">
                  <span className="capitalize">{day}:</span>
                  <span className="ml-2">{hours}</span>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <div className="bg-cyan-900 py-4 text-center text-cyan-100 text-sm">© {new Date().getFullYear()} {companyName}. All rights reserved.</div>
    </footer>
  )
}
