'use client'

import { useEffect, useState } from 'react'
import { getFormattedOpeningHours } from '@/lib/actions/opening-hours.actions'

const dayTranslations: Record<string, string> = {
  monday: 'Montag',
  tuesday: 'Dienstag',
  wednesday: 'Mittwoch',
  thursday: 'Donnerstag',
  friday: 'Freitag',
  saturday: 'Samstag',
  sunday: 'Sonntag',
}

function OpeningHours() {
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
    <div className="max-w-4xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-8 text-center">Öffnungszeiten</h2>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
        {loading ? (
          <div className="text-center">
            <p className="text-gray-500">Wird geladen...</p>
          </div>
        ) : (
          <div className="space-y-4">
            {Object.entries(openingHours).map(([day, hours]) => (
              <div key={day} className="flex justify-between items-center py-3 border-b border-gray-200 dark:border-gray-700 last:border-0 gap-28">
                <span className="text-lg font-medium">{dayTranslations[day.toLowerCase()] || day}</span>
                <span className="text-lg text-gray-600 dark:text-gray-300 text-right">{hours.toLowerCase() === 'closed' ? 'Geschlossen' : hours}</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

export default OpeningHours
