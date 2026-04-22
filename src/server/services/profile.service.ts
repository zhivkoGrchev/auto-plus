import 'server-only'
import { cache } from 'react'
import { prisma } from '@/server/db/prisma'
import type { ProfileExtended } from '@/types/profile'

export const getProfileExtendedBySlug = cache(async (slug: string): Promise<Return<ProfileExtended>> => {
  try {
    const profile = await prisma.profile.findUnique({ where: { slug }, include: { locations: true } })
    if (!profile) return { data: undefined, error: { message: 'Profile not found' } }
    return { data: profile, error: undefined }
  } catch (error) {
    const e = error as Error
    console.error('Error fetching profile by slug:', e.message)
  }
  return { data: undefined, error: { message: 'Error fetching profile by slug' } }
})
