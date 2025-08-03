import type { Car, CarBrand, CarModel } from '@prisma/client'
import type { Transmission, FuelType } from '@prisma/client'

export interface CarExtended extends Car {
  brand: CarBrand;
  model: CarModel;
  transmission: Transmission;
  fuelType: FuelType;
}