'use server'

import { headers } from 'next/headers'
import { auth } from '@/lib/auth'
import { prisma } from '@/db/prisma'
import type { User } from '@prisma/client'
import type { SignInData, SignUpData, EditUserData } from '../validators/auth'

export async function getCurrentUser(): Promise<Return<User>> {
  try {
    const session = await auth.api.getSession({ headers: await headers() })
    if (!session) {
      return { data: undefined, error: { message: 'You are not signed in' } }
    }
    const user = await prisma.user.findFirst({ where: { id: session.user.id } })
    if (!user) {
      return { data: undefined, error: { message: 'You are not signed in' } }
    }
    return { data: user, error: undefined }
  } catch (error) {
    const e = error as Error
    console.error('Error fetching user:', e.message)
    return { data: undefined, error: { message: e.message || 'An unknown error occurred.' } }
  } finally {
    await prisma.$disconnect()
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

export async function signIn({ email, password }: SignInData): Promise<Return<string>> {
  try {
    await auth.api.signInEmail({ body: { email, password } })
    return { data: 'Signed in successfully.', error: undefined }
  } catch (error) {
    const e = error as Error
    console.error('Error signing in:', e.message)
    return { data: undefined, error: { message: e.message || 'An unknown error occurred.' } }
  } finally {
    await prisma.$disconnect()
  }
}

export async function signUp({ name, email, password }: SignUpData): Promise<Return<string>> {
  try {
    await auth.api.signUpEmail({ body: { name, email, password } })
    return { data: 'Signed up successfully.', error: undefined }
  } catch (error) {
    const e = error as Error
    console.error('Error signing up:', e.message)
    return { data: undefined, error: { message: e.message || 'An unknown error occurred.' } }
  } finally {
    await prisma.$disconnect()
  }
}
