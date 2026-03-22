import { cache } from 'react'
import type { ProfileExtended } from '@/lib/types/profile'
import { prisma } from '@/prisma'

export const getProfileWithLocationsBySlug = cache(async (slug: string): Promise<Return<ProfileExtended>> => {
  try {
    const profile = await prisma.profile.findUnique({ where: { slug }, include: { locations: true } })
    if (!profile) return { data: undefined, error: { message: 'Profile not found' } }
    return { data: profile, error: undefined }
  } catch (error) {
    const e = error as Error
    console.error('Error fetching profile by slug:', e.message)
    return { data: undefined, error: { message: e.message } }
  }
})
