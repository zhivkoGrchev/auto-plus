import type { Car, CarBrand, CarModel, Transmission, FuelType, CarImage } from '@prisma/client'

export interface CarExtended extends Car {
  brand: CarBrand
  model: CarModel
  transmission: Transmission
  fuelType: FuelType
  images: CarImage[]
}
