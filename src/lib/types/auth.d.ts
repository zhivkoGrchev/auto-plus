import type { auth } from '@/lib/auth'
import { Account, User } from '../generated/prisma'

export type AuthSession = typeof auth.$Infer.Session
export type SignUpData = NonNullableFields<Pick<User & Account, 'name' | 'email' | 'password'>, 'password'>
export type SignInData = Omit<SignUpData, 'name'>
