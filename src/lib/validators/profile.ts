import { useTranslations } from 'next-intl'
import { z } from 'zod'

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

export const useCreateProfileSchema = () => {
  return z.object({
    organization: z.string().min(1),
    address: z.string().min(1),
    phoneNumber: z
      .string()
      .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number')
      .min(1),
  })
}

export const useEditProfileSchema = () => {
  return z.object({
    organization: z
      .string()
      .transform((v) => (v === '' ? undefined : v))
      .optional(),
    address: z
      .string()
      .transform((v) => (v === '' ? undefined : v))
      .optional(),
    phoneNumber: z
      .string()
      .regex(/^\+?[1-9]\d{1,14}$/, 'Invalid phone number')
      .transform((v) => (v === '' ? undefined : v))
      .optional(),
  })
}

export type EditUserData = z.infer<ReturnType<typeof useEditUserSchema>>
export type ChangePasswordData = z.infer<ReturnType<typeof useChangePasswordSchema>>
export type CreateProfileData = z.infer<ReturnType<typeof useCreateProfileSchema>>
export type EditProfileData = z.infer<ReturnType<typeof useEditProfileSchema>>
