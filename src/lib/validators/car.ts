import { z } from 'zod'
import { FuelType, Transmission, VehicleType } from '@/prisma/generated'

export const AddCarSchema = z.object({
  profileId: z.string().min(1, 'message.requiredProfile'),
  locationId: z.string().min(1, 'message.requiredLocation'),
  brandId: z.string().min(1, 'message.requiredBrand'),
  modelId: z.string().min(1, 'message.requiredModel'),
  powerKW: z.coerce.number().int().min(1, 'message.requiredPowerKW'),
  powerPS: z.coerce.number().int().positive(),
  cubicCapacity: z.coerce.number().int().min(49, 'message.minCubicCapacity'),
  year: z.coerce.number().int().min(1886, 'message.minYear').max(new Date().getFullYear(), 'message.maxYear'),
  color: z.string().min(1, 'message.requiredColor'),
  transmission: z.enum(Transmission, 'message.requiredTransmission'),
  fuelType: z.enum(FuelType, 'message.requiredFuelType'),
  mileage: z.coerce.number().int().min(1, 'message.requiredMileage'),
  vin: z.string().nullable(),
  price: z.coerce.number().int().min(1, 'message.requiredPrice'),
  description: z.string().nullable(),
  seats: z.coerce.number().int().min(1).max(20).nullable(),
  doors: z.coerce.number().int().min(1).max(10).nullable(),
  vehicleType: z.enum(VehicleType).nullable(),
  mot: z.coerce.date().nullable(),
})

export const EditCarSchema = AddCarSchema.partial()

export const AddCarImageSchema = z.object({
  imageUrl: z.url(),
  imageCid: z.string().nullable(),
  order: z.number(),
})

export type AddCarData = z.infer<typeof AddCarSchema>
export type EditCarData = z.infer<typeof EditCarSchema>
export type AddCarImageData = z.infer<typeof AddCarImageSchema>
