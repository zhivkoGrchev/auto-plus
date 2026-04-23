import type { Profile, User } from '@prisma-client'

export interface UserWithProfiles extends User {
  profiles: Profile[]
}
