import type { Prisma } from '@prisma-client'

export type CarExtended = Prisma.CarGetPayload<{
  include: { brand: true; model: true; images: true }
}>

// export interface CarExtended extends Car {
//   brand: CarBrand
//   model: CarModel
//   images: CarImage[]
// }
