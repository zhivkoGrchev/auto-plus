'use client'

import React, { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Clock, Plus, Trash2, Copy, Save, CheckCircle2, AlertCircle, ExternalLink } from 'lucide-react'
import { saveOpeningHours, getOpeningHours } from '@/lib/actions/opening-hours.actions'
import type { OpeningHoursData } from '@/lib/interfaces/opening-hours'

interface TimeSlot {
  open: string
  close: string
}

interface OpeningHoursProps {
  profileSlug?: string | null
}

const DAYS = [
  { key: 'monday', label: 'Monday', short: 'Mon' },
  { key: 'tuesday', label: 'Tuesday', short: 'Tue' },
  { key: 'wednesday', label: 'Wednesday', short: 'Wed' },
  { key: 'thursday', label: 'Thursday', short: 'Thu' },
  { key: 'friday', label: 'Friday', short: 'Fri' },
  { key: 'saturday', label: 'Saturday', short: 'Sat' },
  { key: 'sunday', label: 'Sunday', short: 'Sun' },
]

export const OpeningHours = ({ profileSlug }: OpeningHoursProps) => {
  const t = useTranslations('AdminPage')

  const [openingHours, setOpeningHours] = useState<OpeningHoursData | null>(null)
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [saveSuccess, setSaveSuccess] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const loadOpeningHours = async () => {
      try {
        const data = await getOpeningHours()
        setOpeningHours(data)
        setError(null)
      } catch (error) {
        console.error('Failed to load opening hours:', error)
        setError('Failed to load opening hours. Please try again.')
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
    setSaveSuccess(false)
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
    setSaveSuccess(false)
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
    setSaveSuccess(false)
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
    setSaveSuccess(false)
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
      setSaveSuccess(false)
    }
  }

  const handleSaveOpeningHours = async () => {
    if (!openingHours) return

    setSaving(true)
    setError(null)
    setSaveSuccess(false)

    try {
      const result = await saveOpeningHours(openingHours)

      if (result.success) {
        setSaveSuccess(true)
        setTimeout(() => setSaveSuccess(false), 3000)
      } else {
        setError(result.errors?.form?.[0] || 'Failed to save opening hours')
      }
    } catch (error) {
      console.error('Error saving opening hours:', error)
      setError('Failed to save opening hours. Please try again.')
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return (
      <Card>
        <CardContent className="p-12">
          <div className="flex flex-col items-center justify-center gap-3">
            <Clock className="h-8 w-8 text-blue-600 animate-spin" />
            <p className="text-sm text-muted-foreground">Loading opening hours...</p>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (!openingHours) {
    return (
      <Alert variant="destructive">
        <AlertCircle className="h-4 w-4" />
        <AlertDescription>Failed to load opening hours. Please refresh the page.</AlertDescription>
      </Alert>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header with Buttons */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold">{t('openingHours')}</h2>
          <p className="text-sm text-muted-foreground mt-1">{t('openingHoursDescription')}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="default" size="sm" asChild disabled={!profileSlug}>
            <a
              href={profileSlug ? `${process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000'}/${profileSlug}` : '#'}
              target="_blank"
              rel="noopener noreferrer"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              {t('openWebsiteButton')}
            </a>
          </Button>
          <Button onClick={handleSaveOpeningHours} disabled={saving} size="sm">
            {saving ? (
              <>
                <Clock className="h-4 w-4 animate-spin mr-2" />
                Saving...
              </>
            ) : (
              <>
                <Save className="h-4 w-4 mr-2" />
                {t('saveChangesButton')}
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Success Message */}
      {saveSuccess && (
        <Alert className="border-green-200 bg-green-50 dark:bg-green-950/20">
          <CheckCircle2 className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800 dark:text-green-400">Opening hours saved successfully!</AlertDescription>
        </Alert>
      )}

      {/* Error Message */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Days Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {DAYS.map(({ key }) => {
          const daySchedule = openingHours[key as keyof OpeningHoursData]
          const dayIndex = DAYS.findIndex((d) => d.key === key)

          return (
            <Card key={key} className={daySchedule.isOpen ? 'border-blue-200 dark:border-blue-800' : ''}>
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Checkbox
                      id={`${key}-open`}
                      checked={daySchedule.isOpen}
                      onCheckedChange={(checked) => updateDayStatus(key as keyof OpeningHoursData, !!checked)}
                      className="mt-0.5"
                    />
                    <div>
                      <Label htmlFor={`${key}-open`} className="text-base font-semibold cursor-pointer">
                        {t(`${key}`)}
                      </Label>
                      <p className="text-xs text-muted-foreground mt-0.5">
                        {daySchedule.isOpen
                          ? `${daySchedule.slots.length} ${t('timeSlot')}${daySchedule.slots.length !== 1 ? t('pluralSufix') : ''}`
                          : t('closed')}
                      </p>
                    </div>
                  </div>

                  {daySchedule.isOpen && dayIndex > 0 && (
                    <Button type="button" variant="ghost" size="sm" onClick={() => copyFromPreviousDay(key as keyof OpeningHoursData)} className="h-8">
                      <Copy className="h-3 w-3 mr-1" />
                      {t('copy')}
                    </Button>
                  )}
                </div>
              </CardHeader>

              {daySchedule.isOpen && (
                <CardContent className="space-y-3">
                  {daySchedule.slots.map((slot, slotIndex) => (
                    <div key={slotIndex} className="flex items-center gap-2 p-2 bg-gray-50 dark:bg-gray-800/50 rounded-lg">
                      <div className="flex items-center gap-2 flex-1">
                        <Input
                          type="time"
                          value={slot.open}
                          onChange={(e) => updateTimeSlot(key as keyof OpeningHoursData, slotIndex, 'open', e.target.value)}
                          className="w-28 h-9"
                        />
                        <span className="text-sm text-muted-foreground">{t('to')}</span>
                        <Input
                          type="time"
                          value={slot.close}
                          onChange={(e) => updateTimeSlot(key as keyof OpeningHoursData, slotIndex, 'close', e.target.value)}
                          className="w-28 h-9"
                        />
                      </div>

                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => removeTimeSlot(key as keyof OpeningHoursData, slotIndex)}
                        disabled={daySchedule.slots.length === 1}
                        className="h-9 w-9 p-0 hover:bg-red-50 hover:text-red-600"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}

                  <Button type="button" variant="outline" size="sm" onClick={() => addTimeSlot(key as keyof OpeningHoursData)} className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    {t('addTimeSlot')}
                  </Button>
                </CardContent>
              )}
            </Card>
          )
        })}
      </div>

      {/* Preview Card */}
      <Card className="bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-blue-950/20 dark:to-indigo-950/20 border-blue-200 dark:border-blue-800">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-blue-900 dark:text-blue-100">
            <Clock className="h-5 w-5" />
            {t('hoursPreview')}
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {DAYS.map(({ key }) => {
              const daySchedule = openingHours[key as keyof OpeningHoursData]
              return (
                <div key={key} className="flex justify-between items-center p-3 bg-white dark:bg-gray-900 rounded-lg shadow-sm">
                  <span className="font-medium text-sm">{t(`${key}`)}</span>
                  <span className={`text-sm ${daySchedule.isOpen ? 'text-green-600 dark:text-green-400' : 'text-gray-500'}`}>
                    {daySchedule.isOpen ? daySchedule.slots.map((slot) => `${slot.open}-${slot.close}`).join(', ') : t('closed')}
                  </span>
                </div>
              )
            })}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
