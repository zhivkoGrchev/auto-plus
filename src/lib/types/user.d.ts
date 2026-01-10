import type { Profile, User } from '@/prisma/generated'

export interface UserWithProfiles extends User {
  profiles: Profile[]
}
