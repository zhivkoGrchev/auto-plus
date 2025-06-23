import type { Car, CarBrand, CarModel, Transmission, FuelType } from '@/lib/generated/prisma'

export default interface AddCarData extends Omit<Car, 'id' | 'createdAt' | 'updatedAt' | 'year' | 'mileage' | 'price' | 'transmission' | 'fuelType'> {
  year: number | null
  mileage: number | null
  price: number | null
  transmission: Transmission | null
  fuelType: FuelType | null
  description: string
  brands: CarBrand[]
  models: CarModel[]
}
