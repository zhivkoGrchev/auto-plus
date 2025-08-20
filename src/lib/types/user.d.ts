import type { Account, User } from '@prisma/client'

export interface UserWithProfiles extends User {
  profiles: Profile[]
}

export type EditUserData = NonNullableFields<Pick<User & Account, 'name' | 'email' | 'password'>, 'password'>
