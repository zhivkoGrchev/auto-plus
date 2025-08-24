import type { auth } from '@/lib/auth'
import type { Account, User } from '@prisma/client'

export type AuthSession = typeof auth.$Infer.Session
export type SignUpData = NonNullableFields<Pick<User & Account, 'name' | 'email' | 'password'>, 'password'>
export type SignInData = Omit<SignUpData, 'name'>

export type { SignUpSchema, SignInSchema } from '@/lib/validators'
