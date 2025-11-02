import { z } from 'zod'
import { useTranslations } from 'next-intl'

export const useCreateLocationSchema = () => {
  const t = useTranslations('LocationValidations')
  return z.object({
    employee: z.string().min(2),
    phone: z
      .string()
      .regex(/^\+?[0-9]\d{1,14}$/, t('phone'))
      .min(1),
    email: z.string().email(t('email')),
    address: z.string().min(2),
    city: z.string().min(2),
    postcode: z.string().min(5).max(6),
    isDefault: z.boolean(),
  })
}

export const useEditLocationSchema = () => {
  const t = useTranslations('LocationValidations')
  return z.object({
    employee: z.string().optional(),
    phone: z.preprocess(
      (v) => (typeof v === 'string' && v === '' ? undefined : v),
      z
        .string()
        .regex(/^\+?[0-9]\d{1,14}$/, t('phone'))
        .optional()
    ),
    email: z.preprocess((v) => (typeof v === 'string' && v === '' ? undefined : v), z.string().email(t('email')).optional()),
    address: z
      .string()
      .transform((v) => (v === '' ? undefined : v))
      .optional(),
    city: z
      .string()
      .transform((v) => (v === '' ? undefined : v))
      .optional(),
    postcode: z
      .string()
      .min(5)
      .max(6)
      .transform((v) => (v === '' ? undefined : v))
      .optional(),
    isDefault: z.boolean(),
  })
}

export type CreateLocationData = z.infer<ReturnType<typeof useCreateLocationSchema>>
export type EditLocationData = z.infer<ReturnType<typeof useEditLocationSchema>>
