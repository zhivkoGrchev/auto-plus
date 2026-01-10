import type { Car, CarBrand, CarImage, CarModel, FuelType, Transmission } from '@/prisma/generated'

export interface CarExtended extends Car {
  brand: CarBrand
  model: CarModel
  transmission: Transmission
  fuelType: FuelType
  images: CarImage[]
}
