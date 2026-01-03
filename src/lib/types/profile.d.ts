import type { Account, Location, Profile, User } from '@prisma/client'

export interface ProfileExtended extends Profile {
  locations: Location[]
}
