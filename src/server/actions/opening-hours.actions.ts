'use server'

import { revalidatePath } from 'next/cache'
import { prisma } from '@/server/db/prisma'
import type { OpeningHoursData, OpeningHoursDB, TimeSlot } from '@/types/time'

// Helper function to convert UI format to DB format
function convertToDBFormat(data: OpeningHoursData) {
  const dbData: Record<string, TimeSlot[] | null> = {}

  for (const [day, schedule] of Object.entries(data)) {
    dbData[day] = schedule.isOpen ? schedule.slots : null
  }

  return dbData
}

// Helper function to convert DB format to UI format
function convertToUIFormat(dbData: OpeningHoursDB | null): OpeningHoursData {
  const defaultSchedule = {
    monday: { isOpen: true, slots: [{ open: '09:00', close: '17:00' }] },
    tuesday: { isOpen: true, slots: [{ open: '09:00', close: '17:00' }] },
    wednesday: { isOpen: true, slots: [{ open: '09:00', close: '17:00' }] },
    thursday: { isOpen: true, slots: [{ open: '09:00', close: '17:00' }] },
    friday: { isOpen: true, slots: [{ open: '09:00', close: '17:00' }] },
    saturday: { isOpen: true, slots: [{ open: '10:00', close: '16:00' }] },
    sunday: { isOpen: false, slots: [] },
  }

  if (!dbData) return defaultSchedule

  const uiData: OpeningHoursData = {} as OpeningHoursData

  for (const [day, defaultValue] of Object.entries(defaultSchedule)) {
    const dbSlots = dbData[day as keyof OpeningHoursDB] as TimeSlot[] | null

    if (dbSlots === null) {
      uiData[day as keyof OpeningHoursData] = { isOpen: false, slots: [] }
    } else if (Array.isArray(dbSlots) && dbSlots.length > 0) {
      uiData[day as keyof OpeningHoursData] = { isOpen: true, slots: dbSlots }
    } else {
      uiData[day as keyof OpeningHoursData] = defaultValue
    }
  }

  return uiData
}

export async function getOpeningHours(): Promise<OpeningHoursData> {
  try {
    const openingHours = await prisma.openingHours.findFirst({
      orderBy: { updatedAt: 'desc' },
    })

    return convertToUIFormat(openingHours as OpeningHoursDB)
  } catch (error) {
    console.error('Error fetching opening hours:', error)
    // Return default schedule if error
    return convertToUIFormat(null)
  }
}

export async function saveOpeningHours(data: OpeningHoursData): Promise<{
  success: boolean
  errors?: Record<string, string[]>
}> {
  try {
    const dbData = convertToDBFormat(data)

    // Check if opening hours already exist
    const existingHours = await prisma.openingHours.findFirst()

    if (existingHours) {
      // Update existing record
      await prisma.openingHours.update({
        where: { id: existingHours.id },
        data: {
          ...dbData,
          updatedAt: new Date(),
        },
      })
    } else {
      // Create new record
      await prisma.openingHours.create({
        data: dbData,
      })
    }

    revalidatePath('/admin/website') // Adjust path as needed
    return { success: true }
  } catch (error) {
    console.error('Error saving opening hours:', error)
    return {
      success: false,
      errors: { form: ['Failed to save opening hours. Please try again.'] },
    }
  }
}

// Optional: Get formatted opening hours for display
export async function getFormattedOpeningHours(): Promise<Record<string, string>> {
  try {
    const data = await getOpeningHours()
    const formatted: Record<string, string> = {}

    for (const [day, schedule] of Object.entries(data)) {
      if (schedule.isOpen && schedule.slots.length > 0) {
        formatted[day] = schedule.slots.map((slot: TimeSlot) => `${slot.open}-${slot.close}`).join(', ')
      } else {
        formatted[day] = 'Closed'
      }
    }

    return formatted
  } catch (error) {
    console.error('Error getting formatted opening hours:', error)
    return {}
  }
}
