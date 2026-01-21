import type { Car, CarBrand, CarImage, CarModel } from '@/prisma/generated'

export interface CarExtended extends Car {
  brand: CarBrand
  model: CarModel
  images: CarImage[]
}
