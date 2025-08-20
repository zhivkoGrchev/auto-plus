import type { Profile } from '@prisma/client'

export type EditProfileData = Pick<Profile, 'organization' | 'address' | 'phoneNumber'>
