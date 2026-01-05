import { useTranslations } from 'next-intl'
import { z } from 'zod'
import { useCreateLocationSchema } from './location'

export const useCreateProfileWithLocationSchema = () => {
  const t = useTranslations('ProfileValidations')
  return z.object({
    slug: z.string().min(2, t('slug')),
    logo: z.string().optional(),
    company: z.string().optional(),
    location: useCreateLocationSchema(),
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

export type CreateProfileWithLocationData = z.infer<ReturnType<typeof useCreateProfileWithLocationSchema>>
export type EditProfileData = z.infer<ReturnType<typeof useEditProfileSchema>>
