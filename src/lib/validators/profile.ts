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

  return z.object({
    newPassword: z.string().min(8, t('password')),
    currentPassword: z.string().min(8, t('password')),
  })
}

export const useProfileSchema = (isEdit: boolean) => {
  // const t = useTranslations('ProfileValidations')
  return isEdit
    ? z.object({
        slug: z
          .string()
          .transform((v) => (v === '' ? undefined : v))
          .optional(),
        address: z
          .string()
          .transform((v) => (v === '' ? undefined : v))
          .optional(),
        phoneNumber: z.preprocess(
          (v) => (typeof v === 'string' && v === '' ? undefined : v),
          z
            .string()
            .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number')
            .optional()
        ),
      })
    : z.object({
        slug: z.string().min(1),
        address: z.string().min(1),
        phoneNumber: z
          .string()
          .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number')
          .min(1),
      })
}

export type EditUserData = z.infer<ReturnType<typeof useEditUserSchema>>
export type ChangePasswordData = z.infer<ReturnType<typeof useChangePasswordSchema>>
export type ProfileData = z.infer<ReturnType<typeof useProfileSchema>>
