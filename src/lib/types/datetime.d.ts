export interface TimeSlot {
  open: string
  close: string
}

export interface DaySchedule {
  isOpen: boolean
  slots: TimeSlot[]
}

export interface OpeningHoursData {
  monday: DaySchedule
  tuesday: DaySchedule
  wednesday: DaySchedule
  thursday: DaySchedule
  friday: DaySchedule
  saturday: DaySchedule
  sunday: DaySchedule
}

export interface OpeningHoursDB {
  id: string
  monday: TimeSlot[] | null
  tuesday: TimeSlot[] | null
  wednesday: TimeSlot[] | null
  thursday: TimeSlot[] | null
  friday: TimeSlot[] | null
  saturday: TimeSlot[] | null
  sunday: TimeSlot[] | null
  createdAt: Date
  updatedAt: Date
}
