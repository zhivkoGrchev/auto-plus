import { z } from 'zod'
import { Transmission } from './generated/prisma'
import { FuelType } from './generated/prisma'

export const insertCarSchema = z.object({
  brandId: z.string().min(1, 'Brand is required'),
  modelId: z.string().min(1, 'Model is required'),
  year: z.number().int().min(1886, 'Year must be 1886 or later').max(new Date().getFullYear(), 'Year cannot be in the future'),
  color: z.string().min(1, 'Color is required'),
  transmission: z.nativeEnum(Transmission, {
    errorMap: () => {
      return { message: 'Please select transmission type' }
    },
  }),
  fuelType: z.nativeEnum(FuelType, {
    errorMap: () => {
      return { message: 'Please select fuel type' }
    },
  }),
  mileage: z.number().int().min(1, 'Mileage is required'),
  vin: z.string().optional(),
  price: z.number().int().min(1, 'Price is required'),
  description: z.string().optional(),
})
export type InsertCarSchema = z.infer<typeof insertCarSchema>
