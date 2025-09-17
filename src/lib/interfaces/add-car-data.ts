import type { Car, CarBrand, CarModel, Transmission, FuelType } from '@prisma/client';

export default interface AddCarData extends Omit<Car, 'id' | 'createdAt' | 'updatedAt' | 'transmission' | 'fuelType'> {
  transmission: Transmission | null
  fuelType: FuelType | null
  description: string
  powerKW: number
  powerPS: number
  brands: CarBrand[]
  models: CarModel[]
}
