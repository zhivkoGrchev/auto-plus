'use client'

import React, { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock, Plus, Trash2 } from 'lucide-react'
import { saveOpeningHours, getOpeningHours } from '@/lib/actions/opening-hours.actions'
import type { OpeningHoursData } from '@/lib/interfaces/opening-hours'

interface TimeSlot {
  open: string
  close: string
}

const DAYS = [
  { key: 'monday', label: 'Monday' },
  { key: 'tuesday', label: 'Tuesday' },
  { key: 'wednesday', label: 'Wednesday' },
  { key: 'thursday', label: 'Thursday' },
  { key: 'friday', label: 'Friday' },
  { key: 'saturday', label: 'Saturday' },
  { key: 'sunday', label: 'Sunday' },
]

export const OpeningHours = () => {
  const t = useTranslations('MyWebsite')

  const [openingHours, setOpeningHours] = useState<OpeningHoursData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)

  // Load opening hours from database on component mount
  useEffect(() => {
    const loadOpeningHours = async () => {
      try {
        const data = await getOpeningHours()
        setOpeningHours(data)
      } catch (error) {
        console.error('Failed to load opening hours:', error)
      } finally {
        setLoading(false)
      }
    }

    loadOpeningHours()
  }, [])

  const updateDayStatus = (day: keyof OpeningHoursData, isOpen: boolean) => {
    if (!openingHours) return

    setOpeningHours((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        [day]: {
          ...prev[day],
          isOpen,
          slots: isOpen && prev[day].slots.length === 0 ? [{ open: '09:00', close: '17:00' }] : prev[day].slots,
        },
      }
    })
  }

  const updateTimeSlot = (day: keyof OpeningHoursData, slotIndex: number, field: 'open' | 'close', value: string) => {
    if (!openingHours) return

    setOpeningHours((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        [day]: {
          ...prev[day],
          slots: prev[day].slots.map((slot, index) => (index === slotIndex ? { ...slot, [field]: value } : slot)),
        },
      }
    })
  }

  const addTimeSlot = (day: keyof OpeningHoursData) => {
    if (!openingHours) return

    setOpeningHours((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        [day]: {
          ...prev[day],
          slots: [...prev[day].slots, { open: '09:00', close: '17:00' }],
        },
      }
    })
  }

  const removeTimeSlot = (day: keyof OpeningHoursData, slotIndex: number) => {
    if (!openingHours) return

    setOpeningHours((prev) => {
      if (!prev) return prev
      return {
        ...prev,
        [day]: {
          ...prev[day],
          slots: prev[day].slots.filter((_, index) => index !== slotIndex),
        },
      }
    })
  }

  const copyFromPreviousDay = (day: keyof OpeningHoursData) => {
    if (!openingHours) return

    const dayIndex = DAYS.findIndex((d) => d.key === day)
    if (dayIndex > 0) {
      const previousDay = DAYS[dayIndex - 1].key as keyof OpeningHoursData
      setOpeningHours((prev) => {
        if (!prev) return prev
        return {
          ...prev,
          [day]: { ...prev[previousDay] },
        }
      })
    }
  }

  const handleSaveOpeningHours = async () => {
    if (!openingHours) return

    setSaving(true)
    try {
      const result = await saveOpeningHours(openingHours)

      if (result.success) {
        alert('Opening hours saved successfully!')
      } else {
        alert(result.errors?.form?.[0] || 'Failed to save opening hours')
      }
    } catch (error) {
      console.error('Error saving opening hours:', error)
      alert('Failed to save opening hours')
    } finally {
      setSaving(false)
    }
  }

  // Loading state
  if (loading) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="flex justify-center items-center p-8">
          <Clock className="h-6 w-6 animate-spin mr-2" />
          Loading opening hours...
        </CardContent>
      </Card>
    )
  }

  // Error state
  if (!openingHours) {
    return (
      <Card className="w-full max-w-2xl mx-auto">
        <CardContent className="p-8">
          <p className="text-center text-red-600">Failed to load opening hours</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="mt-10 space-y-8">
      {/* Opening Hours Section */}
      <Card className="w-full max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Opening Hours
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {DAYS.map(({ key, label }) => {
              const daySchedule = openingHours[key as keyof OpeningHoursData]

              return (
                <div key={key} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id={`${key}-open`}
                        checked={daySchedule.isOpen}
                        onCheckedChange={(checked) => updateDayStatus(key as keyof OpeningHoursData, !!checked)}
                      />
                      <Label htmlFor={`${key}-open`} className="text-sm font-medium min-w-[80px]">
                        {label}
                      </Label>
                    </div>

                    {daySchedule.isOpen && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => copyFromPreviousDay(key as keyof OpeningHoursData)}
                        className="text-xs"
                        disabled={key === 'monday'}
                      >
                        Copy from above
                      </Button>
                    )}
                  </div>

                  {daySchedule.isOpen && (
                    <div className="ml-6 space-y-2">
                      {daySchedule.slots.map((slot, slotIndex) => (
                        <div key={slotIndex} className="flex items-center gap-2">
                          <div className="flex items-center gap-2">
                            <Input
                              type="time"
                              value={slot.open}
                              onChange={(e) => updateTimeSlot(key as keyof OpeningHoursData, slotIndex, 'open', e.target.value)}
                              className="w-24"
                            />
                            <span className="text-sm text-gray-500">to</span>
                            <Input
                              type="time"
                              value={slot.close}
                              onChange={(e) => updateTimeSlot(key as keyof OpeningHoursData, slotIndex, 'close', e.target.value)}
                              className="w-24"
                            />
                          </div>

                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeTimeSlot(key as keyof OpeningHoursData, slotIndex)}
                            disabled={daySchedule.slots.length === 1}
                            className="p-1 h-8 w-8"
                          >
                            <Trash2 className="h-4 w-4 text-red-500" />
                          </Button>
                        </div>
                      ))}

                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addTimeSlot(key as keyof OpeningHoursData)}
                        className="flex items-center gap-1 text-xs"
                      >
                        <Plus className="h-3 w-3" />
                        Add time slot
                      </Button>
                    </div>
                  )}

                  {!daySchedule.isOpen && <div className="ml-6 text-sm text-gray-500">Closed</div>}
                </div>
              )
            })}

            <div className="flex justify-end pt-4">
              <Button onClick={handleSaveOpeningHours} disabled={saving} className="px-8">
                {saving ? (
                  <>
                    <Clock className="h-4 w-4 animate-spin mr-2" />
                    Saving...
                  </>
                ) : (
                  'Save Opening Hours'
                )}
              </Button>
            </div>
          </div>

          {/* Preview Section */}
          <div className="mt-6 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h3 className="font-medium mb-3">Preview:</h3>
            <div className="space-y-1 text-sm">
              {DAYS.map(({ key, label }) => {
                const daySchedule = openingHours[key as keyof OpeningHoursData]
                return (
                  <div key={key} className="flex justify-between">
                    <span className="font-medium">{label}:</span>
                    <span>{daySchedule.isOpen ? daySchedule.slots.map((slot) => `${slot.open}-${slot.close}`).join(', ') : 'Closed'}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
