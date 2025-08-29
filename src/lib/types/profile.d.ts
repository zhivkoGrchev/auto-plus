import type { Account, User } from '@prisma/client'
import type { Profile } from '@prisma/client'

export interface UserWithProfiles extends User {
  profiles: Profile[]
}

export type EditUserData = Partial<Pick<User, 'name' | 'email'>>
export type EditPassword = NonNullableFields<Pick<Account, 'password'>, 'password'>

export type EditProfileData = Pick<Profile, 'organization' | 'address' | 'phoneNumber'>
