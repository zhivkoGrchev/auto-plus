'use client'

import React, { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Clock, Plus, Trash2 } from 'lucide-react'

interface TimeSlot {
  open: string
  close: string
}

interface DaySchedule {
  isOpen: boolean
  slots: TimeSlot[]
}

interface OpeningHours {
  monday: DaySchedule
  tuesday: DaySchedule
  wednesday: DaySchedule
  thursday: DaySchedule
  friday: DaySchedule
  saturday: DaySchedule
  sunday: DaySchedule
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

  const [openingHours, setOpeningHours] = useState<OpeningHours>({
    monday: { isOpen: true, slots: [{ open: '09:00', close: '17:00' }] },
    tuesday: { isOpen: true, slots: [{ open: '09:00', close: '17:00' }] },
    wednesday: { isOpen: true, slots: [{ open: '09:00', close: '17:00' }] },
    thursday: { isOpen: true, slots: [{ open: '09:00', close: '17:00' }] },
    friday: { isOpen: true, slots: [{ open: '09:00', close: '17:00' }] },
    saturday: { isOpen: true, slots: [{ open: '10:00', close: '16:00' }] },
    sunday: { isOpen: false, slots: [] },
  })

  const updateDayStatus = (day: keyof OpeningHours, isOpen: boolean) => {
    setOpeningHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        isOpen,
        slots: isOpen && prev[day].slots.length === 0 ? [{ open: '09:00', close: '17:00' }] : prev[day].slots,
      },
    }))
  }

  const updateTimeSlot = (day: keyof OpeningHours, slotIndex: number, field: 'open' | 'close', value: string) => {
    setOpeningHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: prev[day].slots.map((slot, index) => (index === slotIndex ? { ...slot, [field]: value } : slot)),
      },
    }))
  }

  const addTimeSlot = (day: keyof OpeningHours) => {
    setOpeningHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: [...prev[day].slots, { open: '09:00', close: '17:00' }],
      },
    }))
  }

  const removeTimeSlot = (day: keyof OpeningHours, slotIndex: number) => {
    setOpeningHours((prev) => ({
      ...prev,
      [day]: {
        ...prev[day],
        slots: prev[day].slots.filter((_, index) => index !== slotIndex),
      },
    }))
  }

  const copyFromPreviousDay = (day: keyof OpeningHours) => {
    const dayIndex = DAYS.findIndex((d) => d.key === day)
    if (dayIndex > 0) {
      const previousDay = DAYS[dayIndex - 1].key as keyof OpeningHours
      setOpeningHours((prev) => ({
        ...prev,
        [day]: { ...prev[previousDay] },
      }))
    }
  }

  const handleSaveOpeningHours = () => {
    console.log('Opening Hours:', openingHours)

    // Convert to your desired format
    const formattedHours = Object.entries(openingHours).reduce(
      (acc, [day, schedule]) => {
        if (schedule.isOpen) {
          acc[day] = schedule.slots.map((slot: TimeSlot) => `${slot.open}-${slot.close}`).join(', ')
        } else {
          acc[day] = 'Closed'
        }
        return acc
      },
      {} as Record<string, string>
    )

    console.log('Formatted Hours:', formattedHours)

    // Here you can call your API to save the opening hours
    // Example: await saveOpeningHours(formattedHours);

    alert('Opening hours saved! Check console for output.')
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
              const daySchedule = openingHours[key as keyof OpeningHours]

              return (
                <div key={key} className="space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id={`${key}-open`}
                        checked={daySchedule.isOpen}
                        onCheckedChange={(checked) => updateDayStatus(key as keyof OpeningHours, !!checked)}
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
                        onClick={() => copyFromPreviousDay(key as keyof OpeningHours)}
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
                              onChange={(e) => updateTimeSlot(key as keyof OpeningHours, slotIndex, 'open', e.target.value)}
                              className="w-24"
                            />
                            <span className="text-sm text-gray-500">to</span>
                            <Input
                              type="time"
                              value={slot.close}
                              onChange={(e) => updateTimeSlot(key as keyof OpeningHours, slotIndex, 'close', e.target.value)}
                              className="w-24"
                            />
                          </div>

                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            onClick={() => removeTimeSlot(key as keyof OpeningHours, slotIndex)}
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
                        onClick={() => addTimeSlot(key as keyof OpeningHours)}
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
              <Button onClick={handleSaveOpeningHours} className="px-8">
                Save Opening Hours
              </Button>
            </div>
          </div>

          {/* Preview Section */}
          <div className="mt-6 p-4 bg-gray-50 dark:bg-cyan-900 rounded-lg">
            <h3 className="font-medium mb-3">Preview:</h3>
            <div className="space-y-1 text-sm">
              {DAYS.map(({ key, label }) => {
                const daySchedule = openingHours[key as keyof OpeningHours]
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
