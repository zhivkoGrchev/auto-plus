'use server'

import { headers } from 'next/headers'
import { prisma } from '@/db/prisma'
import { auth } from '@/lib/auth'
import type { UserWithProfiles } from '@/lib/types/profile'
import { CreateProfileData, EditProfileData, EditUserData } from '../validators/profile'

export const getUserWithProfile = async (): Promise<Return<UserWithProfiles>> => {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session) {
      return { data: undefined, error: { message: 'You are not signed in' } }
    }
    const user = await prisma.user.findFirst({ where: { id: session.user.id }, include: { profiles: true } })
    if (!user) {
      return { data: undefined, error: { message: 'You are not signed in' } }
    }
    return { data: user as UserWithProfiles, error: undefined }
  } catch (error) {
    const e = error as Error
    console.error('Error fetching user with profile:', e.message)
    throw error
  } finally {
    prisma.$disconnect()
  }
}

export const editUser = async (formData: EditUserData): Promise<Return<string>> => {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session) {
      return { data: undefined, error: { message: 'You are not signed in' } }
    }
    await prisma.user.update({ data: formData, where: { id: session.user.id } })
    return { data: 'User`s data has been successfully changed', error: undefined }
  } catch (error) {
    const e = error as Error
    console.error('Error editing user:', e.message)
    return { data: undefined, error: { message: e.message } }
  } finally {
    prisma.$disconnect()
  }
}

export const createProfile = async (profileData: CreateProfileData): Promise<Return<string>> => {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session) {
      return { data: undefined, error: { message: 'You are not signed in' } }
    }
    await prisma.profile.create({
      data: { ...profileData, userId: session.user.id },
    })
    return { data: 'Profile was successfully created', error: undefined }
  } catch (error) {
    const e = error as Error
    console.error('Error creating profile:', e.message)
    return { data: undefined, error: { message: e.message } }
  } finally {
    await prisma.$disconnect()
  }
}

export const editProfile = async (profileData: EditProfileData, id: string): Promise<Return<string>> => {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session) {
      return { data: undefined, error: { message: 'You are not signed in' } }
    }
    await prisma.profile.update({
      data: { ...profileData },
      where: { id },
    })
    return { data: 'Profile was successfully updated', error: undefined }
  } catch (error) {
    const e = error as Error
    console.error('Error updating profile:', e.message)
    return { data: undefined, error: { message: e.message } }
  } finally {
    await prisma.$disconnect()
  }
}
