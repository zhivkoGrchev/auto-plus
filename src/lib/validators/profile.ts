import { z } from 'zod'
import { useTranslations } from 'next-intl'

export const useCreateProfileSchema = () => {
  const t = useTranslations('ProfileValidations')
  return z.object({
    slug: z.string().min(2, t('slug')),
    logo: z.string().optional(),
    company: z.string().optional(),
  })
}

export const useEditProfileSchema = () => {
  const t = useTranslations('ProfileValidations')
  return z.object({
    slug: z
      .string()
      .min(2, t('slug'))
      .transform((v) => (v === '' ? undefined : v))
      .optional(),
    logo: z
      .string()
      .transform((v) => (v === '' ? undefined : v))
      .optional(),
    company: z
      .string()
      .transform((v) => (v === '' ? undefined : v))
      .optional(),
  })
}

export type CreateProfileData = z.infer<ReturnType<typeof useCreateProfileSchema>>
export type EditProfileData = z.infer<ReturnType<typeof useEditProfileSchema>>
