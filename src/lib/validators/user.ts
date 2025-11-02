import { z } from 'zod'
import { useTranslations } from 'next-intl'

export const useEditUserSchema = () => {
  const t = useTranslations('AuthValidations')

  return z.object({
    name: z
      .string()
      .transform((v) => (v === '' ? undefined : v))
      .optional(),
    email: z.preprocess((v) => (typeof v === 'string' && v === '' ? undefined : v), z.string().email(t('email')).optional()),
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

export type EditUserData = z.infer<ReturnType<typeof useEditUserSchema>>
export type ChangePasswordData = z.infer<ReturnType<typeof useChangePasswordSchema>>
