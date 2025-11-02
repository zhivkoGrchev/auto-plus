import type { Account, Location, Profile, User } from '@prisma/client'

export interface ProfileWithLocations extends Profile {
  locations: Location[]
}
