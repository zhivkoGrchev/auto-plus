import { z } from 'zod'
import { Transmission } from './generated/prisma'
import { FuelType } from './generated/prisma'

export const insertCarSchema = z.object({
  brandId: z.string().min(1, 'Brand ID is required'),
  modelId: z.string().min(1, 'Model ID is required'),
  year: z.number().int().min(1886, 'Year must be 1886 or later').max(new Date().getFullYear(), 'Year cannot be in the future'),
  color: z.string().min(1, 'Color is required'),
  transmission: z.enum([Transmission.automatic, Transmission.manual]),
  fuelType: z.enum([FuelType.diesel, FuelType.gasoline, FuelType.gas, FuelType.electric, FuelType.hybrid]),
  mileage: z.number().int().nonnegative('Mileage cannot be negative').max(1_000_000, 'Mileage cannot exceed 1,000,000'),
  vin: z.string().optional(),
  price: z.number().positive('Price must be a positive number').max(1_000_000, 'Price cannot exceed 1,000,000'),
  description: z.string().optional(),
})
export type InsertCarSchema = z.infer<typeof insertCarSchema>
