'use server'

import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { prisma } from '@/prisma'
import type { Profile } from '@/prisma/generated'
import type { ProfileExtended } from '../types/profile'
import type { AddLocationData, EditLocationData } from '../validators/location'
import type { AddProfileWithLocationData, EditProfileData } from '../validators/profile'

export const getProfile = async (): Promise<Return<Profile>> => {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session) return { data: undefined, error: { message: 'You are not signed in' } }
    const profile = await prisma.profile.findFirst({ where: { userId: session.user.id } })
    if (!profile) return { data: undefined, error: { message: 'There are no profiles' } }
    return { data: profile, error: undefined }
  } catch (error) {
    const e = error as Error
    console.error('Error fetching profile:', e.message)
    return { data: undefined, error: { message: e.message } }
  }
}

export const getProfileBySlug = async (slug: string): Promise<Return<Profile>> => {
  try {
    const profile = await prisma.profile.findUnique({ where: { slug } })
    if (!profile) return { data: undefined, error: { message: 'Profile not found' } }
    return { data: profile, error: undefined }
  } catch (error) {
    const e = error as Error
    console.error('Error fetching profile by slug:', e.message)
    return { data: undefined, error: { message: e.message } }
  }
}

export const getProfilesWithLocations = async (): Promise<Return<ProfileExtended[]>> => {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session) return { data: undefined, error: { message: 'You are not signed in' } }
    const profiles = await prisma.profile.findMany({ where: { userId: session.user.id }, include: { locations: true } })
    if (!profiles.length) return { data: undefined, error: { message: 'There are no profiles' } }
    return { data: profiles, error: undefined }
  } catch (error) {
    const e = error as Error
    console.error('Error fetching profiles:', e.message)
    return { data: undefined, error: { message: e.message } }
  }
}

export const addProfileWithLocation = async ({ location: locationData, ...profileData }: AddProfileWithLocationData): Promise<Return<string>> => {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session) return { data: undefined, error: { message: 'You are not signed in' } }
    const profile = await prisma.profile.create({ data: { ...profileData, userId: session.user.id } })
    await prisma.location.create({ data: { ...locationData, profileId: profile.id } })
    return { data: 'Profile was successfully created', error: undefined }
  } catch (error) {
    const e = error as Error
    console.error('Error creating profile:', e.message)
    return { data: undefined, error: { message: e.message } }
  }
}

export const editProfile = async (profileData: EditProfileData, id: string): Promise<Return<string>> => {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session) return { data: undefined, error: { message: 'You are not signed in' } }
    await prisma.profile.update({ data: profileData, where: { id } })
    return { data: 'Profile was successfully updated', error: undefined }
  } catch (error) {
    const e = error as Error
    console.error('Error updating profile:', e.message)
    return { data: undefined, error: { message: e.message } }
  }
}

export const deleteProfile = async (id: string): Promise<Return<string>> => {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session) return { data: undefined, error: { message: 'You are not signed in' } }
    await prisma.profile.delete({ where: { id } })
    return { data: 'Profile was successfully deleted', error: undefined }
  } catch (error) {
    const e = error as Error
    console.error('Error deleting profile:', e.message)
    return { data: undefined, error: { message: e.message } }
  }
}

export const addLocation = async (locationData: AddLocationData, profileId: string): Promise<Return<string>> => {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session) return { data: undefined, error: { message: 'You are not signed in' } }
    await prisma.location.create({ data: { ...locationData, profileId } })
    return { data: 'Location was successfully created', error: undefined }
  } catch (error) {
    const e = error as Error
    console.error('Error creating location:', e.message)
    return { data: undefined, error: { message: e.message } }
  }
}

export const editLocation = async (locationData: EditLocationData, id: string): Promise<Return<string>> => {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session) return { data: undefined, error: { message: 'You are not signed in' } }
    await prisma.location.update({ data: locationData, where: { id } })
    return { data: 'Location was successfully updated', error: undefined }
  } catch (error) {
    const e = error as Error
    console.error('Error updating location:', e.message)
    return { data: undefined, error: { message: e.message } }
  }
}

export const deleteLocation = async (id: string): Promise<Return<string>> => {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session) return { data: undefined, error: { message: 'You are not signed in' } }
    await prisma.location.delete({ where: { id } })
    return { data: 'Location was successfully deleted', error: undefined }
  } catch (error) {
    const e = error as Error
    console.error('Error deleting location:', e.message)
    return { data: undefined, error: { message: e.message } }
  }
}

export const getMainLocationByProfileSlug = async (slug: string) => {
  try {
    const profile = await prisma.profile.findUnique({
      where: { slug },
      include: {
        locations: {
          where: { isMain: true },
          take: 1,
        },
      },
    })
    if (!profile) return { data: undefined, error: { message: 'Profile not found' } }
    if (!profile.locations.length) return { data: undefined, error: { message: 'No main location found' } }
    return { data: profile.locations[0], error: undefined }
  } catch (error) {
    const e = error as Error
    console.error('Error fetching main location:', e.message)
    return { data: undefined, error: { message: e.message } }
  }
}
