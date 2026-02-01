import { z } from 'zod'

export const SignUpSchema = z
  .object({
    name: z.string().min(1, 'requiredName'),
    email: z.email('invalidEmail'),
    password: z.string().min(8, 'minPassword'),
    confirmPassword: z.string().min(8, 'minPassword'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'confirmPassword',
    path: ['confirmPassword'],
  })

export const SignInSchema = z.object({
  email: z.email('invalidEmail'),
  password: z.string().min(8, 'minPassword'),
})

export const EditUserSchema = z.object({
  name: z.string().optional(),
  email: z.email('invalidEmail').optional(),
})

export const ChangePasswordSchema = z
  .object({
    currentPassword: z.string().min(8, 'minPassword'),
    newPassword: z.string().min(8, 'minPassword'),
    confirmPassword: z.string().min(8, 'minPassword'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: 'confirmPassword',
    path: ['confirmPassword'],
  })

export type SignUpData = z.infer<typeof SignUpSchema>
export type SignInData = z.infer<typeof SignInSchema>
export type EditUserData = z.infer<typeof EditUserSchema>
export type ChangePasswordData = z.infer<typeof ChangePasswordSchema>
