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

export const useEditUserSchema = () => {
  const t = useTranslations('AuthValidations')
  return z.object({
    name: z
      .string()
      .transform((v) => (v === '' ? undefined : v))
      .optional(),
    email: z
      .string()
      .transform((v) => (v === '' ? undefined : v))
      .pipe(z.email(t('email')).optional()),
  })
}

export const useChangePasswordSchema = () => {
  const t = useTranslations('AuthValidations')
  return z
    .object({
      currentPassword: z.string().min(8, t('password')),
      newPassword: z.string().min(8, t('password')),
      confirmPassword: z.string().min(8, t('password')),
    })
    .refine((data) => data.newPassword === data.confirmPassword, {
      message: t('confirmPassword'),
      path: ['confirmPassword'],
    })
}

export type SignUpData = z.infer<ReturnType<typeof useSignUpSchema>>
export type SignInData = z.infer<ReturnType<typeof useSignInSchema>>
export type EditUserData = z.infer<ReturnType<typeof useEditUserSchema>>
export type ChangePasswordData = z.infer<ReturnType<typeof useChangePasswordSchema>>
