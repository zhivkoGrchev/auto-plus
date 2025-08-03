import type { Car, CarBrand, CarModel } from '@/lib/generated/prisma'
import type { Transmission, FuelType } from '@/lib/generated/prisma'

export interface CarExtended extends Car {
  brand: CarBrand;
  model: CarModel;
  transmission: Transmission;
  fuelType: FuelType;
}