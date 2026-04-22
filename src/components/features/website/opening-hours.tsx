'use client'

import { useEffect, useState } from 'react'
import { getFormattedOpeningHours } from '@/server/actions/opening-hours.actions'

const dayTranslations: Record<string, string> = {
  monday: 'Montag',
  tuesday: 'Dienstag',
  wednesday: 'Mittwoch',
  thursday: 'Donnerstag',
  friday: 'Freitag',
  saturday: 'Samstag',
  sunday: 'Sonntag',
}

export function OpeningHours() {
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
    <div className="grow flex justify-center items-center">
      <div className="max-w-96 w-full p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        {loading ? (
          <p className="text-center text-gray-500">Wird geladen...</p>
        ) : (
          Object.entries(openingHours).map(([day, hours]) => (
            <div key={day} className="py-3 flex justify-between items-center border-b border-gray-200 dark:border-gray-700 last:border-0 gap-8">
              <span className="text-lg font-medium">{dayTranslations[day.toLowerCase()] || day}</span>
              <span className="text-right text-lg text-gray-600 dark:text-gray-300">{hours.toLowerCase() === 'closed' ? 'Geschlossen' : hours}</span>
            </div>
          ))
        )}
      </div>
    </div>
  )
}
