import type { Location, Profile } from '@/prisma/generated'

export interface ProfileExtended extends Profile {
  locations: Location[]
}
