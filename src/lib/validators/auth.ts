import { useTranslations } from 'next-intl'
import { z } from 'zod'

export const useSignUpSchema = () => {
  const t = useTranslations('AuthValidations')
  return z
    .object({
      name: z.string().min(1, t('name')),
      email: z.email(t('email')),
      password: z.string().min(8, t('password')),
      confirmPassword: z.string().min(8, t('password')),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: t('confirmPassword'),
      path: ['confirmPassword'],
    })
}

export const useSignInSchema = () => {
  const t = useTranslations('AuthValidations')
  return z.object({
    email: z.email(t('email')),
    password: z.string().min(8, t('password')),
  })
}

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

export type SignUpData = z.infer<ReturnType<typeof useSignUpSchema>>
export type SignInData = z.infer<ReturnType<typeof useSignInSchema>>
export type EditUserData = z.infer<typeof EditUserSchema>
export type ChangePasswordData = z.infer<typeof ChangePasswordSchema>
