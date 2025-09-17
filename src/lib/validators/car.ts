import { z } from 'zod'
import { Transmission } from '@prisma/client'
import { FuelType } from '@prisma/client'
import { getTranslations } from 'next-intl/server'

export const createInsertCarSchema = async () => {
  const t = await getTranslations('Validations')

  return z.object({
    brandId: z.string().min(1, t('brand')),
    modelId: z.string().min(1, t('model')),
    powerKW: z.number().int().positive(),
    powerPS: z.number().int().positive(),
    year: z.number().int().min(1886, t('yearMin')).max(new Date().getFullYear(), t('yearMax')),
    color: z.string().min(1, t('color')),
    transmission: z.nativeEnum(Transmission, {
      errorMap: () => {
        return { message: t('transmission') }
      },
    }),
    fuelType: z.nativeEnum(FuelType, {
      errorMap: () => {
        return { message: t('fuelType') }
      },
    }),
    mileage: z.number().int().min(1, t('mileage')),
    vin: z.string().optional(),
    price: z.number().int().min(1, t('price')),
    description: z.string().optional(),
  })
}

export type InsertCarSchema = z.infer<Awaited<ReturnType<typeof createInsertCarSchema>>>
